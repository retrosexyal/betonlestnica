"use server";

type LeadData = {
  name: string;
  phone: string;
  city: string;
  comment: string;
  website: string;
  consent: boolean;
  kind: string;
  finish: string;
  attribution: Record<string, string>;
  files: File[];
};

type LeadResult = { ok: true } | { ok: false; error: string };

const kinds = [
  "Прямая",
  "Г-образная",
  "П-образная",
  "Винтовая",
  "Нужна помощь",
];
const finishes = ["Пока не знаю", "Без отделки", "Дерево", "Плитка", "Камень"];
const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "yclid",
];
const allowedExtensions = new Set(["jpg", "jpeg", "png", "webp", "pdf", "heif", "heic"]);
const photoExtensions = new Set(["jpg", "jpeg", "png"]);
const maxFiles = 5;
const maxFileSize = 10 * 1024 * 1024;
const maxTotalSize = 40 * 1024 * 1024;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function sendLeadToTelegram(data: LeadData): Promise<LeadResult> {
  if (!data || typeof data !== "object" || data.website)
    return { ok: false, error: "Не удалось отправить запрос." };
  if (
    typeof data.phone !== "string" ||
    !/^[+\d\s()\-]{7,25}$/.test(data.phone) ||
    data.phone.replace(/\D/g, "").length < 7 ||
    data.consent !== true
  )
    return {
      ok: false,
      error: "Проверьте телефон и согласие на обратную связь.",
    };
  for (const [key, max] of [
    ["name", 80],
    ["city", 100],
    ["comment", 1500],
  ] as const) {
    if (typeof data[key] !== "string" || data[key].length > max)
      return { ok: false, error: "Проверьте поля формы." };
  }
  if (!kinds.includes(data.kind) || !finishes.includes(data.finish))
    return { ok: false, error: "Проверьте параметры лестницы." };
  if (!Array.isArray(data.files) || data.files.length > maxFiles)
    return { ok: false, error: `Можно прикрепить не более ${maxFiles} файлов.` };
  let totalSize = 0;
  for (const file of data.files) {
    if (!(file instanceof File))
      return { ok: false, error: "Некорректное вложение." };
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    totalSize += file.size;
    if (!allowedExtensions.has(extension) || file.size === 0 || file.size > maxFileSize)
      return { ok: false, error: "Допустимы JPG, PNG, WEBP, PDF, HEIF и HEIC до 10 МБ." };
  }
  if (totalSize > maxTotalSize)
    return { ok: false, error: "Общий размер файлов не должен превышать 40 МБ." };

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId)
    return {
      ok: false,
      error: "Отправка временно недоступна. Позвоните нам.",
    };

  const attribution = attributionKeys
    .filter((key) => typeof data.attribution?.[key] === "string")
    .map(
      (key) =>
        `${escapeHtml(key)}: ${escapeHtml(data.attribution[key].slice(0, 200))}`,
    );
  const message = [
    "<b>Новая заявка с betonlestnica.by</b>",
    "",
    `<b>Конструкция:</b> ${escapeHtml(data.kind)}`,
    `<b>Отделка:</b> ${escapeHtml(data.finish)}`,
    `<b>Имя:</b> ${escapeHtml(data.name || "Не указано")}`,
    `<b>Телефон:</b> ${escapeHtml(data.phone)}`,
    `<b>Населённый пункт:</b> ${escapeHtml(data.city || "Не указан")}`,
    `<b>Комментарий:</b> ${escapeHtml(data.comment || "Нет")}`,
    ...(attribution.length ? ["", "<b>Источник:</b>", ...attribution] : []),
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(10000),
        cache: "no-store",
      },
    );
    if (!response.ok) throw new Error("Telegram rejected the message");
    for (const file of data.files) {
      const extension = file.name.split(".").pop()?.toLowerCase() || "";
      const method = photoExtensions.has(extension) ? "sendPhoto" : "sendDocument";
      const field = method === "sendPhoto" ? "photo" : "document";
      const payload = new FormData();
      payload.set("chat_id", chatId);
      payload.set(field, file, file.name);
      payload.set("caption", `Вложение к заявке: ${file.name}`.slice(0, 1024));
      const fileResponse = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
        method: "POST",
        body: payload,
        signal: AbortSignal.timeout(30000),
        cache: "no-store",
      });
      if (!fileResponse.ok) throw new Error("Telegram rejected an attachment");
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Не удалось отправить запрос. Позвоните нам.",
    };
  }
}

"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "./site";
import { works, type WorkImage } from "./works";
import { sendLeadToTelegram } from "./actions";
function track(name: string, params: Record<string, string> = {}) {
  window.dispatchEvent(
    new CustomEvent("betonlestnica:conversion", {
      detail: { event: name, ...params },
    }),
  );
  const w = window as Window & { dataLayer?: Record<string, string>[] };
  w.dataLayer?.push({ event: name, ...params });
}
export function Tracking() {
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLElement>("[data-track]");
      if (a?.dataset.track) track(a.dataset.track);
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}

export function WorkScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/works/")) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-inner">
        <a className="brand" href="/" onClick={() => setOpen(false)}>
          <Image
            className="brand-logo"
            src="/images/logo-horizontal.png"
            alt="Версаль — монолитные бетонные лестницы"
            width={760}
            height={180}
            priority
          />
        </a>
        <nav
          className={open ? "nav open" : "nav"}
          id="navigation"
          aria-label="Главная навигация"
        >
          {[
            ["/#types", "Конструкции"],
            ["/#projects", "Наши работы"],
            ["/#process", "Этапы"],
            ["/#contacts", "Контакты"],
          ].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a
          className="header-phone"
          href={`tel:${site.phone}`}
          data-track="phone_click"
        >
          {site.phoneDisplay}
        </a>
        <button
          className="menu-button"
          aria-expanded={open}
          aria-controls="navigation"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
export function Gallery() {
  return (
    <div className="gallery">
      {works.map((work, i) => (
        <Link
          key={work.slug}
          className={`project project-${(i % 5) + 1}`}
          href={`/works/${work.slug}`}
          aria-label={`${work.title}: посмотреть фотографии и описание`}
        >
          <div className="project-image">
            <Image
              src={work.cover}
              alt={work.images[0]?.alt || work.title}
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
            />
            <span className="project-count">{work.images.length} фото</span>
            <span className="zoom" aria-hidden="true">↗</span>
          </div>
          <div className="project-caption">
            <span>{work.label}</span>
            <h3>{work.shortTitle}</h3>
            <p>{work.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function WorkPhotoGallery({ images }: { images: WorkImage[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const show = (index: number) => {
    setActive(index);
    dialog.current?.showModal();
  };
  return (
    <>
      <div className="work-photo-grid">
        {images.map((image, i) => (
          <button
            key={image.src}
            className="work-photo"
            onClick={() => show(i)}
            aria-label={`Увеличить фотографию: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
            />
            <span className="work-photo-number">{String(i + 1).padStart(2, "0")}</span>
            <span className="zoom" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="close"
          onClick={() => dialog.current?.close()}
          aria-label="Закрыть фотографию"
        >
          ✕
        </button>
        <div className="lightbox-image">
          <Image
            src={images[active].src}
            alt={images[active].alt}
            fill
            sizes="90vw"
          />
        </div>
        <p>{images[active].alt}</p>
        <div className="lightbox-controls">
          <button
            onClick={() => setActive((active - 1 + images.length) % images.length)}
            aria-label="Предыдущее фото"
          >
            ←
          </button>
          <span>
            {active + 1} / {images.length}
          </span>
          <button
            onClick={() => setActive((active + 1) % images.length)}
            aria-label="Следующее фото"
          >
            →
          </button>
        </div>
      </dialog>
    </>
  );
}
export function LeadForm() {
  const [kind, setKind] = useState("Нужна помощь");
  const [finish, setFinish] = useState("Пока не знаю");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const phone = String(form.get("phone") || "");
    const files = form
      .getAll("attachments")
      .filter((value): value is File => value instanceof File && value.size > 0);
    if (
      !/^[+\d\s()\-]{7,25}$/.test(phone) ||
      phone.replace(/\D/g, "").length < 7
    ) {
      setError("Проверьте номер телефона: укажите код страны и номер.");
      return;
    }
    if (files.length > 5) {
      setError("Можно прикрепить не более 5 файлов.");
      return;
    }
    if (files.some((file) => file.size > 10 * 1024 * 1024)) {
      setError("Размер каждого файла не должен превышать 10 МБ.");
      return;
    }
    if (files.reduce((sum, file) => sum + file.size, 0) > 40 * 1024 * 1024) {
      setError("Общий размер файлов не должен превышать 40 МБ.");
      return;
    }
    const data = {
      name: String(form.get("name") || ""),
      phone,
      city: String(form.get("city") || ""),
      comment: String(form.get("comment") || ""),
      website: String(form.get("website") || ""),
      consent: form.get("consent") === "on",
      kind,
      finish,
      attribution: Object.fromEntries(
        [...new URLSearchParams(location.search)]
          .filter(([k]) =>
            [
              "utm_source",
              "utm_medium",
              "utm_campaign",
              "utm_content",
              "utm_term",
              "gclid",
              "yclid",
            ].includes(k),
          )
          .map(([k, v]) => [k, v.slice(0, 200)]),
      ),
      files,
    };
    setBusy(true);
    try {
      const result = await sendLeadToTelegram(data);
      if (!result.ok) throw new Error(result.error);
      setFileNames([]);
      setSent(true);
      track("lead_success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Не удалось отправить запрос. Позвоните нам.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (sent)
    return (
      <div className="lead-card success" role="status">
        <span className="success-mark">✓</span>
        <h3>Спасибо за запрос!</h3>
        <p>
          Ваши данные переданы специалисту. Мы свяжемся с вами, чтобы обсудить
          лестницу.
        </p>
        <button className="button dark" onClick={() => setSent(false)}>
          Новый запрос
        </button>
      </div>
    );
  return (
    <form
      className="lead-card"
      onSubmit={submit}
    >
      <div className="form-head">
        <h3>Расскажите о лестнице</h3>
        <span>~ 1 минута</span>
      </div>
      <fieldset>
        <legend>01. Какая конструкция вам нужна?</legend>
        <div className="choices">
          {[
            "Прямая",
            "Г-образная",
            "П-образная",
            "Винтовая",
            "Нужна помощь",
          ].map((x) => (
            <label
              key={x}
              className={kind === x ? "choice selected" : "choice"}
            >
              <input
                type="radio"
                name="kind"
                value={x}
                checked={kind === x}
                onChange={() => setKind(x)}
              />
              {x}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="field">
        02. Отделка
        <select value={finish} onChange={(e) => setFinish(e.target.value)}>
          {["Пока не знаю", "Без отделки", "Дерево", "Плитка", "Камень"].map(
            (x) => (
              <option key={x}>{x}</option>
            ),
          )}
        </select>
      </label>
      <div className="form-grid">
        <label className="field">
          Ваше имя
          <input
            name="name"
            autoComplete="given-name"
            placeholder="Как к вам обращаться"
            maxLength={80}
          />
        </label>
        <label className="field">
          Телефон *
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+375 (__) ___-__-__"
            required
            maxLength={25}
          />
        </label>
      </div>
      <label className="field">
        Где находится объект?
        <input
          name="city"
          autoComplete="address-level2"
          placeholder="Город или населённый пункт"
          maxLength={100}
        />
      </label>
      <label className="field">
        Размеры и пожелания
        <textarea
          name="comment"
          placeholder="Высота этажа, размер проёма или ваш вопрос"
          rows={3}
          maxLength={1500}
        />
      </label>
      <label className="field upload-field">
        Фото или проект
        <input
          name="attachments"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.pdf,.heif,.heic,image/jpeg,image/png,image/webp,application/pdf,image/heif,image/heic"
          multiple
          onChange={(event) => {
            const selected = Array.from(event.target.files || []);
            if (selected.length > 5) {
              event.target.value = "";
              setFileNames([]);
              setError("Можно прикрепить не более 5 файлов.");
              return;
            }
            setError("");
            setFileNames(selected.map((file) => file.name));
          }}
        />
        <span className="upload-hint">
          JPG, PNG, WEBP, PDF, HEIF или HEIC · до 5 файлов · до 10 МБ каждый
        </span>
        {fileNames.length > 0 && (
          <span className="upload-selected">Выбрано: {fileNames.join(", ")}</span>
        )}
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Ваш сайт
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          Разрешаю использовать указанные данные, чтобы связаться со мной по
          поводу расчёта лестницы.
        </span>
      </label>
      <p className="privacy-note">
        Получатель — «Бетонные лестницы». По вопросам использования данных:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <button className="button lime submit" type="submit" disabled={busy}>
        {busy ? "Отправляем…" : "Запросить расчёт"}
        <span aria-hidden="true">↗</span>
      </button>
      {error && (
        <p className="form-error" role="alert">
          {error} Можно связаться напрямую:{" "}
          <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.
        </p>
      )}
    </form>
  );
}

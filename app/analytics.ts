"use client";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
const METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() || "";

const validGaId = /^G-[A-Z0-9]+$/i.test(GA_ID) ? GA_ID : "";
const validMetrikaId = /^\d+$/.test(METRIKA_ID) ? Number(METRIKA_ID) : null;

type YmFunction = ((id: number, action: string, ...args: unknown[]) => void) & {
  a?: unknown[];
  l?: number;
};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  ym?: YmFunction;
};

let analyticsAllowed = false;
let googleInitialized = false;
let metrikaInitialized = false;

function loadScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function initializeGoogle() {
  if (!validGaId || googleInitialized) return;
  const analyticsWindow = window as unknown as AnalyticsWindow;
  (analyticsWindow as unknown as Record<string, unknown>)["ga-disable-" + validGaId] = false;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag =
    analyticsWindow.gtag ||
    function gtag(...args: unknown[]) {
      analyticsWindow.dataLayer?.push(args);
    };
  analyticsWindow.gtag("js", new Date());
  analyticsWindow.gtag("config", validGaId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  loadScript(
    "betonlestnica-ga4",
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(validGaId)}`,
  );
  googleInitialized = true;
}

function initializeMetrika() {
  if (!validMetrikaId || metrikaInitialized) return;
  const analyticsWindow = window as unknown as AnalyticsWindow;
  if (!analyticsWindow.ym) {
    const ym: YmFunction = (...args: unknown[]) => {
      ym.a = ym.a || [];
      ym.a.push(args);
    };
    ym.l = Date.now();
    analyticsWindow.ym = ym;
  }
  analyticsWindow.ym?.(validMetrikaId, "init", {
    clickmap: false,
    trackLinks: true,
    accurateTrackBounce: false,
    webvisor: false,
  });
  loadScript("betonlestnica-metrika", "https://mc.yandex.ru/metrika/tag.js");
  metrikaInitialized = true;
}

export function initializeAnalytics() {
  if (typeof window === "undefined") return;
  analyticsAllowed = true;
  initializeGoogle();
  initializeMetrika();
}

export function trackPageView(path: string) {
  if (!analyticsAllowed) return;
  const analyticsWindow = window as unknown as AnalyticsWindow;
  if (validGaId && googleInitialized) {
    analyticsWindow.gtag?.("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
  if (validMetrikaId && metrikaInitialized) {
    analyticsWindow.ym?.(validMetrikaId, "hit", window.location.href, {
      title: document.title,
    });
  }
}

export function trackEvent(name: string, params: Record<string, string> = {}) {
  window.dispatchEvent(
    new CustomEvent("betonlestnica:conversion", {
      detail: { event: name, ...params },
    }),
  );
  if (!analyticsAllowed) return;
  const analyticsWindow = window as unknown as AnalyticsWindow;
  if (validGaId && googleInitialized) {
    analyticsWindow.gtag?.("event", name, params);
  }
  if (validMetrikaId && metrikaInitialized) {
    analyticsWindow.ym?.(validMetrikaId, "reachGoal", name, params);
  }
}

function deleteAnalyticsStorage() {
  const names = document.cookie
    .split(";")
    .map((part) => part.split("=")[0]?.trim())
    .filter(
      (name) =>
        name &&
        (/^_ga(?:_|$)/.test(name) ||
          /^_g(?:id|at)/.test(name) ||
          /^_ym_/.test(name) ||
          name === "yabs-sid" ||
          name === "ymex"),
    ) as string[];
  const hostname = window.location.hostname;
  const domains = ["", hostname, `.${hostname}`];
  const parent = hostname.split(".").slice(-2).join(".");
  if (parent && parent !== hostname) domains.push(parent, `.${parent}`);

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
    }
  }

  for (let index = localStorage.length - 1; index >= 0; index -= 1) {
    const key = localStorage.key(index);
    if (key && (/^_ym/.test(key) || /^_ga/.test(key))) localStorage.removeItem(key);
  }
}

export function revokeAnalyticsConsent() {
  if (typeof window === "undefined") return;
  analyticsAllowed = false;
  const analyticsWindow = window as unknown as AnalyticsWindow;
  if (validGaId) {
    (analyticsWindow as unknown as Record<string, unknown>)["ga-disable-" + validGaId] = true;
  }
  if (validMetrikaId && metrikaInitialized) {
    analyticsWindow.ym?.(validMetrikaId, "destruct");
  }
  document.getElementById("betonlestnica-ga4")?.remove();
  document.getElementById("betonlestnica-metrika")?.remove();
  googleInitialized = false;
  metrikaInitialized = false;
  deleteAnalyticsStorage();
}

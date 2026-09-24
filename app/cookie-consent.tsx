"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  initializeAnalytics,
  revokeAnalyticsConsent,
  trackPageView,
} from "./analytics";

const CONSENT_COOKIE = "cookie_consent";
const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
export const OPEN_COOKIE_SETTINGS_EVENT = "betonlestnica:open-cookie-settings";

type Consent = {
  version: number;
  analytics: boolean;
  updatedAt: string;
};

type ConsentContextValue = {
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readConsent(): Consent | null {
  const encoded = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!encoded) return null;
  try {
    const value = JSON.parse(decodeURIComponent(encoded)) as Partial<Consent>;
    if (
      value.version === CONSENT_VERSION &&
      typeof value.analytics === "boolean" &&
      typeof value.updatedAt === "string"
    ) {
      return value as Consent;
    }
  } catch {
    return null;
  }
  return null;
}

function persistConsent(analytics: boolean): Consent {
  const consent = {
    version: CONSENT_VERSION,
    analytics,
    updatedAt: new Date().toISOString(),
  };
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  return consent;
}

export function useCookieSettings() {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useCookieSettings must be used within CookieConsentProvider");
  return context;
}

export function CookieSettingsButton({
  className,
  children = "Настройки cookie",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { openSettings } = useCookieSettings();
  return (
    <button className={className} type="button" onClick={openSettings}>
      {children}
    </button>
  );
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const settingsTriggerRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [draftAnalytics, setDraftAnalytics] = useState(false);

  const applyConsent = useCallback((analytics: boolean) => {
    const next = persistConsent(analytics);
    setConsent(next);
    setDraftAnalytics(analytics);
    if (analytics) initializeAnalytics();
    else revokeAnalyticsConsent();
    dialogRef.current?.close();
  }, []);

  const openSettings = useCallback(() => {
    settingsTriggerRef.current = document.activeElement as HTMLElement | null;
    setDraftAnalytics(consent?.analytics ?? false);
    dialogRef.current?.showModal();
  }, [consent]);

  useEffect(() => {
    const saved = readConsent();
    setConsent(saved);
    setDraftAnalytics(saved?.analytics ?? false);
    if (saved?.analytics) initializeAnalytics();
    else revokeAnalyticsConsent();
    setReady(true);
  }, []);

  useEffect(() => {
    const listener = () => openSettings();
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, listener);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, listener);
  }, [openSettings]);

  useEffect(() => {
    if (!ready || !consent?.analytics) return;
    trackPageView(`${pathname}${window.location.search}`);
  }, [pathname, ready, consent?.analytics]);

  return (
    <ConsentContext.Provider value={{ openSettings }}>
      {children}
      {ready && !consent && (
        <section className="cookie-banner" aria-labelledby="cookie-banner-title">
          <div className="cookie-banner-copy">
            <h2 id="cookie-banner-title">Мы используем файлы cookie</h2>
            <p>
              Мы используем необходимые файлы cookie для работы сайта и, с вашего
              согласия, аналитические cookie, чтобы понимать, как посетители
              используют сайт. <a href="/cookie-policy">Подробнее</a>
            </p>
          </div>
          <div className="cookie-banner-actions">
            <button className="button lime" type="button" onClick={() => applyConsent(true)}>
              Принять
            </button>
            <button className="button cookie-reject" type="button" onClick={() => applyConsent(false)}>
              Отклонить
            </button>
            <button className="cookie-configure" type="button" onClick={openSettings}>
              Настроить
            </button>
          </div>
        </section>
      )}
      <dialog
        ref={dialogRef}
        className="cookie-dialog"
        aria-labelledby="cookie-dialog-title"
        onClose={() => settingsTriggerRef.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <form method="dialog" className="cookie-dialog-card" onSubmit={(event) => event.preventDefault()}>
          <div className="cookie-dialog-head">
            <div>
              <p className="eyebrow">НАСТРОЙКИ КОНФИДЕНЦИАЛЬНОСТИ</p>
              <h2 id="cookie-dialog-title">Настройки cookie</h2>
            </div>
            <button className="cookie-dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Закрыть настройки cookie">
              ✕
            </button>
          </div>
          <div className="cookie-category">
            <div>
              <h3>Необходимые</h3>
              <p>Нужны для корректной работы сайта и сохранения выбранных вами настроек.</p>
            </div>
            <span className="cookie-always-on" aria-label="Всегда включены">Всегда включены</span>
          </div>
          <label className="cookie-category cookie-category-toggle">
            <div>
              <h3>Аналитика</h3>
              <p>Помогает нам понимать посещаемость сайта и улучшать его работу. Используется только с вашего согласия.</p>
            </div>
            <input
              type="checkbox"
              checked={draftAnalytics}
              onChange={(event) => setDraftAnalytics(event.target.checked)}
              aria-label="Разрешить аналитические cookie"
            />
          </label>
          <div className="cookie-dialog-actions">
            <button className="button lime" type="button" onClick={() => applyConsent(draftAnalytics)}>
              Сохранить настройки
            </button>
            <button className="button cookie-reject" type="button" onClick={() => applyConsent(true)}>
              Принять все
            </button>
          </div>
        </form>
      </dialog>
    </ConsentContext.Provider>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  initializeAnalytics,
  revokeAnalyticsConsent,
  trackPageView,
} from "./analytics";

const CONSENT_COOKIE = "cookie_consent";
const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

type Consent = {
  version: number;
  analytics: boolean;
  updatedAt: string;
};

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
      return value.analytics ? (value as Consent) : null;
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
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${analytics ? CONSENT_MAX_AGE : 0}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  return consent;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);

  const applyConsent = useCallback((analytics: boolean) => {
    const next = persistConsent(analytics);
    setConsent(next);
    if (analytics) initializeAnalytics();
    else revokeAnalyticsConsent();
  }, []);

  useEffect(() => {
    const saved = readConsent();
    setConsent(saved);
    if (saved?.analytics) initializeAnalytics();
    else revokeAnalyticsConsent();
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !consent?.analytics) return;
    trackPageView(`${pathname}${window.location.search}`);
  }, [pathname, ready, consent?.analytics]);

  return (
    <>
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
          </div>
        </section>
      )}
    </>
  );
}

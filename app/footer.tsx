"use client";

import Image from "next/image";
import Link from "next/link";
import { CookieSettingsButton } from "./cookie-consent";

export function Footer() {
  return (
    <footer className="wrap footer">
      <Link className="brand" href="/" aria-label="Бетонные лестницы — на главную">
        <Image
          className="brand-logo"
          src="/images/logo-horizontal.png"
          alt="Версаль — монолитные бетонные лестницы"
          width={760}
          height={180}
        />
      </Link>
      <p>© {new Date().getFullYear()} Бетонные лестницы</p>
      <nav className="footer-links" aria-label="Правовая информация">
        <Link href="/cookie-policy">Политика cookie</Link>
        <CookieSettingsButton />
      </nav>
    </footer>
  );
}

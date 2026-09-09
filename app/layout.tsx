import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "./site";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Бетонные лестницы на заказ в Беларуси — betonlestnica.by",
  description:
    "Изготовление бетонных лестниц на второй этаж и входного крыльца по всей Беларуси. Проектирование, монолитная конструкция, отделка и ограждения. Запросите расчёт под ваш дом.",
  alternates: { canonical: "/" },
  robots: { index: process.env.SITE_INDEXABLE === "true", follow: true },
  openGraph: {
    type: "website",
    locale: "ru_BY",
    siteName: site.name,
    title: "Бетонные лестницы под ваш дом — betonlestnica.by",
    description:
      "От проекта до отделки. Индивидуальное изготовление по всей Беларуси.",
    url: "/",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 848,
        alt: "Бетонная лестница на заказ",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#222724",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

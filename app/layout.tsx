import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "./site";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Бетонные лестницы на заказ в Беларуси — betonlestnica.by",
    template: "%s | betonlestnica.by",
  },
  description:
    "Бетонные лестницы на заказ по всей Беларуси. Более 16 лет опыта и 300 изготовленных лестниц. Проектирование, монолитная конструкция, отделка и ограждения.",
  alternates: { canonical: "/" },
  robots: { index: process.env.SITE_INDEXABLE === "true", follow: true },
  openGraph: {
    type: "website",
    locale: "ru_BY",
    siteName: site.name,
    title: "Бетонные лестницы под ваш дом — betonlestnica.by",
    description:
      "16+ лет опыта, 300+ изготовленных лестниц. От проекта до отделки по всей Беларуси.",
    url: "/",
    images: [
      {
        url: "/images/og-betonlestnica.jpg",
        width: 1200,
        height: 630,
        alt: "Бетонные лестницы на заказ — 16 лет опыта, более 300 работ",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/images/og-betonlestnica.jpg"] },
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

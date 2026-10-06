import Image from "next/image";
import Link from "next/link";
import { Footer } from "./footer";
import { Header, Tracking } from "./ui";
import { site } from "./site";
import { formatPrice, priceNote, type PriceExample } from "./pricing";

export function Breadcrumbs({ title, path }: { title: string; path: string }) {
  const schema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: title, item: `${site.url}${path}` },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <nav className="breadcrumbs wrap" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
  </>;
}

export function PageFrame({ title, path, children }: { title: string; path: string; children: React.ReactNode }) {
  return <>
    <a className="skip" href="#main">Перейти к содержимому</a>
    <Tracking /><Header />
    <main id="main" className="content-page"><Breadcrumbs title={title} path={path} />{children}</main>
    <Footer /><MobileContact />
  </>;
}

export function MobileContact() {
  return <div className="mobile-cta"><a href={`tel:${site.phone}`} data-track="phone_click">Позвонить</a><Link href="/#estimate">Узнать стоимость ↗</Link></div>;
}

export function ContactCTA({ title = "Рассчитаем под ваш дом." }: { title?: string }) {
  return <section className="work-cta"><div className="wrap work-cta-inner">
    <div><p className="eyebrow">ВАШ СЛЕДУЮЩИЙ ШАГ</p><h2>{title}</h2><p className="cta-description">Пришлите план или фотографии проёма, высоту этажа и населённый пункт.</p></div>
    <div className="work-cta-actions"><Link className="button dark" href="/#estimate">Запросить расчёт <span aria-hidden="true">↗</span></Link><a href={`tel:${site.phone}`} data-track="phone_click">{site.phoneDisplay}</a></div>
  </div></section>;
}

export function PriceCards({ examples }: { examples: PriceExample[] }) {
  return <div className="price-preview-grid">{examples.map((example) => <article className="price-preview" key={example.id}>
    <Link className="price-preview-image" href={`/stoimost-betonnyh-lestnic#${example.id}`} aria-label={`${example.title}: фотографии и стоимость`}>
      <Image src={example.images[0].src} alt={example.images[0].alt} fill sizes="(max-width: 560px) 100vw, (max-width: 850px) 50vw, 33vw" />
      <span aria-hidden="true">↗</span>
    </Link>
    <div className="price-preview-copy"><p className="price-kind">{example.from ? "НАЧАЛЬНАЯ СТОИМОСТЬ" : "ЦЕНА ПРИМЕРА"}</p><h3>{example.title}</h3><p className="price-amount">{formatPrice(example)}</p><p className="price-finish">Бетонная конструкция без отделки</p><Link className="card-link" href={`/stoimost-betonnyh-lestnic#${example.id}`}>Посмотреть пример <span aria-hidden="true">↗</span></Link></div>
  </article>)}</div>;
}

export function PriceNote() { return <p className="price-note">{priceNote}</p>; }

export function QuestionList({ items }: { items: [string, string][] }) {
  return <div className="question-list">{items.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>;
}

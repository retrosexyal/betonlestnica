import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Tracking, WorkPhotoGallery, WorkScrollReset } from "../../ui";
import { site } from "../../site";
import { getWork, works } from "../../works";
import { Footer } from "../../footer";
import { workGuides } from "../../work-guides";
import { pricesForWork, formatPrice } from "../../pricing";
import { PriceNote, QuestionList, MobileContact } from "../../content-ui";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getWork((await params).slug);
  if (!work) return {};

  const title = `${work.title} на заказ в Беларуси`;
  const examples = pricesForWork(work.slug);
  const description = examples.length ? `${work.title} на заказ в Беларуси: фото и варианты конструкции. Бетонная основа от ${Math.min(...examples.map((example) => example.amount)).toLocaleString("ru-BY")} BYN без отделки. Материалы, доставка и работы включены.` : work.description;
  return {
    title,
    description,
    alternates: { canonical: `/works/${work.slug}` },
    openGraph: {
      type: "article",
      locale: "ru_BY",
      title,
      description,
      url: `/works/${work.slug}`,
      images: [{ url: work.cover, alt: work.images[0].alt }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function WorkPage({ params }: Props) {
  const work = getWork((await params).slug);
  if (!work) notFound();

  const index = works.findIndex(({ slug }) => slug === work.slug);
  const nextWork = works[(index + 1) % works.length];
  const guide = workGuides[work.slug];
  const examples = pricesForWork(work.slug);
  const breadcrumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: work.title, item: `${site.url}/works/${work.slug}` },
    ],
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: work.title,
    description: work.description,
    url: `${site.url}/works/${work.slug}`,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    associatedMedia: work.images.map((image) => ({
      "@type": "ImageObject",
      contentUrl: `${site.url}${image.src}`,
      caption: image.alt,
    })),
  };

  return (
    <>
      <a className="skip" href="#main">Перейти к содержимому</a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <Tracking />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
      <WorkScrollReset />
      <Header />
      <main id="main" className="work-page">
        <nav className="breadcrumbs wrap" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link><span aria-hidden="true">/</span>
          <Link href="/#projects">Наши работы</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{work.shortTitle}</span>
        </nav>

        <section className="work-hero wrap">
          <div className="work-hero-copy">
            <p className="eyebrow">НАШИ РАБОТЫ / {String(index + 1).padStart(2, "0")}</p>
            <h1>{work.title}</h1>
            <p className="work-lead">{work.intro}</p>
            <div className="content-actions"><Link className="button dark" href="/#estimate">Рассчитать лестницу <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/proektirovanie-betonnyh-lestnic">О проектировании →</Link></div>
            <div className="work-facts" aria-label="Опыт и количество выполненных работ">
              <div><strong>16+</strong><span>лет опыта</span></div>
              <div><strong>300+</strong><span>лестниц изготовлено</span></div>
              <div><strong>{work.images.length}</strong><span>фото в подборке</span></div>
            </div>
          </div>
          <div className="work-hero-image">
            <Image
              src={work.cover}
              alt={work.images[0].alt}
              fill
              priority
              sizes="(max-width: 850px) 100vw, 48vw"
            />
            <span>{work.label}</span>
          </div>
        </section>

        {guide && <section className="section wrap editorial-columns work-guide"><div><p className="eyebrow">ВЫБОР КОНСТРУКЦИИ</p><h2>{guide.heading}</h2><Link className="text-link" href="/proektirovanie-betonnyh-lestnic">Проверим ваш проём →</Link></div><div className="editorial-body"><h3>Когда подходит</h3><p>{guide.suitable}</p><h3>Что учитываем в проекте</h3><p>{guide.check}</p><h3>Отделка и комплектация</h3><p>{guide.finish}</p></div></section>}
        {examples.length > 0 && <section className="section work-price-section"><div className="wrap"><div className="section-heading"><div><p className="eyebrow">СТОИМОСТЬ БЕТОННОЙ КОНСТРУКЦИИ</p><h2>Ориентиры по цене.</h2></div><p className="section-intro">Выберите близкое решение. Размеры и состав вашего проекта уточним перед расчётом.</p></div><div className="work-price-list">{examples.map((example) => <Link href={`/stoimost-betonnyh-lestnic#${example.id}`} key={example.id}><span>{example.title}</span><strong>{formatPrice(example)}</strong><span aria-hidden="true">↗</span></Link>)}</div><PriceNote /><Link className="text-link" href="/stoimost-betonnyh-lestnic">Все варианты и фотографии →</Link></div></section>}
        <section className="section work-gallery-section">
          <div className="wrap">
            <div className="section-heading work-gallery-heading">
              <div>
                <p className="eyebrow">ФОТОГРАФИИ РАБОТ</p>
                <h2>Геометрия<br />в деталях.</h2>
              </div>
              <p className="section-intro">{work.designNote}</p>
            </div>
            <WorkPhotoGallery images={work.images} />
          </div>
        </section>

        {guide && <section className="section wrap editorial-faq"><div><p className="eyebrow">ВОПРОСЫ О КОНСТРУКЦИИ</p><h2>Перед заказом.</h2></div><QuestionList items={guide.questions} /></section>}
        <section className="work-cta">
          <div className="wrap work-cta-inner">
            <div>
              <p className="eyebrow">ОБСУДИМ ВАШУ ЛЕСТНИЦУ</p>
              <h2>Нравится решение?<br /><span>Сделаем под ваш дом.</span></h2>
            </div>
            <div className="work-cta-actions">
              <Link className="button dark" href="/#estimate">Запросить расчёт <span aria-hidden="true">↗</span></Link>
              <a href={`tel:${site.phone}`} data-track="phone_click">{site.phoneDisplay}</a>
            </div>
          </div>
        </section>

        <Link className="next-work wrap" href={`/works/${nextWork.slug}`}>
          <span>Следующая подборка</span>
          <strong>{nextWork.shortTitle}</strong>
          <span aria-hidden="true">→</span>
        </Link>
      </main>
      <Footer />
      <MobileContact />
    </>
  );
}

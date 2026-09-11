import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Tracking, WorkPhotoGallery, WorkScrollReset } from "../../ui";
import { site } from "../../site";
import { getWork, works } from "../../works";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getWork((await params).slug);
  if (!work) return {};

  const title = `${work.title} на заказ — фото работ`;
  return {
    title,
    description: work.description,
    alternates: { canonical: `/works/${work.slug}` },
    openGraph: {
      type: "article",
      locale: "ru_BY",
      title,
      description: work.description,
      url: `/works/${work.slug}`,
      images: [{ url: work.cover, alt: work.images[0].alt }],
    },
    twitter: { card: "summary_large_image", title, description: work.description },
  };
}

export default async function WorkPage({ params }: Props) {
  const work = getWork((await params).slug);
  if (!work) notFound();

  const index = works.findIndex(({ slug }) => slug === work.slug);
  const nextWork = works[(index + 1) % works.length];
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
    </>
  );
}

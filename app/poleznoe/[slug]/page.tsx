import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "../../articles";
import { ArticleCards } from "../../article-ui";
import { PageFrame, ContactCTA } from "../../content-ui";
import { site } from "../../site";
import { getWork } from "../../works";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const path = `/poleznoe/${article.slug}`;
  return { title: article.title, description: article.description, alternates: { canonical: path },
    openGraph: { type: "article", title: article.title, description: article.description, url: path, images: [{ url: article.image, alt: article.imageAlt }] },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [article.image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const path = `/poleznoe/${article.slug}`;
  const schema = {
    "@context": "https://schema.org", "@type": "Article", headline: article.title,
    description: article.description, image: `${site.url}${article.image}`, inLanguage: "ru-BY",
    mainEntityOfPage: `${site.url}${path}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
  return <PageFrame title={article.title} path={path}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <article>
      <header className="wrap article-heading"><Link className="text-link" href="/poleznoe">← Все статьи</Link><p className="eyebrow">ВЕРСАЛЬ / СТРОИТЕЛЬСТВО ДОМА</p><h1>{article.title}</h1><p className="content-lead">{article.intro}</p></header>
      <figure className="wrap article-cover"><div><Image src={article.image} alt={article.imageAlt} fill priority sizes="(max-width: 650px) 100vw, 90vw" /></div><figcaption>{article.imageAlt}. Фото из нашей подборки работ.</figcaption></figure>
      <div className="wrap article-layout">
        <aside className="article-toc"><nav aria-label="Содержание статьи"><p className="eyebrow">В ЭТОЙ СТАТЬЕ</p><ol>{article.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav></aside>
        <div className="article-body">{article.sections.map(section => <section key={section.id} id={section.id}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.checklist && <ul>{section.checklist.map(item => <li key={item}>{item}</li>)}</ul>}{section.link && <Link className="article-context-link" href={section.link.href}>{section.link.label} →</Link>}</section>)}<p className="article-note">Материал помогает подготовиться к обсуждению. Размеры, опирание и конструктивные решения определяются для конкретного дома при проектировании.</p></div>
      </div>
    </article>
    <section className="section wrap"><div className="section-heading"><div><p className="eyebrow">ОТ ТЕОРИИ К ПРИМЕРАМ</p><h2>Посмотрите наши работы.</h2></div></div><div className="service-link-grid">{article.relatedWorks.map(slug => { const work = getWork(slug); return work && <Link className="service-link" key={slug} href={`/works/${slug}`}><h3>{work.title} ↗</h3><p>{work.description}</p></Link>; })}</div></section>
    <ContactCTA title={article.cta} />
    <section className="section wrap"><div className="section-heading"><h2>Читайте также.</h2></div><ArticleCards items={articles.filter(item => item.slug !== article.slug)} /></section>
  </PageFrame>;
}

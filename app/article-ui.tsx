import Image from "next/image";
import Link from "next/link";
import { articles, type GuideArticle } from "./articles";

export function ArticleCards({ items = articles }: { items?: GuideArticle[] }) {
  return <div className="article-grid">{items.map(article => <article className="article-card" key={article.slug}>
    <Link className="article-card-photo" href={`/poleznoe/${article.slug}`} aria-label={article.title}>
      <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" />
    </Link>
    <div className="article-card-copy"><p className="eyebrow">СТРОИТЕЛЬСТВО ДОМА / ЛЕСТНИЦЫ</p><h3><Link href={`/poleznoe/${article.slug}`}>{article.title}</Link></h3><p>{article.description}</p><Link className="text-link" href={`/poleznoe/${article.slug}`}>Читать статью →</Link></div>
  </article>)}</div>;
}

export function UsefulArticles() {
  return <section className="section wrap" aria-labelledby="useful-heading"><div className="section-heading"><div><p className="eyebrow">ПОЛЕЗНОЕ ПЕРЕД СТРОИТЕЛЬСТВОМ</p><h2 id="useful-heading">Сначала продумать.<br />Потом строить.</h2></div><Link className="text-link" href="/poleznoe">Все статьи →</Link></div><ArticleCards /></section>;
}

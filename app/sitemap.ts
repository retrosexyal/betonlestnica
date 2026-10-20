import type { MetadataRoute } from "next";
import { site } from "./site";
import { works } from "./works";
import { priceExamples } from "./pricing";
import { articles } from "./articles";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/stoimost-betonnyh-lestnic`, changeFrequency: "monthly", priority: 0.9, images: priceExamples.flatMap((example) => example.images.map((image) => `${site.url}${image.src}`)) },
    { url: `${site.url}/proektirovanie-betonnyh-lestnic`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/poleznoe`, changeFrequency: "monthly", priority: 0.6 },
    ...articles.map(article => ({
      url: `${site.url}/poleznoe/${article.slug}`,
      images: [`${site.url}${article.image}`],
    })),
    ...works.map((work) => ({
      url: `${site.url}/works/${work.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: work.images.map((image) => `${site.url}${image.src}`),
    })),
  ];
}

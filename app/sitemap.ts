import type { MetadataRoute } from "next";
import { site } from "./site";
import { works } from "./works";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    ...works.map((work) => ({
      url: `${site.url}/works/${work.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: work.images.map((image) => `${site.url}${image.src}`),
    })),
  ];
}

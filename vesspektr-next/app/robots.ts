import type { MetadataRoute } from 'next';
import { site } from './site';
export default function robots(): MetadataRoute.Robots {
 return { rules: { userAgent: '*', ...(process.env.SITE_INDEXABLE === 'true' ? { allow: '/', disallow: '/api/' } : { disallow: '/' }) }, sitemap: `${site.url}/sitemap.xml` };
}

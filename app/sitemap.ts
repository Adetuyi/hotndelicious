import type { MetadataRoute } from 'next';
import { siteConfig } from '@/constants/siteConfig';

const base = `https://${siteConfig.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/menu`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/order`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];
}

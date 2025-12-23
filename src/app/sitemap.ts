import type { MetadataRoute } from 'next';

import { AllLocales } from '@/utils/AppConfig';
import { getBaseUrl } from '@/utils/Helpers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  // 1. Static Pages
  const staticPages = [
    '',
    '/about',
    '/products',
    '/contact',
    '/pricing',
    '/sign-in',
    '/sign-up',
    '/legal',
  ];

  const staticEntries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of AllLocales) {
      // Don't duplicate default locale if it's served at root (optional strategy,
      // but usually libraries handle routing. consistently using /locale/path is safer for sitemaps)
      const url = `${baseUrl}/${locale}${page}`;

      staticEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  return staticEntries;
}

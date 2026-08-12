import type { MetadataRoute } from 'next';
import { publishedContent } from '@/content';
import { site } from '@/content/global/site';
import { hubs, type HubKey } from '@/lib/content';

/**
 * Sitemap is generated from the typed content registry rather than by
 * crawling built routes, which means draft content is excluded structurally:
 * a page that is noindex cannot end up in the sitemap by oversight.
 * Regenerated on every build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${site.url}/about/`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${site.url}/contact/`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const hubRoutes: MetadataRoute.Sitemap = (Object.keys(hubs) as HubKey[]).map((key) => ({
    url: `${site.url}${hubs[key].path}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const contentRoutes: MetadataRoute.Sitemap = publishedContent().map((item) => ({
    url: `${site.url}${item.seo.canonical}`,
    lastModified: new Date(`${item.hero.lastUpdated}T00:00:00Z`),
    // Benchmarks and comparisons are updated on a 7–14 day cadence (§4);
    // everything else changes less often.
    changeFrequency: item.seo.canonical.startsWith('/benchmarks/') ? 'weekly' : 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...hubRoutes, ...contentRoutes];
}

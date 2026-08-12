import type { MetadataRoute } from 'next';
import { site } from '@/content/global/site';

/**
 * Deliberately permissive to AI crawlers. Measuring whether this site gets
 * cited by assistants is the point of the experiment (§1), so blocking the
 * crawlers that produce citations would remove the variable we are testing.
 * If that stance changes, log it in EXPERIMENT-LOG.md — it invalidates
 * comparisons against earlier periods.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

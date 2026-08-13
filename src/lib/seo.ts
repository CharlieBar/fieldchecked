import type { Metadata } from 'next';
import { site } from '@/content/global/site';
import type { PublishStatus, Seo } from '@/types/content';
import { absoluteUrl } from './schema';

/**
 * Single source of truth for page metadata. Every route's generateMetadata()
 * funnels through here with an `seo` object read from src/content/ — no page
 * hardcodes copy in the component (§6).
 *
 * Draft content is forced to noindex here rather than relying on each content
 * file remembering to set the flag. Anything carrying unverified numbers stays
 * out of the index until Checkpoint 2 clears it — see CLAUDE.md.
 */
export function metadataFrom(
  seo: Seo,
  options?: { type?: 'article' | 'website'; status?: PublishStatus },
): Metadata {
  const canonical = seo.canonicalOverride ?? seo.canonical;
  const noindex = seo.noindex || options?.status === 'draft';

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: absoluteUrl(canonical) },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    openGraph: {
      type: options?.type ?? 'article',
      title: seo.title,
      description: seo.description,
      url: absoluteUrl(canonical),
      siteName: site.name,
      locale: site.locale,
      ...(seo.ogImage
        ? {
            images: [
              {
                url: absoluteUrl(seo.ogImage.src),
                width: seo.ogImage.width,
                height: seo.ogImage.height,
                alt: seo.ogImage.alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  };
}

/** Breadcrumb trail helper — homepage is implicit and always first. */
export function trail(
  ...crumbs: { name: string; path: string }[]
): { name: string; path: string }[] {
  return [{ name: 'Home', path: '/' }, ...crumbs];
}

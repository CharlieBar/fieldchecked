import { site } from '@/content/global/site';
import type { AnyContent, BenchmarkContent, Faq, VerdictContent } from '@/types/content';

type JsonLdNode = Record<string, unknown>;

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}

const publisher: JsonLdNode = {
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
};

const author: JsonLdNode = {
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.author.name,
  url: site.author.url,
};

/* ------------------------------------------------------------------ */
/* Individual node builders                                            */
/* ------------------------------------------------------------------ */

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): JsonLdNode {
  const last = trail[trail.length - 1];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(last?.path ?? '/')}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]): JsonLdNode | null {
  if (faqs.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function itemListSchema(
  items: { name: string; description?: string; url?: string }[],
  listName: string,
): JsonLdNode | null {
  if (items.length === 0) return null;
  return {
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      ...(item.url ? { url: absoluteUrl(item.url) } : {}),
    })),
  };
}

/**
 * Dataset markup for /benchmarks/ pages. Data pages get cited and linked far
 * more than opinion pages (§3), and Dataset is the vocabulary that says
 * "this is a citable measurement table", not just an article about one.
 */
export function datasetSchema(content: BenchmarkContent): JsonLdNode {
  return {
    '@type': 'Dataset',
    '@id': `${absoluteUrl(content.seo.canonical)}#dataset`,
    name: content.seo.title,
    description: content.seo.description,
    url: absoluteUrl(content.seo.canonical),
    creator: author,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    dateModified: content.hero.lastUpdated,
    datePublished: content.datePublished,
    measurementTechnique:
      content.schema.dataset?.measurementTechnique ??
      'Local inference throughput measurement (tokens per second)',
    variableMeasured:
      content.schema.dataset?.variableMeasured ?? 'Generation throughput (tokens/sec)',
  };
}

function articleSchema(content: AnyContent, trail: { name: string; path: string }[]): JsonLdNode {
  const url = absoluteUrl(content.seo.canonical);
  const node: JsonLdNode = {
    '@type': content.schema['@type'] === 'Dataset' ? 'Article' : content.schema['@type'],
    '@id': `${url}#article`,
    headline: content.hero.headline,
    description: content.seo.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: content.datePublished,
    dateModified: content.hero.lastUpdated,
    author,
    publisher,
    inLanguage: 'en-US',
    // Reference rather than inline: the BreadcrumbList is its own node in the
    // graph, and emitting it twice would duplicate every ListItem.
    breadcrumb: { '@id': `${absoluteUrl(trail[trail.length - 1]?.path ?? '/')}#breadcrumb` },
  };

  if (content.schema.about?.length) {
    node.about = content.schema.about.map((entity) => ({
      '@type': entity.type,
      name: entity.name,
    }));
  }

  if (content.seo.ogImage) {
    node.image = absoluteUrl(content.seo.ogImage.src);
  }

  if (content.schema['@type'] === 'Review' && content.schema.rating) {
    node.reviewRating = {
      '@type': 'Rating',
      ratingValue: content.schema.rating.value,
      bestRating: content.schema.rating.best,
      worstRating: content.schema.rating.worst,
    };
  }

  // A curated verdict page is explicitly *about* other people's reporting.
  // citation + isBasedOn is the honest structured-data equivalent of the
  // on-page "synthesised from public discussion" label.
  if (isVerdict(content)) {
    node.citation = content.sources.map((source) => ({
      '@type': 'CreativeWork',
      name: source.name,
      url: source.url,
    }));
  }

  return node;
}

function isVerdict(content: AnyContent): content is VerdictContent {
  return 'sources' in content && Array.isArray((content as VerdictContent).sources);
}

function isBenchmark(content: AnyContent): content is BenchmarkContent {
  return 'methodology' in content;
}

/* ------------------------------------------------------------------ */
/* Graph composition                                                   */
/* ------------------------------------------------------------------ */

/**
 * Builds the full JSON-LD graph for a content page: Article (or Review),
 * BreadcrumbList, FAQPage, plus ItemList / Dataset where the content
 * declares them. Stacking these on comparison and listicle pages is a
 * hard requirement of the experiment (§6) — see CLAUDE.md before removing.
 */
export function buildContentSchema(
  content: AnyContent,
  trail: { name: string; path: string }[],
): JsonLdNode {
  const nodes: JsonLdNode[] = [
    articleSchema(content, trail),
    breadcrumbSchema(trail),
  ];

  const faq = faqSchema(content.faqs);
  if (faq) nodes.push(faq);

  if (content.schema.itemList?.length) {
    const list = itemListSchema(content.schema.itemList, content.hero.headline);
    if (list) nodes.push(list);
  }

  if (isBenchmark(content)) {
    nodes.push(datasetSchema(content));
  }

  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Homepage / hub graph: WebSite + Organization + optional ItemList. */
export function buildSiteSchema(options?: {
  itemList?: { name: string; description?: string; url?: string }[];
  listName?: string;
  trail?: { name: string; path: string }[];
}): JsonLdNode {
  const nodes: JsonLdNode[] = [
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      url: site.url,
      description: site.description,
      publisher,
      inLanguage: 'en-US',
    },
    { ...publisher, description: site.description },
  ];

  if (options?.trail?.length) {
    nodes.push(breadcrumbSchema(options.trail));
  }

  if (options?.itemList?.length) {
    const list = itemListSchema(options.itemList, options.listName ?? site.name);
    if (list) nodes.push(list);
  }

  return { '@context': 'https://schema.org', '@graph': nodes };
}

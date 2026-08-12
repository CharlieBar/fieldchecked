import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/primitives';
import { ContentCard, HubHeader } from '@/components/listing';
import { JsonLd } from '@/components/JsonLd';
import { collections } from '@/content';
import { site } from '@/content/global/site';
import { hubs, type HubKey } from '@/lib/content';
import { buildSiteSchema } from '@/lib/schema';
import { absoluteUrl } from '@/lib/schema';

/**
 * Shared hub template. Every hub renders the same way; per-hub copy lives in
 * src/lib/content.ts, and the route files stay two lines long.
 */
export function HubPage({
  hubKey,
  children,
}: {
  hubKey: HubKey;
  children?: React.ReactNode;
}) {
  const hub = hubs[hubKey];
  const items = collections[hubKey];
  const trail = [
    { name: 'Home', path: '/' },
    { name: hub.name, path: hub.path },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <JsonLd
        data={buildSiteSchema({
          trail,
          listName: hub.headline,
          itemList: items.map((item) => ({
            name: item.hero.headline,
            description: item.seo.description,
            url: item.seo.canonical,
          })),
        })}
      />

      <Breadcrumbs trail={trail} />
      <div className="mt-6">
        <HubHeader
          eyebrow={hub.eyebrow}
          headline={hub.headline}
          intro={hub.intro}
          count={items.length}
        />
      </div>

      {children}

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ContentCard key={item.seo.canonical} content={item} label={hub.label} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-10 text-secondary">Nothing published here yet.</p>
      )}
    </div>
  );
}

export function hubMetadata(hubKey: HubKey): Metadata {
  const hub = hubs[hubKey];
  const title = hub.headline;
  const description = hub.intro;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(hub.path) },
    openGraph: {
      type: 'website',
      title,
      description,
      url: absoluteUrl(hub.path),
      siteName: site.name,
    },
  };
}

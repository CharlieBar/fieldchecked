import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { BenchmarkTicker, ContentCard } from '@/components/listing';
import { BenchmarkTable } from '@/components/tables';
import { allBenchmarkRows, allContent, benchmarks, collections } from '@/content';
import { site } from '@/content/global/site';
import { hubs, type HubKey } from '@/lib/content';
import { buildSiteSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
  },
};

/** Map each content item back to the hub it belongs to, for card labels. */
function hubKeyFor(canonical: string): HubKey {
  const segment = canonical.split('/')[1] as HubKey;
  return segment in hubs ? segment : 'blog';
}

export default function HomePage() {
  const everything = allContent();
  const [featured, ...rest] = everything;
  const latest = rest.slice(0, 6);
  const featuredDataset = benchmarks[0];

  return (
    <>
      <JsonLd
        data={buildSiteSchema({
          listName: 'Latest from FieldChecked',
          itemList: everything.slice(0, 10).map((item) => ({
            name: item.hero.headline,
            description: item.seo.description,
            url: item.seo.canonical,
          })),
        })}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-16 text-center md:pt-24">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-primary">
            Local AI hardware, measured
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl text-hero font-bold">
            Tokens per second from a real rig, not a spec sheet
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-secondary">{site.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/benchmarks/"
              className="rounded bg-primary px-5 py-2.5 font-display text-sm font-semibold text-bg transition-opacity hover:opacity-90"
            >
              Browse the dataset
            </Link>
            <Link
              href="/guides/best-gpu-for-local-llm-inference-2026/"
              className="rounded border border-border px-5 py-2.5 font-display text-sm transition-colors hover:border-primary/60"
            >
              Which GPU should I buy?
            </Link>
          </div>
        </div>

        <BenchmarkTicker rows={allBenchmarkRows().slice(0, 12)} />
      </section>

      <div className="mx-auto max-w-6xl px-5">
        {featured && (
          <section aria-labelledby="featured" className="mt-14">
            <h2 id="featured" className="sr-only">
              Featured
            </h2>
            <ContentCard
              content={featured}
              label={hubs[hubKeyFor(featured.seo.canonical)].label}
              featured
            />
          </section>
        )}

        {featuredDataset && (
          <section aria-labelledby="featured-data" className="mt-16">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 id="featured-data" className="text-section font-bold">
                {featuredDataset.modelDisplayName} throughput
              </h2>
              <Link
                href={featuredDataset.seo.canonical}
                className="font-display text-sm text-primary hover:underline"
              >
                Full dataset →
              </Link>
            </div>
            <BenchmarkTable
              rows={featuredDataset.rows.slice(0, 5)}
              caption={`Single-stream generation throughput. Provenance is stated per row; see the [full dataset](${featuredDataset.seo.canonical}) for methodology.`}
            />
          </section>
        )}

        <section aria-labelledby="latest" className="mt-16">
          <h2 id="latest" className="text-section font-bold">
            Latest
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((item) => (
              <ContentCard
                key={item.seo.canonical}
                content={item}
                label={hubs[hubKeyFor(item.seo.canonical)].label}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="sections" className="mt-20">
          <h2 id="sections" className="text-section font-bold">
            Sections
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(hubs) as HubKey[]).map((key) => (
              <Link
                key={key}
                href={hubs[key].path}
                className="fc-rise rounded border border-border bg-surface p-5 transition-colors hover:border-primary/50"
              >
                <p className="font-display text-base font-semibold">{hubs[key].name}</p>
                <p className="mt-2 text-sm text-secondary">{hubs[key].intro}</p>
                <p className="mt-3 font-display text-xs text-secondary">
                  {collections[key].length} entries
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

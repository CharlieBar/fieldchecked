import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleShell } from '@/components/ArticleShell';
import { BenchmarkTable } from '@/components/tables';
import { benchmarks } from '@/content';
import { hubs } from '@/lib/content';
import { metadataFrom, trail } from '@/lib/seo';

/**
 * Benchmark pages are a living dataset (§4): re-running numbers and editing a
 * content file should surface without a full redeploy, so these routes carry
 * an ISR window. One hour is short enough that a same-day correction goes
 * live quickly, long enough that the pages stay effectively static.
 */
export const revalidate = 3600;

export function generateStaticParams() {
  return benchmarks.map((entry) => ({ model: entry.model }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ model: string }>;
}): Promise<Metadata> {
  const { model } = await params;
  const entry = benchmarks.find((item) => item.model === model);
  if (!entry) return {};
  return metadataFrom(entry.seo, { status: entry.status });
}

export default async function BenchmarkPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;
  const entry = benchmarks.find((item) => item.model === model);
  if (!entry) notFound();

  return (
    <ArticleShell
      content={entry}
      label={hubs.benchmarks.label}
      trail={trail(
        { name: hubs.benchmarks.name, path: hubs.benchmarks.path },
        { name: entry.modelDisplayName, path: entry.seo.canonical },
      )}
      meta={
        <>
          <span>{entry.modelDisplayName}</span>
          <span>Re-run every {entry.updateCadenceDays} days</span>
        </>
      }
      aboveBody={
        <>
          <section aria-labelledby="data" className="mt-8">
            <h2 id="data" className="text-section font-bold">
              Throughput by GPU
            </h2>
            <BenchmarkTable
              rows={[...entry.rows].sort((a, b) => b.tokensPerSec - a.tokensPerSec)}
              caption="Sorted by generation throughput, fastest first."
            />
          </section>

          <section aria-labelledby="rig" className="mt-10">
            <h2 id="rig" className="text-section font-bold">
              Test rig
            </h2>
            <dl className="mt-4 grid gap-px overflow-hidden rounded border border-border bg-border sm:grid-cols-2">
              {entry.testRig.map((item) => (
                <div key={item.label} className="bg-surface px-4 py-3">
                  <dt className="font-display text-xs uppercase tracking-wider text-secondary">
                    {item.label}
                  </dt>
                  <dd className="numeric mt-1">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="methodology" className="mt-10">
            <h2 id="methodology" className="text-section font-bold">
              Methodology
            </h2>
            <ol className="mt-4 ml-5 list-decimal space-y-2 text-text/85 marker:font-display marker:text-primary">
              {entry.methodology.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        </>
      }
    />
  );
}

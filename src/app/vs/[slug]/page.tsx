import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleShell } from '@/components/ArticleShell';
import { ComparisonTable } from '@/components/tables';
import { bySlug, comparisons } from '@/content';
import { hubs } from '@/lib/content';
import { metadataFrom, trail } from '@/lib/seo';

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = bySlug(comparisons, slug);
  if (!comparison) return {};
  return metadataFrom(comparison.seo, { status: comparison.status });
}

export default async function VsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = bySlug(comparisons, slug);
  if (!comparison) notFound();

  return (
    <ArticleShell
      content={comparison}
      label={hubs.vs.label}
      trail={trail(
        { name: hubs.vs.name, path: hubs.vs.path },
        { name: comparison.contenders.join(' vs '), path: comparison.seo.canonical },
      )}
      meta={<span>{comparison.contenders.join(' vs ')}</span>}
      aboveBody={
        <>
          {/* Comparison table above the fold — a hard format rule (§4). */}
          <section aria-labelledby="at-a-glance" className="mt-8">
            <h2 id="at-a-glance" className="text-section font-bold">
              At a glance
            </h2>
            <ComparisonTable
              columns={comparison.comparisonTable.columns}
              rows={comparison.comparisonTable.rows}
              caption="Green marks the better result in a row; amber marks the worse one."
            />
          </section>

          <section
            aria-labelledby="winner"
            className="mt-4 rounded border border-primary/40 bg-primary/5 p-5"
          >
            <h2
              id="winner"
              className="font-display text-xs uppercase tracking-widest text-primary"
            >
              Overall pick
            </h2>
            <p className="mt-2 font-display text-xl font-bold">{comparison.winner.name}</p>
            <p className="mt-2 max-w-3xl text-text/85">{comparison.winner.reason}</p>
          </section>

          <section aria-labelledby="pick-if" className="mt-10">
            <h2 id="pick-if" className="text-section font-bold">
              Which one is right for you
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {comparison.pickIf.map((pick) => (
                <li
                  key={`${pick.contender}-${pick.scenario}`}
                  className="rounded border border-border bg-surface p-4"
                >
                  <p className="font-display text-sm font-semibold text-primary">
                    Pick {pick.contender}
                  </p>
                  <p className="mt-1.5 text-sm text-text/85">{pick.scenario}</p>
                </li>
              ))}
            </ul>
          </section>
        </>
      }
    />
  );
}

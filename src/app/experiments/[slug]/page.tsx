import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleShell } from '@/components/ArticleShell';
import { bySlug, experiments } from '@/content';
import { hubs } from '@/lib/content';
import { metadataFrom, trail } from '@/lib/seo';

export function generateStaticParams() {
  return experiments.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug(experiments, slug);
  if (!entry) return {};
  return metadataFrom(entry.seo, { status: entry.status });
}

const RESULT_TONE: Record<string, string> = {
  confirmed: 'border-primary/40 text-primary',
  refuted: 'border-accent/50 text-accent',
  inconclusive: 'border-border text-secondary',
};

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = bySlug(experiments, slug);
  if (!entry) notFound();

  return (
    <ArticleShell
      content={entry}
      label={hubs.experiments.label}
      trail={trail(
        { name: hubs.experiments.name, path: hubs.experiments.path },
        { name: entry.hero.headline, path: entry.seo.canonical },
      )}
      meta={
        <span
          className={`rounded border px-1.5 py-0.5 font-display text-[10px] uppercase tracking-wider ${
            RESULT_TONE[entry.result]
          }`}
        >
          {entry.result}
        </span>
      }
      aboveBody={
        <>
          <section aria-labelledby="hypothesis" className="mt-10">
            <h2 id="hypothesis" className="text-section font-bold">
              Hypothesis
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-text/90">{entry.hypothesis}</p>
          </section>

          <section aria-labelledby="method" className="mt-10">
            <h2 id="method" className="text-section font-bold">
              Method
            </h2>
            <p className="mt-3 max-w-3xl text-text/85">{entry.method.change}</p>
            <dl className="mt-4 grid gap-px overflow-hidden rounded border border-border bg-border sm:grid-cols-2">
              <div className="bg-surface px-4 py-3">
                <dt className="font-display text-xs uppercase tracking-wider text-secondary">
                  Start
                </dt>
                <dd className="numeric mt-1">{entry.method.startDate}</dd>
              </div>
              <div className="bg-surface px-4 py-3">
                <dt className="font-display text-xs uppercase tracking-wider text-secondary">
                  End
                </dt>
                <dd className="numeric mt-1">{entry.method.endDate}</dd>
              </div>
            </dl>
            <ul className="mt-4 space-y-2 text-sm text-text/85">
              {entry.method.controls.map((control) => (
                <li key={control} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-0.5 font-display text-primary">
                    ▸
                  </span>
                  <span>{control}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      }
      belowBody={
        <>
          <section aria-labelledby="data" className="mt-16">
            <h2 id="data" className="text-section font-bold">
              Data
            </h2>
            {entry.dataPoints.length === 0 ? (
              <p className="mt-3 rounded border-l-4 border-accent bg-accent/10 px-4 py-3 text-sm text-text/85">
                No data yet. This experiment has not run, and the page stays unindexed until
                these figures come out of the analytics property named in each row.
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto rounded border border-border">
                <table className="w-full min-w-[36rem] border-collapse text-sm">
                  <thead>
                    <tr>
                      {['Metric', 'Before', 'After', 'Window', 'Source'].map((column) => (
                        <th
                          key={column}
                          scope="col"
                          className="border-b border-border bg-surface-2 px-4 py-3 text-left font-display text-xs uppercase tracking-wider text-secondary"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entry.dataPoints.map((point) => (
                      <tr key={point.metric} className="odd:bg-surface/40">
                        <th
                          scope="row"
                          className="border-b border-border px-4 py-3 text-left font-display font-medium"
                        >
                          {point.metric}
                        </th>
                        <td className="numeric border-b border-border px-4 py-3">{point.before}</td>
                        <td className="numeric border-b border-border px-4 py-3 text-primary">
                          {point.after}
                        </td>
                        <td className="numeric border-b border-border px-4 py-3">{point.window}</td>
                        <td className="border-b border-border px-4 py-3 font-display text-xs">
                          {point.source}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section aria-labelledby="caveats" className="mt-16">
            <h2 id="caveats" className="text-section font-bold">
              Caveats
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-secondary">
              One site, one operator. These are the reasons to treat the result above as
              evidence rather than proof.
            </p>
            <ul className="mt-4 space-y-2 text-text/85">
              {entry.caveats.map((caveat) => (
                <li key={caveat} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-0.5 font-display text-accent">
                    !
                  </span>
                  <span>{caveat}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      }
    />
  );
}

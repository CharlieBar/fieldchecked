import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleShell } from '@/components/ArticleShell';
import { bySlug, studioPipelines } from '@/content';
import { hubs } from '@/lib/content';
import { metadataFrom, trail } from '@/lib/seo';

export function generateStaticParams() {
  return studioPipelines.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = bySlug(studioPipelines, slug);
  if (!entry) return {};
  return metadataFrom(entry.seo, { status: entry.status });
}

export default async function StudioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = bySlug(studioPipelines, slug);
  if (!entry) notFound();

  return (
    <ArticleShell
      content={entry}
      label={hubs.studio.label}
      trail={trail(
        { name: hubs.studio.name, path: hubs.studio.path },
        { name: entry.hero.headline, path: entry.seo.canonical },
      )}
      meta={<span>{entry.samples.length} samples</span>}
      aboveBody={
        <>
          <section aria-labelledby="use-case" className="mt-10">
            <h2 id="use-case" className="text-section font-bold">
              The brief
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-text/90">{entry.useCase}</p>
          </section>

          <section aria-labelledby="pipeline" className="mt-10">
            <h2 id="pipeline" className="text-section font-bold">
              Pipeline
            </h2>
            <ol className="mt-4 space-y-4">
              {entry.pipeline.map((step, index) => (
                <li key={step.step} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded border border-primary/40 font-display text-xs text-primary"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-display font-medium">
                      {step.step}{' '}
                      <span className="text-secondary">· {step.tool}</span>
                    </p>
                    <p className="mt-1 text-sm text-text/85">{step.notes}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </>
      }
      belowBody={
        <section aria-labelledby="samples" className="mt-16">
          <h2 id="samples" className="text-section font-bold">
            Samples
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-secondary">
            Output the pipeline actually produced. A pipeline described without its output is
            a recipe, not a result.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {entry.samples.map((sample) => (
              <li key={sample.label} className="rounded border border-border bg-surface p-4">
                <p className="font-display text-sm font-semibold">{sample.label}</p>
                <p className="numeric mt-2 break-all font-display text-xs text-secondary">
                  {sample.imagePath}
                </p>
                <p className="mt-2 text-sm text-text/85">{sample.caption}</p>
              </li>
            ))}
          </ul>
        </section>
      }
    />
  );
}

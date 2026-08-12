import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleShell } from '@/components/ArticleShell';
import { builds, bySlug } from '@/content';
import { hubs } from '@/lib/content';
import { metadataFrom, trail } from '@/lib/seo';

export function generateStaticParams() {
  return builds.map((build) => ({ slug: build.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const build = bySlug(builds, slug);
  if (!build) return {};
  return metadataFrom(build.seo, { status: build.status });
}

export default async function BuildPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const build = bySlug(builds, slug);
  if (!build) notFound();

  return (
    <ArticleShell
      content={build}
      label={hubs.builds.label}
      trail={trail(
        { name: hubs.builds.name, path: hubs.builds.path },
        { name: build.hero.headline, path: build.seo.canonical },
      )}
      meta={<span>{build.artifacts.length} artifacts</span>}
      aboveBody={
        <>
          <section aria-labelledby="problem" className="mt-10">
            <h2 id="problem" className="text-section font-bold">
              The problem
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-text/90">{build.problem}</p>
          </section>

          <section aria-labelledby="stack" className="mt-10">
            <h2 id="stack" className="text-section font-bold">
              Stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {build.stack.map((item) => (
                <li
                  key={item}
                  className="rounded border border-border bg-surface px-3 py-1.5 font-display text-xs"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </>
      }
      belowBody={
        <>
          {/* The verification anchor. A build post without these is a claim. */}
          <section aria-labelledby="artifacts" className="mt-16">
            <h2 id="artifacts" className="text-section font-bold">
              Artifacts
            </h2>
            <ul className="mt-4 space-y-3">
              {build.artifacts.map((artifact) => (
                <li key={artifact.label} className="rounded border border-border bg-surface p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded border border-primary/40 px-1.5 py-0.5 font-display text-[10px] uppercase tracking-wider text-primary">
                      {artifact.type}
                    </span>
                    {artifact.url ? (
                      <a
                        href={artifact.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="font-display text-sm font-semibold text-primary hover:underline"
                      >
                        {artifact.label} ↗
                      </a>
                    ) : (
                      <span className="font-display text-sm font-semibold">{artifact.label}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-text/85">{artifact.caption}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="results" className="mt-16">
            <h2 id="results" className="text-section font-bold">
              Results
            </h2>
            <ul className="mt-4 space-y-3">
              {build.results.map((result) => (
                <li key={result.metric} className="rounded border border-border bg-surface p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="font-display text-sm font-medium">{result.metric}</p>
                    <span
                      className={`rounded border px-1.5 py-0.5 font-display text-[10px] uppercase tracking-wider ${
                        result.provenance === 'measured'
                          ? 'border-primary/40 text-primary'
                          : 'border-accent/50 text-accent'
                      }`}
                    >
                      {result.provenance}
                    </span>
                  </div>
                  <p className="numeric mt-2 text-sm text-text/85">
                    {result.before ? `${result.before} → ` : ''}
                    {result.after}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="limitations" className="mt-16">
            <h2 id="limitations" className="text-section font-bold">
              What it does not do
            </h2>
            <ul className="mt-4 space-y-2 text-text/85">
              {build.limitations.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-0.5 font-display text-accent">
                    −
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      }
    />
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArticleShell } from '@/components/ArticleShell';
import { bySlug, verdicts } from '@/content';
import { hubs, byPath } from '@/lib/content';
import { metadataFrom, trail } from '@/lib/seo';
import type { SourceRef } from '@/types/content';

export function generateStaticParams() {
  return verdicts.map((verdict) => ({ slug: verdict.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const verdict = bySlug(verdicts, slug);
  if (!verdict) return {};
  return metadataFrom(verdict.seo, { status: verdict.status });
}

const SENTIMENT: Record<SourceRef['sentiment'], { label: string; className: string }> = {
  positive: { label: 'Positive', className: 'text-primary border-primary/40' },
  negative: { label: 'Negative', className: 'text-accent border-accent/50' },
  mixed: { label: 'Mixed', className: 'text-secondary border-border' },
};

export default async function VerdictPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const verdict = bySlug(verdicts, slug);
  if (!verdict) notFound();

  const relatedReviews = verdict.relatedReviews
    .map((path) => ({ path, content: byPath(path) }))
    .filter((entry) => entry.content);

  return (
    <ArticleShell
      content={verdict}
      label={hubs.verdict.label}
      trail={trail(
        { name: hubs.verdict.name, path: hubs.verdict.path },
        { name: verdict.hero.headline, path: verdict.seo.canonical },
      )}
      meta={<span>{verdict.sources.length} sources</span>}
      aboveBody={
        <>
          {/*
            Non-negotiable on this page type: a curated synthesis must say so
            before the reader reaches any opinion, or it reads as firsthand
            testing. See CLAUDE.md.
          */}
          <p className="mt-8 rounded border-l-4 border-secondary bg-surface px-4 py-3 text-sm text-text/85">
            <span className="font-display text-xs uppercase tracking-widest text-secondary">
              Curated ·{' '}
            </span>
            {verdict.contentLabel}
          </p>

          <section aria-labelledby="themes" className="mt-10">
            <h2 id="themes" className="text-section font-bold">
              Where opinion converges
            </h2>
            <ul className="mt-4 space-y-3">
              {verdict.consensusThemes.map((theme) => (
                <li
                  key={theme.theme}
                  className="rounded border border-border bg-surface p-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="font-display text-base font-medium">{theme.theme}</p>
                    <p className="numeric shrink-0 font-display text-xs text-secondary">
                      {theme.supportingSourceCount} of {verdict.sources.length} sources
                    </p>
                  </div>
                  {theme.detail && (
                    <p className="mt-2 text-sm text-text/85">{theme.detail}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </>
      }
      belowBody={
        <>
          <section aria-labelledby="sources" className="mt-16">
            <h2 id="sources" className="text-section font-bold">
              Sources
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-secondary">
              Every source is linked. Summaries are our paraphrase of each source&rsquo;s
              position, not quotations.
            </p>
            <ul className="mt-6 space-y-4">
              {verdict.sources.map((source) => (
                <li
                  key={source.url}
                  className="rounded border border-border bg-surface p-4"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={source.url}
                      rel="noopener noreferrer nofollow"
                      target="_blank"
                      className="font-display text-sm font-semibold text-primary hover:underline"
                    >
                      {source.name} ↗
                    </a>
                    <span
                      className={`rounded border px-1.5 py-0.5 font-display text-[10px] uppercase tracking-wider ${
                        SENTIMENT[source.sentiment].className
                      }`}
                    >
                      {SENTIMENT[source.sentiment].label}
                    </span>
                    {source.accessed && (
                      <span className="font-display text-xs text-secondary">
                        read {source.accessed}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-text/85">{source.summary}</p>
                </li>
              ))}
            </ul>
          </section>

          {relatedReviews.length > 0 && (
            <section aria-labelledby="our-testing" className="mt-16">
              <h2 id="our-testing" className="text-section font-bold">
                Our own testing on this hardware
              </h2>
              <ul className="mt-4 space-y-2">
                {relatedReviews.map(({ path, content }) => (
                  <li key={path}>
                    <Link href={path} className="text-primary hover:underline">
                      {content!.hero.headline}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      }
    />
  );
}

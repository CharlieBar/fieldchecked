import Link from 'next/link';
import type { AnyContent, BenchmarkRow } from '@/types/content';
import { DraftPill, formatDate } from './primitives';

/** Card used on the homepage and every hub listing. */
export function ContentCard({
  content,
  label,
  featured = false,
}: {
  content: AnyContent;
  label: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`fc-rise group relative flex flex-col rounded border border-border bg-surface transition-colors hover:border-primary/50 ${
        featured ? 'p-6 md:p-8' : 'p-5'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-display text-[10px] uppercase tracking-widest text-primary">
          {label}
        </span>
        <DraftPill status={content.status} />
      </div>

      <h3
        className={`mt-3 font-bold ${featured ? 'text-2xl md:text-3xl' : 'text-lg'} leading-snug`}
      >
        <Link href={content.seo.canonical} className="after:absolute after:inset-0">
          {content.hero.headline}
        </Link>
      </h3>

      <p className={`mt-2.5 text-sm text-secondary ${featured ? 'md:text-base' : ''}`}>
        {content.seo.description}
      </p>

      <p className="mt-4 font-display text-xs text-secondary">
        <time dateTime={content.hero.lastUpdated}>
          Updated {formatDate(content.hero.lastUpdated)}
        </time>
      </p>
    </article>
  );
}

/** Hub page header — same shape for every collection. */
export function HubHeader({
  eyebrow,
  headline,
  intro,
  count,
}: {
  eyebrow: string;
  headline: string;
  intro: string;
  count: number;
}) {
  return (
    <header className="border-b border-border pb-10">
      <p className="font-display text-xs uppercase tracking-widest text-primary">{eyebrow}</p>
      <h1 className="mt-3 text-hero font-bold">{headline}</h1>
      <p className="mt-4 max-w-3xl text-lg text-secondary">{intro}</p>
      <p className="mt-4 font-display text-xs text-secondary">
        {count} {count === 1 ? 'entry' : 'entries'}
      </p>
    </header>
  );
}

/**
 * Homepage ticker. Real rows from the content layer rather than decorative
 * fake data — if the numbers are placeholders, they say so on the page they
 * link to. Duplicated once so the marquee loops seamlessly.
 */
export function BenchmarkTicker({ rows }: { rows: BenchmarkRow[] }) {
  if (rows.length === 0) return null;
  const track = [...rows, ...rows];

  return (
    <div
      className="relative overflow-hidden border-y border-border bg-surface/60 py-2.5"
      aria-label="Sample tokens per second measurements"
    >
      <ul className="fc-ticker-track flex w-max items-center gap-8 px-4">
        {track.map((row, index) => (
          <li
            key={index}
            aria-hidden={index >= rows.length}
            className="flex shrink-0 items-baseline gap-2 font-display text-xs"
          >
            <span className="text-secondary">{row.gpu}</span>
            <span className="text-text/60">·</span>
            <span className="text-text/80">{row.model}</span>
            <span className="numeric font-semibold text-primary">
              {row.tokensPerSec.toFixed(1)} tok/s
            </span>
            {row.status !== 'measured' && <span className="text-accent">*</span>}
          </li>
        ))}
      </ul>
      <p className="sr-only">
        Figures marked with an asterisk have not yet been verified on our own hardware.
      </p>
    </div>
  );
}

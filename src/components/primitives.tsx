import Link from 'next/link';
import { site } from '@/content/global/site';
import { inline } from '@/lib/inline';
import type { AnyContent, DataStatus, PublishStatus } from '@/types/content';

/* ------------------------------------------------------------------ */
/* Breadcrumbs                                                         */
/* ------------------------------------------------------------------ */

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-display text-xs text-secondary">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-text/70">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="hover:text-primary">
                  {crumb.name}
                </Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Status badges                                                       */
/* ------------------------------------------------------------------ */

const DATA_STATUS_COPY: Record<DataStatus, { label: string; tone: string }> = {
  measured: { label: 'Measured on our rig', tone: 'text-primary border-primary/40' },
  'pending-verification': {
    label: 'Pending verification',
    tone: 'text-accent border-accent/50',
  },
  'community-reported': {
    label: 'Community reported',
    tone: 'text-secondary border-border',
  },
  'vendor-claimed': { label: 'Vendor claimed', tone: 'text-secondary border-border' },
};

export function DataStatusTag({ status }: { status: DataStatus }) {
  const copy = DATA_STATUS_COPY[status];
  return (
    <span
      className={`inline-block whitespace-nowrap rounded border px-1.5 py-0.5 font-display text-[10px] uppercase tracking-wider ${copy.tone}`}
    >
      {copy.label}
    </span>
  );
}

/**
 * Loud, unmissable banner on anything not yet cleared at Checkpoint 2.
 * Draft pages are also noindex — see src/lib/seo.ts and CLAUDE.md.
 */
export function DraftBanner({ status }: { status: PublishStatus }) {
  if (status === 'published') return null;
  return (
    <aside
      role="note"
      className="mb-8 rounded border-l-4 border-accent bg-accent/10 px-4 py-3 text-sm"
    >
      <p className="font-display text-xs uppercase tracking-widest text-accent">
        Draft — not fact-checked
      </p>
      <p className="mt-1.5 text-text/85">{site.dataDisclosure}</p>
    </aside>
  );
}

export function DraftPill({ status }: { status: PublishStatus }) {
  if (status === 'published') return null;
  return (
    <span className="rounded border border-accent/50 px-1.5 py-0.5 font-display text-[10px] uppercase tracking-wider text-accent">
      Draft
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Quick answer — the AEO/GEO extraction target                        */
/* ------------------------------------------------------------------ */

export function QuickAnswer({ text }: { text: string }) {
  return (
    <section
      aria-labelledby="quick-answer"
      className="rounded border border-border bg-surface p-5 md:p-6"
    >
      <h2
        id="quick-answer"
        className="font-display text-xs uppercase tracking-widest text-primary"
      >
        Short answer
      </h2>
      <p className="mt-3 text-[1.05rem] leading-relaxed text-text/90">{inline(text)}</p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export function Faqs({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (faqs.length === 0) return null;
  return (
    <section aria-labelledby="faqs" className="mt-16">
      <h2 id="faqs" className="text-section font-bold">
        Frequently asked questions
      </h2>
      <div className="mt-6 divide-y divide-border border-y border-border">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-base font-medium">
              <span>{faq.question}</span>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-primary transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 max-w-3xl text-text/85">{inline(faq.answer)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Related links                                                       */
/* ------------------------------------------------------------------ */

export function RelatedLinks({
  paths,
  heading = 'Related on FieldChecked',
  lookup,
}: {
  paths: string[];
  heading?: string;
  lookup: (path: string) => AnyContent | undefined;
}) {
  const resolved = paths
    .map((path) => ({ path, content: lookup(path) }))
    .filter((entry): entry is { path: string; content: AnyContent } => Boolean(entry.content));

  if (resolved.length === 0) return null;

  return (
    <section aria-labelledby="related" className="mt-16">
      <h2 id="related" className="text-section font-bold">
        {heading}
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {resolved.map(({ path, content }) => (
          <li key={path}>
            <Link
              href={path}
              className="block h-full rounded border border-border bg-surface p-4 transition-colors hover:border-primary/50"
            >
              <span className="font-display text-sm font-medium">{content.hero.headline}</span>
              <span className="mt-1.5 block text-sm text-secondary">
                {content.seo.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page shell                                                          */
/* ------------------------------------------------------------------ */

export function ArticleHeader({
  eyebrow,
  headline,
  subheadline,
  lastUpdated,
  meta,
}: {
  eyebrow: string;
  headline: string;
  subheadline: string;
  lastUpdated: string;
  meta?: React.ReactNode;
}) {
  return (
    <header className="mt-6">
      <p className="font-display text-xs uppercase tracking-widest text-primary">{eyebrow}</p>
      <h1 className="mt-3 text-hero font-bold">{headline}</h1>
      <p className="mt-4 max-w-3xl text-lg text-secondary">{subheadline}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-xs text-secondary">
        <time dateTime={lastUpdated}>Updated {formatDate(lastUpdated)}</time>
        {meta}
      </div>
    </header>
  );
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

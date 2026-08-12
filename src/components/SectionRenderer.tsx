import { inline } from '@/lib/inline';
import type { CalloutSection, Section } from '@/types/content';
import { BenchmarkTable, ComparisonTable } from './tables';

const CALLOUT_TONE: Record<CalloutSection['tone'], string> = {
  info: 'border-secondary/50 bg-surface',
  warn: 'border-accent bg-accent/10',
  win: 'border-primary bg-primary/10',
};

/**
 * Renders the body-section union from src/types/content.ts.
 *
 * This is the design layer: changing how a section *looks* happens here.
 * Changing what sections *exist* is a content-contract change and touches
 * src/types/content.ts, which a visual redesign must not do.
 */
export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <div className="prose-fc mt-12 max-w-none">
      {sections.map((section, index) => (
        <SectionBlock key={index} section={section} />
      ))}
    </div>
  );
}

function SectionBlock({ section }: { section: Section }) {
  switch (section.type) {
    case 'prose':
      return (
        <section className="fc-rise mt-10 first:mt-0">
          {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
          <div className="max-w-3xl">
            {section.body.map((paragraph, index) => (
              <p key={index}>{inline(paragraph)}</p>
            ))}
          </div>
        </section>
      );

    case 'list':
      return (
        <section className="fc-rise mt-10 first:mt-0">
          {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
          {section.style === 'ordered' ? (
            <ol className="ml-5 max-w-3xl list-decimal space-y-2 text-text/85 marker:font-display marker:text-primary">
              {section.items.map((item, index) => (
                <li key={index}>{inline(item)}</li>
              ))}
            </ol>
          ) : (
            <ul className="ml-5 max-w-3xl list-disc space-y-2 text-text/85 marker:text-primary">
              {section.items.map((item, index) => (
                <li key={index}>{inline(item)}</li>
              ))}
            </ul>
          )}
        </section>
      );

    case 'steps':
      return (
        <section className="fc-rise mt-10 first:mt-0">
          {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
          <ol className="max-w-3xl space-y-5">
            {section.steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded border border-primary/40 font-display text-xs text-primary"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-display font-medium text-text">{step.title}</p>
                  <p className="mt-1 text-text/85">{inline(step.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );

    case 'callout':
      return (
        <aside
          className={`fc-rise my-10 rounded border-l-4 px-5 py-4 ${CALLOUT_TONE[section.tone]}`}
        >
          <p className="font-display text-sm font-semibold">{section.heading}</p>
          <p className="mt-1.5 max-w-3xl text-sm text-text/85">{inline(section.body)}</p>
        </aside>
      );

    case 'specs':
      return (
        <section className="fc-rise mt-10 first:mt-0">
          {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
          <dl className="grid gap-px overflow-hidden rounded border border-border bg-border sm:grid-cols-2">
            {section.items.map((item) => (
              <div key={item.label} className="bg-surface px-4 py-3">
                <dt className="font-display text-xs uppercase tracking-wider text-secondary">
                  {item.label}
                </dt>
                <dd className="numeric mt-1 text-text">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case 'table':
      return (
        <section className="fc-rise mt-10 first:mt-0">
          {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
          <ComparisonTable
            columns={section.columns}
            rows={section.rows}
            caption={section.caption}
          />
        </section>
      );

    case 'benchmark':
      return (
        <section className="fc-rise mt-10 first:mt-0">
          {section.heading && <SectionHeading>{section.heading}</SectionHeading>}
          <BenchmarkTable rows={section.rows} caption={section.note} />
        </section>
      );

    case 'quote':
      return (
        <figure className="fc-rise my-10 max-w-3xl border-l-2 border-primary/50 pl-5">
          <blockquote className="text-lg italic text-text/90">{inline(section.text)}</blockquote>
          <figcaption className="mt-2 font-display text-xs text-secondary">
            {section.url ? (
              <a
                href={section.url}
                rel="noopener noreferrer nofollow"
                target="_blank"
                className="hover:text-primary"
              >
                {section.attribution}
              </a>
            ) : (
              section.attribution
            )}
          </figcaption>
        </figure>
      );
  }
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-section font-bold">{children}</h2>;
}

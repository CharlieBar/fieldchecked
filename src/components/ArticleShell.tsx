import { JsonLd } from '@/components/JsonLd';
import { SectionRenderer } from '@/components/SectionRenderer';
import {
  ArticleHeader,
  Breadcrumbs,
  DraftBanner,
  Faqs,
  QuickAnswer,
  RelatedLinks,
} from '@/components/primitives';
import { byPath } from '@/lib/content';
import { buildContentSchema } from '@/lib/schema';
import type { AnyContent } from '@/types/content';

/**
 * Common article scaffold: breadcrumbs → draft banner → header → quick answer
 * → (slot) → body sections → (slot) → FAQs → related.
 *
 * The quick-answer block sits in the first screen on every page type, and the
 * FAQ block is never conditional. Both are measured variables in this
 * experiment — see EXPERIMENT-LOG.md before changing their placement.
 */
export function ArticleShell({
  content,
  trail,
  label,
  meta,
  aboveBody,
  belowBody,
}: {
  content: AnyContent;
  trail: { name: string; path: string }[];
  label: string;
  meta?: React.ReactNode;
  aboveBody?: React.ReactNode;
  belowBody?: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-4xl px-5 py-10">
      <JsonLd data={buildContentSchema(content, trail)} />

      <Breadcrumbs trail={trail} />
      <div className="mt-6">
        <DraftBanner status={content.status} />
      </div>

      <ArticleHeader
        eyebrow={label}
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        lastUpdated={content.hero.lastUpdated}
        meta={meta}
      />

      <div className="mt-10">
        <QuickAnswer text={content.quickAnswer} />
      </div>

      {aboveBody}

      <SectionRenderer sections={content.sections} />

      {belowBody}

      <Faqs faqs={content.faqs} />

      {content.related && content.related.length > 0 && (
        <RelatedLinks paths={content.related} lookup={byPath} />
      )}
    </article>
  );
}

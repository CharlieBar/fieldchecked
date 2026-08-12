import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleShell } from '@/components/ArticleShell';
import { ComparisonTable } from '@/components/tables';
import { bySlug, guides } from '@/content';
import { hubs } from '@/lib/content';
import { metadataFrom, trail } from '@/lib/seo';

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = bySlug(guides, slug);
  if (!guide) return {};
  return metadataFrom(guide.seo, { status: guide.status });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = bySlug(guides, slug);
  if (!guide) notFound();

  return (
    <ArticleShell
      content={guide}
      label={hubs.guides.label}
      trail={trail(
        { name: hubs.guides.name, path: hubs.guides.path },
        { name: guide.hero.headline, path: guide.seo.canonical },
      )}
      meta={
        <>
          <span className="capitalize">{guide.difficulty}</span>
          <span>{guide.timeEstimate}</span>
        </>
      }
      aboveBody={
        <>
          {guide.comparisonTable && (
            <section aria-labelledby="at-a-glance" className="mt-8">
              <h2 id="at-a-glance" className="text-section font-bold">
                At a glance
              </h2>
              <ComparisonTable
                columns={guide.comparisonTable.columns}
                rows={guide.comparisonTable.rows}
              />
            </section>
          )}

          <section aria-labelledby="requirements" className="mt-10">
            <h2 id="requirements" className="text-section font-bold">
              Before you start
            </h2>
            <ul className="mt-4 space-y-2 text-text/85">
              {guide.requirements.map((requirement) => (
                <li key={requirement} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-0.5 font-display text-primary">
                    ▸
                  </span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      }
    />
  );
}

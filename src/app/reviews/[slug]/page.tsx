import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleShell } from '@/components/ArticleShell';
import { BenchmarkTable } from '@/components/tables';
import { bySlug, reviews } from '@/content';
import { hubs } from '@/lib/content';
import { metadataFrom, trail } from '@/lib/seo';

export function generateStaticParams() {
  return reviews.map((review) => ({ slug: review.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const review = bySlug(reviews, slug);
  if (!review) return {};
  return metadataFrom(review.seo, { status: review.status });
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = bySlug(reviews, slug);
  if (!review) notFound();

  return (
    <ArticleShell
      content={review}
      label={hubs.reviews.label}
      trail={trail(
        { name: hubs.reviews.name, path: hubs.reviews.path },
        { name: review.product, path: review.seo.canonical },
      )}
      meta={
        <>
          <span>{review.product}</span>
          <span className="numeric text-primary">
            {review.rating.value}/{review.rating.best}
          </span>
        </>
      }
      aboveBody={
        <>
          <section aria-labelledby="verdict" className="mt-10">
            <h2 id="verdict" className="text-section font-bold">
              Verdict
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-text/90">{review.verdict}</p>
          </section>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <ProsCons title="What it does well" items={review.pros} tone="pro" />
            <ProsCons title="Where it falls short" items={review.cons} tone="con" />
          </div>

          <section aria-labelledby="specs" className="mt-10">
            <h2 id="specs" className="text-section font-bold">
              Specifications
            </h2>
            <dl className="mt-4 grid gap-px overflow-hidden rounded border border-border bg-border sm:grid-cols-2">
              {review.specs.map((spec) => (
                <div key={spec.label} className="bg-surface px-4 py-3">
                  <dt className="font-display text-xs uppercase tracking-wider text-secondary">
                    {spec.label}
                  </dt>
                  <dd className="numeric mt-1">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="throughput" className="mt-10">
            <h2 id="throughput" className="text-section font-bold">
              Measured throughput
            </h2>
            <BenchmarkTable
              rows={review.benchmarks}
              showGpu={false}
              caption="Single-stream generation, batch size 1, no speculative decoding."
            />
          </section>
        </>
      }
    />
  );
}

function ProsCons({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: 'pro' | 'con';
}) {
  const accent = tone === 'pro' ? 'text-primary' : 'text-accent';
  return (
    <section className="rounded border border-border bg-surface p-5">
      <h3 className="font-display text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-text/85">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden="true" className={`mt-0.5 font-display ${accent}`}>
              {tone === 'pro' ? '+' : '−'}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

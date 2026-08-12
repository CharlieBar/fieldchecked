import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { SectionRenderer } from '@/components/SectionRenderer';
import { Breadcrumbs, Faqs } from '@/components/primitives';
import { aboutPage } from '@/content/global/pages';
import { site } from '@/content/global/site';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { metadataFrom, trail } from '@/lib/seo';

export const metadata: Metadata = metadataFrom(aboutPage.seo, { type: 'website' });

export default function AboutPage() {
  const crumbs = trail({ name: 'About', path: '/about/' });
  const faq = faqSchema(aboutPage.faqs ?? []);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'AboutPage',
              name: aboutPage.seo.title,
              description: aboutPage.seo.description,
              url: `${site.url}/about/`,
            },
            breadcrumbSchema(crumbs),
            ...(faq ? [faq] : []),
          ],
        }}
      />

      <Breadcrumbs trail={crumbs} />
      <h1 className="mt-6 text-hero font-bold">{aboutPage.heading}</h1>
      <p className="mt-4 max-w-3xl text-lg text-secondary">{aboutPage.intro}</p>

      {/*
        The GPU list is rendered from site.hardwareInventory rather than written
        into the About copy, so the page a reader checks and the list the
        validator enforces cannot drift apart.
      */}
      <section aria-labelledby="hardware" className="mt-12">
        <h2 id="hardware" className="text-section font-bold">
          GPUs available for testing
        </h2>
        <ul className="mt-4 grid gap-px overflow-hidden rounded border border-border bg-border sm:grid-cols-3">
          {site.hardwareInventory.map((unit) => (
            <li key={unit.label} className="bg-surface px-4 py-4">
              <p className="numeric font-display text-base font-semibold text-text">
                {unit.label}
              </p>
              <p className="numeric mt-1 font-display text-xs text-primary">
                {unit.vramGb} GB VRAM
              </p>
              <p className="mt-2 text-sm text-secondary">{unit.role}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Anchor target for the footer "Methodology" link. */}
      <div id="methodology" className="scroll-mt-24">
        <SectionRenderer sections={aboutPage.sections} />
      </div>

      <Faqs faqs={aboutPage.faqs ?? []} />
    </div>
  );
}

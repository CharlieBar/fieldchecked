import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { SectionRenderer } from '@/components/SectionRenderer';
import { Breadcrumbs } from '@/components/primitives';
import { contactPage } from '@/content/global/pages';
import { site } from '@/content/global/site';
import { breadcrumbSchema } from '@/lib/schema';
import { metadataFrom, trail } from '@/lib/seo';

export const metadata: Metadata = metadataFrom(contactPage.seo, { type: 'website' });

export default function ContactPage() {
  const crumbs = trail({ name: 'Contact', path: '/contact/' });

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ContactPage',
              name: contactPage.seo.title,
              description: contactPage.seo.description,
              url: `${site.url}/contact/`,
            },
            breadcrumbSchema(crumbs),
          ],
        }}
      />

      <Breadcrumbs trail={crumbs} />
      <h1 className="mt-6 text-hero font-bold">{contactPage.heading}</h1>
      <p className="mt-4 max-w-3xl text-lg text-secondary">{contactPage.intro}</p>

      <p className="mt-8">
        <a
          href={`mailto:${site.contactEmail}`}
          className="inline-block rounded bg-primary px-5 py-2.5 font-display text-sm font-semibold text-bg transition-opacity hover:opacity-90"
        >
          {site.contactEmail}
        </a>
      </p>

      <SectionRenderer sections={contactPage.sections} />
    </div>
  );
}

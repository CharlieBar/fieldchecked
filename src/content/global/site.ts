import type { SiteConfig } from '@/types/content';

/**
 * Global site content. Brand name lives here and nowhere else — swapping it
 * is a one-file change (§2 of the brief).
 */
export const site: SiteConfig = {
  name: 'FieldChecked',
  shortName: 'FieldChecked',
  tagline: 'Local AI hardware, measured not guessed.',
  description:
    'Benchmark-driven reviews, comparisons and tokens/sec data for people building local AI rigs. Real numbers from real hardware, plus honest roundups of what the community actually reports.',
  url: 'https://fieldchecked.com',
  locale: 'en_US',
  titleTemplate: '%s | FieldChecked',
  nav: [
    { label: 'Reviews', href: '/reviews/' },
    { label: 'Vs', href: '/vs/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'Benchmarks', href: '/benchmarks/' },
    { label: 'Verdict', href: '/verdict/' },
    { label: 'Blog', href: '/blog/' },
  ],
  footer: {
    blurb:
      'FieldChecked publishes tokens/sec measurements from a working local AI rig, comparison data for GPU buying decisions, and clearly-labelled roundups of community consensus. Every number carries its provenance.',
    columns: [
      {
        heading: 'Data',
        links: [
          { label: 'Benchmarks', href: '/benchmarks/' },
          { label: 'Reviews', href: '/reviews/' },
          { label: 'Comparisons', href: '/vs/' },
        ],
      },
      {
        heading: 'Learn',
        links: [
          { label: 'Guides', href: '/guides/' },
          { label: 'Curated verdicts', href: '/verdict/' },
          { label: 'Blog', href: '/blog/' },
        ],
      },
      {
        heading: 'Site',
        links: [
          { label: 'About', href: '/about/' },
          { label: 'Contact', href: '/contact/' },
          { label: 'Methodology', href: '/about/#methodology' },
        ],
      },
    ],
    legal:
      'Benchmark figures are specific to the hardware, drivers and runtime versions listed on each page. Your numbers will differ.',
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/charliebar/fieldchecked', external: true },
  ],
  author: {
    name: 'FieldChecked',
    bio: 'A one-rig publication: an RTX 4080 workstation with a multi-GPU build in progress. Every measured number on this site was produced on hardware we own.',
    url: 'https://fieldchecked.com/about/',
  },
  dataDisclosure:
    'Numbers on this page have not yet been reproduced on our rig. They are placeholders pending verification and should not be cited as measurements.',
  contactEmail: 'hello@fieldchecked.com',
};

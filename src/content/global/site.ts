import type { SiteConfig } from '@/types/content';

/**
 * Global site content — the single source of truth for the brand name and the
 * canonical origin.
 *
 * Every absolute URL on the site is derived from `BRAND.origin`: canonicals,
 * the JSON-LD publisher and @id values, the sitemap, and robots.txt. Nothing
 * else in the repo hardcodes the domain or the brand name; `npm run qa:content`
 * fails the build if that stops being true.
 *
 * The Netlify subdomain below is TEMPORARY. When a custom domain is attached,
 * changing `BRAND.origin` here is the only edit required — see CLAUDE.md.
 */
const BRAND = {
  name: 'FieldChecked',
  origin: 'https://fieldchecked.netlify.app',
} as const;

export const site: SiteConfig = {
  name: BRAND.name,
  shortName: BRAND.name,
  tagline: 'Local AI hardware, measured not guessed.',
  description:
    'Benchmark-driven reviews, comparisons and tokens/sec data for people building local AI rigs. Real numbers from real hardware, plus honest roundups of what the community actually reports.',
  url: BRAND.origin,
  locale: 'en_US',
  titleTemplate: `%s | ${BRAND.name}`,
  nav: [
    { label: 'Reviews', href: '/reviews/' },
    { label: 'Vs', href: '/vs/' },
    { label: 'Guides', href: '/guides/' },
    { label: 'Benchmarks', href: '/benchmarks/' },
    { label: 'Verdict', href: '/verdict/' },
    { label: 'Builds', href: '/builds/' },
    { label: 'Studio', href: '/studio/' },
    { label: 'Experiments', href: '/experiments/' },
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
        heading: 'Tooling',
        links: [
          { label: 'Builds', href: '/builds/' },
          { label: 'Studio', href: '/studio/' },
          { label: 'Experiments', href: '/experiments/' },
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
    name: BRAND.name,
    bio: 'A one-rig publication: an RTX 4080 workstation with a multi-GPU build in progress. Every measured number on this site was produced on hardware we own.',
    url: `${BRAND.origin}/about/`,
  },
  dataDisclosure:
    'Numbers on this page have not yet been reproduced on our rig. They are placeholders pending verification and should not be cited as measurements.',
  // Not derived from BRAND.origin on purpose: a Netlify subdomain cannot host
  // mail, so the contact address needs a real mail domain regardless of where
  // the site is served from. Confirm this mailbox exists before launch.
  contactEmail: 'hello@fieldchecked.com',

  /**
   * The hardware record. This is the list /about/ renders and the list the
   * validator checks every `pending-verification` row against — a row naming a
   * GPU that is not here fails the build. Adding a card to the rig means adding
   * it here first; that is the whole point.
   *
   * The three cards form a deliberate ladder — 8GB, then two 16GB cards at
   * different bandwidth — which is the buying decision most readers are
   * actually making.
   */
  hardwareInventory: [
    {
      label: 'RTX 4060 8GB',
      vramGb: 8,
      role: 'Budget tier — where the 8GB capacity cliff shows up',
    },
    {
      label: 'RTX 4070 Ti Super 16GB',
      vramGb: 16,
      role: 'Mid tier — the cheapest card here that holds a 14B model comfortably',
    },
    {
      label: 'RTX 4080 Super 16GB',
      vramGb: 16,
      role: 'Upper-mid tier — same capacity as the 4070 Ti Super, more bandwidth',
    },
  ],
};

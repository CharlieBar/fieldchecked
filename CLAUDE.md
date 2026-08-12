# CLAUDE.md — FieldChecked

An experimental publication about local AI hardware, and a testbed for SEO/GEO/AEO
mechanics and an automated-but-human-checkpointed publishing pipeline.

## The rule that governs everything else

**Content and design are separate layers, and a change to one must not touch the other.**

| Layer | Lives in | Who may change it |
|---|---|---|
| Content | `src/content/`, `src/types/content.ts` | Content work and the pipeline |
| Design | `src/app/`, `src/components/`, `globals.css` | Redesign work |

A visual redesign may rewrite every component and every line of CSS. It must not
edit a single file under `src/content/` or `src/types/content.ts`. If a redesign
seems to need a content-shape change, that is a content-contract decision — raise
it rather than editing the types to fit a layout.

The reverse holds too: a content file never contains markup, class names, or
layout decisions. It exports data; components decide how data looks.

## Repo map

```
src/
  types/content.ts        The content contract. Read this first.
  content/
    global/site.ts        Brand name, nav, footer, disclosure. Brand lives HERE only.
    global/pages.ts       About and contact copy.
    reviews|vs|guides|benchmarks|verdict|blog/    One file per page.
    index.ts              Static registry. New content is registered here.
  lib/
    schema.ts             JSON-LD graph builder (Article/Review, Breadcrumb, FAQ,
                          ItemList, Dataset).
    seo.ts                generateMetadata() helper. Forces noindex on drafts.
    content.ts            Hub descriptors and internal-link resolution.
  components/             Design layer. Redesigns live here.
  app/                    Routes. Pages import from content/, never define copy.
scripts/                  Pipeline (scout/draft/seo-qa/log) + content validator.
EXPERIMENT-LOG.md         One entry per change. The reason the site exists.
```

## Non-negotiables

These are the variables the experiment measures. Removing one does not just
change the site — it destroys the ability to interpret the data collected so far.
If one must go, log the removal in `EXPERIMENT-LOG.md` first.

1. **Every page carries a quick-answer block in the first screen.** 100–150 words,
   written to survive being lifted out of the page.
2. **Every page carries at least 8 FAQs**, phrased as real queries.
3. **JSON-LD is stacked, not minimal.** Article (or Review) + BreadcrumbList +
   FAQPage on every content page; ItemList additionally on `/vs/` and listicle
   guides; Dataset additionally on `/benchmarks/`.
4. **Canonical on every page**, self-referencing unless deliberately a variant.
5. **`generateMetadata()` reads from content files.** No page hardcodes a title,
   description or keyword list in a component.
6. **Comparison tables sit above the fold** on `/vs/` pages.

`npm run qa:content` enforces the mechanical parts of this. It runs in CI.

## Data integrity rules

The site's only real asset is that its numbers can be trusted. These rules are
stricter than the SEO rules and are not negotiable at all.

- **Every numeric row carries a provenance status**: `measured`,
  `pending-verification`, `community-reported`, or `vendor-claimed`.
- **Only a human may mark something `measured`,** and only after reproducing it on
  the rig. No script and no model sets that value.
- **A page with any `pending-verification` row may not be `published`.** Draft
  pages render with a visible banner, are forced `noindex`, and are excluded from
  the sitemap. The validator fails the build if this is violated.
- **`/verdict/` pages are curated synthesis and must say so on the page.** They
  need 3+ genuinely independent sources, every one a deep link to the specific
  thread — a subreddit landing page is not a source. Paraphrase; never fabricate a
  source, a URL, or a consensus. The validator enforces the deep-link rule on
  published verdict pages.
- **Never present a curated verdict as firsthand testing**, and never let our own
  benchmark data and community reports blur together on the same page. The URL
  split (`/benchmarks/` vs `/verdict/`) exists to keep them apart.

## Working on content

Adding a page is two steps: create the file under the right pillar, register it in
`src/content/index.ts`. Then `npm run qa`.

New content ships as `status: 'draft'` and is promoted to `'published'` only at
Checkpoint 3, after its numbers have been verified.

## Working on design

Start at `src/app/globals.css` — the Terminal Noir tokens are all defined in the
`@theme` block. `src/components/SectionRenderer.tsx` decides how each body-section
type renders; that is where most visual work happens.

Rules of thumb: dense over airy (this audience wants data), monospace numerals in
anything comparative, colour-code deltas green/amber, and keep the JS budget near
zero — no client-heavy hero.

## The pipeline

`npm run pipeline:scout` → **Checkpoint 1** → `npm run pipeline:draft` →
**Checkpoint 2** → `npm run pipeline:seo` → **Checkpoint 3** → merge → deploy.

Checkpoint 2 is the fact-check gate and the one most likely to catch real errors.
Log what each checkpoint caught (`npm run pipeline:log`) — the record of which
checkpoints catch things and which rubber-stamp is a primary output of this
experiment, and it is what decides which ones are safe to loosen on the
production business sites later.

## Deviations from the original brief

Recorded here so they are decisions rather than drift:

- **Blog posts are typed `.ts`, not `.mdx`.** One content contract for all six
  pillars means the pipeline, the validator, and the schema builder have a single
  code path. MDX would have given blog posts a second rendering path and put
  their `seo`/`faqs`/`schema` exports outside the validator's reach.
- **Sitemap and robots use the native App Router routes, not `next-sitemap`.**
  Generating from the typed registry means draft pages are excluded structurally
  rather than by an exclusion list somebody has to remember to update.
- **Fonts are self-hosted** via `@fontsource-variable` rather than `next/font/google`
  — no third-party request on first paint, and the build has no network dependency.

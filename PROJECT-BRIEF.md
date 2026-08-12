# FieldChecked — Project Brief

> **Naming note.** This project was scoped under the working name **Tokens/Sec**.
> The brand is now **FieldChecked** and that is the only name used anywhere in
> this repo. If you find a "Tokens/Sec" reference in any document, it is stale —
> fix it. (The phrase *tokens per second* still appears throughout as the name of
> the metric; that is correct and unrelated to the brand.)

**Purpose:** an experimental publication used to test SEO / GEO / AEO mechanics,
Search Console behaviour, and an automated-but-human-checkpointed publishing
pipeline, before applying the learnings to production business sites.

**Stack:** Next.js 15 (App Router) + Tailwind CSS 4 → GitHub → Netlify
**Niche:** local AI hardware and tooling (GPUs, local inference, benchmarks)
**Canonical origin:** `https://fieldchecked.netlify.app` — temporary; see
"Domain" below.

---

## 1. Concept and positioning

A hands-on, benchmark-driven publication for people building local AI rigs: GPU
selection, local inference performance, and honest tokens/sec numbers from real
hardware. Non-YMYL, low-competition long-tail, and matched to a real working
setup so content can genuinely be fact-checked at each human checkpoint rather
than trusting model output.

The site's only durable asset is that its numbers can be trusted. Every
integrity rule in `CLAUDE.md` follows from that.

## 2. Domain

`https://fieldchecked.netlify.app`. No custom domain yet.

The origin and the brand name both live in one `BRAND` constant in
`src/content/global/site.ts`, and every absolute URL derives from it. Attaching a
custom domain is a one-line change there. A CI guard fails the build if either
value is duplicated anywhere else in the repo.

## 3. Information architecture

```
/                          Homepage (latest + featured benchmark)
/reviews/[slug]            GPU and hardware reviews
/vs/[slug]                 Comparison listicles
/guides/[slug]             Setup and build guides
/benchmarks/[model]        Tokens/sec data, living dataset
/verdict/[slug]            Curated multi-source opinion roundups
/blog/[slug]               News and explainers
/about, /contact
```

Hub pages give topical clustering. `/benchmarks/` is the durable linkable asset —
data pages attract citations more readily than opinion pages. `/verdict/` is a
separate URL pattern specifically so curated community opinion can never be
mistaken for our own firsthand measurement, and so the two content types can be
compared inside one Search Console property.

## 4. Content strategy

**Pillars:** hardware reviews · comparison listicles · setup and build guides ·
curated verdict roundups · benchmarks as data · tool comparisons · news
explainers.

**Format rules** (these are the variables the experiment measures — see the
non-negotiables in `CLAUDE.md`):

- Quick-answer block in the first screen of every page, 100–150 words, written to
  survive being lifted out of the page.
- 8+ FAQs per page, phrased as queries people actually type.
- Stacked JSON-LD: Article/Review + BreadcrumbList + FAQPage everywhere;
  ItemList on comparisons and listicles; Dataset on `/benchmarks/`.
- Comparison table above the fold on `/vs/`.
- Freshness cadence: benchmark and comparison pages revisited every 7–14 days.
- Treat vendor claims about citation sources as hypotheses to test here, not as
  settled fact. That is what this site is for.

**Cadence:** 2–3 posts per week, fixed, for the first 4–6 weeks to establish a
clean baseline before velocity becomes a test variable. Publishing is capped at
3 pages per release and enforced in CI — see the release procedure in
`CLAUDE.md`.

## 5. Design

**Terminal Noir** — dark, technical, benchmark-native. Dense over airy, monospace
numerals in anything comparative, colour-coded deltas, near-zero JS budget.
Tokens are defined in the `@theme` block of `src/app/globals.css`.

## 6. Technical SEO

`generateMetadata()` per page reading from content files; sitemap and robots
generated from the typed content registry so drafts are excluded structurally;
self-referencing canonicals; ISR on benchmark routes so freshness updates ship
without a redeploy; self-hosted fonts; no client-heavy hero.

## 7. Content/design separation

Content lives in `src/content/`, typed by `src/types/content.ts`. Design lives in
`src/app/` and `src/components/`. A redesign may rewrite every component and must
not touch a single content file; content files never contain markup. This is the
rule that lets the site be redesigned repeatedly without rewriting copy, and it
is stated in full at the top of `CLAUDE.md`.

## 8. Automation workflow

```
Haiku  → scout topics      → Checkpoint 1: approve topic, angle, keyword
Sonnet → draft content     → Checkpoint 2: fact-check against the rig
Opus   → SEO/schema QA     → Checkpoint 3: publish approval
                           → merge → Netlify deploy
```

Every checkpoint is logged with what it caught. The record of which checkpoints
catch real errors and which rubber-stamp is a primary output of this experiment —
it is what decides which ones are safe to loosen on the production sites later.

## 9. Experiment tracking

`EXPERIMENT-LOG.md` at repo root, one entry per change:
`Date | Change | Hypothesis | Metric to watch | Result`. It also holds the
verification queue for draft pages and the promotion log.

Wire Search Console and analytics before the first post ships — a baseline
reconstructed after the fact is not a baseline.

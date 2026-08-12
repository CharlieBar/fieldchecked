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
**Verticals:** A — local AI hardware · B — AI tooling for businesses
**Canonical origin:** `https://fieldchecked.netlify.app` — temporary; see
"Brand and domain" below.

---

## 1. Concept and positioning

**Verified AI for people who actually ship.**

Every claim on this site is field-tested firsthand — real hardware, real repos,
real client work. That single promise is the brand, the name, and the moat, and
it is enforced in the type system rather than in an editorial policy doc.

Two verticals sit under that one promise:

- **Vertical A — local AI hardware.** GPU selection, local inference
  performance, honest tokens/sec numbers from the author's own three cards
  (RTX 4080 Super, RTX 4070 Ti Super, RTX 4060).
- **Vertical B — AI tooling for real businesses.** Tools built with Claude Code
  to solve actual business problems, marketing-asset generation pipelines, and
  published results from this site's own SEO experiments.

**Why two.** Vertical A is hard-capped: three GPUs means a finite set of pages
that can ever reach `measured`, and rig time is the bottleneck. Vertical B has no
ceiling — it is a byproduct of work already being done, every claim is verifiable
firsthand with real artifacts, and it publishes continuously while hardware
content waits on verification. The unifying thread is firsthand verification, so
the two sit under one brand without dilution.

**Test-design caveat.** Two verticals on one domain makes ranking attribution
messier. Mitigated by strict URL-pattern separation and per-pattern tracking:
**never evaluate the two verticals in a single aggregate GSC number.** The
`vertical` field on every content file exists for exactly this, and the validator
checks it against the URL pattern.

The site's only durable asset is that its claims can be trusted. Every integrity
rule in `CLAUDE.md` follows from that.

## 2. Brand and domain

**FieldChecked** — locked. The name is load-bearing rather than decorative: it
states the editorial guarantee, which is why the provenance enum and the
validator rules exist. **Any feature that lets an unverified number reach a
published page is a brand bug, not a content bug.**

`https://fieldchecked.netlify.app`. No custom domain yet.

The origin and the brand name both live in one `BRAND` constant in
`src/content/global/site.ts`, and every absolute URL derives from it. Attaching a
custom domain is a one-line change there. A CI guard fails the build if either
value is duplicated anywhere else in the repo.

## 3. Information architecture

```
/                          Homepage (latest + featured benchmark)

── Vertical A: local AI hardware ──
/reviews/[slug]            GPU and hardware reviews
/vs/[slug]                 Comparison listicles
/benchmarks/[model]        Tokens/sec data, living dataset
/verdict/[slug]            Curated multi-source opinion roundups

── Vertical B: AI tooling for businesses ──
/builds/[slug]             Tools built with Claude Code, with real artifacts
/studio/[slug]             Marketing-asset generation pipelines
/experiments/[slug]        Results from this site's own SEO/GEO tests

── Both verticals, tagged per page ──
/guides/[slug]             Setup and build guides
/blog/[slug]               News and explainers

/about, /contact
```

**Vertical separation.** `/reviews/` `/vs/` `/benchmarks/` `/verdict/` are
Vertical A. `/builds/` `/studio/` `/experiments/` are Vertical B. `/guides/` and
`/blog/` serve both and carry a per-page `vertical` tag. Never mix them in a
single GSC report — per-vertical attribution is the entire reason the URL
patterns are separate.

Hub pages give topical clustering. `/benchmarks/` is the durable linkable asset —
data pages attract citations more readily than opinion pages. `/verdict/` is a
separate URL pattern specifically so curated community opinion can never be
mistaken for our own firsthand measurement, and so the two content types can be
compared inside one Search Console property.

## 4. Content strategy

### Vertical A — local AI hardware

Hardware reviews · comparison listicles · benchmarks as data · curated verdict
roundups. Gated on rig time and hard-capped by three GPUs, so it publishes in
bursts as measurement sessions clear.

Seed keyword clusters:

- **Buying intent** — "best gpu for local llm inference 2026", "rtx 4070 ti
  super vs rtx 4060", "rtx 4060 local llm"
- **Model-specific** — "qwen3 14b tokens per second", "gemma 3 27b benchmark",
  "llama 3.3 70b tokens per second"
- **Community research** — "is rtx 3090 still worth it reddit", "rtx 5080 local
  ai reddit", "strix halo local llm"

### Vertical B — AI tooling for businesses

Three pillars, each with a different job:

- **`/builds/` — the strongest pillar.** Tools built with Claude Code against a
  real business problem, shipped with the artifacts that prove it. This is the
  one that most directly demonstrates competence rather than describing it.
- **`/studio/`** — marketing-asset generation pipelines, shown as output rather
  than as method. No pipeline is described without a sample rendered from it.
- **`/experiments/` — the highest-leverage pillar for links.** Results from this
  site's own SEO/GEO tests, published including the null ones. Original data
  about search behaviour is the kind of thing other people cite, and nobody else
  can publish this particular dataset.

Seed keyword clusters: "claude code mcp server", "ai automation for small
business", "comfyui product photography", "does faq schema improve ai
citations", "ai seo experiment results".

Vertical B has no verification ceiling — its artifacts are a byproduct of work
already happening — so it carries publishing cadence while Vertical A waits on
rig time.

### Deliberately excluded

Not gaps to fill later. Each of these is excluded because it cannot be
field-checked, which makes it incompatible with the one promise the site makes:

- **Generic small-business automation how-tos.** Written from the outside, with
  no artifact behind them. Indistinguishable from the thousands already ranking.
- **Web design content.** A different audience with a different buying process;
  including it would blur what the domain is about for both.
- **SEO tool roundups and affiliate-shaped content.** Reviewing tools we have not
  run in anger is exactly the unverified-claim failure mode the site exists to
  avoid, and the commercial incentive makes it worse rather than better.

### Format rules

These are the variables the experiment measures — see the
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

**The repo pattern is one typed object per file**, exported as a single named
const and registered in `src/content/index.ts`. The schemas below are written in
that notation rather than as loose named exports, because the object is what the
validator, the schema builder and the pipeline all consume:

```ts
// src/content/builds/[slug].ts
export const build: BuildContent = {
  ...base,              // slug, seo, hero, quickAnswer, body, faqs, status, vertical: 'B'
  problem: string,      // the real business problem. Not a hypothetical.
  artifacts: BuildArtifact[],   // ≥1 to publish. type: repo|screenshot|output-sample|metric
  stack: string[],
  results: BuildResult[],       // provenance: 'measured' | 'estimated'
  limitations: string[],        // non-empty to publish. No limitations = marketing.
};

// src/content/studio/[slug].ts
export const studio: StudioContent = {
  ...base,
  useCase: string,
  pipeline: { step, tool, notes }[],
  samples: StudioSample[],      // ≥1 whose imagePath exists under /public
  beforeAfter?: { before, after, context },
};

// src/content/experiments/[slug].ts
export const experiment: ExperimentContent = {
  ...base,
  hypothesis: string,
  method: { change, startDate, endDate, controls: string[] },
  dataPoints: ExperimentDataPoint[],  // ≥1 to publish; source: GSC|GA4|Plausible|manual
  result: 'confirmed' | 'refuted' | 'inconclusive',
  caveats: string[],            // non-empty to publish
};
```

Each pillar's verification rule is enforced by `npm run qa:content`, not by
editorial habit: a published `/builds/` page needs an artifact, non-empty
limitations, and a `measured` result pointing at an artifact by label; a
published `/studio/` page needs a sample whose asset file actually exists; a
published `/experiments/` page needs a data point, a result and caveats.
`inconclusive` is a valid result — publishing null results is the credibility
mechanism for that pillar.

**Provenance is one vocabulary, not several.** `DataStatus` is the site-wide
enum; `BenchmarkRow.status` and `BuildResult.provenance` are derived subsets of
it, so a build result and a hardware row are labelled by the same component and
checked by the same validator code path.

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

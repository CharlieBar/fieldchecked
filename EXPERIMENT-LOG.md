# EXPERIMENT-LOG.md

One entry per change. The point of this file is that in three months you can tell
which changes moved anything and which were superstition.

**Format:** `Date | Change made | Hypothesis | Metric to watch | Result (fill in after 7–14 days)`

**Rules that keep the log worth reading:**

- One variable per entry where possible. Two changes shipped the same day to the
  same page cannot be attributed afterwards.
- Fill in `Result` even when the answer is "no detectable change" — a null result
  is the most common outcome and the easiest to quietly skip.
- Review weekly, not daily. Daily Search Console fluctuation is mostly noise.
- Log removals too. Taking FAQ schema off a page is an experiment.

---

## Baseline

| Date | Change made | Hypothesis | Metric to watch | Result |
|---|---|---|---|---|
| 2026-08-12 | Site built and deployed. 18 seed pages across 6 pillars; 6 published, 12 draft/noindex pending fact-check. | Nothing yet — this establishes the zero baseline. | GSC impressions, clicks, indexed pages, average position. Expect flat for 2–4 weeks. | _pending_ |

**Before the first post ships:** wire Google Search Console and analytics
(GA4 or Plausible) so the zero baseline is genuinely captured. A baseline
reconstructed after the fact is not a baseline.

---

## Open questions this site exists to answer

Each of these becomes a series of log entries rather than a single one.

1. **Does stacked schema change anything?** Every page currently carries
   Article/Review + BreadcrumbList + FAQPage, with ItemList on `/vs/` and Dataset
   on `/benchmarks/`. The planned test is to hold a matched subset at minimal
   schema and compare. Treat vendor claims about listicle citation share as a
   hypothesis to test here, not as established fact.
2. **Do quick-answer blocks get extracted?** Every page has one in the first
   screen. Watch for AI assistant citations and featured snippets on pages whose
   quick answer matches the query closely.
3. **Original data vs curated synthesis.** `/benchmarks/` is firsthand
   measurement; `/verdict/` is sourced community consensus. Both live in one GSC
   property specifically so the two content types can be compared directly.
4. **Freshness cadence.** Benchmark and comparison pages are on a 7–14 day update
   cycle. Does an update signal measurably slow ranking or citation decay, and
   over what horizon?
5. **Publishing velocity.** Fixed 2–3 posts/week for the first 4–6 weeks to get a
   clean baseline, then vary it deliberately. Do not burst-publish early —
   attribution is lost the moment 20 pages ship on one day.
6. **Which checkpoints actually catch errors?** Tracked separately in the pipeline
   ledger (`npm run pipeline:log -- --report`). This is the finding most likely to
   transfer to the production business sites.

---

## Verification queue

Ranked by the commercial intent of the target query. Work top-down; promote at
most 2–3 per week (see the release procedure in `CLAUDE.md`), each in its own
commit, each logged in the promotion table below. **Do not reorder for
convenience** — the ordering is the experiment.

Re-ranked 2026-08-12 after the hardware record was corrected and the phantom
rows retargeted. Every remaining `pending-verification` row now names a GPU in
the inventory, so every page below is verifiable with hardware on hand — which
was not true of the previous queue.

### Tier 1 — high-intent buying decisions

| # | Page | Target query | Rows to measure | Hardware |
|---|---|---|---|---|
| 1 | `/guides/best-gpu-for-local-llm-inference-2026/` | best gpu for local llm inference 2026 | none of its own; cites the pages below | — |
| 2 | `/vs/rtx-4070-ti-super-vs-rtx-4060/` | rtx 4070 ti super vs rtx 4060 | 3 | 4070 Ti Super + 4060 |
| 3 | `/vs/rtx-4080-super-vs-rtx-4070-ti-super/` | rtx 4080 super vs 4070 ti super | 4 | 4080 Super + 4070 Ti Super |
| 4 | `/reviews/rtx-4060-local-llm/` | rtx 4060 local llm | 3 | 4060 |
| 5 | `/reviews/rtx-4070-ti-super-local-ai/` | rtx 4070 ti super local llm | 3 | 4070 Ti Super |
| 6 | `/reviews/rtx-4080-super-local-llm/` | rtx 4080 super local llm | 3 | 4080 Super |

### Tier 2 — mid-intent research

The brief's tier 2 was "mid-intent guides", but the only draft guide is a buying
guide, which belongs in tier 1. The mid-intent band is occupied by the
`/verdict/` pages instead — "is X worth it" and "[product] reddit" are research
queries that precede a purchase. **Flagged as an interpretation, not a silent
reorder** — confirmed as correct in handoff #2 and retained.

These need no rig time at all. They are blocked on replacing landing-page
sources with deep links to specific threads, which is reading work.

| # | Page | Target query | Blocked on |
|---|---|---|---|
| 7 | `/verdict/is-the-rtx-3090-still-worth-it/` | is rtx 3090 still worth it reddit | 4 real thread links |
| 8 | `/verdict/rtx-5080-local-ai-reddit/` | rtx 5080 local ai reddit | 4 real thread links |
| 9 | `/verdict/strix-halo-128gb-local-llm/` | strix halo local llm | 4 real thread links |

These three cover hardware we do not own, which is legitimate: a `/verdict/`
page is explicitly community synthesis, not our measurement. That separation is
why they survived the retargeting unchanged.

### Tier 3 — long-tail model-specific benchmarks

| # | Page | Target query | Rows to measure | Hardware |
|---|---|---|---|---|
| 10 | `/benchmarks/qwen3-14b/` | qwen3 14b tokens per second | 5 | all three |
| 11 | `/benchmarks/gemma-3-27b/` | gemma 3 27b benchmark | 3 | all three |
| 12 | `/benchmarks/llama-3-3-70b/` | llama 3.3 70b tokens per second | 3 | all three |

### Vertical B — not in the queue above

`/builds/`, `/studio/` and `/experiments/` are gated on artifacts rather than
rig time, so they do not compete for the same resource and are sequenced
separately:

- `/builds/wordpress-mcp-server-claude-code/` — needs the repo published and the
  edit transcript captured.
- `/studio/comfyui-infographic-pipeline/` — needs at least one real sample asset
  committed under `/public`. The validator blocks publication until the file
  exists.
- `/experiments/faq-schema-ai-citations/` — a structural placeholder. Cannot be
  published until this site has Search Console data, which requires the Vertical A
  pages to be indexed first. It is deliberately last.

### Practical sequencing note

Intent order says publish #1–#3 first, but #1–#3 restate measurements that live
on #4–#6. One measurement session per card produces rows for its review, both
comparisons it appears in, and all three benchmark pages — so the *measurement*
work groups by hardware while the *publication* order stays intent-ranked.

---

## Entries

<!--
Copy this row for each change:

| YYYY-MM-DD | What changed, specifically enough to reverse | What you expect and why | The single metric that would show it | _pending_ |
-->

| Date | Change made | Hypothesis | Metric to watch | Result |
|---|---|---|---|---|
| 2026-08-12 | Seed content ships with 12 of 18 pages as `status: 'draft'` (noindex, excluded from sitemap) because their figures are placeholders pending rig verification. | Publishing unverified numbers would poison the site's only real asset. Withholding them costs indexation in the short term and costs nothing later. | Indexed page count should equal published page count, not total page count. Flip pages to published as Checkpoint 2 clears them. | _pending_ |
| 2026-08-12 | Robots is permissive to AI crawlers. | Citation by AI assistants is the thing being measured; blocking the crawlers that produce citations would remove the variable. | Referral traffic and citation appearances from assistant surfaces. | _pending_ |
| 2026-08-12 | Canonical origin set to `https://fieldchecked.netlify.app`; brand and origin consolidated behind a single `BRAND` constant in `site.ts`, enforced by a CI guard. | A domain move later should be a one-line edit, not a grep-and-pray. | No functional metric — verified by the guard, which fails the build if either value is duplicated anywhere else. | n/a — structural |
| 2026-08-12 | Publish cadence capped at 3 pages per release, enforced in CI (`scripts/lib/release-guards.mjs`). | A 12-URL index burst would make it impossible to attribute a ranking change to any single page, destroying the first experiment cycle. Staggered release doubles as the cadence-vs-indexing-speed test. | Time from merge to first impression, per page. With staggered releases this is measurable per URL; with a burst it is not. | _pending_ |
| 2026-08-13 | Site deployed to Netlify (project `fieldchecked`) and verified in Search Console as a URL-prefix property on `https://fieldchecked.netlify.app/`. Ownership proved by HTML file (`public/google8d5146ff706a0f2a.html`), with the meta tag live as a second method. | No ranking hypothesis — this is the instrument, not an experiment. Until GSC is collecting, every later entry has no metric to read. | Impressions, clicks and indexed-page count begin accumulating from this date. The zero baseline is now genuinely captured rather than reconstructed. | n/a — structural |

### Hardware record correction — 2026-08-12

`/about/` documented a single RTX 4080 Super. The real inventory is three cards:
**RTX 4080 Super 16GB, RTX 4070 Ti Super 16GB, RTX 4060 8GB**. That list now
lives in `site.hardwareInventory` in `site.ts`, is rendered on `/about/` from
that same array, and is enforced: a `pending-verification` row naming a GPU
outside it fails the build.

Twenty-two pending rows claimed measurements on hardware that was never going to
exist. Disposition of every one:

| Was | Rows | Action | Now |
|---|---|---|---|
| RTX 5070 Ti 16GB | 4 | **Retargeted** | RTX 4070 Ti Super 16GB |
| RTX 3090 24GB | 4 | **Retargeted** | RTX 4080 Super / 4070 Ti Super / 4060 |
| RTX 3090 24GB ×2 | 4 | **Deleted** | — no multi-GPU rig exists |
| RTX 4080 Super 16GB | 10 | Kept | unchanged |

Two review pages and two comparison pages were about cards we do not own, so
retargeting rows alone would have left the surrounding copy incoherent. They
were rewritten onto owned hardware and their URLs changed:

| Old URL | New URL |
|---|---|
| `/reviews/rtx-3090-used-local-llm/` | `/reviews/rtx-4060-local-llm/` |
| `/reviews/rtx-5070-ti-local-ai/` | `/reviews/rtx-4070-ti-super-local-ai/` |
| `/vs/rtx-4080-super-vs-rtx-3090/` | `/vs/rtx-4080-super-vs-rtx-4070-ti-super/` |
| `/vs/rtx-5070-ti-vs-rtx-3090/` | `/vs/rtx-4070-ti-super-vs-rtx-4060/` |

No redirects are needed: all four were `draft`/noindex and never indexed.

**Why the multi-GPU rows were deleted rather than retagged.** The alternative
was `community-reported` with a deep-link source. Producing a real deep link
requires reading real threads, and inventing one to satisfy the rule would be
precisely the failure the rule exists to prevent. Deleting is the honest option;
the rows can return as `community-reported` when someone has actually sourced
them.

The three cards form a ladder — 8GB, then two 16GB cards at different bandwidth —
which maps onto the highest-intent query in the queue. That is a better spine for
the content than the original scattered lineup, and it is fully verifiable.

### Promotion log

One row per page moved from `draft` to `published`. The dates are data — this
table is the publish-cadence-vs-indexing-speed experiment.

| Date | URL | Rows moved to `measured` | Days to first GSC impression |
|---|---|---|---|
| _(none yet — the 6 pages live at launch were never drafts)_ | | | |

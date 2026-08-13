# FieldChecked

A benchmark-driven publication about local AI hardware — GPU reviews, comparisons,
setup guides, tokens/sec datasets, and clearly-labelled roundups of community
consensus. It doubles as a testbed for SEO/GEO/AEO mechanics and a
human-checkpointed publishing pipeline.

Next.js 15 (App Router) · Tailwind CSS 4 · deployed on Netlify.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (also regenerates sitemap.xml / robots.txt) |
| `npm run qa` | Typecheck + content validation — same checks CI runs |
| `npm run qa:content` | Content validator only |
| `npm run pipeline:scout` | Stage 1: propose topics (Haiku) → Checkpoint 1 |
| `npm run pipeline:draft` | Stage 2: draft a content file (Sonnet) → Checkpoint 2 |
| `npm run pipeline:seo` | Stage 3: SEO/schema review (Opus) → Checkpoint 3 |
| `npm run pipeline:log` | Record what a checkpoint caught; `--report` for the summary |

The pipeline scripts need `ANTHROPIC_API_KEY` in the environment, or an
`ant auth login` profile.

## Deployment

Hosted on Netlify as the project **`fieldchecked`**
([dashboard](https://app.netlify.com/projects/fieldchecked)), serving
`https://fieldchecked.netlify.app` — which is the value of `BRAND.origin` in
`src/content/global/site.ts`. The project name and that constant have to agree;
renaming one means renaming the other.

Netlify runs the build itself rather than receiving a pre-built bundle. That is
deliberate: `netlify.toml` declares `@netlify/plugin-nextjs`, and the plugin has
to run inside Netlify's build for App Router routing, image optimisation and the
ISR `revalidate` on `/benchmarks/` to work. Uploading a local `.next` directory
produces a site where those are silently inert, so deploys go through git:

```
push to main → Netlify builds (npm run build) → deploy
```

Build settings come from `netlify.toml` and need no dashboard configuration, and
neither does anything else — **no environment variable has to be set for the
site to work correctly.** That is a deliberate correction, not an accident of
convenience. Both third-party tokens were originally env-var-only, and both
silently rendered nothing in production because the variables never reached the
build. Search Console verification survived only because the HTML file is
committed; analytics simply did not run. A dependency that is invisible from the
repo and fails without an error is worse than a public string in source.

Both values are public by construction — each is served in the HTML of every
site using them — so both are committed in `src/app/layout.tsx`, with an env var
retained as an override:

| Value | Override | Gate |
|---|---|---|
| Search Console token | `GOOGLE_SITE_VERIFICATION` | none — verification is origin-scoped, so the tag is inert on any other domain |
| Plausible script ID | `PLAUSIBLE_SCRIPT_ID` | `CONTEXT === 'production'` |

`CONTEXT` is set by Netlify itself on every build (`production`,
`deploy-preview`, `branch-deploy`) and is unset locally, so previews, branch
deploys and `npm run dev` emit no analytics and cannot pollute the numbers —
without anyone configuring anything. Verified across all five cases, including
the override.

Analytics is two plain `<script>` tags, not `next/script`, which would pull its
own client runtime into the bundle. Measured: per-route JS 210 B and First Load
106 kB, identical with and without it. Only the HTML grows, by ~670 B per page.
Keep it that way — this site measures how content structure performs, and a
heavier page measures the tag instead.

**Do not swap `async` for `defer` on the external script.** The current snippet
identifies the site by script URL and pairs the async load with an inline init
that installs the `window.plausible` queue synchronously, so events fired before
the script lands are buffered rather than dropped. `defer` would make that init
pointless. Both tags come from Plausible verbatim; re-copy them from the
dashboard rather than hand-editing if the format changes again.

Ownership is proved **two** ways on purpose — Google treats either as sufficient,
and keeping both means losing one does not unverify the property:

1. The meta tag above, which depends on the env var surviving every build.
2. `public/google8d5146ff706a0f2a.html`, a static file with no build-time
   dependency at all. Do not delete it, and do not "tidy" it into a
   subdirectory — Google fetches it from the site root.

Search Console is a **URL-prefix** property (`https://fieldchecked.netlify.app/`),
not a Domain property: the latter needs a DNS TXT record on `netlify.app`, which
is Netlify's zone. Per-pillar sub-properties exist so the two verticals are never
read as one aggregate number — see the vertical-separation rule in `CLAUDE.md`.

Content QA is enforced separately by `.github/workflows/content-qa.yml`, which
runs on every branch — Netlify does not gate the deploy on it, so a red validator
is a signal to revert, not a blocked publish.

## How the repo is organised

Content and design are strictly separated: everything a reader reads lives in
`src/content/`, typed by `src/types/content.ts`; everything that decides how it
looks lives in `src/app/` and `src/components/`. A redesign never touches content,
and content never contains markup.

Read [`CLAUDE.md`](./CLAUDE.md) before making changes — it covers the content
contract, the data-integrity rules, and the format requirements the experiment
depends on.

## A note on the numbers

Every figure on this site carries a provenance tag. Pages whose numbers have not
yet been reproduced on our own hardware ship as drafts: visibly banner-marked,
`noindex`, and excluded from the sitemap until a human verifies them. Nothing is
presented as measured unless it was measured.

See [`EXPERIMENT-LOG.md`](./EXPERIMENT-LOG.md) for what is being tested and why.

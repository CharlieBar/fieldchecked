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

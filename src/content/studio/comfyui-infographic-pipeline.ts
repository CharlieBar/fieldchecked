import type { StudioContent } from '@/types/content';

export const studio: StudioContent = {
  slug: 'comfyui-infographic-pipeline',
  status: 'draft',
  vertical: 'B',
  datePublished: '2026-08-12',

  seo: {
    title: 'A ComfyUI Infographic Pipeline for Client Work',
    description:
      'The ComfyUI workflow behind a repeatable client infographic: layout templating, brand-locked palettes, and where the pipeline still needs a designer.',
    keywords: [
      'comfyui infographic workflow',
      'ai infographic generator',
      'comfyui client work',
      'marketing asset generation ai',
      'comfyui workflow for business',
    ],
    canonical: '/studio/comfyui-infographic-pipeline/',
  },

  hero: {
    eyebrow: 'Studio',
    headline: 'A ComfyUI Pipeline for Client Infographics',
    subheadline:
      'Repeatable, brand-locked, and honest about the last twenty percent that still needs a human.',
    lastUpdated: '2026-08-12',
  },

  useCase:
    'A recurring client deliverable: a single-column infographic summarising a service, produced monthly, in a fixed brand palette and typeface. Individually cheap to design and expensive in aggregate, because every one starts from a blank canvas.',

  quickAnswer:
    'This pipeline generates the background art and layout scaffolding for a client infographic in ComfyUI, then hands off to a designer for typography and final composition. The generation half is templated: a fixed base workflow, a locked palette enforced by a colour-conditioning pass, and a prompt template with one slot for the subject. What it does well is produce a consistent visual family across a series so a monthly deliverable does not drift. What it does not do is set type — text rendered by a diffusion model is still unreliable enough that every caption is composited afterwards. Treat it as a background and mood generator that removes the blank canvas, not as an end-to-end asset factory.',

  pipeline: [
    {
      step: 'Base generation',
      tool: 'ComfyUI + SDXL',
      notes: 'Fixed seed range per client so a series stays visually related rather than random.',
    },
    {
      step: 'Palette lock',
      tool: 'Colour-conditioning pass',
      notes:
        'Constrains output toward the brand palette. Cheaper and more reliable than prompting for hex values, which diffusion models largely ignore.',
    },
    {
      step: 'Layout scaffold',
      tool: 'Region masking',
      notes: 'Reserves the areas type will occupy so the generated art does not compete with it.',
    },
    {
      step: 'Upscale',
      tool: 'Latent upscale + detail pass',
      notes: 'Print-resolution output; the detail pass is where most of the runtime goes.',
    },
    {
      step: 'Typography and composition',
      tool: 'Affinity Designer (manual)',
      notes: 'Not automated, and not close to being. This is the step the pipeline exists to feed.',
    },
  ],

  samples: [
    {
      label: 'Series background, month 1',
      imagePath: '/studio/comfyui-infographic-pipeline/sample-01.webp',
      prompt: 'Placeholder — real prompt and asset land at Checkpoint 2.',
      caption:
        'Background plate with type regions masked out. Asset not yet committed; this page stays draft until it is.',
    },
  ],

  sections: [
    {
      type: 'prose',
      heading: 'What templating actually buys',
      body: [
        'The value here is not any single image — it is that image four looks like it belongs with images one to three. A client noticing that their monthly asset has quietly changed style is a worse outcome than a slightly plainer asset that stays consistent.',
        'Fixing the seed range, the palette pass and the layout mask is what produces that family resemblance. The prompt slot is the only thing that varies between runs.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'Do not let it set type',
      body: 'Diffusion-rendered text still fails in ways that are subtle enough to reach a client and embarrassing when they do. Every caption on every asset from this pipeline is composited afterwards in a real design tool. That is a limitation, not an oversight.',
    },
    {
      type: 'prose',
      heading: 'Where it saves time and where it does not',
      body: [
        'It removes the blank canvas, which is the expensive part of a recurring visual deliverable. It does not remove the design work, and a pipeline that claims otherwise is being sold to someone who has not shipped client assets.',
        'Realistically this converts a from-scratch design session into a composition session against generated material. That is a meaningful saving on a monthly cadence and a marginal one on a single asset.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Can ComfyUI generate a complete infographic?',
      answer:
        'Not reliably. It generates backgrounds, textures and layout scaffolding well; it renders text poorly enough that captions and labels should be composited afterwards in a design tool.',
    },
    {
      question: 'How do you keep AI-generated assets on brand?',
      answer:
        'A colour-conditioning pass constrains output toward the brand palette, which works far better than naming hex values in the prompt. Fixing the seed range keeps a series visually related.',
    },
    {
      question: 'Is this faster than designing from scratch?',
      answer:
        'On a recurring deliverable, yes — it removes the blank-canvas phase. On a one-off asset the setup cost roughly cancels the saving.',
    },
    {
      question: 'What hardware does this pipeline need?',
      answer:
        'SDXL with an upscale pass fits comfortably in 8GB, so a modest card runs it. Diffusion is compute-bound rather than capacity-bound, so generation time rather than VRAM is the constraint.',
    },
    {
      question: 'Why mask the type regions during generation?',
      answer:
        'Because generated detail competes with type for attention. Reserving the areas that text will occupy produces backgrounds that stay readable once the copy is composited on top.',
    },
    {
      question: 'Do clients know the assets are AI-generated?',
      answer:
        'Yes, always. It is part of the scope conversation, and it affects what they can license the output for, which is their decision to make with full information.',
    },
    {
      question: 'Can this replace a designer?',
      answer:
        'No. It replaces the first hour of a designer’s work on a recurring asset. The composition, typography and judgement about what the asset needs to communicate all remain human.',
    },
    {
      question: 'Why ComfyUI rather than a hosted generator?',
      answer:
        'Repeatability. A node graph can be versioned, shared and re-run with the same settings months later, which is what makes a consistent series possible. Hosted tools rarely expose that level of control.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [{ name: 'ComfyUI', type: 'SoftwareApplication' }],
  },

  related: ['/builds/wordpress-mcp-server-claude-code/'],
};

export default studio;

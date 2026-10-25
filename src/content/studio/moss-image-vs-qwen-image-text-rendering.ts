import type { StudioContent } from '@/types/content';

export const studio: StudioContent = {
  slug: 'moss-image-vs-qwen-image-text-rendering',
  status: 'draft',
  vertical: 'B',
  datePublished: '2026-10-25',

  seo: {
    title: 'MOSS-Image vs Qwen Image 2.1: Which Spells Text Correctly?',
    description:
      'MOSS-Image spelled a 6-line menu that Qwen Image got wrong; Qwen 2.1 won on giant-word posters. The bigger lever was prompt style: 47/57 clean vs 25/50.',
    keywords: [
      'best local ai model for text in images',
      'moss-image vs qwen image',
      'qwen image 2.1 text rendering',
      'ai poster generation spelling',
      'comfyui text in image',
    ],
    canonical: '/studio/moss-image-vs-qwen-image-text-rendering/',
  },

  hero: {
    eyebrow: 'Studio',
    headline: 'MOSS-Image vs Qwen Image 2.1: Which Spells Text Correctly?',
    subheadline:
      'It depends on the poster — and the prompt mattered more than either model.',
    lastUpdated: '2026-10-25',
  },

  useCase:
    'Generating posters, menus and signage with the copy rendered inside the image, rather than composited afterwards, on a single 16 GB consumer GPU.',

  quickAnswer:
    'Neither model wins everywhere. On a dense six-line price menu, MOSS-Image spelled every word correctly where Qwen Image misspelled two. On clean posters built around giant words, Qwen Image 2.1 won, 9 to 6 out of 12. The larger effect was the prompt, not the model. Hand-written prose prompts — scene, subject, then every piece of text with its position and hex colour, with the model\'s own prompt enhancer switched off — beat enhancer-on prompts every time. On Qwen 2.1 Edit at 1080×1920, with the same seed, those prompts gave 47 clean posters out of 57 on the first pass; 50 short ChatGPT-written prompts gave 25 out of 50, and 14 of those had no text at all. Generate at 1 MP: MOSS-Image misspelled once at 2 MP.',

  pipeline: [
    {
      step: 'Write the prompt as prose',
      tool: 'Hand-written template',
      notes:
        'Scene, then subject, then every text element with its position and hex colour. JSON prompts matched prose on light copy but broke on heavy copy, repeating lines and printing a hex code as text.',
    },
    {
      step: 'Switch the prompt enhancer off',
      tool: 'Model built-in enhancer',
      notes:
        'Enhancers turned a stated main colour into white backgrounds, invented extra text and dropped information blocks.',
    },
    {
      step: 'Generate at 1 MP',
      tool: 'MOSS-Image (25 steps, CFG 2.5) or Qwen Image 2.1',
      notes:
        'MOSS-Image is text-to-image only and took 22–37 s per image at 1 MP. It misspelled once at 2 MP, so 1 MP is the default.',
    },
    {
      step: 'Check every word',
      tool: 'Author read-through + Qwen3-VL 8B checker',
      notes:
        '"Clean" means no spelling errors, judged by the author reading each render with a Qwen3-VL 8B model as a second check.',
    },
  ],

  samples: [
    {
      label: 'Six-line price menu, MOSS-Image vs Qwen Image',
      imagePath: '/studio/moss-image-vs-qwen-image-text-rendering/menu-comparison.webp',
      caption:
        'Asset not yet committed — must be a client-free render. This page stays draft until it is.',
    },
    {
      label: 'Giant-word poster, Qwen Image 2.1 vs MOSS-Image',
      imagePath: '/studio/moss-image-vs-qwen-image-text-rendering/giant-word-poster.webp',
      caption:
        'Asset not yet committed — must be a client-free render. This page stays draft until it is.',
    },
  ],

  sections: [
    {
      type: 'specs',
      heading: 'Tested on',
      items: [
        { label: 'Dates', value: '2026-10-17 to 2026-10-20' },
        { label: 'GPU', value: 'NVIDIA RTX 4070 Ti Super, 16 GB (one card)' },
        { label: 'CPU / RAM', value: 'TBD — pending author confirmation' },
        { label: 'OS', value: 'Windows 11' },
        {
          label: 'ComfyUI',
          value:
            'Master builds from 2026-10-17 (bab80ef7, faa7e494, bef11fcb); build per run TBD — v0.41.3 may apply to 2026-10-17 runs',
        },
        { label: 'Model files', value: 'TBD — pending author confirmation' },
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      heading: 'Counts, not a benchmark',
      body: 'These are small counts from one machine and one set of prompts, with "clean" judged by eye plus a vision-model check. Read the numbers as what happened on these posters, not as each model\'s spelling rate in general.',
    },
    {
      type: 'prose',
      heading: 'Which local image model spells text correctly?',
      body: [
        'On dense copy, MOSS-Image. A six-line price menu came out spelled correctly from MOSS-Image, while Qwen Image misspelled two words on the same brief.',
        'On big, sparse type, Qwen Image 2.1. In a rematch on prose prompts, Qwen 2.1 produced 9 clean giant-word posters out of 12 against MOSS-Image\'s 6. The best engine depends on the style of the poster, so the useful answer is a pairing rather than a winner.',
      ],
    },
    {
      type: 'prose',
      heading: 'The prompt mattered more than the model',
      body: [
        'Same engine, same seed: Qwen 2.1 Edit at 1080×1920. Our prose prompts produced 47 clean posters out of 57 on the first pass. Fifty short prompts written by ChatGPT produced 25 out of 50 — and 14 of those had no text in them at all.',
        'That is not a pure test of prompt style. The two prompt sets differ in length and in what they asked for, so the comparison is between two ways of producing prompts, not between two phrasings of the same brief. It is still the largest gap anywhere in these tests.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'Turn the prompt enhancer off',
      body: 'Every enhancer-on prompt lost to its enhancer-off equivalent. The enhancers rewrote colour instructions into white backgrounds, invented text nobody asked for and dropped whole information blocks — exactly the failures that make a poster unusable.',
    },
    {
      type: 'callout',
      tone: 'info',
      heading: 'Still check every word',
      body: 'Even the best run here left 10 of 57 posters not clean. Rendered text is good enough to use, not good enough to ship unread.',
    },
  ],

  faqs: [
    {
      question: 'What is the best local AI model for text in images?',
      answer:
        'It depends on the layout. In our tests MOSS-Image spelled a dense six-line menu correctly where Qwen Image made two errors, while Qwen Image 2.1 won on giant-word posters, 9 clean out of 12 against 6.',
    },
    {
      question: 'Is MOSS-Image better than Qwen Image at spelling?',
      answer:
        'On dense, multi-line copy it was in our tests. On posters built around a few very large words, Qwen Image 2.1 produced more clean results. Neither won across every style.',
    },
    {
      question: 'How do you get AI image models to spell text correctly?',
      answer:
        'Write the prompt as prose — scene, subject, then every text element with its position and hex colour — and switch the built-in prompt enhancer off. On Qwen 2.1 Edit that gave 47 clean posters out of 57.',
    },
    {
      question: 'Should I use the prompt enhancer for text in images?',
      answer:
        'No, in our tests. Enhancer-on prompts lost every time: the enhancers turned stated colours into white backgrounds, invented extra text and dropped information blocks from the layout.',
    },
    {
      question: 'Are JSON prompts better than prose for text rendering?',
      answer:
        'They matched prose on light copy and broke on heavy copy, repeating lines and in one case printing a hex colour code as visible text. Prose was the more reliable format.',
    },
    {
      question: 'Do ChatGPT-written prompts work for AI posters?',
      answer:
        'Poorly in our test. Fifty short ChatGPT-written prompts gave 25 clean posters out of 50 on Qwen 2.1 Edit, and 14 of them had no text at all, against 47 out of 57 for detailed prose prompts.',
    },
    {
      question: 'What resolution should I use for text with MOSS-Image?',
      answer:
        '1 MP. It produced a spelling error at 2 MP that it did not make at 1 MP, and at 1 MP it took 22–37 seconds per image on an RTX 4070 Ti Super with 25 steps at CFG 2.5.',
    },
    {
      question: 'Can MOSS-Image edit existing images?',
      answer:
        'No. MOSS-Image is text-to-image only, so editing a poster or adding text to an existing image needs a different model, such as Qwen Image 2.1 Edit.',
    },
    {
      question: 'Is AI-rendered text reliable enough to skip proofreading?',
      answer:
        'No. Even the strongest setup in these tests left 10 of 57 posters not clean on the first pass. Every render should be read, and a vision-model checker is a useful second pass, not a replacement.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [
      { name: 'MOSS-Image', type: 'SoftwareApplication' },
      { name: 'Qwen Image 2.1', type: 'SoftwareApplication' },
      { name: 'ComfyUI', type: 'SoftwareApplication' },
    ],
  },

  related: ['/studio/comfyui-infographic-pipeline/', '/blog/comfyui-slow-node-list-object-info/'],
};

export default studio;

import type { BlogContent } from '@/types/content';

export const post: BlogContent = {
  slug: 'comfyui-slow-node-list-object-info',
  status: 'draft',
  vertical: 'B',
  datePublished: '2026-10-25',
  category: 'explainer',
  readingTimeMinutes: 7,

  seo: {
    title: 'Why ComfyUI Takes 12 Seconds to Load Its Node List',
    description:
      'ComfyUI waiting 12 seconds to list its nodes? On one large install, four causes stacked behind /object_info. Fixing them cut it to about 4 seconds.',
    keywords: [
      'comfyui slow to load nodes',
      'comfyui object_info slow',
      'comfyui stuck on queued',
      'comfyui slow startup custom nodes',
      'comfyui disable-assets',
    ],
    canonical: '/blog/comfyui-slow-node-list-object-info/',
  },

  hero: {
    eyebrow: 'Explainer',
    headline: 'Why ComfyUI Takes 12 Seconds to Load Its Node List',
    subheadline:
      'Every request for the node list waits on every custom node pack. On one large install, four of them were doing work nobody asked for.',
    lastUpdated: '2026-10-25',
  },

  quickAnswer:
    'If ComfyUI takes ten seconds or more to show its node list, the GPU and the models are rarely the reason. Anything that loads the node list calls `GET /object_info`, and that request waits on every custom node pack\'s `INPUT_TYPES` — and, on recent master builds launched with `--windows-standalone-build`, on a full rescan of the models, input and output folders. On one large install of about 3,600 node classes, four causes stacked: the asset rescan, packs making network calls to Hugging Face or a local Ollama server, a pack scanning the whole input folder, and a system monitor flooding websocket clients. Fixing them took `/object_info` from 11.5–12.6 s to 4.1–4.6 s. Diagnose by timing each node\'s `INPUT_TYPES` directly: the `python_module` field can name the wrong pack.',

  sections: [
    {
      type: 'specs',
      heading: 'Tested on',
      items: [
        { label: 'Dates', value: '2026-09-30 to 2026-10-21' },
        { label: 'GPU', value: 'NVIDIA RTX 4070 Ti Super, 16 GB (one card)' },
        { label: 'CPU / RAM / disk', value: 'TBD — pending author confirmation' },
        { label: 'OS', value: 'Windows 11' },
        {
          label: 'ComfyUI',
          value:
            'v0.41.3 until 2026-10-17, then master builds bab80ef7, faa7e494, bef11fcb. Which build each finding was observed on: TBD',
        },
        { label: 'Launch flag', value: '--windows-standalone-build' },
        { label: 'Install size', value: '~3,600 node classes, ~240 LoRAs' },
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      heading: 'One machine, one install',
      body: 'Every timing here comes from a single, unusually large install on one Windows machine. The mechanisms transfer to any ComfyUI install; the seconds do not. A small install with a handful of packs may never notice any of this.',
    },
    {
      type: 'prose',
      heading: 'What /object_info actually waits on',
      body: [
        'The ComfyUI front end does not hold a static node list. It asks the server for one with `GET /object_info`, and the server builds the answer by calling `INPUT_TYPES` on every registered node class. Whatever a custom node pack does inside that method — read a folder, query a server, call an API — happens on every request, for every user, whether or not that node is in the workflow.',
        'So the cost of the node list is the sum of every pack\'s worst habit. On an install of about 3,600 node classes, that sum was 11.5–12.6 seconds, and almost none of it was work the user had asked for.',
      ],
    },
    {
      type: 'steps',
      heading: 'The four causes, and what fixed each',
      steps: [
        {
          title: 'The asset seeder rescanning every folder',
          body: 'On recent master builds launched with `--windows-standalone-build`, every `/object_info` call started a full rescan of the models, input and output folders — about 10,000 files, costing 2–3 s each time. It also hit `/queue`, which took 10–29 s to answer with an empty queue. Fix: launch with `--disable-assets`.',
        },
        {
          title: 'Custom nodes making network calls in INPUT_TYPES',
          body: 'One pack asked Hugging Face for a model list on every call; with it disabled, `/object_info` fell from about 19 s to about 6 s in that measurement. Another asked a local Ollama server for its model list twice. With Ollama closed, each refused connection waited about 2 s, adding 4.1 s. Fix: keep Ollama running, or disable the pack.',
        },
        {
          title: 'A pack scanning the whole input folder',
          body: 'One pack listed the entire input folder — 1,740 files, 2.4 s — every time ComfyUI built its node list. Fix applied: TBD — pending author confirmation.',
        },
        {
          title: 'A system monitor broadcasting to every websocket client',
          body: 'A pack with a system monitor pushed an update to every connected websocket client about once a second. One sleeping browser tab was enough to stall the event loop, and runs sat at "queued" with nothing executing. Fix applied: TBD — pending author confirmation.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'The two network numbers do not add up, by design',
      body: 'The Hugging Face measurement (about 19 s to about 6 s) was taken at a different point from the overall before-and-after (11.5–12.6 s to 4.1–4.6 s), with a different set of packs enabled. Each is correct for its own state of the install; they are not steps in one sum.',
    },
    {
      type: 'prose',
      heading: 'Do not trust python_module when hunting the culprit',
      body: [
        'Each entry in the `/object_info` response carries a `python_module` field that looks like it tells you which pack owns the node. It is not reliable. When a pack does `from nodes import *`, nodes from elsewhere can be attributed to it: on this install, one pack appeared to own about 1,800 nodes that belonged to other packs.',
        'Following that field sends you to disable the wrong pack, see no change, and conclude the problem is somewhere else. Time the work itself instead.',
      ],
    },
    {
      type: 'steps',
      heading: 'How to find the cause on your own install',
      steps: [
        {
          title: 'Time /object_info on its own',
          body: 'Request it directly from the running server and record the wall-clock time over several calls. This is the baseline every change is measured against, and it isolates the server from the browser.',
        },
        {
          title: 'Rule out the asset seeder first',
          body: 'If you are on a recent master build with `--windows-standalone-build`, relaunch with `--disable-assets` and time it again. It is the one cause that scales with the number of files on disk rather than the number of packs.',
        },
        {
          title: 'Time each node\'s INPUT_TYPES',
          body: 'Call `INPUT_TYPES` on each registered node class and record how long each takes. The slow ones are the packs doing network or filesystem work, regardless of what `python_module` says.',
        },
        {
          title: 'Check for services the packs depend on',
          body: 'A pack that queries a local server is fast when the server is up and slow when it is down, so the same install can be quick one day and slow the next. Note which local services were running when you measured.',
        },
        {
          title: 'If runs sit at "queued", look at websocket clients',
          body: 'A queue that never starts with nothing running is not a node-list problem. Close stale browser tabs and look for packs that broadcast status to every client.',
        },
      ],
    },
    {
      type: 'prose',
      heading: 'The result',
      body: [
        'With all four addressed, `/object_info` went from 11.5–12.6 s to 4.1–4.6 s, and ComfyUI came up in about 20 seconds. No hardware changed and no workflow changed. The time had been spent on folder scans and network requests that ran on every page load and answered questions nobody had asked.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Why is ComfyUI so slow to load its nodes?',
      answer:
        'Loading the node list calls /object_info, which runs INPUT_TYPES on every installed node class. Custom node packs that scan folders or make network calls inside that method add their delay to every load, whether or not you use them.',
    },
    {
      question: 'What is /object_info in ComfyUI?',
      answer:
        'It is the server endpoint the front end calls to get the definition of every available node. The server builds the response on each request by calling INPUT_TYPES on every registered node class.',
    },
    {
      question: 'What does --disable-assets do in ComfyUI?',
      answer:
        'On the recent master builds tested here, it stopped the asset seeder from rescanning the models, input and output folders on every /object_info request, which had been costing 2–3 seconds per call.',
    },
    {
      question: 'Why is my ComfyUI queue stuck on queued with nothing running?',
      answer:
        'One cause is a custom node that broadcasts status to every websocket client. A single sleeping browser tab can stall the server event loop, so runs wait at queued. Close stale tabs and check packs with system monitors.',
    },
    {
      question: 'Can a custom node slow down ComfyUI even if it is not in my workflow?',
      answer:
        'Yes. Every installed node class is asked for its inputs whenever the node list loads, so a pack doing slow work in INPUT_TYPES costs time on every load regardless of which workflow is open.',
    },
    {
      question: 'How do I find which custom node is slowing ComfyUI down?',
      answer:
        'Time /object_info as a baseline, then time each node class\'s INPUT_TYPES call directly. The slowest are the packs doing network or filesystem work. Disable them one at a time and re-measure to confirm.',
    },
    {
      question: 'Why does /object_info show the wrong pack for a node?',
      answer:
        'The python_module field can misattribute nodes when a pack uses from nodes import *. On one install, a single pack appeared to own about 1,800 nodes from other packs, so it is not a safe guide to the culprit.',
    },
    {
      question: 'Can closing Ollama make ComfyUI slower?',
      answer:
        'It can, if a custom node asks a local Ollama server for its model list. With Ollama closed, each refused connection waited about two seconds; one pack asked twice, adding 4.1 seconds to every node-list load.',
    },
    {
      question: 'Do lots of models and LoRAs slow down ComfyUI startup?',
      answer:
        'They can, indirectly. On recent master builds the asset seeder rescanned the models, input and output folders on every node-list request — about 10,000 files at 2–3 seconds per scan — until it was disabled.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [{ name: 'ComfyUI', type: 'SoftwareApplication' }],
  },

  related: ['/studio/comfyui-infographic-pipeline/'],
};

export default post;

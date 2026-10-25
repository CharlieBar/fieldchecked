import type { BlogContent } from '@/types/content';

export const post: BlogContent = {
  slug: 'ltx-2-5-character-face-consistency',
  status: 'draft',
  vertical: 'B',
  datePublished: '2026-10-25',
  category: 'explainer',
  readingTimeMinutes: 6,

  seo: {
    title: 'LTX-2.5 Cannot Hold a Face Through a 10-Second Clip',
    description:
      'A negative result: LTX-2.5 pins a face at the first and last frame but loses it mid-clip. Resolution, length and prompts did not fix it. Scores inside.',
    keywords: [
      'ltx 2.5 character consistency',
      'ltx 2.5 face drift',
      'ltx video consistent character',
      'ltx 2.5 first last frame',
      'ai video face consistency local',
    ],
    canonical: '/blog/ltx-2-5-character-face-consistency/',
  },

  hero: {
    eyebrow: 'Negative result',
    headline: 'LTX-2.5 Cannot Hold a Face Through a 10-Second Clip',
    subheadline:
      'First and last frame pin the identity at both ends. In the middle, while the character talks, it slips — and nothing we changed brought it back.',
    lastUpdated: '2026-10-25',
  },

  quickAnswer:
    'Not reliably, in our tests. With only a first frame, LTX-2.5 let a recurring test character\'s face drift on every 7–10 second clip, and it never recovered. Adding a last frame pinned the identity at both ends, but it still dipped mid-clip: ArcFace similarity to the reference ran 0.69–0.76 across the clip and fell to 0.52–0.66 in the middle, tracking the moments the character was talking. More resolution and steps, full-resolution guide frames, turning the prompt enhancer off, shorter clips and three prompt styles all failed to lift the dip. LTX-2.5 is still about 3.5× faster than MiniMax H3 for the same clip, with bigger performances and seamless joins. For a face that has to stay the same, the next lever is identity conditioning, not prompts.',

  sections: [
    {
      type: 'specs',
      heading: 'Tested on',
      items: [
        { label: 'Dates', value: '2026-10-09 to 2026-10-12' },
        { label: 'GPU', value: 'NVIDIA RTX 4070 Ti Super, 16 GB (one card)' },
        { label: 'CPU / RAM', value: 'TBD — pending author confirmation' },
        { label: 'OS', value: 'Windows 11' },
        { label: 'ComfyUI', value: 'v0.41.3' },
        { label: 'Model file', value: 'TBD — pending author confirmation' },
        { label: 'Clips', value: '7–10 s; clip count TBD' },
        {
          label: 'Identity metric',
          value: 'ArcFace cosine similarity to a reference face, 0–1. Frame sampling method TBD',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'info',
      heading: 'Small n, one machine',
      body: 'These are a handful of clips of one recurring test character on one GPU, mostly on one or two seeds. They show a pattern that held across every variation we tried; they are not a benchmark of LTX-2.5 in general.',
    },
    {
      type: 'prose',
      heading: 'Can LTX-2.5 keep a character\'s face consistent through a 10-second clip?',
      body: [
        'The goal was simple to state: generate 7–10 second clips of a recurring test character and have the face stay recognisably the same person from start to finish.',
        'With a first frame only, it did not. The face drifted on every clip and never came back. That is the failure most people meet first, and the usual advice is to add an end frame.',
      ],
    },
    {
      type: 'prose',
      heading: 'What first-and-last-frame actually fixes',
      body: [
        'Adding a last frame pins the identity at both ends of the clip. Across the whole clip, ArcFace similarity to the reference ran 0.69–0.76.',
        'The middle is where it breaks. Similarity dipped to 0.52–0.66 mid-clip, and the dip followed the character talking: when the mouth and jaw are moving, the model holds the face least well. Anchoring the ends does nothing for the stretch between them.',
      ],
    },
    {
      type: 'list',
      heading: 'What did not lift the mid-clip dip',
      style: 'unordered',
      items: [
        '1 MP with more steps (12 + 6): sharper, with more motion, but no less drift — at 1.8× the time.',
        '0.9 MP and 0.95 MP with full-resolution guide frames.',
        'Turning the prompt enhancer off.',
        '10-second clips instead of 7-second clips.',
        'Three prompt styles — the person described, the set only, and the camera path only — on two seeds. Scores landed at 0.72–0.73 regardless.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'The lever is not prompts, resolution or length',
      body: 'Every variable a workflow normally exposes was tried and none moved the dip. That points at the model\'s conditioning rather than at the settings. The next thing to test is identity conditioning — an IC-LoRA — rather than another round of prompt wording.',
    },
    {
      type: 'prose',
      heading: 'Where LTX-2.5 is still the better tool',
      body: [
        'This is not a verdict that LTX-2.5 is bad. For the same clip it was about 3.5× faster than MiniMax H3, it produced bigger performances, and its joins between clips were seamless.',
        'If the face does not have to match a reference — a one-off character, a crowd, a product shot — those strengths win. The failure is specific to holding one identity through speech.',
      ],
    },
    {
      type: 'prose',
      heading: 'What we used instead',
      body: [
        'For the recurring character, MiniMax H3 reference-to-video won on the same task, judged by eye. A matching ArcFace score for H3 is TBD — pending author confirmation — and until it is on this page, treat that comparison as an observation rather than a measurement.',
      ],
    },
  ],

  faqs: [
    {
      question: 'Can LTX-2.5 keep a character consistent across a clip?',
      answer:
        'Only at the ends, in our tests. First and last frame pinned identity at both ends of 7–10 second clips, but the face slipped mid-clip, falling to 0.52–0.66 ArcFace similarity while the character talked.',
    },
    {
      question: 'Does adding a last frame fix face drift in LTX-2.5?',
      answer:
        'Partly. It stopped the face drifting away for good, which happened on every first-frame-only clip, but it did not stop a dip in the middle of the clip. Overall similarity ran 0.69–0.76.',
    },
    {
      question: 'Does higher resolution reduce face drift in LTX-2.5?',
      answer:
        'Not in our tests. 1 MP with 12 + 6 steps was sharper and had more motion, but drifted just as much and took 1.8 times as long. Full-resolution guide frames at 0.9 and 0.95 MP did not help either.',
    },
    {
      question: 'Do shorter clips help LTX-2.5 hold a face?',
      answer:
        'Not in our tests. Seven-second clips showed the same mid-clip dip as ten-second clips, so the drift is tied to what happens in the clip — the character talking — rather than to how long it runs.',
    },
    {
      question: 'Does prompt wording affect LTX-2.5 face consistency?',
      answer:
        'Barely. Three prompt styles — describing the person, describing only the set, and describing only the camera path — scored 0.72–0.73 on two seeds. Turning the prompt enhancer off made no difference to the dip.',
    },
    {
      question: 'Why does the face change when the character talks?',
      answer:
        'We can only report the correlation: the mid-clip dip tracked the speaking sections. Mouth and jaw motion is where the model held identity least well. We did not test the underlying cause.',
    },
    {
      question: 'Is LTX-2.5 faster than MiniMax H3?',
      answer:
        'Yes, by about 3.5 times for the same clip on an RTX 4070 Ti Super 16 GB. It also produced bigger performances and seamless joins, so it remains the better choice when identity does not need to match a reference.',
    },
    {
      question: 'What is the best way to keep a consistent face in local AI video?',
      answer:
        'In our tests, MiniMax H3 reference-to-video held a recurring character better than LTX-2.5. For LTX-2.5, the untested next step is identity conditioning such as an IC-LoRA, since settings and prompts did not help.',
    },
    {
      question: 'What is an ArcFace identity score?',
      answer:
        'It is the cosine similarity between face embeddings from the ArcFace model, from 0 to 1. Higher means the generated face is closer to the reference face. We used it to track identity across each clip.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [
      { name: 'LTX-2.5', type: 'SoftwareApplication' },
      { name: 'ComfyUI', type: 'SoftwareApplication' },
    ],
  },

  related: ['/blog/comfyui-slow-node-list-object-info/'],
};

export default post;

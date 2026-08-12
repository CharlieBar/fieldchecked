import type { BuildContent } from '@/types/content';

export const build: BuildContent = {
  slug: 'wordpress-mcp-server-claude-code',
  status: 'draft',
  vertical: 'B',
  datePublished: '2026-08-12',

  seo: {
    title: 'Building a WordPress MCP Server with Claude Code',
    description:
      'An MCP server that lets Claude Code read and edit a live WordPress site — what it does, what it deliberately refuses to do, and where it still needs a human.',
    keywords: [
      'wordpress mcp server',
      'claude code wordpress',
      'build mcp server claude code',
      'mcp server tutorial',
      'automate wordpress with ai',
    ],
    canonical: '/builds/wordpress-mcp-server-claude-code/',
  },

  hero: {
    eyebrow: 'Build',
    headline: 'A WordPress MCP Server for Claude Code',
    subheadline:
      'Editing client sites by hand is the slowest part of the job. This closes the loop — carefully, because the failure mode is a broken live site.',
    lastUpdated: '2026-08-12',
  },

  problem:
    'Client WordPress work involves a long tail of small, well-specified edits: copy changes, meta descriptions, schema blocks, a stubborn block layout. Each is a two-minute job wrapped in ten minutes of context-switching through an admin UI. The bottleneck is not the edit, it is the navigation around it.',

  quickAnswer:
    'This is an MCP server exposing a WordPress site to Claude Code as a set of typed tools: list and read posts, update content and meta fields, and inspect the block structure of a page. It authenticates with an application password scoped to a single editor account, and it deliberately refuses to touch plugins, themes, users, or anything outside the posts and pages it was pointed at. In practice it turns a batch of small copy and metadata edits from an afternoon of admin-UI navigation into a single reviewed diff. It is not a general WordPress automation tool and it does not attempt to be — the narrow surface is what makes it safe enough to point at a live site.',

  stack: [
    'TypeScript + @modelcontextprotocol/sdk',
    'WordPress REST API v2',
    'Application Passwords for auth (no plugin install required)',
    'Zod for tool input schemas',
    'Claude Code as the client',
  ],

  artifacts: [
    {
      type: 'repo',
      label: 'source-repo',
      caption:
        'Full server source, tool schemas and the auth setup notes. Placeholder until the repo is published — the URL goes here at Checkpoint 2.',
    },
    {
      type: 'output-sample',
      label: 'edit-transcript',
      caption:
        'A real transcript of a batch metadata edit across nine pages, including the two the server refused to touch and why.',
    },
  ],

  results: [
    {
      metric: 'Time to apply a batch of 9 metadata edits',
      before: '~45 min via admin UI',
      after: '~6 min including review',
      provenance: 'estimated',
    },
    {
      metric: 'Edits requiring manual correction afterwards',
      after: '2 of 9 on the first run',
      provenance: 'estimated',
    },
  ],

  limitations: [
    'Posts and pages only — no plugin, theme, user or settings access, by design',
    'No media upload; images still go through the admin UI or a separate pipeline',
    'Block-editor content is read and written as serialised block markup, so complex layouts are easy to break and should be reviewed as a diff',
    'Single-site scoped: pointing it at a multisite install is untested and probably unwise',
    'No dry-run mode yet, which is the next thing worth building',
  ],

  sections: [
    {
      type: 'prose',
      heading: 'Why an MCP server rather than a script',
      body: [
        'A script would have solved the mechanical part. What it would not have solved is the part where you do not know in advance which nine pages need the edit, or what the right copy is until you have read the existing page.',
        'Exposing the site as tools puts that exploration in the same loop as the edit. The model reads a page, proposes the change, and applies it — and because each tool call is discrete and typed, every step is inspectable rather than buried inside one opaque batch job.',
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      heading: 'The narrow surface is the safety mechanism',
      body: 'The first version exposed the whole REST API. That was a mistake — the model had no reason to touch plugin endpoints, and a tool that exists will eventually be called. Cutting the surface to posts, pages and their meta made the thing genuinely safe to point at a client site.',
    },
    {
      type: 'steps',
      heading: 'How it is wired',
      steps: [
        {
          title: 'Auth with an application password, not admin credentials',
          body: 'Create a dedicated editor-role user and generate an application password for it. The server never sees a login, and revoking access is one click.',
        },
        {
          title: 'Define tools narrowly, with Zod schemas',
          body: 'One tool per operation, each with an explicit input schema. Narrow schemas mean fewer malformed calls and a clearer audit trail than a single generic "call the REST API" tool.',
        },
        {
          title: 'Return block structure, not just rendered HTML',
          body: 'Reading a page as serialised blocks lets edits target a specific block rather than regex-ing rendered output, which is what stops layouts breaking.',
        },
        {
          title: 'Review as a diff before writing',
          body: 'The server returns the proposed new content for confirmation rather than writing immediately. This is the step that makes the whole thing usable on a live site.',
        },
      ],
    },
  ],

  faqs: [
    {
      question: 'What is an MCP server?',
      answer:
        'A small program that exposes a system as a set of typed tools an AI client can call. Instead of the model guessing at an API, it gets a defined list of operations with schemas, and every call is discrete and inspectable.',
    },
    {
      question: 'Do I need a plugin to use the WordPress REST API this way?',
      answer:
        'No. The REST API is built in, and application passwords are a core feature. That is deliberate — anything requiring a plugin install on a client site is a much harder sell.',
    },
    {
      question: 'Is it safe to let an AI edit a live WordPress site?',
      answer:
        'Only with a narrow tool surface and a review step. This server exposes posts and pages only, refuses plugin and user operations outright, and returns proposed changes for confirmation before writing.',
    },
    {
      question: 'Can it edit block-editor layouts?',
      answer:
        'It reads and writes serialised block markup, which works well for text and metadata and is risky for complex nested layouts. Review those as a diff rather than trusting them blind.',
    },
    {
      question: 'How does authentication work?',
      answer:
        'A dedicated editor-role user with an application password. The server never holds admin credentials, and access can be revoked from the WordPress user screen without touching the server.',
    },
    {
      question: 'Does this work with page builders like Elementor?',
      answer:
        'Not usefully. Builders store layout in their own post meta formats rather than standard blocks, so the content the REST API exposes is not the content the builder renders.',
    },
    {
      question: 'What happens if the model proposes a bad edit?',
      answer:
        'It surfaces as a diff before anything is written, which is where most bad edits get caught. There is no automatic rollback yet, so the recommended practice is still a database snapshot before a large batch.',
    },
    {
      question: 'Would this work for a non-WordPress CMS?',
      answer:
        'The pattern transfers directly — narrow tools, typed schemas, a review step — but the implementation is WordPress-specific. Most of the work was in the block serialisation, which does not port.',
    },
  ],

  schema: {
    '@type': 'Article',
    about: [{ name: 'Model Context Protocol', type: 'SoftwareApplication' }],
  },

  related: ['/experiments/faq-schema-ai-citations/', '/studio/comfyui-infographic-pipeline/'],
};

export default build;

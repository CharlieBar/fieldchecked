import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Minimal inline formatter for content strings: [label](href), `code` and
 * **bold**. Deliberately tiny and React-node based — no dangerouslySetInnerHTML,
 * so content files can never inject markup into the page.
 */
const PATTERN = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g;

export function inline(text: string): ReactNode[] {
  return text.split(PATTERN).filter(Boolean).map((chunk, index) => {
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(chunk);
    if (link) {
      const [, label, href] = link;
      const external = href.startsWith('http');
      return external ? (
        <a
          key={index}
          href={href}
          rel="noopener noreferrer nofollow"
          target="_blank"
          className="text-primary underline underline-offset-[3px]"
        >
          {label}
        </a>
      ) : (
        <Link
          key={index}
          href={href}
          className="text-primary underline underline-offset-[3px]"
        >
          {label}
        </Link>
      );
    }

    const code = /^`([^`]+)`$/.exec(chunk);
    if (code) {
      return (
        <code
          key={index}
          className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-display text-[0.9em] text-primary"
        >
          {code[1]}
        </code>
      );
    }

    const bold = /^\*\*([^*]+)\*\*$/.exec(chunk);
    if (bold) {
      return (
        <strong key={index} className="font-semibold text-text">
          {bold[1]}
        </strong>
      );
    }

    return <span key={index}>{chunk}</span>;
  });
}

import Link from 'next/link';
import { site } from '@/content/global/site';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <p className="font-display text-xs uppercase tracking-widest text-accent">404</p>
      <h1 className="mt-4 text-hero font-bold">No page at this address</h1>
      <p className="mt-4 text-secondary">
        The URL may have changed, or the page may not have shipped yet.
      </p>
      <nav aria-label="Suggested sections" className="mt-8 flex flex-wrap justify-center gap-3">
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded border border-border px-4 py-2 font-display text-sm transition-colors hover:border-primary/60"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

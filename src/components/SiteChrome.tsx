import Link from 'next/link';
import { site } from '@/content/global/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5">
        <Link href="/" className="group flex items-baseline gap-1.5 font-display">
          <span className="text-lg font-bold tracking-tight">{site.name}</span>
          <span
            aria-hidden="true"
            className="h-4 w-2 translate-y-px bg-primary opacity-80 transition-opacity group-hover:opacity-100"
          />
        </Link>

        <nav aria-label="Primary" className="overflow-x-auto">
          <ul className="flex items-center gap-1 font-display text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded px-2.5 py-1.5 text-secondary transition-colors hover:bg-surface hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-base font-bold">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-secondary">
              {site.footer.blurb}
            </p>
          </div>

          {site.footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <p className="font-display text-xs uppercase tracking-widest text-secondary">
                {column.heading}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-text/80 hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-secondary md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl">{site.footer.legal}</p>
          <div className="flex items-center gap-4">
            {site.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                rel="noopener noreferrer"
                target="_blank"
                className="hover:text-primary"
              >
                {social.label}
              </a>
            ))}
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

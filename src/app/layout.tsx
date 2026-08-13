import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/content/global/site';
import { buildSiteSchema } from '@/lib/schema';
import './globals.css';

/*
 * Fonts are self-hosted from the @fontsource-variable packages rather than
 * fetched from Google Fonts: no third-party request on first paint, no
 * build-time network dependency, and one less thing between the user and
 * largest contentful paint. Variable weights keep it to one file each.
 */
const inter = localFont({
  src: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-inter',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

const jetbrainsMono = localFont({
  src: '../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
  display: 'swap',
  weight: '100 800',
  variable: '--font-jetbrains-mono',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});

/*
 * Search Console ownership token, rendered as <meta name="google-site-verification">.
 *
 * Deliberately an env var rather than a field in site.ts: it is deployment
 * configuration, not something a reader ever sees, and it is scoped to one
 * origin — moving to a custom domain means a new GSC property and a new token,
 * while site.ts stays the content layer's business. Absent locally, so dev and
 * preview builds simply omit the tag.
 *
 * Set in the Netlify UI (or via MCP) as GOOGLE_SITE_VERIFICATION. Read at build
 * time on the server, so it never reaches the client bundle.
 */
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: site.titleTemplate,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author.name, url: site.author.url }],
  creator: site.author.name,
  publisher: site.name,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: '#0b0e11',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <JsonLd data={buildSiteSchema()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:font-display focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

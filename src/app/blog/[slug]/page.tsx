import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleShell } from '@/components/ArticleShell';
import { bySlug, posts } from '@/content';
import { hubs } from '@/lib/content';
import { metadataFrom, trail } from '@/lib/seo';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = bySlug(posts, slug);
  if (!post) return {};
  return metadataFrom(post.seo, { status: post.status });
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = bySlug(posts, slug);
  if (!post) notFound();

  return (
    <ArticleShell
      content={post}
      label={hubs.blog.label}
      trail={trail(
        { name: hubs.blog.name, path: hubs.blog.path },
        { name: post.hero.headline, path: post.seo.canonical },
      )}
      meta={
        <>
          <span className="capitalize">{post.category}</span>
          <span>{post.readingTimeMinutes} min read</span>
        </>
      }
    />
  );
}

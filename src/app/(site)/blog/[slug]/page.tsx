import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Tag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { PostCard } from "@/components/site/post-card";
import { getAllPosts, getPostBySlug } from "@/lib/store";
import { renderMarkdown } from "@/lib/markdown";
import { SITE, whatsappLink, cn } from "@/lib/utils";

export const revalidate = 60;

type RouteParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: RouteParams;
}) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()]);
  if (!post || post.status !== "published") notFound();

  const html = await renderMarkdown(post.content);

  const related = allPosts
    .filter(
      (p) =>
        p.status === "published" &&
        p.slug !== post.slug &&
        p.category === post.category,
    )
    .slice(0, 3);
  const fallback = allPosts
    .filter((p) => p.status === "published" && p.slug !== post.slug)
    .slice(0, 3);
  const recommended = related.length ? related : fallback;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.publishedAt).toISOString(),
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <Section className="pt-10 md:pt-16">
        <div className="mb-6 flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
          <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/blog" className="hover:text-[var(--primary)]">Blog</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[var(--foreground)] line-clamp-1">{post.title}</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)] backdrop-blur">
              {post.category}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            {post.title}
          </h1>
          <p className="mt-5 text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--muted-foreground)]">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4 text-[var(--primary)]" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[var(--primary)]" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[var(--primary)]" />
              {post.readingMinutes} min read
            </span>
          </div>

          {/* Decorative cover */}
          <div
            className={cn(
              "relative mt-10 aspect-[2/1] overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br",
              post.coverColor || "from-cyan-500 to-blue-600",
            )}
          >
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="font-display text-white/95 text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg text-center px-8 max-w-3xl line-clamp-3">
                {post.title}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Body */}
      <Section className="pt-0">
        <article className="prose-jss max-w-3xl mx-auto">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        {/* Tags */}
        {post.tags.length > 0 ? (
          <div className="max-w-3xl mx-auto mt-12 flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-[var(--muted-foreground)]" />
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)]/40 px-3 py-1 text-xs text-[var(--muted-foreground)] backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {/* Author callout / CTA */}
        <div className="max-w-3xl mx-auto mt-12 rounded-3xl border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_10%,transparent),color-mix(in_oklab,var(--accent-2)_10%,transparent))] p-8">
          <h3 className="font-display text-2xl font-bold tracking-tight">
            Want to discuss this with our team?
          </h3>
          <p className="mt-3 text-[var(--muted-foreground)]">
            We&apos;re building software like this for businesses across BD, UAE, and the US.
            Tell us what you&apos;re working on.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              href={whatsappLink(`Hi! I read your post "${post.title}" and would like to discuss.`)}
              external
              variant="whatsapp"
              size="md"
            >
              Chat on WhatsApp
            </Button>
            <Button href="/services" variant="outline" size="md">
              See our services <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* Related */}
      {recommended.length > 0 ? (
        <Section className="bg-[var(--surface)]/20">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                Related Articles
              </span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
                Keep reading
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-1 text-sm text-[var(--primary)] hover:gap-2 transition"
            >
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </div>
      </Section>
    </>
  );
}

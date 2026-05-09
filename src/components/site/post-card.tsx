import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/data/types";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--primary)]/40 hover:shadow-[0_24px_60px_-20px_color-mix(in_oklab,var(--primary)_50%,transparent)]"
    >
      <div
        className={cn(
          "relative aspect-[16/9] overflow-hidden border-b border-[var(--border)] bg-gradient-to-br",
          post.coverColor || "from-cyan-500 to-blue-600",
        )}
      >
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/90">
          <span className="rounded-full bg-black/30 backdrop-blur px-2.5 py-1 font-medium">
            {post.category}
          </span>
          <span className="rounded-full bg-black/30 backdrop-blur px-2.5 py-1 font-medium inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingMinutes} min read
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg md:text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1 text-[var(--primary)] font-medium">
            Read
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:rotate-12" />
          </span>
        </div>
      </div>
    </Link>
  );
}

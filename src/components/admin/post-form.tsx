"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { savePostAction } from "@/app/admin/actions";
import type { BlogPost } from "@/data/types";

const COVER_COLORS = [
  { value: "from-cyan-500 to-blue-600", label: "Cyan → Blue" },
  { value: "from-blue-500 to-violet-600", label: "Blue → Violet" },
  { value: "from-violet-500 to-pink-600", label: "Violet → Pink" },
  { value: "from-emerald-500 to-cyan-600", label: "Emerald → Cyan" },
  { value: "from-amber-500 to-pink-600", label: "Amber → Pink" },
];

const labelCls = "block text-sm font-medium text-[var(--foreground)] mb-1.5";
const inputCls =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)]/40 px-3 py-2 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-2 focus:outline-[var(--ring)] focus:outline-offset-2";

export function PostForm({
  post,
  isNew,
}: {
  post: BlogPost;
  isNew: boolean;
}) {
  return (
    <form action={savePostAction} className="space-y-8">
      <div className="flex items-center justify-between gap-4 sticky top-16 z-20 -mx-4 md:-mx-8 px-4 md:px-8 py-4 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/admin/blog"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)]/40 text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0">
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight truncate">
              {isNew ? "New Blog Post" : `Edit: ${post.title}`}
            </h1>
            <div className="text-xs text-[var(--muted-foreground)] truncate">
              <code>{post.slug || "auto-from-title"}</code>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--primary),var(--accent),var(--accent-2))] px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--primary)_60%,transparent)] hover:-translate-y-0.5 transition flex-shrink-0"
        >
          <Save className="h-4 w-4" />
          Save
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <fieldset className="glass rounded-2xl p-6 space-y-4">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Article
            </legend>

            <div>
              <label className={labelCls} htmlFor="title">Title</label>
              <input id="title" name="title" required defaultValue={post.title} className={inputCls} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="slug">Slug</label>
                <input id="slug" name="slug" defaultValue={post.slug} className={inputCls} placeholder="auto-from-title" />
              </div>
              <div>
                <label className={labelCls} htmlFor="author">Author</label>
                <input id="author" name="author" defaultValue={post.author} className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls} htmlFor="excerpt">Excerpt (used on cards & meta description)</label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                defaultValue={post.excerpt}
                className={inputCls}
                placeholder="One or two sentences. Hook + payoff."
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="content">Content (Markdown)</label>
              <textarea
                id="content"
                name="content"
                rows={22}
                defaultValue={post.content}
                className={inputCls + " font-mono text-[13px]"}
                placeholder="## Section heading\n\nWrite your article in markdown. Use **bold**, *italics*, [links](https://...), code blocks, lists, etc."
              />
              <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                Markdown supported: headings, bold/italic, links, lists, blockquotes, fenced code blocks.
              </p>
            </div>
          </fieldset>
        </div>

        <div className="space-y-6">
          <fieldset className="glass rounded-2xl p-6 space-y-4">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Visibility
            </legend>
            <div>
              <label className={labelCls} htmlFor="status">Status</label>
              <select id="status" name="status" defaultValue={post.status} className={inputCls}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="publishedAt">Published date</label>
              <input
                id="publishedAt"
                name="publishedAt"
                type="date"
                defaultValue={post.publishedAt}
                className={inputCls}
              />
            </div>
          </fieldset>

          <fieldset className="glass rounded-2xl p-6 space-y-4">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Taxonomy
            </legend>
            <div>
              <label className={labelCls} htmlFor="category">Category</label>
              <input
                id="category"
                name="category"
                defaultValue={post.category}
                className={inputCls}
                list="post-cats"
              />
              <datalist id="post-cats">
                {[
                  "Software Testing",
                  "API Testing",
                  "ERP",
                  "Tutorials",
                  "Engineering",
                  "Business Automation",
                  "Case Studies",
                  "Product Updates",
                ].map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label className={labelCls} htmlFor="tags">Tags (comma-separated)</label>
              <input
                id="tags"
                name="tags"
                defaultValue={post.tags.join(", ")}
                placeholder="QA, Automation, DevOps"
                className={inputCls}
              />
            </div>
          </fieldset>

          <fieldset className="glass rounded-2xl p-6 space-y-4">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Cover Color
            </legend>
            <div>
              <label className={labelCls} htmlFor="coverColor">Gradient</label>
              <select
                id="coverColor"
                name="coverColor"
                defaultValue={post.coverColor}
                className={inputCls}
              >
                {COVER_COLORS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className="glass rounded-2xl p-6 space-y-4">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              SEO
            </legend>
            <div>
              <label className={labelCls} htmlFor="metaTitle">Meta Title</label>
              <input
                id="metaTitle"
                name="metaTitle"
                defaultValue={post.metaTitle ?? ""}
                placeholder="Optional — falls back to title"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="metaDescription">Meta Description</label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                rows={3}
                defaultValue={post.metaDescription ?? ""}
                placeholder="Optional — falls back to excerpt"
                className={inputCls}
              />
            </div>
          </fieldset>
        </div>
      </div>
    </form>
  );
}

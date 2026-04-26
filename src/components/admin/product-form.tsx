"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Repeater } from "@/components/admin/repeater";
import { saveProductAction } from "@/app/admin/actions";
import type { Product } from "@/data/types";

const ICONS = [
  "Calculator", "HeartPulse", "Factory", "Cog", "UsersRound", "Store",
  "Briefcase", "ShoppingBag", "FileSignature", "Banknote", "Sparkles",
  "Code2", "Globe", "Package",
];

const labelCls = "block text-sm font-medium text-[var(--foreground)] mb-1.5";
const inputCls =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)]/40 px-3 py-2 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-2 focus:outline-[var(--ring)] focus:outline-offset-2";
const innerInputCls =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 px-3 py-2 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-2 focus:outline-[var(--ring)] focus:outline-offset-2";

export function ProductForm({
  product,
  isNew,
}: {
  product: Product;
  isNew: boolean;
}) {
  return (
    <form action={saveProductAction} className="space-y-8">
      <div className="flex items-center justify-between gap-4 sticky top-16 z-20 -mx-4 md:-mx-8 px-4 md:px-8 py-4 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/admin/products"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)]/40 text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0">
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight truncate">
              {isNew ? "New Product" : `Edit: ${product.title}`}
            </h1>
            <div className="text-xs text-[var(--muted-foreground)] truncate">
              <code>{product.slug || "auto-from-title"}</code>
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
              Basic Info
            </legend>

            <div>
              <label className={labelCls} htmlFor="title">Title</label>
              <input id="title" name="title" required defaultValue={product.title} className={inputCls} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="slug">Slug</label>
                <input id="slug" name="slug" defaultValue={product.slug} className={inputCls} placeholder="auto-from-title" />
              </div>
              <div>
                <label className={labelCls} htmlFor="category">Category</label>
                <input id="category" name="category" defaultValue={product.category} className={inputCls} list="product-cats" />
                <datalist id="product-cats">
                  {["ERP", "Finance", "Healthcare", "HR", "Retail", "E-commerce", "Recruitment", "Government Tools"].map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            <div>
              <label className={labelCls} htmlFor="tagline">Tagline</label>
              <input id="tagline" name="tagline" defaultValue={product.tagline} className={inputCls} />
            </div>

            <div>
              <label className={labelCls} htmlFor="description">Short Description</label>
              <textarea id="description" name="description" rows={3} defaultValue={product.description} className={inputCls} />
            </div>

            <div>
              <label className={labelCls} htmlFor="longDescription">Long Description</label>
              <textarea id="longDescription" name="longDescription" rows={7} defaultValue={product.longDescription} className={inputCls} />
            </div>
          </fieldset>

          <fieldset className="glass rounded-2xl p-6 space-y-3">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Features
            </legend>
            <Repeater
              initial={product.features}
              newItem={() => ({ title: "", description: "" })}
              itemLabel="Feature"
              render={(item) => (
                <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
                  <input
                    type="text"
                    name="feature_title[]"
                    defaultValue={item.title}
                    placeholder="Feature title"
                    className={innerInputCls}
                  />
                  <input
                    type="text"
                    name="feature_description[]"
                    defaultValue={item.description}
                    placeholder="Description"
                    className={innerInputCls}
                  />
                </div>
              )}
            />
          </fieldset>

          <fieldset className="glass rounded-2xl p-6 space-y-3">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              FAQ
            </legend>
            <Repeater
              initial={product.faqs}
              newItem={() => ({ q: "", a: "" })}
              itemLabel="Question"
              render={(item) => (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="faq_q[]"
                    defaultValue={item.q}
                    placeholder="Question"
                    className={innerInputCls}
                  />
                  <textarea
                    name="faq_a[]"
                    rows={3}
                    defaultValue={item.a}
                    placeholder="Answer"
                    className={innerInputCls}
                  />
                </div>
              )}
            />
          </fieldset>
        </div>

        <div className="space-y-6">
          <fieldset className="glass rounded-2xl p-6 space-y-4">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Visibility
            </legend>
            <div>
              <label className={labelCls} htmlFor="status">Status</label>
              <select id="status" name="status" defaultValue={product.status} className={inputCls}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </fieldset>

          <fieldset className="glass rounded-2xl p-6 space-y-4">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Visual
            </legend>
            <div>
              <label className={labelCls} htmlFor="icon">Icon</label>
              <select id="icon" name="icon" defaultValue={product.icon} className={inputCls}>
                {ICONS.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className="glass rounded-2xl p-6 space-y-3">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Modules (one per line)
            </legend>
            <textarea
              name="modules"
              rows={6}
              defaultValue={product.modules.join("\n")}
              className={inputCls}
            />
          </fieldset>

          <fieldset className="glass rounded-2xl p-6 space-y-3">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Benefits (one per line)
            </legend>
            <textarea
              name="benefits"
              rows={5}
              defaultValue={product.benefits.join("\n")}
              className={inputCls}
            />
          </fieldset>

          <fieldset className="glass rounded-2xl p-6 space-y-3">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Technologies (one per line)
            </legend>
            <textarea
              name="technologies"
              rows={5}
              defaultValue={product.technologies.join("\n")}
              className={inputCls}
            />
          </fieldset>

          <fieldset className="glass rounded-2xl p-6 space-y-4">
            <legend className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              SEO
            </legend>
            <div>
              <label className={labelCls} htmlFor="metaTitle">Meta Title</label>
              <input id="metaTitle" name="metaTitle" defaultValue={product.metaTitle ?? ""} className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="metaDescription">Meta Description</label>
              <textarea id="metaDescription" name="metaDescription" rows={3} defaultValue={product.metaDescription ?? ""} className={inputCls} />
            </div>
          </fieldset>
        </div>
      </div>
    </form>
  );
}

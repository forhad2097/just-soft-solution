import Link from "next/link";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { getAllProducts } from "@/lib/store";
import { deleteProductAction } from "@/app/admin/actions";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const products = await getAllProducts();
  const { saved, deleted } = await searchParams;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Products</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            {products.length} total · {products.filter((p) => p.status === "published").length} published
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--primary),var(--accent),var(--accent-2))] px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--primary)_60%,transparent)] hover:-translate-y-0.5 transition"
        >
          <Plus className="h-4 w-4" /> New Product
        </Link>
      </div>

      {saved ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          Product <code>{saved}</code> saved successfully.
        </div>
      ) : null}
      {deleted ? (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          Product <code>{deleted}</code> deleted.
        </div>
      ) : null}

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--surface)]/40 border-b border-[var(--border)]">
            <tr className="text-left text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3 hidden md:table-cell">Slug</th>
              <th className="px-5 py-3 hidden md:table-cell">Category</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.slug} className="border-b border-[var(--border)] last:border-0">
                <td className="px-5 py-3">
                  <Link
                    href={`/admin/products/${p.slug}`}
                    className="font-medium hover:text-[var(--primary)]"
                  >
                    {p.title}
                  </Link>
                  <div className="text-xs text-[var(--muted-foreground)] line-clamp-1 md:hidden">
                    {p.slug}
                  </div>
                </td>
                <td className="px-5 py-3 text-[var(--muted-foreground)] hidden md:table-cell">
                  <code className="text-xs">{p.slug}</code>
                </td>
                <td className="px-5 py-3 text-[var(--muted-foreground)] hidden md:table-cell">
                  {p.category}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={
                      p.status === "published"
                        ? "rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wider"
                        : "rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wider"
                    }
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/products/${p.slug}`}
                      target="_blank"
                      title="View on site"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/products/${p.slug}`}
                      title="Edit"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="slug" value={p.slug} />
                      <button
                        type="submit"
                        title="Delete"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 text-[var(--muted-foreground)] hover:text-red-400 hover:border-red-500/40 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

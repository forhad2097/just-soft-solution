import Link from "next/link";
import {
  Wrench,
  Package,
  CheckCircle2,
  CircleDashed,
  ArrowRight,
  Plus,
} from "lucide-react";
import { getStats, getAllServices, getAllProducts } from "@/lib/store";

export default async function DashboardPage() {
  const [stats, services, products] = await Promise.all([
    getStats(),
    getAllServices(),
    getAllProducts(),
  ]);

  const recentServices = [...services].slice(0, 5);
  const recentProducts = [...products].slice(0, 5);

  const statCards = [
    {
      label: "Total Services",
      value: stats.totalServices,
      icon: Wrench,
      detail: `${stats.publishedServices} published · ${stats.draftServices} draft`,
    },
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      detail: `${stats.publishedProducts} published · ${stats.draftProducts} draft`,
    },
    {
      label: "Published",
      value: stats.publishedServices + stats.publishedProducts,
      icon: CheckCircle2,
      detail: "Visible on the live website",
    },
    {
      label: "Drafts",
      value: stats.draftServices + stats.draftProducts,
      icon: CircleDashed,
      detail: "Hidden from the public",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
          Welcome back 👋
        </h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Manage services, products, and content visible on the live website.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, detail }) => (
          <div
            key={label}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                {label}
              </span>
              <Icon className="h-4 w-4 text-[var(--primary)]" />
            </div>
            <div className="mt-3 font-display text-3xl font-bold text-gradient">
              {value}
            </div>
            <div className="mt-1 text-xs text-[var(--muted-foreground)]">{detail}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent services</h2>
            <Link
              href="/admin/services"
              className="text-sm text-[var(--primary)] hover:underline"
            >
              View all <ArrowRight className="inline h-3 w-3" />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-[var(--border)]">
            {recentServices.map((s) => (
              <li key={s.slug} className="py-3 flex items-center justify-between">
                <div>
                  <Link
                    href={`/admin/services/${s.slug}`}
                    className="font-medium hover:text-[var(--primary)]"
                  >
                    {s.title}
                  </Link>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    {s.category} · {s.status}
                  </div>
                </div>
                <span
                  className={
                    s.status === "published"
                      ? "rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wider"
                      : "rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wider"
                  }
                >
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/admin/services/new"
            className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--primary)] hover:gap-2 transition"
          >
            <Plus className="h-4 w-4" /> New service
          </Link>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent products</h2>
            <Link
              href="/admin/products"
              className="text-sm text-[var(--primary)] hover:underline"
            >
              View all <ArrowRight className="inline h-3 w-3" />
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-[var(--border)]">
            {recentProducts.map((p) => (
              <li key={p.slug} className="py-3 flex items-center justify-between">
                <div>
                  <Link
                    href={`/admin/products/${p.slug}`}
                    className="font-medium hover:text-[var(--primary)]"
                  >
                    {p.title}
                  </Link>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    {p.category} · {p.status}
                  </div>
                </div>
                <span
                  className={
                    p.status === "published"
                      ? "rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wider"
                      : "rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wider"
                  }
                >
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/admin/products/new"
            className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--primary)] hover:gap-2 transition"
          >
            <Plus className="h-4 w-4" /> New product
          </Link>
        </div>
      </div>

      <div className="text-xs text-[var(--muted-foreground)]">
        Store last updated: {stats.updatedAt}
      </div>
    </div>
  );
}

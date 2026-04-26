"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ServiceCard } from "@/components/site/service-card";
import { ProductCard } from "@/components/site/product-card";
import type { Service, Product } from "@/data/types";
import { cn } from "@/lib/utils";

type ServicesGrid = { kind: "services"; items: Service[]; categories: string[] };
type ProductsGrid = { kind: "products"; items: Product[]; categories: string[] };
type Props = ServicesGrid | ProductsGrid;

export function FilterableGrid(props: Props) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (props.items as (Service | Product)[]).filter((it) => {
      const inCat = active === "All" || it.category === active;
      const inSearch =
        !q ||
        it.title.toLowerCase().includes(q) ||
        it.description.toLowerCase().includes(q) ||
        it.tagline.toLowerCase().includes(q);
      return inCat && inSearch;
    });
  }, [props.items, active, query]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
        <div className="flex flex-wrap gap-2">
          {props.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                active === cat
                  ? "border-transparent bg-[linear-gradient(135deg,var(--primary),var(--accent-2))] text-white shadow-[0_8px_24px_-8px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
                  : "border-[var(--border)] bg-[var(--surface)]/40 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--primary)]/40",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={props.kind === "services" ? "Search services..." : "Search products..."}
            className="w-full rounded-full border border-[var(--border)] bg-[var(--surface)]/40 pl-10 pr-4 py-2 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-2 focus:outline-[var(--ring)] focus:outline-offset-2 backdrop-blur"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--muted-foreground)]">
          No {props.kind} match your filters.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {props.kind === "services"
            ? (filtered as Service[]).map((s) => <ServiceCard key={s.slug} service={s} />)
            : (filtered as Product[]).map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </div>
  );
}

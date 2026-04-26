import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { Product } from "@/data/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--accent-2)]/40 hover:shadow-[0_24px_60px_-20px_color-mix(in_oklab,var(--accent-2)_50%,transparent)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent)_18%,transparent),color-mix(in_oklab,var(--accent-2)_18%,transparent))]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-[var(--surface)]/70 border border-[var(--border)] backdrop-blur-md text-[var(--foreground)] transition group-hover:scale-110">
            <DynamicIcon name={product.icon} className="h-9 w-9 text-[var(--primary)]" />
          </div>
        </div>
        <span className="absolute top-3 left-3 text-[10px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] rounded-full border border-[var(--border)] bg-[var(--surface)]/70 px-2.5 py-1 backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-[var(--foreground)]">
          {product.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-3">
          {product.description}
        </p>
        <div className="mt-5 flex items-center gap-1 text-sm font-medium text-[var(--accent)] transition group-hover:gap-2">
          View Details
          <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-12" />
        </div>
      </div>
    </Link>
  );
}

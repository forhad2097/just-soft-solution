import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import type { Service } from "@/data/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--primary)]/40 hover:shadow-[0_24px_60px_-20px_color-mix(in_oklab,var(--primary)_50%,transparent)]"
    >
      <div className="absolute -inset-1 -z-10 bg-[radial-gradient(circle_at_top_left,_color-mix(in_oklab,_var(--primary)_25%,_transparent),_transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-center justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_15%,transparent),color-mix(in_oklab,var(--accent-2)_15%,transparent))] border border-[var(--border)] text-[var(--primary)]">
          <DynamicIcon name={service.icon} className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] rounded-full border border-[var(--border)] px-2.5 py-1">
          {service.category}
        </span>
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold text-[var(--foreground)]">
        {service.title}
      </h3>
      <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-3">
        {service.description}
      </p>

      <div className="mt-5 flex items-center gap-1 text-sm font-medium text-[var(--primary)] transition group-hover:gap-2">
        Learn more
        <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-12" />
      </div>
    </Link>
  );
}

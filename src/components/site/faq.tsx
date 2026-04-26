"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={cn(
              "rounded-2xl border bg-[var(--surface)]/40 backdrop-blur transition-all",
              isOpen
                ? "border-[var(--primary)]/30 shadow-[0_8px_32px_-8px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
                : "border-[var(--border)]",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-medium text-[var(--foreground)]">{it.q}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 flex-shrink-0 text-[var(--primary)] transition-transform duration-300",
                  isOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

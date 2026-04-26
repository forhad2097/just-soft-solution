"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState, type ReactNode } from "react";

export function Repeater<T>({
  initial,
  newItem,
  render,
  itemLabel = "Item",
}: {
  initial: T[];
  newItem: () => T;
  render: (item: T, index: number) => ReactNode;
  itemLabel?: string;
}) {
  const [items, setItems] = useState<T[]>(initial.length ? initial : [newItem()]);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/30 p-4 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
              {itemLabel} {i + 1}
            </span>
            {items.length > 1 ? (
              <button
                type="button"
                onClick={() => setItems(items.filter((_, idx) => idx !== i))}
                className="grid h-7 w-7 place-items-center rounded-lg border border-[var(--border)] text-[var(--muted-foreground)] hover:text-red-400 hover:border-red-500/40 transition"
                aria-label="Remove"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
          {render(item, i)}
        </div>
      ))}
      <button
        type="button"
        onClick={() => setItems([...items, newItem()])}
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--border)] px-4 py-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)]/40 transition"
      >
        <Plus className="h-4 w-4" /> Add {itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

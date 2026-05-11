import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { FilterableGrid } from "@/components/site/filterable-grid";
import { safeGetAllProducts } from "@/lib/store";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Battle-tested software products from Just Soft Solution: ERP, accounting, healthcare, manufacturing, HR, POS, multivendor e-commerce, and government compliance tools.",
};

export default async function ProductsPage() {
  const all = await safeGetAllProducts();
  const published = all.filter((p) => p.status === "published");
  const categories = ["All", ...Array.from(new Set(published.map((p) => p.category)))];

  return (
    <>
      <Section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--primary)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Our Products
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Software That{" "}
            <span className="text-gradient">Powers Real Businesses</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed">
            Years of customer feedback distilled into ready-to-deploy products.
            From hospital management to multi-vendor marketplaces, manufacturing
            ERP to government compliance tools — each product is in active
            production, continuously improved, and supported by senior engineers.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeader
          eyebrow={`${published.length} Products`}
          title={<>Pick a product. <span className="text-gradient">Run it tomorrow.</span></>}
          align="left"
        />
        <FilterableGrid
          kind="products"
          items={published}
          categories={categories}
        />
      </Section>
    </>
  );
}

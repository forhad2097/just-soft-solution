import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { FilterableGrid } from "@/components/site/filterable-grid";
import { safeGetAllServices } from "@/lib/store";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Software services from Just Soft Solution: custom development, manual & automation testing, API & security testing, big data analysis, UI/UX, digital marketing, IT consulting, and more.",
};

export default async function ServicesPage() {
  const all = await safeGetAllServices();
  const published = all.filter((s) => s.status === "published");
  const categories = ["All", ...Array.from(new Set(published.map((s) => s.category)))];

  return (
    <>
      <Section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--primary)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Our Services
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Engineering Solutions{" "}
            <span className="text-gradient">That Scale With Your Business</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed">
            From custom software and dedicated QA practices to API testing,
            big data, and digital marketing — Just Soft Solution provides the
            full stack of capabilities a modern business needs to scale. Each
            service is delivered by senior practitioners with a proven track
            record across Bangladesh, the Gulf, and the United States.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeader
          eyebrow={`${published.length} Services`}
          title={<>Pick what fits. <span className="text-gradient">We&apos;ll handle the rest.</span></>}
          align="left"
        />
        <FilterableGrid
          kind="services"
          items={published}
          categories={categories}
        />
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { BlogGrid } from "@/components/site/blog-grid";
import { getAllPosts } from "@/lib/store";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog — Software Engineering & Automation Insights",
  description:
    "Practical articles from Just Soft Solution on software testing, API testing, big data, ERP, custom software, and business automation. Written by senior engineers.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Just Soft Solution Blog",
    description:
      "Engineering essays from a working software services team — testing, automation, ERP, big data, the business of software.",
    type: "website",
  },
};

export default async function BlogPage() {
  const all = await getAllPosts();
  const published = all.filter((p) => p.status === "published");
  const categories = ["All", ...Array.from(new Set(published.map((p) => p.category)))];

  return (
    <>
      <Section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--primary)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            JSS Blog
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Engineering essays from{" "}
            <span className="text-gradient">a working software team</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed">
            Practical writing on software testing, API and security testing,
            big data, ERP, and the business of building software — drawn from
            real client engagements across Bangladesh, the UAE, and the United
            States.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeader
          eyebrow={`${published.length} articles`}
          title={<>Recent <span className="text-gradient">articles</span></>}
          align="left"
        />
        <BlogGrid items={published} categories={categories} />
      </Section>
    </>
  );
}

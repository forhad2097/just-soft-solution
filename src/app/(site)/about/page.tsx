import type { Metadata } from "next";
import Image from "next/image";
import {
  Target, Eye, Sparkles, ShieldCheck, Lightbulb, Users, BadgeCheck, Globe2, Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ServiceCard } from "@/components/site/service-card";
import { ProductCard } from "@/components/site/product-card";
import { safeGetAllServices, safeGetAllProducts } from "@/lib/store";
import { SITE, whatsappLink } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Just Soft Solution — software engineering, QA, and big data. Headquartered in Dhaka with offices in Abu Dhabi and New York.",
};

export default async function AboutPage() {
  const [services, products] = await Promise.all([safeGetAllServices(), safeGetAllProducts()]);
  return (
    <>
      <Section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--primary)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            About Just Soft Solution
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            We Engineer Software That{" "}
            <span className="text-gradient">Runs Real Businesses</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed">
            From a small Dhaka studio to a multi-country team across Bangladesh,
            UAE, and the United States — Just Soft Solution has been turning
            business operations into automated, intelligent systems for over a
            decade.
          </p>
        </div>
      </Section>

      {/* Story */}
      <Section>
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
              Our Story
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Building software since the days when&nbsp;
              <span className="text-gradient">automation was a buzzword</span>
            </h2>
          </div>
          <div className="space-y-5 text-[var(--foreground)]/90 leading-relaxed">
            <p>
              {SITE.name} started with a simple belief — every business, no
              matter how small, deserves software built around the way it
              actually works. Not generic templates. Not painful customization
              of off-the-shelf tools. Real, custom solutions.
            </p>
            <p>
              Today, we operate three offices across Bangladesh, UAE, and the
              United States, with a team of senior engineers, QA specialists,
              data engineers, designers, and consultants. We&apos;ve delivered
              hundreds of projects — from hospital systems and ERPs to
              government compliance tools and big data platforms.
            </p>
            <p>
              Our focus has always been the disciplines that matter most:
              software testing (manual + automation), API and security testing,
              and big data analysis — combined with custom development that
              ships on time and stays maintainable for years.
            </p>
          </div>
        </div>

        {/* Vector illustration under Our Story */}
        <div className="mt-12 md:mt-16 relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/40 p-6 md:p-10 backdrop-blur">
          <div
            aria-hidden
            className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,_color-mix(in_oklab,_var(--primary)_30%,_transparent),_transparent)] blur-3xl"
          />
          <div className="relative flex justify-center">
            <Image
              src="/illustrations/automation-flow.svg"
              alt="Just Soft Solution automation flow — data sources connect through our automation engine into actionable insights"
              width={800}
              height={500}
              priority={false}
              className="w-full max-w-3xl h-auto"
            />
          </div>
          <p className="relative mt-6 text-center text-sm md:text-base text-[var(--muted-foreground)] max-w-2xl mx-auto">
            From APIs and databases to dashboards and decisions — every kind of
            business artifact plugs into our automation pipeline.
          </p>
        </div>
      </Section>

      {/* Mission Vision */}
      <Section className="bg-[var(--surface)]/20">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="glass rounded-2xl p-8">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_18%,transparent),color-mix(in_oklab,var(--accent)_18%,transparent))] border border-[var(--border)] text-[var(--primary)]">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold">Our Mission</h3>
            <p className="mt-3 text-[var(--muted-foreground)] leading-relaxed">
              To convert any business operation into automated, intelligent
              software systems — fast, secure, and built to last. We measure our
              success by how much of our clients&apos; manual work disappears.
            </p>
          </div>
          <div className="glass rounded-2xl p-8">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent)_18%,transparent),color-mix(in_oklab,var(--accent-2)_18%,transparent))] border border-[var(--border)] text-[var(--accent-2)]">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold">Our Vision</h3>
            <p className="mt-3 text-[var(--muted-foreground)] leading-relaxed">
              To be the software engineering partner of choice for ambitious
              businesses across South Asia, the Gulf, and beyond — delivering
              quality, integrity, and innovation in every line of code.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeader
          eyebrow="Our Core Values"
          title={<>The principles behind every <span className="text-gradient">line of code</span></>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Integrity", d: "Honest scoping, transparent pricing, no hidden surprises." },
            { icon: Lightbulb, t: "Innovation", d: "Modern stacks, modern processes, modern thinking." },
            { icon: BadgeCheck, t: "Quality", d: "Tests, code reviews, security baselines — non-negotiable." },
            { icon: Users, t: "Customer-First", d: "Your success metric is our success metric." },
            { icon: Rocket, t: "Speed of Execution", d: "Weekly demos, fast feedback, faster delivery." },
            { icon: Globe2, t: "Global Standards", d: "Engineered to compete anywhere — BD, UAE, USA, beyond." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="glass rounded-2xl p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_15%,transparent),color-mix(in_oklab,var(--accent-2)_15%,transparent))] border border-[var(--border)] text-[var(--primary)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What we offer */}
      <Section className="bg-[var(--surface)]/20">
        <SectionHeader
          eyebrow="What We Offer"
          title={<>Services and <span className="text-gradient">Products</span></>}
          subtitle="A blend of consulting and engineering services with battle-tested products you can deploy today."
        />
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-semibold mb-4">Top Services</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.slice(0, 4).map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
            <div className="mt-5">
              <Button href="/services" variant="outline" size="sm">
                View all services
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold mb-4">Featured Products</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
            <div className="mt-5">
              <Button href="/products" variant="outline" size="sm">
                View all products
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Global presence */}
      <Section>
        <SectionHeader
          eyebrow="Global Presence"
          title={<>Three offices. <span className="text-gradient">One team.</span></>}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {SITE.offices.map((o) => (
            <div key={o.code} className="glass rounded-2xl p-6 text-center">
              <div className="text-5xl">{o.flag}</div>
              <div className="mt-3 font-display text-lg font-semibold">{o.country}</div>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{o.address}</p>
              <a
                href={`tel:${o.phoneRaw}`}
                className="mt-3 inline-flex text-sm text-[var(--primary)] hover:underline"
              >
                {o.phone}
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Let&apos;s build the next chapter together.
          </h2>
          <p className="mt-4 text-[var(--muted-foreground)]">
            Whether you have a brief or just a problem to solve, we&apos;re ready to talk.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={whatsappLink()} external variant="whatsapp" size="lg">
              Chat on WhatsApp
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Visit our offices
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

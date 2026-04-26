import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Bug,
  Zap,
  ShieldCheck,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Star,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ServiceCard } from "@/components/site/service-card";
import { ProductCard } from "@/components/site/product-card";
import { getAllServices, getAllProducts } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 60;

export default async function HomePage() {
  const [allServices, allProducts] = await Promise.all([getAllServices(), getAllProducts()]);
  const featuredServices = allServices.filter((s) => s.status === "published").slice(0, 6);
  const featuredProducts = allProducts.filter((p) => p.status === "published").slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-page relative pt-12 pb-20 md:pt-20 md:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--primary)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Software Engineering · QA · Big Data
            </span>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              We Turn{" "}
              <span className="text-gradient">Any Business</span>
              <br className="hidden sm:block" />
              Into{" "}
              <span className="text-gradient">Business Automation</span>
            </h1>

            <p className="mt-6 mx-auto max-w-2xl text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed">
              Custom software, world-class manual & automation testing, API & security
              testing, and big data analytics — engineered to scale your operations
              from Bangladesh to the Gulf to the United States.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/services" size="lg">
                Explore Services <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                href={whatsappLink("Hi! I'd like to discuss a project with Just Soft Solution.")}
                external
                variant="whatsapp"
                size="lg"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 2C6.503 2 2 6.483 2 12c0 1.945.526 3.834 1.526 5.471L2 22l4.671-1.213A9.916 9.916 0 0 0 12.04 22C17.577 22 22.08 17.517 22.08 12S17.577 2 12.04 2z" />
                </svg>
                Talk on WhatsApp
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--muted-foreground)]">
              {[
                "Custom Software",
                "Manual & Automation QA",
                "API Security Testing",
                "Big Data",
                "ERP & POS Products",
              ].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary)]" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Floating tech stack badges */}
          <div className="mt-14 md:mt-20 max-w-5xl mx-auto">
            <div className="relative grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                { name: "Next.js", icon: Code2 },
                { name: "Selenium", icon: Bug },
                { name: "Cypress", icon: Bug },
                { name: "JMeter", icon: Zap },
                { name: "Snowflake", icon: BarChart3 },
                { name: "OWASP", icon: ShieldCheck },
              ].map(({ name, icon: Icon }, i) => (
                <div
                  key={name}
                  style={{ animationDelay: `${i * 0.4}s` }}
                  className="glass animate-float-slow flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium"
                >
                  <Icon className="h-4 w-4 text-[var(--primary)]" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED MARQUEE */}
      <section className="relative border-y border-[var(--border)] bg-[var(--surface)]/30 backdrop-blur py-8 overflow-hidden">
        <div className="container-page mb-4 text-center text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
          Trusted by teams across Bangladesh · UAE · USA
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee gap-12 px-6">
            {[
              "JSS Healthcare", "Industrial ERP", "Multivendor Marketplace",
              "Manufacturing MES", "Retail POS", "HR & Payroll",
              "BMET Manpower", "Saudi Embassy Tools", "EFT Disbursement",
              "Accounting Suite", "API Test Automation", "Big Data Lake",
              "JSS Healthcare", "Industrial ERP", "Multivendor Marketplace",
              "Manufacturing MES", "Retail POS", "HR & Payroll",
              "BMET Manpower", "Saudi Embassy Tools", "EFT Disbursement",
              "Accounting Suite", "API Test Automation", "Big Data Lake",
            ].map((label, i) => (
              <span
                key={`${label}-${i}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] whitespace-nowrap"
              >
                <Star className="h-3.5 w-3.5 text-[var(--primary)]" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <Section id="services">
        <SectionHeader
          eyebrow="What We Do"
          title={<>Engineering Across the <span className="text-gradient">Software Lifecycle</span></>}
          subtitle="From idea to release, from a single feature to entire platforms — we cover the disciplines that turn software into business outcomes."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/services" variant="outline" size="md">
            View all services <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* PRODUCTS */}
      <Section id="products" className="bg-[var(--surface)]/20">
        <SectionHeader
          eyebrow="Our Products"
          title={<>Ready-Made Software That <span className="text-gradient">Powers Real Businesses</span></>}
          subtitle="Battle-tested platforms across ERP, healthcare, retail, HR, and government — deployed and trusted in production."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/products" variant="outline" size="md">
            See all products <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* STATS */}
      <Section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { n: "200+", l: "Projects Delivered" },
            { n: "50+", l: "Happy Clients" },
            { n: "3", l: "Countries · BD · UAE · USA" },
            { n: "10+", l: "Years of Engineering" },
          ].map((s) => (
            <div
              key={s.l}
              className="glass rounded-2xl p-6 md:p-8 text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient">
                {s.n}
              </div>
              <div className="mt-2 text-xs md:text-sm text-[var(--muted-foreground)] uppercase tracking-wider">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section className="bg-[var(--surface)]/20">
        <SectionHeader
          eyebrow="How We Work"
          title={<>A Process Built for <span className="text-gradient">Predictable Delivery</span></>}
          subtitle="No black boxes. Every stage is collaborative, measured, and adjustable."
        />
        <div className="relative grid gap-6 md:grid-cols-4">
          <div
            aria-hidden
            className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-[linear-gradient(90deg,transparent,var(--primary),var(--accent-2),transparent)]"
          />
          {[
            { n: "01", t: "Discover", d: "Goals, audience, constraints, success metrics — agreed upfront." },
            { n: "02", t: "Design", d: "Architecture, UX, prototypes — validated before code." },
            { n: "03", t: "Develop", d: "Iterative sprints, weekly demos, full transparency." },
            { n: "04", t: "Deliver", d: "Launch, monitor, iterate — with ongoing support." },
          ].map((p) => (
            <div
              key={p.n}
              className="relative glass rounded-2xl p-6"
            >
              <div className="font-display text-3xl font-bold text-gradient">{p.n}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <SectionHeader
          eyebrow="Testimonials"
          title={<>Teams That <span className="text-gradient">Trust Us</span></>}
          subtitle="A few words from clients we've partnered with."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              quote:
                "Just Soft Solution rebuilt our hospital management end to end. We cut discharge time by 40% in the first quarter.",
              name: "Dr. Rahman",
              role: "Hospital Director · Dhaka",
            },
            {
              quote:
                "Their automation team caught regressions our manual QA missed for years. Release confidence is night and day.",
              name: "Imran A.",
              role: "Engineering Lead · Abu Dhabi",
            },
            {
              quote:
                "EFT Auto Form Generator saved our payroll team 20 hours every month. It just works.",
              name: "Sumaiya K.",
              role: "HR Manager · Garment Group",
            },
          ].map((t, i) => (
            <div key={i} className="glass rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-[var(--primary)] text-[var(--primary)]" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-[var(--foreground)]/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto pt-4 border-t border-[var(--border)]">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-[var(--muted-foreground)]">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_10%,transparent),color-mix(in_oklab,var(--accent-2)_10%,transparent))] p-10 md:p-16">
          <div
            aria-hidden
            className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[var(--primary)] opacity-20 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[var(--accent-2)] opacity-20 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
              <Globe2 className="h-3.5 w-3.5" />
              Available globally
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight">
              Ready to automate your business?
            </h2>
            <p className="mt-4 text-base md:text-lg text-[var(--muted-foreground)]">
              Tell us where you want to be a year from now. We&apos;ll show you how
              software gets you there.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button href={whatsappLink()} external variant="whatsapp" size="lg">
                Start a Conversation
              </Button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)]"
              >
                or visit our offices →
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

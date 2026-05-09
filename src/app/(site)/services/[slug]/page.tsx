import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ServiceCard } from "@/components/site/service-card";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { Faq } from "@/components/site/faq";
import { getAllServices, getServiceBySlug } from "@/lib/store";
import { SITE, whatsappLink } from "@/lib/utils";

export const revalidate = 60;

type RouteParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.metaTitle ?? service.title,
    description: service.metaDescription ?? service.description,
    openGraph: { title: service.title, description: service.description },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: RouteParams;
}) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([getServiceBySlug(slug), getAllServices()]);
  if (!service) notFound();

  const related = allServices
    .filter((s) => s.status === "published" && s.slug !== service.slug && s.category === service.category)
    .slice(0, 3);
  const fallbackRelated = allServices
    .filter((s) => s.status === "published" && s.slug !== service.slug)
    .slice(0, 3);
  const recommended = related.length ? related : fallbackRelated;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.category,
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: ["Bangladesh", "United Arab Emirates", "United States"],
    url: `${SITE.url}/services/${service.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${SITE.url}/services/${service.slug}`,
      },
    ],
  };

  const faqSchema = service.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      {/* Hero */}
      <Section className="pt-10 md:pt-16">
        <div className="mb-6 flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
          <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/services" className="hover:text-[var(--primary)]">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[var(--foreground)]">{service.title}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              {service.category}
            </span>
            <h1 className="mt-5 font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              {service.title}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-[var(--primary)] font-medium">
              {service.tagline}
            </p>
            <p className="mt-5 text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed">
              {service.longDescription}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button
                href={whatsappLink(`Hi! I'm interested in your ${service.title} service.`)}
                external
                variant="whatsapp"
                size="lg"
              >
                Discuss this on WhatsApp
              </Button>
              <Button href="/services" variant="outline" size="lg">
                <ArrowLeft className="h-4 w-4" />
                All services
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--primary)_18%,transparent),color-mix(in_oklab,var(--accent-2)_18%,transparent))] backdrop-blur-md grid place-items-center overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative grid h-32 w-32 md:h-40 md:w-40 place-items-center rounded-3xl bg-[var(--surface)]/80 border border-[var(--border)] backdrop-blur text-[var(--primary)] shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
                <DynamicIcon name={service.icon} className="h-16 w-16 md:h-20 md:w-20" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-[var(--surface)]/20">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
            Key Benefits
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
            Why choose <span className="text-gradient">{service.title}</span> with us
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.benefits.map((b) => (
            <div key={b.title} className="glass rounded-2xl p-6">
              <CheckCircle2 className="h-6 w-6 text-[var(--primary)]" />
              <h3 className="mt-4 font-display text-base font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section>
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
            Our Approach
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
            How we deliver <span className="text-gradient">{service.title}</span>
          </h2>
        </div>
        <div className="relative grid gap-6 md:grid-cols-4">
          <div
            aria-hidden
            className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-[linear-gradient(90deg,transparent,var(--primary),var(--accent-2),transparent)]"
          />
          {service.process.map((p) => (
            <div key={p.step} className="relative glass rounded-2xl p-6">
              <div className="font-display text-3xl font-bold text-gradient">{p.step}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Tools */}
      <Section className="bg-[var(--surface)]/20">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
            Tools & Technologies
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
            What we <span className="text-gradient">work with</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {service.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)]/40 px-4 py-2 text-sm font-medium backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
        </div>
        <Faq items={service.faqs} />
      </Section>

      {/* Related */}
      <Section className="bg-[var(--surface)]/20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
              Related Services
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
              You might also need
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden md:inline-flex items-center gap-1 text-sm text-[var(--primary)] hover:gap-2 transition"
          >
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Ready to <span className="text-gradient">get started?</span>
          </h2>
          <p className="mt-4 text-[var(--muted-foreground)]">
            Tell us your goals — we&apos;ll come back with a plan in 48 hours.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              href={whatsappLink(`Hi! I'd like to discuss ${service.title}.`)}
              external
              variant="whatsapp"
              size="lg"
            >
              Discuss your project
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

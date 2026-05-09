import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/site/product-card";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { Faq } from "@/components/site/faq";
import { getAllProducts, getProductBySlug } from "@/lib/store";
import { SITE, whatsappLink } from "@/lib/utils";

export const revalidate = 60;

type RouteParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: RouteParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.metaTitle ?? product.title,
    description: product.metaDescription ?? product.description,
    openGraph: { title: product.title, description: product.description },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: RouteParams;
}) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([getProductBySlug(slug), getAllProducts()]);
  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.status === "published" && p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);
  const fallback = allProducts
    .filter((p) => p.status === "published" && p.slug !== product.slug)
    .slice(0, 3);
  const recommended = related.length ? related : fallback;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.title,
    description: product.description,
    applicationCategory: product.category,
    operatingSystem: "Web, Windows, Linux, iOS, Android",
    url: `${SITE.url}/products/${product.slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/products/${product.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE.url}/products` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `${SITE.url}/products/${product.slug}`,
      },
    ],
  };

  const faqSchema = product.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: product.faqs.map((f) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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

      <Section className="pt-10 md:pt-16">
        <div className="mb-6 flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
          <Link href="/" className="hover:text-[var(--primary)]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/products" className="hover:text-[var(--primary)]">Products</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[var(--foreground)]">{product.title}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              {product.category}
            </span>
            <h1 className="mt-5 font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              {product.title}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-[var(--accent)] font-medium">
              {product.tagline}
            </p>
            <p className="mt-5 text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed">
              {product.longDescription}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button
                href={whatsappLink(`Hi! I'd like a demo of ${product.title}.`)}
                external
                variant="whatsapp"
                size="lg"
              >
                Request Demo on WhatsApp
              </Button>
              <Button href="/products" variant="outline" size="lg">
                <ArrowLeft className="h-4 w-4" />
                All products
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl border border-[var(--border)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent)_18%,transparent),color-mix(in_oklab,var(--accent-2)_18%,transparent))] backdrop-blur-md grid place-items-center overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="relative grid h-32 w-32 md:h-40 md:w-40 place-items-center rounded-3xl bg-[var(--surface)]/80 border border-[var(--border)] backdrop-blur text-[var(--accent)] shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--accent-2)_60%,transparent)]">
                <DynamicIcon name={product.icon} className="h-16 w-16 md:h-20 md:w-20" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-[var(--surface)]/20">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
            Key Features
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
            What&apos;s in <span className="text-gradient">{product.title}</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {product.features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-5">
              <Check className="h-5 w-5 text-[var(--primary)]" />
              <h3 className="mt-3 font-display text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Modules */}
      <Section>
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
            <Layers className="h-3.5 w-3.5" /> Modules
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
            Everything you need, <span className="text-gradient">already inside</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.modules.map((m) => (
            <span
              key={m}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)]/40 px-4 py-2 text-sm font-medium backdrop-blur"
            >
              {m}
            </span>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-[var(--surface)]/20">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
              Business Benefits
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Outcomes you can <span className="text-gradient">measure</span>
            </h2>
          </div>
          <ul className="space-y-3">
            {product.benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 backdrop-blur p-4"
              >
                <Check className="h-5 w-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
                <span className="text-[var(--foreground)]/90">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Tech */}
      <Section>
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
            Technology
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
            Built on <span className="text-gradient">a modern stack</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)]/40 px-4 py-2 text-sm font-medium backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      {product.pricing && product.pricing.length > 0 ? (
        <Section className="bg-[var(--surface)]/20">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
              Pricing
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Plans that <span className="text-gradient">scale with you</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {product.pricing.map((tier, i) => (
              <div
                key={tier.tier}
                className={`relative rounded-2xl border p-6 backdrop-blur-md ${
                  i === 1
                    ? "border-[var(--primary)]/40 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_8%,transparent),transparent)] shadow-[0_24px_60px_-20px_color-mix(in_oklab,var(--primary)_40%,transparent)]"
                    : "border-[var(--border)] bg-[var(--surface)]/40"
                }`}
              >
                {i === 1 ? (
                  <span className="absolute top-4 right-4 rounded-full bg-[linear-gradient(135deg,var(--primary),var(--accent-2))] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Popular
                  </span>
                ) : null}
                <div className="text-sm font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                  {tier.tier}
                </div>
                <div className="mt-2 font-display text-3xl font-bold">{tier.price}</div>
                <ul className="mt-5 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--foreground)]/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  href={whatsappLink(`Hi! I'd like the ${tier.tier} plan of ${product.title}.`)}
                  external
                  variant={i === 1 ? "primary" : "outline"}
                  size="md"
                  className="mt-6 w-full"
                >
                  Get started
                </Button>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

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
        <Faq items={product.faqs} />
      </Section>

      {/* Related */}
      <Section className="bg-[var(--surface)]/20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
              Related Products
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Explore more
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-1 text-sm text-[var(--primary)] hover:gap-2 transition"
          >
            All products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>
    </>
  );
}

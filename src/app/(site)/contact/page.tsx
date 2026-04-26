import type { Metadata } from "next";
import { MapPin, Phone, Mail, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { SITE, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Just Soft Solution. Offices in Dhaka, Abu Dhabi, and New York. Talk to us instantly on WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--primary)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Contact Us
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Let&apos;s Build{" "}
            <span className="text-gradient">Something Great Together</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed">
            Skip the forms. Skip the email tag. Send us a message on WhatsApp and
            you&apos;ll hear back from a human within hours, not days.
          </p>
        </div>
      </Section>

      {/* WhatsApp big card */}
      <Section className="pt-0">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(135deg,rgba(37,211,102,0.12),rgba(37,211,102,0.04))] p-10 md:p-16 text-center">
          <div
            aria-hidden
            className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#25D366] opacity-15 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#25D366] opacity-15 blur-3xl"
          />

          <div className="relative">
            <div className="relative inline-grid">
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
              <span className="relative grid h-20 w-20 mx-auto place-items-center rounded-full bg-[#25D366] text-white shadow-[0_20px_50px_-10px_rgba(37,211,102,0.6)]">
                <WhatsAppIcon className="h-10 w-10" />
              </span>
            </div>

            <h2 className="mt-8 font-display text-3xl md:text-5xl font-bold tracking-tight">
              Chat with us instantly on WhatsApp
            </h2>
            <p className="mt-4 text-base md:text-lg text-[var(--muted-foreground)]">
              Send a message any time. We typically reply within hours, 7 days a week.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 px-5 py-3 backdrop-blur">
              <Phone className="h-5 w-5 text-[#25D366]" />
              <span className="font-display text-xl md:text-2xl font-bold">
                {SITE.whatsappDisplay}
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                href={whatsappLink("Hello! I'm reaching out from your website.")}
                external
                variant="whatsapp"
                size="lg"
              >
                <MessageCircle className="h-5 w-5" />
                Start Chat on WhatsApp
              </Button>
              <Button
                href={`mailto:${SITE.email}`}
                external
                variant="outline"
                size="lg"
              >
                <Mail className="h-5 w-5" />
                {SITE.email}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Offices */}
      <Section>
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
            Visit Us
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
            Our <span className="text-gradient">Global Offices</span>
          </h2>
          <p className="mt-4 text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Three offices across three time zones — so wherever your business
            runs, we run with you.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {SITE.offices.map((o) => (
            <div
              key={o.code}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]/40 p-7 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[var(--primary)]/40 hover:shadow-[0_24px_60px_-20px_color-mix(in_oklab,var(--primary)_50%,transparent)]"
            >
              <div className="absolute -inset-1 -z-10 bg-[radial-gradient(circle_at_top,_color-mix(in_oklab,_var(--primary)_25%,_transparent),_transparent_50%)] opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="text-6xl mb-4 leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                {o.flag}
              </div>
              <div className="font-display text-2xl font-bold">{o.country}</div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--muted-foreground)] leading-relaxed">
                    {o.address}
                  </span>
                </div>
                <a
                  href={`tel:${o.phoneRaw}`}
                  className="flex items-center gap-3 text-[var(--foreground)] hover:text-[var(--primary)] transition"
                >
                  <Phone className="h-4 w-4 text-[var(--primary)] flex-shrink-0" />
                  <span className="font-medium">{o.phone}</span>
                </a>
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--border)]">
                <a
                  href={whatsappLink(`Hi! Reaching out from ${o.country}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#25D366] hover:gap-3 transition"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Message this office
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

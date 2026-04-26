import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import {
  LinkedInIcon,
  FacebookIcon,
  GitHubIcon,
  YouTubeIcon,
} from "@/components/ui/brand-icons";
import { SITE } from "@/lib/utils";
import { getAllServices } from "@/lib/store";

export async function Footer() {
  const services = await getAllServices();
  return (
    <footer className="relative mt-24 border-t border-[var(--border)] bg-[var(--surface)]/30 backdrop-blur">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px bg-[linear-gradient(90deg,transparent,var(--primary),var(--accent-2),transparent)]"
      />

      <div className="container-page py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--accent-2))] grid place-items-center">
              <span className="text-white font-display font-bold text-lg">J</span>
            </div>
            <div className="font-display text-lg font-bold tracking-tight">
              <span className="text-gradient">Just Soft</span> Solution
            </div>
          </Link>
          <p className="mt-4 text-sm text-[var(--muted-foreground)] leading-relaxed">
            Engineering software that turns operations into automation. Custom
            development, world-class QA, and big data — built for scale.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[
              { icon: LinkedInIcon, label: "LinkedIn" },
              { icon: FacebookIcon, label: "Facebook" },
              { icon: GitHubIcon, label: "GitHub" },
              { icon: YouTubeIcon, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)]/50 text-[var(--muted-foreground)] transition hover:text-[var(--primary)] hover:border-[var(--primary)]/40"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-[var(--foreground)]">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/services", label: "Our Services" },
              { href: "/products", label: "Our Products" },
              { href: "/contact", label: "Contact Us" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-1 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition"
                >
                  {l.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-[var(--foreground)]">
            Top Services
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-[var(--foreground)]">
            Global Offices
          </h4>
          <ul className="mt-4 space-y-4 text-sm">
            {SITE.offices.map((o) => (
              <li key={o.code} className="flex gap-2.5">
                <span className="text-xl leading-none mt-0.5">{o.flag}</span>
                <div className="space-y-1">
                  <div className="font-medium text-[var(--foreground)]">{o.country}</div>
                  <div className="text-[var(--muted-foreground)] flex items-start gap-1.5">
                    <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                    <span>{o.address}</span>
                  </div>
                  <a
                    href={`tel:${o.phoneRaw}`}
                    className="text-[var(--muted-foreground)] flex items-center gap-1.5 hover:text-[var(--primary)] transition"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {o.phone}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="container-page py-5 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-[var(--muted-foreground)]">
          <div>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-[var(--primary)]">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--primary)]">Terms of Service</a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-1 hover:text-[var(--primary)]"
            >
              <Mail className="h-3.5 w-3.5" />
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

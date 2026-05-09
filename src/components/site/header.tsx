"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, whatsappLink } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--background)]/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-16 md:h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/icons/JSS_Logo.png"
              alt="Just Soft Solution"
              width={913}
              height={616}
              priority
              className="h-9 w-auto md:h-10 transition group-hover:drop-shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
            />
            <div className="leading-tight">
              <div className="font-display text-base md:text-lg font-bold tracking-tight">
                <span className="text-gradient">Just Soft</span>
                <span className="text-[var(--foreground)]"> Solution</span>
              </div>
              <div className="text-[10px] text-[var(--muted-foreground)] hidden sm:block">
                Business Automation Partner
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  isActive(item.href)
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                )}
              >
                {item.label}
                {isActive(item.href) ? (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full bg-[linear-gradient(90deg,var(--primary),var(--accent-2))]" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={whatsappLink("Hi! I'd like to discuss a project with Just Soft Solution.")}
              external
              size="sm"
              className="hidden sm:inline-flex"
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Button>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className="absolute inset-0 bg-[var(--background)]/95 backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        />
        <div className="relative flex h-full flex-col pt-24 pb-10 px-6 overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ transitionDelay: `${open ? i * 50 : 0}ms` }}
                className={cn(
                  "px-4 py-4 text-2xl font-display font-semibold rounded-2xl border border-transparent transition-all",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  isActive(item.href)
                    ? "bg-[var(--surface)] border-[var(--border)] text-gradient"
                    : "text-[var(--foreground)] hover:bg-[var(--surface)]/50",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <Button
              href={whatsappLink("Hi! I'd like to discuss a project with Just Soft Solution.")}
              external
              size="lg"
              className="w-full"
            >
              Get a Quote <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

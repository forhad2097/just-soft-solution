import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(135deg,var(--primary),var(--accent),var(--accent-2))] shadow-[0_8px_32px_-8px_color-mix(in_oklab,var(--primary)_60%,transparent)] hover:shadow-[0_12px_40px_-8px_color-mix(in_oklab,var(--accent-2)_60%,transparent)] hover:-translate-y-0.5",
  ghost:
    "text-[var(--foreground)] hover:bg-[var(--surface)]",
  outline:
    "border border-[var(--border)] bg-[var(--surface)]/40 text-[var(--foreground)] backdrop-blur hover:border-[var(--primary)]/50 hover:text-[var(--primary)]",
  whatsapp:
    "text-white bg-[#25D366] hover:bg-[#1ebe5a] shadow-[0_8px_24px_-6px_rgba(37,211,102,0.5)] hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm md:text-base",
  lg: "h-13 px-8 text-base",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      href,
      external,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const cls = cn(base, variants[variant], sizes[size], className);

    if (href) {
      if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={cls}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={cls} {...props}>
        {children}
      </button>
    );
  },
);

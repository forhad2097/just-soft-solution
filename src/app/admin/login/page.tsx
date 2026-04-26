import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Just Soft Solution admin panel",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" />
        <div className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,_color-mix(in_oklab,_var(--primary)_45%,_transparent),_transparent)] blur-3xl animate-aurora" />
        <div className="absolute -bottom-40 right-1/4 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,_color-mix(in_oklab,_var(--accent-2)_45%,_transparent),_transparent)] blur-3xl animate-aurora-2" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--accent-2))] shadow-[0_12px_30px_-8px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
            <span className="text-white font-display font-bold text-xl">J</span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight">
            <span className="text-gradient">Just Soft Solution</span>
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Admin Panel · Sign in to manage services and products
          </p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8">
          <LoginForm next={next} error={error} />
        </div>

        <p className="mt-6 text-center text-xs text-[var(--muted-foreground)]">
          Default credentials are configured via environment variables. <br />
          Update <code className="rounded bg-[var(--surface)] px-1.5 py-0.5">ADMIN_EMAIL</code> &amp;{" "}
          <code className="rounded bg-[var(--surface)] px-1.5 py-0.5">ADMIN_PASSWORD</code> in production.
        </p>
      </div>
    </div>
  );
}

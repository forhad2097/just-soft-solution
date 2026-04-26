"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { loginAction } from "@/app/admin/actions";

export function LoginForm({ next, error }: { next?: string; error?: string }) {
  const [show, setShow] = useState(false);

  return (
    <form action={loginAction} className="space-y-4">
      <input type="hidden" name="next" value={next ?? "/admin"} />

      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Invalid email or password.
        </div>
      ) : null}

      <label className="block">
        <span className="text-sm font-medium text-[var(--foreground)]">Email</span>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            defaultValue="admin@justsoftsolution.com"
            placeholder="admin@justsoftsolution.com"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 pl-10 pr-3 py-2.5 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-2 focus:outline-[var(--ring)] focus:outline-offset-2"
          />
        </div>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-[var(--foreground)]">Password</span>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            type={show ? "text" : "password"}
            name="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 pl-10 pr-10 py-2.5 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-2 focus:outline-[var(--ring)] focus:outline-offset-2"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </label>

      <button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--accent),var(--accent-2))] px-4 py-3 font-medium text-white shadow-[0_8px_32px_-8px_color-mix(in_oklab,var(--primary)_60%,transparent)] transition hover:-translate-y-0.5"
      >
        <LogIn className="h-4 w-4" />
        Sign in
      </button>
    </form>
  );
}

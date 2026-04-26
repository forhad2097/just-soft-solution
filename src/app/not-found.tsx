import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="font-display text-7xl md:text-9xl font-bold text-gradient">404</div>
        <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-[var(--muted-foreground)] max-w-md mx-auto">
          The page you&apos;re looking for has moved or doesn&apos;t exist.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/" size="md">Back to Home</Button>
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)]"
          >
            Browse services →
          </Link>
        </div>
      </div>
    </main>
  );
}

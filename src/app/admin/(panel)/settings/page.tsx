import { Phone, Mail, MapPin, Globe, Info } from "lucide-react";
import { SITE } from "@/lib/utils";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Site-level configuration. Currently sourced from the codebase — wire up to a database for runtime editing.
        </p>
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300 flex items-start gap-3">
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <div>
          Read-only in this version. Edit <code>src/lib/utils.ts</code> &rarr; <code>SITE</code> to change site identity, addresses, social links, and contact info.
        </div>
      </div>

      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold">Site Identity</h2>
        <dl className="grid gap-4 md:grid-cols-2 text-sm">
          <Field label="Site name" value={SITE.name} />
          <Field label="Short name" value={SITE.shortName} />
          <Field label="Tagline" value={SITE.tagline} />
          <Field label="Public URL" value={SITE.url} icon={<Globe className="h-4 w-4" />} />
          <Field label="Contact email" value={SITE.email} icon={<Mail className="h-4 w-4" />} />
          <Field label="WhatsApp" value={SITE.whatsappDisplay} icon={<Phone className="h-4 w-4" />} />
        </dl>
      </div>

      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold">Global Offices</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {SITE.offices.map((o) => (
            <div key={o.code} className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/30 p-4">
              <div className="flex items-center gap-2 text-base font-semibold">
                <span className="text-2xl">{o.flag}</span>
                {o.country}
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-[var(--muted-foreground)]">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-[var(--primary)]" />
                  {o.address}
                </div>
                <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0 text-[var(--primary)]" />
                  {o.phone}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold">Authentication</h2>
        <div className="text-sm text-[var(--muted-foreground)] space-y-2">
          <p>
            Set production credentials via environment variables:
          </p>
          <pre className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/40 p-4 text-xs overflow-x-auto">
{`ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD=your-strong-password-here
ADMIN_SESSION_SECRET=at-least-32-chars-of-random-data-here`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/30 p-4">
      <dt className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
        {label}
      </dt>
      <dd className="mt-1.5 flex items-center gap-2 text-[var(--foreground)] font-medium">
        {icon}
        {value}
      </dd>
    </div>
  );
}

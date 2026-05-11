# Just Soft Solution

Corporate website + admin panel for **Just Soft Solution** — a software company specializing in custom development, software testing (manual + automation), API & security testing, big data analysis, and ERP/POS products. Operating across Bangladesh, the UAE, and the United States.

## Quick links

| For… | Read |
|---|---|
| **Anyone receiving the project** | [HANDOVER.md](./HANDOVER.md) — what you're getting, what's next, sign-off |
| **Day-to-day content editing** | [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) — using the admin panel |
| **Deploying on cPanel** ⭐ | [CPANEL_DEPLOYMENT.md](./CPANEL_DEPLOYMENT.md) — shared hosting step-by-step |
| **Deploying on Vercel or VPS** | [DEPLOYMENT.md](./DEPLOYMENT.md) — alternative paths |
| **Migrating between hosts** | [MIGRATION.md](./MIGRATION.md) — zero-downtime cutover |
| **Operations / when something breaks** | [RUNBOOK.md](./RUNBOOK.md) — incidents, backups, hardening |
| **Original delivery team's cleanup** | [POST_HANDOVER_CLEANUP.md](./POST_HANDOVER_CLEANUP.md) — tear-down checklist |

---

## What's in the box

- **Public website** at 5 page types — Home, About, Services (14 services + detail pages), Products (10 products + detail pages), Blog, Contact
- **Admin panel** at `/admin` — full CRUD for services, products, and blog posts; HMAC-signed cookie auth; markdown blog editor
- **SEO** — JSON-LD schemas (Organization, Service, SoftwareApplication, BlogPosting, BreadcrumbList, FAQPage), per-page metadata, sitemap, robots, OG image, PWA manifest
- **Brand** — logo, dark-mode-locked theme, gradient accents, glassmorphism cards
- **Mobile-first responsive** — 360px to 4K
- **Docker + nginx + certbot** — production deploy recipe included

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 + Tailwind CSS v4 |
| Animation | Framer Motion |
| Auth | HMAC-signed cookie (Node `crypto`, no third party) |
| Database | MySQL 8.0 (or 5.7+) via Prisma ORM |
| Markdown | `marked` |
| Container | Node 22 Alpine, multi-stage build (optional) |

Runs on cPanel shared hosting, VPS, or serverless. Database is portable — same SQL dump works on any MySQL.

---

## Local development

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env       # then edit DATABASE_URL + admin creds

# 3. Start MySQL + run migrations + seed (all in one)
docker compose up -d jss-db                      # spin up MySQL
npx prisma migrate deploy                         # apply schema
npm run db:seed                                   # populate with seed data

# 4. Run the app
npm run dev                                       # http://localhost:3000
```

Admin credentials default to `admin@justsoftsolution.com` / `admin123` if the env vars aren't set — **never use these defaults in production.**

For a fully containerized dev environment (app + DB):
```bash
docker compose up -d --build
```

---

## Production deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md). Two paths:

- **Vercel** — fastest, free tier, but the file-store needs a DB for content edits to persist
- **Self-hosted Docker** — full file-store works as designed, costs $5–20/mo on a small VPS

---

## Repository layout

```
src/
├── app/                ← Next.js App Router
│   ├── (site)/         ← public pages
│   ├── admin/          ← admin panel + auth
│   ├── icon.tsx        ← favicon (generated)
│   ├── apple-icon.tsx  ← iOS touch icon
│   ├── opengraph-image.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx
├── components/         ← UI components grouped by domain
│   ├── site/
│   ├── admin/
│   └── ui/
├── data/               ← TypeScript seed data (services, products, posts)
├── lib/                ← auth, store, markdown, utils
└── proxy.ts            ← Next 16's rename of middleware (auth gate)

public/
├── icons/              ← logo and brand assets
└── illustrations/      ← about-page SVG

Dockerfile · docker-compose.yml · next.config.ts
```

---

## Security notes

- All secrets live in `.env` (gitignored, never committed)
- Admin routes protected by `proxy.ts` middleware
- Sessions are HMAC-SHA256 signed cookies (httpOnly, secure in prod)
- Robots.txt disallows `/admin` and `/api`
- No telemetry — `NEXT_TELEMETRY_DISABLED=1` set in container

For production hardening, see [RUNBOOK.md → Security hardening](./RUNBOOK.md#security-hardening-do-once).

---

## License

Delivered under handover terms — see [HANDOVER.md](./HANDOVER.md). Source code becomes the receiving party's property on signed acceptance. No warranty beyond §10 of HANDOVER.md.

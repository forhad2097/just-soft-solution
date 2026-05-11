# Project Handover — Just Soft Solution Website

> **Master delivery document.** Read this end-to-end before going further.

| Field | Value |
|---|---|
| Project | Just Soft Solution corporate website + admin panel |
| Version | v1.0 |
| Live URL (at delivery) | https://jss.aiosolibe.cloud |
| Repository | https://github.com/hasanshibly90/just-soft-solution |
| Delivered by | Just Soft Solution / Hasan Shibly |
| Delivered to | _________________________________ |
| Handover date | _________________________________ |

---

## 1. What you're getting

A complete, production-grade Next.js 16 application with:

- **Public website** — Home, About, Services (14 services + detail pages), Products (10 products + detail pages), Blog (markdown CMS), Contact
- **Admin panel** — secure login + full CRUD for services, products, blog posts, and settings
- **Brand identity** — logo, OG share image, favicon, PWA manifest, all built and wired
- **SEO foundation** — JSON-LD schemas (Organization, Service, Product, BlogPosting, BreadcrumbList, FAQPage), sitemap, robots, per-page metadata
- **Mobile-first responsive design** locked in dark mode
- **Docker + nginx + certbot** deployment recipe matching the original production setup
- **Full source code** under your ownership — no proprietary parts withheld

---

## 2. What's NOT included

Be explicit so there are no surprises later:

- **Hosting infrastructure** — you provide the VPS / cloud account
- **Domain registration** — you own and manage your domain
- **Email service** — `info@justsoftsolution.com` mailbox is yours to configure (Google Workspace, Zoho, etc.)
- **Social media accounts** — LinkedIn / Facebook / YouTube logins are yours
- **Third-party services** — analytics, error tracking, CDN, etc. are not pre-configured
- **Content writing services** — the seeded services / products / blog posts are starter content; replace with your own
- **Ongoing development** — beyond the 30-day warranty (see §10)

---

## 3. Tech stack

```
Framework:    Next.js 16.2 (App Router) + React 19 + TypeScript
Styling:      Tailwind CSS v4 (CSS-first config in src/app/globals.css)
Animation:    Framer Motion + custom CSS animations
Icons:        lucide-react v1 + custom inline SVG (brand icons)
Auth:         HMAC-signed session cookie (Node crypto, no third-party)
Database:     MySQL 8.0+ (5.7 compatible) via Prisma ORM
Markdown:     marked
Container:    Node 22 Alpine (multi-stage build, optional)
Reverse proxy: nginx / Apache / Passenger (host-dependent)
```

**Deployment targets:** the project ships with config for three options:
- **cPanel + MySQL** — for shared hosting, see [CPANEL_DEPLOYMENT.md](./CPANEL_DEPLOYMENT.md)
- **VPS + Docker + MySQL** — see [DEPLOYMENT.md → Path B](./DEPLOYMENT.md)
- **Vercel + PlanetScale/Neon/AWS RDS** — see [DEPLOYMENT.md → Path A](./DEPLOYMENT.md)

---

## 4. Repository structure

```
src/
├── app/
│   ├── (site)/              ← public website routes
│   │   ├── about/
│   │   ├── blog/[slug]/
│   │   ├── contact/
│   │   ├── products/[slug]/
│   │   └── services/[slug]/
│   ├── admin/               ← admin panel (auth-protected)
│   │   ├── (panel)/
│   │   │   ├── blog/
│   │   │   ├── products/
│   │   │   ├── services/
│   │   │   └── settings/
│   │   ├── login/
│   │   └── actions.ts       ← server actions
│   ├── icon.tsx             ← favicon (generated from JSS_Logo.png)
│   ├── apple-icon.tsx       ← Apple touch icon
│   ├── opengraph-image.tsx  ← share-card image
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── manifest.webmanifest/
│   ├── layout.tsx           ← root layout
│   └── globals.css          ← Tailwind v4 theme + custom utilities
├── components/
│   ├── site/                ← public-site components (Header, Footer, ...)
│   ├── admin/               ← admin components (Sidebar, forms, ...)
│   └── ui/                  ← reusable primitives (Button, Section, ...)
├── data/                    ← TypeScript seed data + types
│   ├── services.ts
│   ├── products.ts
│   ├── posts.ts
│   └── types.ts
├── lib/
│   ├── auth.ts              ← session signing + credential check
│   ├── store.ts             ← file-store CRUD
│   ├── markdown.ts          ← markdown → HTML
│   └── utils.ts             ← SITE constant + cn() + whatsappLink()
└── proxy.ts                 ← Next.js 16 proxy (was middleware) — auth gate

public/
├── icons/                   ← brand assets (JSS_Logo.png + auto-generated)
└── illustrations/           ← about-page SVG illustration

Dockerfile · docker-compose.yml · next.config.ts · tsconfig.json
```

---

## 5. The 5 files you'll touch most often

| File | What it is | When to edit |
|---|---|---|
| `src/data/services.ts` | Seed catalog of 14 services | If you want to reset DB to defaults via `npm run db:seed` |
| `src/data/products.ts` | Seed catalog of 10 products | Same |
| `src/data/posts.ts` | Seed blog posts | Same |
| `src/lib/utils.ts` | Site identity constant (offices, phone, email, social) | When contact info changes |
| `prisma/schema.prisma` | MySQL database schema | When adding fields to services / products / posts |

After launch, **all routine content updates happen in the admin panel** at `/admin`, which writes directly to the MySQL database. You should rarely need to touch the source code.

The `prisma/migrations/` folder is the source of truth for the database schema — never edit the DB directly. Use migrations:
```bash
npx prisma migrate dev --name your_change_description
```

---

## 6. Credentials and access

> ⚠️ Credentials are delivered **separately** — never sent in this document, in chat, or in email. Expect a 1Password / Bitwarden invite or an encrypted PDF.

| Item | Where it lives | How to rotate |
|---|---|---|
| Admin email | `.env` file (or cPanel env vars), key `ADMIN_EMAIL` | edit, restart app |
| Admin password | `.env`, key `ADMIN_PASSWORD` | same |
| Session secret | `.env`, key `ADMIN_SESSION_SECRET` | rotating logs everyone out |
| Database URL | `.env`, key `DATABASE_URL` (format: `mysql://USER:PASS@HOST:PORT/DB`) | rotate DB password via cPanel/MySQL, update DATABASE_URL, restart app |
| GitHub repo access | GitHub.com → Settings → Collaborators | transfer ownership or invite |
| Server SSH | SSH to your VPS/cPanel | use `passwd` or change SSH key |
| Domain DNS | your registrar (Namecheap, Cloudflare, etc.) | client login |
| TLS cert | auto-managed by certbot (VPS) or AutoSSL (cPanel) | follow host docs |
| Social accounts | LinkedIn, Facebook, YouTube | their respective password reset flows |

**Rotation policy on day one:** rotate `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` immediately after taking over. The values you receive at handover should be considered compromised the moment the handover is complete.

```bash
# On your VPS
cd /opt/just-soft-solution
nano .env
# Change ADMIN_PASSWORD to a new strong value
# Change ADMIN_SESSION_SECRET to: $(openssl rand -base64 48)
docker compose restart
```

---

## 7. How to run / deploy / maintain

See the dedicated docs:

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — how to deploy to Vercel (zero-ops) or your own VPS (Docker + nginx + certbot)
- **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** — how to use the admin panel day-to-day
- **[RUNBOOK.md](./RUNBOOK.md)** — what to do when something breaks
- **[MIGRATION.md](./MIGRATION.md)** — how to move the existing live site from the original VPS to your own
- **[README.md](./README.md)** — high-level project overview

---

## 8. Acceptance testing (do this before signing §11)

Walk through this checklist during the handover meeting. **Don't sign off until every box is checked.**

```
PUBLIC SITE
[ ] Home page loads, hero animation plays, all CTAs work
[ ] About page shows the automation flow illustration
[ ] All 14 service detail pages load and show full content
[ ] All 10 product detail pages load and show full content
[ ] Blog list page shows all published posts
[ ] At least one blog post detail page renders markdown correctly
[ ] Contact page shows 3 office cards with country flags + WhatsApp button
[ ] Floating WhatsApp button works on every page
[ ] Mobile responsive: tested at 360px, 768px, 1280px
[ ] Footer shows correct social links (LinkedIn / Facebook / YouTube only — no GitHub)
[ ] /sitemap.xml lists all pages including blog posts
[ ] /robots.txt disallows /admin

ADMIN PANEL
[ ] /admin/login redirects unauthenticated users
[ ] Login with provided credentials succeeds
[ ] Dashboard shows correct stat counts
[ ] Can create / edit / delete a test service → reflected on public site
[ ] Can create / edit / delete a test product → reflected on public site
[ ] Can create / edit / delete a test blog post → reflected on public site
[ ] Logout works
[ ] Settings page shows correct site identity

OPERATIONAL
[ ] HTTPS certificate is valid (lock icon green in browser)
[ ] Page load < 2 seconds on a 4G connection
[ ] Lighthouse score > 90 on Home (Mobile + Desktop)
[ ] Admin password has been rotated
[ ] Session secret has been rotated
[ ] One full backup taken (see RUNBOOK §Backup)
```

---

## 9. Domain & DNS

If you're moving the site to a new domain (away from `jss.aiosolibe.cloud`):

1. In `src/lib/utils.ts`, change `SITE.url` to your domain
2. In your DNS provider, add an `A` record pointing to your VPS IP (or `CNAME` if on Vercel)
3. Wait for DNS propagation (usually < 1 hour, sometimes up to 48)
4. Re-issue TLS certificate for the new domain (`certbot --nginx -d yourdomain.com`)
5. Redeploy
6. Submit new sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`

---

## 10. Warranty and support

**30-day warranty (from sign-off date):**
- Bug fixes for defects we shipped: free
- Security patches: free
- Help reproducing or rolling back issues: free

**NOT covered by warranty:**
- New features
- Content changes
- Changes you make that break things
- Issues caused by infrastructure changes on your side
- Browser-specific quirks not in the original spec

After 30 days the relationship ends unless you sign a separate support agreement. We are not liable for ongoing operations.

---

## 11. Sign-off

By signing below, both parties confirm:
- All §8 acceptance items have been verified
- All §6 credentials have been delivered separately
- All deliverables in §1 have been received
- The client accepts the project in its current state

| Role | Name | Signature | Date |
|---|---|---|---|
| Delivered by (JSS) | _________________ | _________________ | __________ |
| Accepted by (Client) | _________________ | _________________ | __________ |

---

## Appendix A — Quick reference

```bash
# Local development
npm install
npm run dev                  # http://localhost:3000

# Production build (locally)
npm run build
npm run start

# Self-hosted production (Docker)
docker compose up -d --build
docker compose logs -f
docker compose restart
docker compose down          # stop (data preserved)
docker compose down -v       # ⚠️ stop + delete admin store

# Rotate admin password
nano /opt/just-soft-solution/.env
docker compose restart
```

## Appendix B — Where the data lives in production

| Data | Location | Backup | Migrate by |
|---|---|---|---|
| Source code | git repo | git push | git pull on new server |
| Admin content | Docker volume `just-soft-solution_jss-data` → `/app/data/store.json` | `docker cp jss-app:/app/data/store.json ./backup.json` | restore the JSON file |
| Brand assets | `public/icons/` and `public/illustrations/` | committed in git | git pull |
| Environment secrets | `/opt/just-soft-solution/.env` | manual copy (never commit) | recreate on new server |
| TLS cert | `/etc/letsencrypt/live/yourdomain/` | `certbot` auto-renews | re-issue with `certbot --nginx -d yourdomain` |

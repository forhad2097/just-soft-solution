# Just Soft Solution — Tech Stack & cPanel Requirements

> Share this sheet with your hosting provider to confirm support before purchasing a plan.

---

## 🖥️ cPanel — what must be supported

| Requirement | Minimum | Recommended | Where to verify |
|---|---|---|---|
| **Setup Node.js App** (Passenger / Node.js Selector) | ✅ available | same | cPanel → Software |
| **Node.js version** | **18.x** | **22.x** | inside Node.js App, version dropdown |
| **npm** | 9.x | 10.x+ | bundled with Node |
| **MySQL** | **5.7** | **8.0+** | cPanel → MySQL Databases (top of page) |
| **phpMyAdmin** | any | any | cPanel → Databases |
| **SSL/TLS** (AutoSSL or Let's Encrypt) | required | required | cPanel → SSL/TLS Manager |
| **Disk space** | 600 MB free | 1 GB+ | cPanel home (right sidebar) |
| **RAM (Passenger limit)** | 512 MB | 1 GB+ | hosting plan dependent |
| **SSH access** | optional | recommended | cPanel → Advanced |
| **Cron Jobs** | optional | recommended (backups) | cPanel → Advanced |

> ⚠️ If "Setup Node.js App" is not available on your cPanel, this project **will not run** on that hosting plan. Upgrade the plan or switch host. See *Recommended Hosting Plans* below.

---

## 🛠️ Project tech stack

### Frontend & framework

| Tech | Version |
|---|---|
| Next.js | 16.2.4 (App Router, Turbopack) |
| React | 19.2.4 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x (CSS-first config) |
| Framer Motion | 12.38.0 |
| lucide-react | 1.11.0 |
| next-themes | 0.4.6 |
| marked | 18.0.3 (Markdown → HTML for blog) |

### Backend & data

| Tech | Version |
|---|---|
| Node.js | 18+ (22 ideal) |
| MySQL | 5.7+ (8.0 ideal) |
| Prisma ORM | 6.19.3 |
| @prisma/client | 6.19.3 |
| mysql2 (driver) | 3.22.3 |

### Auth
- HMAC-SHA256 signed cookies via Node `crypto`
- No third-party auth service
- Single admin user — credentials in environment variables

### Build & tooling

| Tech | Version |
|---|---|
| tsx | 4.21.0 (TypeScript executor) |
| PostCSS | via `@tailwindcss/postcss` |
| Prisma CLI | 6.19.3 (auto-runs via postinstall) |

---

## 🔑 Environment variables

Set these in **cPanel → Setup Node.js App → Environment Variables**:

```
DATABASE_URL              mysql://USER:PASS@localhost:3306/DBNAME
ADMIN_EMAIL               admin@yourdomain.com
ADMIN_PASSWORD            <strong random password>
ADMIN_SESSION_SECRET      <openssl rand -base64 48>
NODE_ENV                  production
NEXT_TELEMETRY_DISABLED   1
```

⚠️ URL-encode special characters in `DATABASE_URL` password — `@` becomes `%40`, `:` becomes `%3A`, `/` becomes `%2F`.

---

## 📦 Project structure (after extracting the zip)

```
just-soft-solution/
├── app.js                        ← cPanel "Application startup file"
├── .next/standalone/server.js    ← the real server (app.js wraps this)
├── src/                          ← source code
├── prisma/
│   ├── schema.prisma             ← database schema
│   ├── migrations/               ← DB version history
│   └── seed.ts                   ← initial data populator
├── public/                       ← static assets
├── package.json                  ← dependencies + scripts
├── jss-database.sql              ← initial DB dump (import via phpMyAdmin)
├── Dockerfile                    ← for VPS deploy (not needed on cPanel)
├── docker-compose.yml            ← for VPS deploy (not needed on cPanel)
└── *.md                          ← all the deployment / admin / handover docs
```

---

## 🚀 cPanel setup — 9-step overview

1. **MySQL Databases** → create database + user + grant all privileges
2. **phpMyAdmin** → Import `jss-database.sql` into the new database
3. **File Manager** → upload + extract `JSS-Project.zip` into home directory
4. **Setup Node.js App** → create application:
   - Node.js version: **22.x** (or latest available 18+)
   - Application root: `just-soft-solution`
   - Application startup file: `app.js`
5. Add the 6 **environment variables** (above)
6. Setup Node.js App → **Run NPM Install**
7. Setup Node.js App → **Run JS Script → "build"**
8. Setup Node.js App → **Restart**
9. Visit `https://yourdomain.com` — verify it loads

Full step-by-step in [CPANEL_DEPLOYMENT.md](./CPANEL_DEPLOYMENT.md) (inside the project zip).

---

## 💸 Recommended cPanel hosting plans

Confirmed compatible with the required stack:

| Provider | Plan | Approx. price |
|---|---|---|
| **Namecheap** | Stellar Plus / Business | $3–6 / month |
| **A2 Hosting** | Drive / Turbo Boost | $5–8 / month |
| **Hostinger** | Premium / Business Web Hosting | $3–10 / month |
| **SiteGround** | GrowBig minimum | $7–10 / month |
| **InMotion** | Power / Pro | $9–15 / month |

❌ **Avoid:** ultra-budget shared plans ($1–2/month) — Node.js usually unavailable, RAM too low.

---

## 🆘 If your hosting doesn't meet the minimums

Three options:

1. **Upgrade the cPanel plan** to one with Node.js support (~$5/month delta)
2. **Move to a $5 VPS** (DigitalOcean / Hetzner / Vultr) — use the included Docker setup
3. **Move to Vercel** + a hosted MySQL service (PlanetScale free tier, Aiven, etc.)

The Next.js code is portable — only the deployment layer changes.

---

*Last updated: 2026-05-11. Stack versions match the latest commit in the repository.*

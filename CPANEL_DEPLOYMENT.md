# cPanel Deployment Guide

Step-by-step deployment to a cPanel-hosted server with **Node.js Selector** and **MySQL**.

---

## Prerequisites — confirm these in cPanel first

Before starting, log into cPanel and confirm:

| Feature | Where to check |
|---|---|
| **Setup Node.js App** (Passenger / Node.js Selector) | `Software` section |
| **Node.js 18, 20, or 22** available | Inside the Node.js App setup screen, version dropdown |
| **MySQL Databases** (5.7+ ideally 8.0+) | `Databases` section |
| **SSH Access** (optional but recommended) | `Advanced` section |
| **Sufficient resources** — at least 512 MB RAM and 1 GB disk | Cpanel limits page |

If any of these are missing, contact your hosting provider before continuing. **A2 Hosting, Hostinger Cloud, Namecheap Stellar Plus, and SiteGround Cloud all support this.** Cheap shared plans (under $5/mo) usually don't.

---

## Part 1 — Create the MySQL database (5 minutes)

1. cPanel → **MySQL Databases**
2. **Create New Database**:
   - Name: `jss` (cPanel prefixes it with your username, e.g. `forhad_jss`)
3. **MySQL Users → Add New User**:
   - Username: `jssapp`
   - Password: generate a strong one — **save it in a password manager**
4. **Add User To Database**:
   - User: `forhad_jssapp` (whatever cPanel prefixed it as)
   - Database: `forhad_jss`
   - Privileges: ✅ All Privileges → Make Changes
5. **Note down**:
   ```
   DB Host:     localhost
   DB Name:     forhad_jss
   DB User:     forhad_jssapp
   DB Password: <your strong password>
   DB Port:     3306
   ```

---

## Part 2 — Import the database schema + data (5 minutes)

You have a SQL dump (`jss-database.sql`) in the handover package.

**Via cPanel → phpMyAdmin (easiest):**

1. cPanel → **phpMyAdmin**
2. Pick `forhad_jss` from the left sidebar
3. Click **Import** tab
4. Choose file: `jss-database.sql`
5. Click **Import**
6. Verify: you should see `services`, `products`, `blog_posts`, `_prisma_migrations` tables with rows in each.

**Via SSH (if you prefer):**
```bash
mysql -u forhad_jssapp -p forhad_jss < jss-database.sql
```

---

## Part 3 — Upload the project files (5 minutes)

**Option A: SSH + git (cleanest):**
```bash
ssh forhad@yourserver.com
cd ~
git clone <your-repo-url> just-soft-solution
cd just-soft-solution
```

**Option B: File Manager + zip (no SSH needed):**
1. cPanel → **File Manager**
2. Navigate to your home directory (usually `/home/forhad`)
3. **Upload** `JSS-Project.zip` to home directory
4. Right-click → **Extract**
5. Rename the extracted folder to `just-soft-solution`

You should now have `~/just-soft-solution/` with `package.json`, `src/`, `prisma/`, etc inside.

---

## Part 4 — Set up the Node.js app (10 minutes)

1. cPanel → **Setup Node.js App** (or "Node.js Selector")
2. Click **Create Application**
3. Fill in:
   ```
   Node.js version:        22.x (or highest available, minimum 18.x)
   Application mode:       Production
   Application root:       just-soft-solution
   Application URL:        yourdomain.com  (or subdomain like jss.yourdomain.com)
   Application startup:    app.js
   Passenger log file:     (leave default)
   ```
4. Click **Create**

cPanel will:
- Create a Node.js virtualenv at `~/nodevenv/just-soft-solution/22/`
- Configure Apache (or LiteSpeed) to proxy your domain to the Node app
- Show you a "Setup Complete" message

---

## Part 5 — Configure environment variables (5 minutes)

Still on the Node.js App configuration page, scroll to **Environment Variables**:

Add these (click "Add Variable" for each):

| Key | Value |
|---|---|
| `DATABASE_URL` | `mysql://forhad_jssapp:YOUR_PASSWORD@localhost:3306/forhad_jss` |
| `ADMIN_EMAIL` | `admin@yourdomain.com` |
| `ADMIN_PASSWORD` | (generate a strong one — save it) |
| `ADMIN_SESSION_SECRET` | (long random string — see below) |
| `NODE_ENV` | `production` |
| `NEXT_TELEMETRY_DISABLED` | `1` |

Generate ADMIN_SESSION_SECRET via SSH:
```bash
openssl rand -base64 48
```
Or via any online "random string generator" — make it 50+ characters.

⚠️ URL-encode special characters in your DB password if it contains `@`, `:`, `/`, `?`, `#`, `&`, `=`.
For example: `pass@word` becomes `pass%40word` in the DATABASE_URL.

---

## Part 6 — Install dependencies (10 minutes)

In cPanel **Setup Node.js App**, click **Run NPM Install** on your application.

This runs `npm ci` inside the virtualenv. Wait for it to finish — usually 2–5 minutes on shared hosting.

If it fails or times out, do it via SSH instead:
```bash
ssh forhad@yourserver.com
cd ~/just-soft-solution
source ~/nodevenv/just-soft-solution/22/bin/activate
npm ci --no-audit --no-fund
```

The `postinstall` script will run `prisma generate` automatically.

---

## Part 7 — Run database migrations (1 minute)

The DB already has the schema from your phpMyAdmin import, but Prisma needs to know about it. From SSH:

```bash
cd ~/just-soft-solution
source ~/nodevenv/just-soft-solution/22/bin/activate
npx prisma migrate resolve --applied 20260511085330_init
```

(Replace the migration name with the actual one in your `prisma/migrations/` folder.)

If you ever need to re-run migrations from scratch:
```bash
npx prisma migrate deploy
```

---

## Part 8 — Build the production bundle (5 minutes)

Either via cPanel UI: **Setup Node.js App → Run JS Script → "build"**

Or via SSH:
```bash
cd ~/just-soft-solution
source ~/nodevenv/just-soft-solution/22/bin/activate
npm run build
```

This produces `.next/standalone/server.js` — your application entry point.

---

## Part 9 — Restart the app (1 minute)

cPanel **Setup Node.js App** → **Restart**

After ~30 seconds, visit `https://yourdomain.com` — your site should be live!

---

## Part 10 — Sanity check

```
[ ] Homepage loads
[ ] All services / products / blog detail pages load
[ ] /admin/login redirects unauthenticated users
[ ] Log into admin with the credentials you set in Part 5
[ ] Dashboard shows 14 services, 10 products, 3 posts (from your seed import)
[ ] Add a test service, save, refresh public site — change is visible
[ ] Delete the test service
[ ] /sitemap.xml lists all pages
[ ] /robots.txt exists and disallows /admin
[ ] HTTPS works (lock icon in browser)
```

If TLS isn't working, cPanel → **SSL/TLS** → **Manage SSL Sites** → install AutoSSL or Let's Encrypt for your domain.

---

## Common cPanel + Next.js issues

### "Cannot find module '.prisma/client'"
The `prisma generate` step didn't run. Fix:
```bash
source ~/nodevenv/just-soft-solution/22/bin/activate
cd ~/just-soft-solution
npx prisma generate
```
Then restart the app.

### "Error: querying engine binary not found"
Prisma engine for your Node version wasn't downloaded. Fix:
```bash
cd ~/just-soft-solution
rm -rf node_modules
npm ci
```
Then restart.

### App starts but returns 500 on every page
Check the **Passenger log file** path you noted in Part 4. Tail it via SSH:
```bash
tail -100 /home/forhad/path/to/passenger.log
```
Most common cause: DATABASE_URL is wrong. Verify the password and database name.

### "Too many connections"
MySQL on shared hosting has a low connection limit. Make sure you're not running multiple instances of the app. Restart cPanel app to flush connections.

### Admin login fails despite correct password
The `ADMIN_SESSION_SECRET` might have changed. After any change to it, all existing sessions are invalidated. Clear browser cookies for the domain, then log in again.

### Site loads but admin panel returns 307 forever
The cPanel proxy might be stripping cookies. Add to your cPanel app's environment:
```
COOKIE_SECURE=false
```
(Only do this if your site is HTTP-only. If you have HTTPS, keep it secure.)

---

## Updating after handover

To deploy code changes to your cPanel site:

```bash
ssh forhad@yourserver.com
cd ~/just-soft-solution
git pull
source ~/nodevenv/just-soft-solution/22/bin/activate
npm ci
npx prisma migrate deploy
npm run build
```

Then restart via cPanel → Setup Node.js App → Restart.

---

## When cPanel isn't enough

If your traffic outgrows cPanel limits or you hit performance issues:

1. **Cloudflare in front of cPanel** — free, dramatically improves global latency
2. **Move to a VPS** — see [DEPLOYMENT.md → Path B](./DEPLOYMENT.md)
3. **Move to Vercel** — see [DEPLOYMENT.md → Path A](./DEPLOYMENT.md). Note: you'd also need to migrate MySQL to a hosted service like PlanetScale, Aiven, or AWS RDS.

The Next.js code is portable — only deployment glue changes.

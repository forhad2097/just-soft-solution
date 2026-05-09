# Deployment Guide

Two paths. Pick the one that fits your team.

| Path | Effort | Cost | When to choose |
|---|---|---|---|
| **A. Vercel** (recommended for non-ops teams) | ~10 minutes | Free for small traffic, $20/mo for Pro | You don't want to manage servers |
| **B. Self-hosted Docker on a VPS** | ~30–60 minutes | $5–$20/mo VPS | You want full control, lower long-term cost, multiple sites on one box |

Both produce the same site. You can switch later.

---

## Path A — Deploy to Vercel

Vercel is the company that makes Next.js. Their hosting is purpose-built for it.

### Steps

1. **Create a Vercel account** at https://vercel.com (sign in with GitHub).
2. **Import the repo:**
   - Click "Add New… → Project"
   - Pick `hasanshibly90/just-soft-solution` (or your fork after you transfer ownership)
   - Click "Import"
3. **Configure environment variables** (Project Settings → Environment Variables):
   ```
   ADMIN_EMAIL              admin@yourdomain.com
   ADMIN_PASSWORD           <strong random password>
   ADMIN_SESSION_SECRET     <run: openssl rand -base64 48>
   ```
   Make sure all three are checked for **Production**.
4. **Click Deploy.** First build takes 2–4 minutes.
5. You'll get a `*.vercel.app` URL immediately. Test it.
6. **Add your custom domain** (Project Settings → Domains):
   - Enter `yourdomain.com`
   - Vercel shows you DNS records to add at your registrar
   - Add them; Vercel auto-issues TLS within a few minutes
7. Visit `https://yourdomain.com` — done.

### Vercel-specific gotcha — the file-store

The admin saves content to `data/store.json` on the filesystem. **Vercel's serverless functions have a read-only filesystem.** This means **content edits made in the admin panel won't persist on Vercel** (they'll work for the current request, then disappear).

For Vercel, you have two options:

**Option 1: Edit content via git** (simplest, works for low-volume editing)
- Edit `src/data/services.ts`, `products.ts`, `posts.ts` directly
- Commit, push to GitHub
- Vercel auto-deploys
- The admin panel becomes preview-only

**Option 2: Move to a real database** (proper solution if you'll edit content often)
- Sign up for Vercel Postgres, Neon, Supabase, or PlanetScale (all have free tiers)
- Replace `src/lib/store.ts` with a Prisma or Drizzle ORM-backed implementation
- This is a 4–6 hour code change. We can quote it as a separate scope.

If your editing volume is low (a few blog posts a month), Option 1 is fine. If you'll edit daily, go to Path B (self-hosted).

### Vercel ongoing operations

- **Auto-deploy:** every push to `master` builds and deploys
- **Logs:** Project → Logs (real-time)
- **Rollback:** Project → Deployments → click any previous → "Promote to Production"
- **Custom domains:** Project Settings → Domains
- **Analytics:** Project Settings → Analytics ($20/mo Pro)

---

## Path B — Self-hosted on your VPS

You'll need:
- A VPS (Ubuntu 22.04+ recommended) — Hostinger, DigitalOcean, Linode, Hetzner, AWS Lightsail
- Root SSH access
- A domain pointed at the VPS public IP
- 2 GB RAM minimum, 1 CPU, 20 GB disk

### One-time VPS setup

```bash
# SSH in as root
ssh root@<your-vps-ip>

# Update + install essentials
apt update && apt upgrade -y
apt install -y nginx certbot python3-certbot-nginx ca-certificates curl gnupg

# Install Docker
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" \
  | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl enable --now docker
```

### Deploy the app

```bash
# 1. Create directory
mkdir -p /opt/just-soft-solution
cd /opt/just-soft-solution

# 2. Clone the repo
git clone https://github.com/hasanshibly90/just-soft-solution.git .
# (or upload via scp / rsync if the repo is private)

# 3. Generate environment variables
cat > .env <<EOF
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=$(openssl rand -base64 18 | tr -d '/+=' | head -c 20)
ADMIN_SESSION_SECRET=$(openssl rand -base64 48 | tr -d '/+=' | head -c 64)
EOF
chmod 600 .env

# Save those credentials in your password manager — they'll only be visible here.
cat .env

# 4. Build & start the container
docker compose up -d --build

# 5. Verify it's running on port 3030
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3030/   # expect 200
docker ps --filter name=jss-app
```

### Configure nginx + TLS

```bash
# 1. Create nginx site config
cat > /etc/nginx/sites-available/yourdomain.com <<'EOF'
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3030;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# 2. Enable the site
ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/

# 3. Test & reload nginx
nginx -t && systemctl reload nginx

# 4. Issue Let's Encrypt cert (this also auto-edits your nginx config to enable HTTPS)
certbot --nginx -d yourdomain.com --non-interactive --agree-tos --email you@yourdomain.com --redirect

# 5. Done — visit https://yourdomain.com
```

`certbot` adds a systemd timer that auto-renews the cert every 60 days. No further action needed.

### DNS — make `yourdomain.com` point to the VPS

At your domain registrar (Cloudflare, Namecheap, GoDaddy, etc.), add:

```
Type:   A
Name:   @            (or yourdomain.com, or yourdomain.com.)
Value:  <your-vps-public-ip>
TTL:    3600
```

If you also want `www.yourdomain.com`, add the same `A` record with name `www` (or a `CNAME` to `yourdomain.com`).

DNS propagation usually completes within an hour.

### Updating after code changes

```bash
cd /opt/just-soft-solution
git pull
docker compose up -d --build
```

That's the whole update flow. The admin store volume persists across rebuilds.

---

## Production checklist (both paths)

```
[ ] HTTPS works (lock icon green, no mixed-content warnings)
[ ] /admin/login redirects unauthenticated visitors
[ ] Admin password rotated to a fresh value (not the handover one)
[ ] ADMIN_SESSION_SECRET rotated to a fresh value
[ ] /sitemap.xml accessible and lists all pages
[ ] /robots.txt accessible and disallows /admin
[ ] OG image renders (test by sharing the URL in WhatsApp / Slack)
[ ] Mobile viewport responsive (test on real phone, not just dev tools)
[ ] One backup taken (see RUNBOOK)
[ ] Monitoring set up (uptime check via UptimeRobot or BetterStack — free tier exists)
[ ] Search Console verified (https://search.google.com/search-console)
[ ] Sitemap submitted to Search Console
```

---

## Cost comparison

| | Vercel | Self-hosted VPS |
|---|---|---|
| Hosting | $0 (Hobby) / $20/mo (Pro) | $5–$20/mo (Hostinger / DO / Hetzner) |
| Bandwidth | 100 GB / 1 TB | usually unlimited |
| TLS | included | included (Let's Encrypt) |
| Custom domain | included | included |
| Auto-deploys | yes | manual `git pull && docker compose up -d --build` (or set up GitHub Actions) |
| File-store works | ❌ (need DB upgrade) | ✅ |
| Admin time | ~0 hours/month | ~1 hour/month |

For this project, **self-hosted is cheaper and simpler operationally** — the file-store needs a writable disk. If you don't want to manage a server, swap to a database first, then deploy on Vercel.

---

## Going further

- **Performance**: enable a CDN in front of the VPS (Cloudflare proxy mode is free and excellent)
- **Backups**: schedule a nightly backup of `data/store.json` (see RUNBOOK)
- **Monitoring**: add UptimeRobot for free uptime checks; BetterStack for richer monitoring
- **Email**: connect a real mailbox to `info@yourdomain.com` — Google Workspace, Zoho Mail, or Proton
- **Analytics**: Plausible (privacy-friendly, $9/mo) or Google Analytics 4 (free) — drop the script tag in `src/app/layout.tsx`
- **Error tracking**: Sentry has a free tier that covers most small sites

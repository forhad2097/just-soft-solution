# Migration Guide

How to move the live site from the original delivery infrastructure (`jss.aiosolibe.cloud`) to your own — without losing any admin-edited content.

---

## TL;DR

```
1. Set up your VPS following DEPLOYMENT.md → Path B
2. Get a backup of the current admin store (one curl + one git commit)
3. Spin up your own copy with the backup restored
4. Cut DNS over to your VPS
5. Verify, then ask the original delivery team to tear down theirs
```

Total downtime if you do it right: **0 seconds**. The trick is to set up the new site in parallel before flipping DNS.

---

## Step 1 — Inventory what you have

Before you start, gather:

- [ ] Domain name you'll use (e.g., `justsoftsolution.com` or `jss.example.com`)
- [ ] DNS provider login (Cloudflare, Namecheap, Route 53, etc.)
- [ ] A VPS with root SSH access (Hostinger, Hetzner, DigitalOcean, etc.)
- [ ] Repository access (GitHub `hasanshibly90/just-soft-solution` — either as collaborator, or after ownership transfer to you)
- [ ] The handover credentials envelope (admin email, password, session secret) from the original delivery team

---

## Step 2 — Get the latest admin store from the original VPS

This is **the single most important file to migrate.** It contains every service, product, and blog post that anyone has edited via the admin panel since the site went live.

Ask the original delivery team to send you `data/store.json` from the live server. They'll run:

```bash
ssh root@<original-vps>
docker cp jss-app:/app/data/store.json /tmp/jss-store-export.json
# Then they'll send you /tmp/jss-store-export.json via secure channel (1Password attachment, encrypted email, signed download link)
```

If you have access yourself:
```bash
ssh root@<original-vps>
docker cp jss-app:/app/data/store.json ./store-export-$(date +%Y%m%d).json
# Download via scp:
exit
scp root@<original-vps>:/root/store-export-*.json ~/Downloads/
```

Save this file. You'll need it in step 5.

---

## Step 3 — Set up YOUR VPS

Follow [`DEPLOYMENT.md` → Path B — Self-hosted on your VPS](./DEPLOYMENT.md). Stop **just before** "Configure nginx + TLS" — we want the app running on `127.0.0.1:3030` first, then we'll do nginx after we restore the data.

By the end of this step you should have:
- `/opt/just-soft-solution/` directory
- Repo cloned in there
- `.env` file with **fresh** credentials (do not reuse the originals)
- Container running, `curl http://127.0.0.1:3030/` returns 200

Do NOT configure nginx or DNS yet.

---

## Step 4 — Update SITE.url to your domain

```bash
ssh root@<your-vps>
cd /opt/just-soft-solution

# Edit src/lib/utils.ts — change SITE.url from
#   url: "https://jss.aiosolibe.cloud",
# to
#   url: "https://yourdomain.com",
nano src/lib/utils.ts
```

Commit & push if you have your own fork:
```bash
git add src/lib/utils.ts
git commit -m "Update canonical URL to yourdomain.com"
git push
```

You'll rebuild after restoring the data store.

---

## Step 5 — Restore the admin store on your VPS

Upload `store-export-YYYYMMDD.json` from step 2:

```bash
# From your local machine
scp ~/Downloads/store-export-*.json root@<your-vps>:/tmp/

# On your VPS
ssh root@<your-vps>
cd /opt/just-soft-solution

# Stop the container so the volume is unlocked
docker compose stop

# Copy the file into the volume
docker run --rm \
  -v just-soft-solution_jss-data:/data \
  -v /tmp:/import \
  alpine \
  cp /import/store-export-*.json /data/store.json

# Restart with the new data
docker compose up -d --build

# Verify the data is loaded
docker exec jss-app cat /app/data/store.json | head -c 500
```

You should see services, products, and posts arrays at the top of the JSON.

Test the app at `http://127.0.0.1:3030`:
```bash
curl -s http://127.0.0.1:3030/ -o /dev/null -w "%{http_code}\n"
curl -s http://127.0.0.1:3030/services | grep -oE "<title>[^<]*</title>"
```

If both look right, the app is live with all your content. Now we set up nginx and DNS.

---

## Step 6 — nginx + TLS for your domain

Follow [`DEPLOYMENT.md` → Configure nginx + TLS](./DEPLOYMENT.md#configure-nginx--tls). The cert issuance step (`certbot --nginx`) needs your DNS to be pointing at this VPS — which it isn't yet.

Two options:

**Option A — Quick switch (a few minutes of downtime):**
1. Update DNS at your registrar to point `yourdomain.com` → your new VPS IP
2. Wait for propagation (5–30 minutes typically; check with `dig yourdomain.com`)
3. Run `certbot --nginx -d yourdomain.com`
4. Done

**Option B — Zero-downtime cutover (recommended for live sites):**
1. Use the DNS-01 challenge instead of HTTP-01 to issue the cert *before* DNS flips:
   ```bash
   certbot certonly --manual --preferred-challenges dns \
     -d yourdomain.com -d www.yourdomain.com \
     --email you@yourdomain.com --agree-tos
   ```
   Certbot will give you a TXT record to add to DNS. Add it, wait, press Enter.
2. nginx config gets the cert paths added manually:
   ```nginx
   listen 443 ssl http2;
   ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
   ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
   ```
3. Now both the new VPS and the old one are ready to serve `yourdomain.com` over HTTPS
4. Flip DNS — instant traffic shift, no downtime

---

## Step 7 — Verify the cutover

Once DNS has propagated:

```bash
# 1. The site should be served from your VPS
curl -sI https://yourdomain.com/ | head -3

# 2. The admin should work
curl -sI https://yourdomain.com/admin/login | head -3   # expect 200

# 3. The OG image should be from your VPS
curl -s https://yourdomain.com/ | grep og:image

# 4. Sitemap should reference your domain
curl -s https://yourdomain.com/sitemap.xml | head -20

# 5. Log into admin in a browser, verify all your services / products / posts are there
```

If everything works, you've successfully migrated.

---

## Step 8 — Tell the delivery team to tear down

Once you've verified:

```bash
# Email/message the original team:
"Migration complete. yourdomain.com is now serving from our infrastructure.
You can decommission the original deployment at jss.aiosolibe.cloud at your convenience."
```

The original team should then run their cleanup checklist — see [POST_HANDOVER_CLEANUP.md](./POST_HANDOVER_CLEANUP.md) for the exact steps they'll follow.

---

## Step 9 — Hardening (after migration)

```
[ ] Rotate ADMIN_PASSWORD and ADMIN_SESSION_SECRET on your VPS
[ ] Confirm the previous .env values are no longer valid anywhere
[ ] Set up a nightly backup (RUNBOOK → Backup & restore → Scheduled)
[ ] Sign up for uptime monitoring (UptimeRobot free tier is enough)
[ ] Submit your sitemap to Google Search Console with your new domain
[ ] Update any external references / business cards / email signatures with new URL
```

---

## What if I want a TOTALLY clean break?

If you don't want to use the existing repo at all (e.g., you want a private repo under your own org):

```bash
# 1. Clone the public repo
git clone https://github.com/hasanshibly90/just-soft-solution.git my-jss-site
cd my-jss-site

# 2. Create your own private repo on GitHub (via gh cli or web UI)
# Then change the remote:
git remote set-url origin https://github.com/<your-org>/<your-repo-name>.git

# 3. Push to your repo
git push -u origin master

# 4. (Optional) Delete the old repo from your account once your version is up:
gh repo delete hasanshibly90/just-soft-solution --yes
```

---

## Edge cases

### "I want to migrate to Vercel instead of a VPS"

Follow [DEPLOYMENT.md → Path A](./DEPLOYMENT.md#path-a--deploy-to-vercel). Important caveat: **Vercel cannot persist the file-store**. You'll either:

- Edit content via git (commit `src/data/*.ts` files) — fine for low-volume editing
- Or migrate the store from `data/store.json` to a real database (Vercel Postgres / Neon / Supabase). This is a 4–6 hour code change.

### "I want to keep using the existing aiosolibe.cloud subdomain temporarily"

That's fine. The original team's deployment will keep serving `jss.aiosolibe.cloud` until they decommission. You can delay flipping DNS until you're 100% sure your VPS is ready.

### "The store.json export is huge / corrupted / can't import"

Worst case, the seed data in `src/data/services.ts`, `products.ts`, `posts.ts` is the source of truth — your container will populate `store.json` from those on first start. You'll lose only the admin-panel edits made AFTER initial deployment. Talk to the delivery team about reconstructing those by hand if needed.

### "I want to migrate the admin-uploaded images / illustrations"

Currently there are no admin-uploaded images — all images are in `public/icons/` and `public/illustrations/` (committed to git). Migrating the repo migrates the images.

If you later add an upload feature, you'll need to also migrate those uploaded files (`docker cp` from old to new VPS).

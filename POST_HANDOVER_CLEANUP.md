# Post-Handover Cleanup — Your Side

**For the original delivery team (Hasan / JSS).** What to do AFTER the client confirms migration is complete.

You said: *"client ke shob diye dibo, kichui rakhbo na"* — keep nothing.

This document gets you to that state safely.

---

## Don't do this until the client has confirmed

The client must email or message:

> "Migration complete. We've verified our deployment at <their-domain> is fully functional.
> You can decommission the original deployment at jss.aiosolibe.cloud."

Save that message. It's your evidence that they accepted the deliverable. Don't tear anything down before that.

---

## Cleanup checklist — your VPS

Run these on `100.101.115.46` (Tailscale).

### 1. Verify current state (don't skip)

```bash
ssh root@100.101.115.46

# What's running?
docker ps --filter name=jss-app

# Where does jss.aiosolibe.cloud point now?
dig +short jss.aiosolibe.cloud A

# If DNS still resolves to your VPS but the client says they migrated — STOP.
# Either DNS hasn't been changed yet, or they pointed a DIFFERENT domain at their VPS
# and forgot about jss.aiosolibe.cloud. Confirm with the client before proceeding.
```

### 2. Take one last backup (paranoid grade)

Even though the client has the data store, take a final snapshot for yourself in case they call back in two weeks asking "we lost something":

```bash
mkdir -p ~/jss-archive
cd /opt/just-soft-solution

# Backup the data store
docker cp jss-app:/app/data/store.json ~/jss-archive/store-final-$(date +%Y%m%d).json

# Backup the .env (encrypted — never store plaintext)
gpg --symmetric --cipher-algo AES256 -o ~/jss-archive/env-final.gpg .env
# It'll ask for a passphrase — pick something strong, write it in your password manager

# Tar the whole project directory excluding huge stuff
tar --exclude='./node_modules' --exclude='./.next' \
    -czf ~/jss-archive/project-$(date +%Y%m%d).tar.gz -C /opt just-soft-solution

ls -la ~/jss-archive/
```

Keep this archive for **90 days** then delete.

### 3. Stop the container

```bash
cd /opt/just-soft-solution
docker compose down
docker ps --filter name=jss-app    # should show nothing now
```

### 4. Remove the Docker volume (this is the destructive step)

```bash
# CONFIRM you have the backup from step 2 first
ls ~/jss-archive/store-final-*.json   # should show the file

# Then remove
docker volume rm just-soft-solution_jss-data
docker volume ls | grep jss   # should show nothing
```

### 5. Remove the Docker image

```bash
docker rmi just-soft-solution-jss-app 2>/dev/null
docker image prune -f
```

### 6. Remove the nginx site

```bash
nginx -t   # baseline — should pass
rm /etc/nginx/sites-enabled/jss.aiosolibe.cloud
rm /etc/nginx/sites-available/jss.aiosolibe.cloud
nginx -t   # should still pass
systemctl reload nginx
```

If `nginx -t` fails, **don't reload**. Investigate and fix first — a bad reload kills every other site on the VPS.

### 7. Revoke the Let's Encrypt cert

```bash
certbot delete --cert-name jss.aiosolibe.cloud
# Confirms: "Deleted all files relating to certificate jss.aiosolibe.cloud"
```

### 8. Remove the project directory

```bash
ls /opt/just-soft-solution/   # last look
rm -rf /opt/just-soft-solution
ls /opt/   # confirm gone
```

### 9. Remove DNS for jss.aiosolibe.cloud

This depends on your DNS provider (Cloudflare, Hostinger, etc.) — log into your DNS console and:
- Delete the `A` record for `jss.aiosolibe.cloud` pointing at the VPS
- (Or leave it pointing at a 404 placeholder if you'd rather not show "domain unconfigured")

### 10. Verify the takedown

```bash
# Should NOT return 200 anymore (and ideally should fail to connect entirely)
curl -sI https://jss.aiosolibe.cloud/ | head -3
# Expected: Connection refused, or 502, or DNS resolution fails
```

---

## Cleanup checklist — GitHub repo

You have three options. Pick one.

### Option A — Transfer ownership to the client

Cleanest. They get the repo and the full git history; you lose all access.

1. GitHub → repo → Settings → bottom of page → **Transfer ownership**
2. Enter the client's GitHub username or org
3. They'll get an email; once they accept, you're done

### Option B — Delete the repo

If the client made a fresh fork on their side and doesn't need yours:

```bash
gh repo delete hasanshibly90/just-soft-solution --yes
```

### Option C — Archive but keep visible

If the client wants the URL to keep working as a reference but you're done with it:

GitHub → repo → Settings → bottom of page → **Archive this repository**

Archived repos are read-only and clearly marked.

---

## Cleanup checklist — Local machine

```bash
# Local working tree
cd ~/Projects   # or wherever you keep it
mv "Just Soft Solution" ~/jss-archive/   # or just remove
# rm -rf "Just Soft Solution/"
```

Or zip it up first:
```bash
cd ~
tar czf ~/jss-archive/local-final.tar.gz "Projects/Just Soft Solution"
rm -rf "Projects/Just Soft Solution"
```

---

## Cleanup checklist — Credentials

Where credentials touched:

| Place | Action |
|---|---|
| `/opt/just-soft-solution/.env` | Removed in step 8 above ✅ |
| Your password manager | Move the entry to "Archive" — don't delete (audit trail) |
| Email / chat where you sent credentials | Delete those messages |
| 1Password / Bitwarden vault you shared with client | Revoke your access (they should keep) |
| Any local `.env` files on your laptop | `rm`, then `shred -u` for paranoia |
| Any backup of `.env` you made for the handover | Shred |

---

## Cleanup checklist — Claude / development context

### Memory entries

The auto-memory has project facts that are no longer load-bearing for you. Decide:

```bash
# Open the memory dir
explorer "C:\Users\HP\.claude\projects\c--Projects-Just-Soft-Solution\memory\"
```

Files like `production_environment.md`, `secrets_location.md`, `vps_multi_tenant.md` describe infra that no longer exists from your perspective.

**Recommended:** delete the entire `c--Projects-Just-Soft-Solution` folder — once the project is gone, future you won't need its memory.

```bash
rm -rf "C:\Users\HP\.claude\projects\c--Projects-Just-Soft-Solution\"
```

### Project agents and skills

The `.claude/agents/` and `.claude/commands/` directories are inside the repo and will go away when you delete the project. Nothing extra to clean.

---

## Final verification — your side

After everything above, verify by running through each check:

```
[ ] curl https://jss.aiosolibe.cloud/ → connection refused or 5xx
[ ] ssh root@100.101.115.46 'ls /opt/' → no `just-soft-solution` directory
[ ] ssh root@100.101.115.46 'docker ps -a' → no `jss-app` container
[ ] ssh root@100.101.115.46 'docker volume ls' → no `just-soft-solution_jss-data` volume
[ ] ssh root@100.101.115.46 'docker images' → no `just-soft-solution-jss-app` image
[ ] ssh root@100.101.115.46 'ls /etc/nginx/sites-enabled/' → no jss.aiosolibe.cloud
[ ] ssh root@100.101.115.46 'certbot certificates' → no jss.aiosolibe.cloud cert
[ ] DNS resolution for jss.aiosolibe.cloud → no A record (or removed)
[ ] GitHub repo → transferred / deleted / archived
[ ] Local working tree → archived or removed
[ ] Credentials → archived or shredded
[ ] Memory → cleaned (optional but recommended)
```

---

## What you should KEEP, not delete

Even when handing over fully:

- **The signed HANDOVER.md** (with both sign-off signatures) — keep for at least 7 years for tax/legal reasons
- **The encrypted final backup** (~/jss-archive/) — keep for 90 days as a safety net
- **The sign-off message from the client** — that's your evidence the handover was accepted
- **The invoice you issued** — accounting record

Everything else can go.

---

## What if the client comes back later?

Common after-handover requests and how to respond:

| Request | Response |
|---|---|
| "We lost a blog post" | Restore from `~/jss-archive/store-final-*.json` if it's still in the 90-day window. Otherwise, sorry — that's why backups are part of the runbook. |
| "Site is broken, fix it" | Outside warranty. Quote a one-off support ticket or hourly rate. |
| "Can you add feature X?" | New scope. Quote separately. |
| "We forgot the admin password" | They can recover via `.env` on their VPS. Walk them through it (free, takes 5 minutes). |
| "Can we have the GitHub access back?" | If you transferred it: it's already theirs. If you deleted: restore from `~/jss-archive/local-final.tar.gz` and create a fresh repo for them. |

For everything else, refer them to the docs you delivered (`HANDOVER.md`, `ADMIN_GUIDE.md`, `DEPLOYMENT.md`, `RUNBOOK.md`, `MIGRATION.md`) — they have the answers.

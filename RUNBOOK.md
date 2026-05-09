# Runbook — Operations & Incident Response

What to do when something goes wrong (or just to keep things healthy).

---

## Quick health check

```bash
# Are we up?
curl -s -o /dev/null -w "%{http_code}\n" https://yourdomain.com/

# Is the container healthy?
ssh root@vps 'docker ps --filter name=jss-app --format "{{.Status}}"'

# Any recent errors?
ssh root@vps 'docker logs --tail 50 jss-app 2>&1 | grep -iE "error|warn|fatal" || echo clean'

# Is the cert about to expire?
echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null \
  | openssl x509 -noout -dates
```

If all four are green, the site is healthy.

---

## Incident #1 — Site is down (502 / 503 / connection refused)

**Most likely cause:** the container crashed or stopped.

```bash
ssh root@vps
cd /opt/just-soft-solution

# 1. Check container status
docker ps -a --filter name=jss-app

# 2. If it's stopped — start it
docker compose up -d

# 3. If it's running but unhealthy — read the logs
docker logs --tail 100 jss-app

# 4. If you see "out of memory" or similar — restart the host or upgrade the VPS
# 5. If logs show a code error — roll back (see Incident #5)
```

If `docker compose up -d` fails with "port already in use", another process took 3030. Find and kill it:
```bash
ss -tlnp | grep :3030
kill <pid>
docker compose up -d
```

---

## Incident #2 — Site is up but admin panel won't accept the password

**Most likely cause:** environment variables are wrong or the container hasn't reloaded after a `.env` change.

```bash
ssh root@vps
cd /opt/just-soft-solution

# 1. Check the env file is correct
cat .env

# 2. Verify the container has the same values
docker exec jss-app env | grep -E "ADMIN_(EMAIL|PASSWORD)"
# Note: PASSWORD will print in plaintext — do this on a trusted terminal only

# 3. If they don't match, restart
docker compose restart

# 4. If still broken, your cookie might be stale. Clear cookies for the domain in your browser, retry.
```

---

## Incident #3 — TLS certificate expired / browser shows warning

**Most likely cause:** certbot's renewal timer is broken.

```bash
ssh root@vps

# 1. Check renewal status
certbot certificates

# 2. Force renewal
certbot renew --force-renewal --cert-name yourdomain.com

# 3. Reload nginx to pick up new cert
systemctl reload nginx

# 4. Verify the auto-renewal timer is enabled
systemctl status certbot.timer
```

Certs are issued for 90 days, certbot renews at 60. If yours expired, the renewal timer was broken — investigate logs:
```bash
journalctl -u certbot.timer -n 50
```

---

## Incident #4 — Admin saved a post but it's not showing on the public site

**Most likely cause:** ISR cache. Pages are revalidated every 60 seconds.

```bash
# 1. Wait 60 seconds and refresh
# 2. If still missing after 2+ minutes, force rebuild
ssh root@vps 'cd /opt/just-soft-solution && docker compose restart'

# 3. Verify the change is in the data store
ssh root@vps 'docker exec jss-app cat /app/data/store.json | head -5'
```

If the post **is** in `store.json` but **not** rendering, something blocked the revalidation. Restart fixes it.

---

## Incident #5 — Bad code deploy broke the site, need to roll back

```bash
ssh root@vps
cd /opt/just-soft-solution

# 1. Find the previous good commit
git log --oneline -10

# 2. Roll back
git checkout <previous-good-sha>

# 3. Rebuild
docker compose up -d --build

# 4. Verify
curl -s -o /dev/null -w "%{http_code}\n" https://yourdomain.com/

# 5. Once you've fixed forward, return to the latest
git checkout master
git pull
docker compose up -d --build
```

The Docker named volume `jss-data` preserves the admin store across rollbacks — content additions during the bad period are NOT lost.

---

## Backup & restore

### Manual backup (do this before risky changes)

```bash
ssh root@vps
cd /opt/just-soft-solution
mkdir -p backups
docker cp jss-app:/app/data/store.json backups/store-$(date +%Y%m%d-%H%M%S).json
ls -la backups/
```

### Scheduled nightly backup (cron)

```bash
# 1. Create the script
cat > /usr/local/bin/jss-backup.sh <<'EOF'
#!/bin/bash
set -e
BACKUP_DIR="/opt/just-soft-solution/backups"
mkdir -p "$BACKUP_DIR"
docker cp jss-app:/app/data/store.json "$BACKUP_DIR/store-$(date +%Y%m%d).json"
# Keep last 30 days only
find "$BACKUP_DIR" -name "store-*.json" -mtime +30 -delete
EOF
chmod +x /usr/local/bin/jss-backup.sh

# 2. Schedule (runs daily at 03:00)
( crontab -l 2>/dev/null; echo "0 3 * * * /usr/local/bin/jss-backup.sh" ) | crontab -

# 3. Verify
crontab -l
```

### Off-site backup (recommended)

For paranoid-grade safety, sync the backup folder to S3 / Backblaze / Dropbox:

```bash
# Example: rclone to a B2 bucket
apt install -y rclone
rclone config   # interactive — set up your remote
# Add to the cron script:
rclone copy /opt/just-soft-solution/backups remote:jss-backups
```

### Restore from backup

```bash
ssh root@vps
cd /opt/just-soft-solution

# Stop the app
docker compose stop

# Pick a backup
ls -la backups/

# Restore (replace YYYYMMDD)
docker run --rm -v just-soft-solution_jss-data:/data \
  -v /opt/just-soft-solution/backups:/backup alpine \
  cp /backup/store-YYYYMMDD.json /data/store.json

# Start the app
docker compose start
```

---

## Updating Node.js / framework dependencies

Routine maintenance task — run quarterly.

```bash
# Locally
cd ~/projects/just-soft-solution
npm outdated
npm update                        # patch + minor only
# OR for major upgrades, one package at a time:
npm install next@latest react@latest react-dom@latest
npm run build                     # verify it still works
git add -A && git commit -m "chore: bump deps" && git push

# Then on the server
ssh root@vps 'cd /opt/just-soft-solution && git pull && docker compose up -d --build'
```

Major Next.js upgrades may have breaking changes. Read the release notes before upgrading across major versions.

---

## Performance issues

If pages are slow:

```bash
# 1. Check container resource usage
ssh root@vps 'docker stats jss-app --no-stream'

# 2. If CPU is pegged, restart
ssh root@vps 'cd /opt/just-soft-solution && docker compose restart'

# 3. If memory keeps climbing (leak), schedule a daily restart via cron:
( crontab -l ; echo "0 4 * * * cd /opt/just-soft-solution && /usr/bin/docker compose restart" ) | crontab -

# 4. If the VPS itself is slow, top to see what's competing for resources
ssh root@vps 'top'

# 5. Long term: put Cloudflare in front (free), add a CDN for /icons /illustrations
```

---

## Security hardening (do once)

```bash
# 1. Disable root SSH login (after creating a non-root sudo user)
adduser deploy
usermod -aG sudo deploy
# Copy your SSH key to the new user
mkdir /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys

# Edit /etc/ssh/sshd_config:
#   PermitRootLogin no
#   PasswordAuthentication no
systemctl restart sshd

# 2. Enable UFW firewall
ufw allow OpenSSH
ufw allow "Nginx Full"
ufw enable

# 3. Install fail2ban
apt install -y fail2ban
systemctl enable --now fail2ban

# 4. Verify automatic security updates
apt install -y unattended-upgrades
dpkg-reconfigure --priority=low unattended-upgrades

# 5. Make sure .env is locked down
ls -l /opt/just-soft-solution/.env   # should be -rw------- root
```

---

## Common error patterns and fixes

| Log line | Meaning | Fix |
|---|---|---|
| `EADDRINUSE :::3000` | Port collision | Find & kill the holder |
| `Cannot find module ...` after deploy | Build wasn't fresh | `docker compose up -d --build` |
| `lightningcss.linux-x64-musl.node not found` | Tailwind v4 platform binary missing | `npm ci` without `--omit=optional` |
| `EACCES: permission denied, open '/app/data/store.json'` | Volume permissions wrong | `docker exec -u root jss-app chown -R 1001:1001 /app/data` |
| `MODULE_NOT_FOUND` for `marked` | Dep wasn't installed | `npm install` then rebuild |
| Browser shows "Not Secure" | Cert expired or not loaded | `certbot renew && systemctl reload nginx` |
| `Failed to fetch` on save in admin | Server action timeout / crash | Check logs, restart |
| Site loads but admin returns 307 forever | Cookie set with wrong domain | Clear cookies, log in again |

---

## When to call for help

If you've followed the relevant section above and it's still broken after **15 minutes**, escalate. Don't dig deeper without the right context — you risk making things worse.

Have ready when escalating:
- The exact URL that's broken
- The exact error (screenshot of browser, last 50 log lines from `docker logs`)
- What you tried
- The output of `git log --oneline -5` and `docker ps`

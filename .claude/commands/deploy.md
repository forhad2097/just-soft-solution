---
description: Sync local repo to VPS and rebuild the jss-app container, then smoke-test the live site.
allowed-tools: Bash, Read
---

You are running **/deploy** for Just Soft Solution.

This pushes whatever is in the local working tree (committed or not — it's a tarball, not git) to the production VPS and rebuilds the container in place. Use after `/wrap` (which deploys the committed state) for a quick iterate-on-prod cycle.

## Pre-flight (always)

1. Confirm working dir is `c:/Projects/Just Soft Solution/just-soft-solution`.
2. Run a local build first to catch obvious errors before paying for a 30-second VPS rebuild:

   ```bash
   npx next build 2>&1 | tail -10
   ```

   If it fails — stop. Report the error. Do not deploy a broken build.

## Sync + rebuild

```bash
# 1. Stream tarball to VPS via Tailscale (public IP is firewalled — never works)
tar --exclude='./node_modules' --exclude='./.next' --exclude='./.git' \
    --exclude='./data/store.json' --exclude='./.claude' -czf - . | \
  ssh root@100.101.115.46 'cd /opt/just-soft-solution && tar -xzf - && echo SYNCED'

# 2. Rebuild and restart container; .env on VPS is preserved
ssh root@100.101.115.46 'cd /opt/just-soft-solution && docker compose up -d --build 2>&1 | tail -10'
```

## Verify

```bash
# Wait for healthcheck to start
sleep 4

# Container status
ssh root@100.101.115.46 'docker ps --filter name=jss-app --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'

# Live HTTP smoke test
for path in "/" "/services" "/products" "/contact" "/admin/login"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://jss.aiosolibe.cloud$path")
  echo "$code  https://jss.aiosolibe.cloud$path"
done

# Check last 20 log lines for runtime errors
ssh root@100.101.115.46 'docker logs --tail 20 jss-app 2>&1 | tail -20'
```

## Report

```
## /deploy

✅ Local build: passed
✅ Synced to /opt/just-soft-solution
✅ Container rebuilt: jss-app (<status>)
✅ Live: HTTP 200 on Home, Services, Products, Contact, Admin Login
[!] Logs: <"clean" or N error lines>

Live: https://jss.aiosolibe.cloud
```

If anything fails along the way — surface the exact error verbatim, do not auto-fix without asking.

## Hard rules

- Never SSH the public IP `72.62.73.44` — it's firewalled, only Tailscale `100.101.115.46` works.
- Never run `docker compose down -v` — `-v` deletes the data volume (admin store).
- Never push partial work that doesn't build.

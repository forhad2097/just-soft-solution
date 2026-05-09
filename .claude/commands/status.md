---
description: Production health check — container, nginx, TLS, app routes, and recent logs for jss.aiosolibe.cloud.
allowed-tools: Bash, Read
---

You are running **/status** for Just Soft Solution.

Print one tight, scannable health report covering local repo state, the production container, nginx & TLS, app HTTP responses, and recent error signals.

## Checks (run in parallel where safe)

### Local repo

```bash
cd "c:/Projects/Just Soft Solution/just-soft-solution"
git status -sb
git log --oneline -3
git rev-parse --short HEAD
```

Note: ahead/behind origin, uncommitted changes, last commit subject.

### VPS — container

```bash
ssh root@100.101.115.46 'docker ps --filter name=jss-app --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"'
ssh root@100.101.115.46 'docker stats jss-app --no-stream --format "{{.CPUPerc}}  mem={{.MemUsage}}  net={{.NetIO}}"'
ssh root@100.101.115.46 'docker inspect jss-app --format "Started: {{.State.StartedAt}}  Restarts: {{.RestartCount}}"'
```

### VPS — nginx & TLS

```bash
ssh root@100.101.115.46 'nginx -t 2>&1 | tail -2'
ssh root@100.101.115.46 'echo | openssl s_client -servername jss.aiosolibe.cloud -connect jss.aiosolibe.cloud:443 2>/dev/null | openssl x509 -noout -dates'
```

Note: cert dates (alert if `notAfter` is within 14 days).

### Live HTTP

```bash
for path in "/" "/about" "/services" "/products" "/contact" "/admin/login" "/manifest.webmanifest" "/sitemap.xml" "/robots.txt"; do
  code=$(curl -s -o /dev/null -w "%{http_code}  %{time_total}s" "https://jss.aiosolibe.cloud$path")
  echo "$code  $path"
done
```

Anything non-2xx (except `/admin` which should be 307 → /admin/login) is a flag.

### Logs — last 50 lines, scan for errors

```bash
ssh root@100.101.115.46 'docker logs --tail 50 jss-app 2>&1 | grep -iE "error|warn|fatal|exception" || echo "(no error patterns in last 50 lines)"'
```

## Report format

```
## /status — <green | yellow | red>

🌐 Live: https://jss.aiosolibe.cloud
📦 Container: jss-app  Up <duration> (<healthy|starting|unhealthy>)  Restarts: <n>
💻 Resources: CPU <x%>  Mem <used/limit>
🔒 TLS: valid until <date>  (<n days> remaining)
🛤️  Local repo: <branch> <ahead/behind>  HEAD <sha>: <subject>

Routes:
  ✅ /                    HTTP <code>  <time>s
  ✅ /services            HTTP <code>  <time>s
  ... (one line per path)

Recent log signals:
  <"clean" or last 3 error lines verbatim>

[!] Action items:
- <e.g. "Cert renewing in 7 days — verify certbot timer healthy">
- <or "none — system healthy">
```

Color the headline:
- **green** — all routes 2xx (or expected 3xx), container healthy, cert > 14 days, no error signals.
- **yellow** — minor issue (warnings in logs, cert renewing soon, transient slow response).
- **red** — container down, route 5xx, cert expired/invalid, build/run errors in logs.

## Notes

- Never echo container env vars to the report (would leak `ADMIN_PASSWORD`).
- Tailscale-only SSH — don't try `72.62.73.44` (firewalled).

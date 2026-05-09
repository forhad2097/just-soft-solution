---
description: Clean-start the local Next.js dev server on port 3000. Kills any stale process holding the port first.
allowed-tools: Bash, PowerShell, Read
---

You are running **/dev** for Just Soft Solution.

## Steps

1. **Free port 3000 if held by a stale process** (this happens after Claude Code restarts; the previous dev server can outlive the harness):

   ```powershell
   $conns = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
   if ($conns) {
     $pids = $conns.OwningProcess | Select-Object -Unique
     foreach ($p in $pids) {
       $proc = Get-Process -Id $p -ErrorAction SilentlyContinue
       if ($proc -and $proc.ProcessName -eq "node") {
         Stop-Process -Id $p -Force
         "Killed stale node PID $p"
       }
     }
     Start-Sleep -Seconds 1
   } else {
     "Port 3000 was already free"
   }
   ```

   Only kill `node` processes — never blindly kill whatever is on the port.

2. **Start dev server in background** (so you can keep working in the same chat):

   ```bash
   cd "c:/Projects/Just Soft Solution/just-soft-solution"
   npx next dev -p 3000
   ```

   Use `run_in_background: true` on the Bash call. Capture the task ID.

3. **Wait for "Ready"** (read the task output until you see `Ready in` or `Error`):

   ```bash
   until grep -qE "Ready in|EADDRINUSE|Error:" "<task-output-file>" 2>/dev/null; do sleep 1; done
   tail -10 "<task-output-file>"
   ```

4. **Smoke check** with a single curl:

   ```bash
   curl -s -o /dev/null -w "Home: %{http_code}\n" http://localhost:3000/
   ```

5. **Report**:

   ```
   ## /dev

   ✅ Dev server running: http://localhost:3000
   📂 Task ID: <id>  (stop with TaskStop when done)

   Routes:
   - Public: http://localhost:3000/
   - Admin:  http://localhost:3000/admin/login
   ```

## If startup fails with `EADDRINUSE`

Step 1 didn't catch the holder — repeat the PowerShell block but this time inspect what process holds the port and ask the user before killing if it isn't `node`.

## Notes

- HMR is on by default. Edits to `src/**` reflect in the browser without restart.
- Tailwind v4 picks up new utility usages instantly, no separate watcher needed.
- Server actions (`saveServiceAction` etc) recompile on save.

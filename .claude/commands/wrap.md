---
description: End-of-task / end-of-day finalizer. Verifies build, commits clean, pushes, deploys if requested, updates memory & TODOs.
argument-hint: [optional: deploy | no-deploy | message="custom commit msg"]
allowed-tools: Read, Edit, Write, Bash, Glob, Grep
---

You are running the **/wrap** flow for the Just Soft Solution project.

The user has finished a unit of work — could be one feature, could be a full day. Your job is to leave the project in a clean, deployable, well-recorded state so they can walk away without anxiety.

## Arguments

`$ARGUMENTS` may include:
- `deploy` — push to VPS at the end (https://jss.aiosolibe.cloud)
- `no-deploy` — explicitly skip deploy even if there are user-facing changes
- `message="..."` — override the commit message

If neither `deploy` nor `no-deploy` is present, **ask the user once** at step 4 whether to deploy, then continue.

---

## The wrap protocol — execute in order

### 1. Take stock

- Run `git status -sb` and `git log --oneline -5`. Note unstaged changes, untracked files, current branch, last commit.
- Read the active TODO list (TodoWrite). If the user uses /wrap mid-todo-list, surface what's still pending.

### 2. Verify the build is green

```bash
cd "c:/Projects/Just Soft Solution/just-soft-solution"
npx next build 2>&1 | tail -30
```

If it fails, **stop the wrap**. Report the error and ask the user how to proceed. Do NOT commit a broken build.

### 3. Stage, review, commit

- `git add -A`
- Show `git status --short` to the user — confirm no `.env`, no `data/store.json`, no `*.tsbuildinfo`, no leaked secret. If anything suspicious, pause and ask.
- Compose the commit message:
  - If `message="..."` was passed, use that.
  - Otherwise, look at the diff (`git diff --cached --stat` and a quick scan of `git diff --cached`), and write a 1–3 sentence message focused on the WHY. Subject line ≤ 72 chars, imperative mood ("Add product detail FAQ section", not "Added").
  - End with the standard footer:
    ```
    Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
    ```
- If there's nothing staged, skip commit (don't make empty commits). Note this in the wrap report.

### 4. Push to GitHub

- Confirm remote is `origin` pointing at `github.com/hasanshibly90/just-soft-solution`.
- `git push` (or `git push -u origin <branch>` if branch isn't tracking).
- If push fails (auth, divergence), surface the exact error — don't auto-resolve with rebase or force.

### 5. Deploy decision (if requested or asked)

If `deploy` was passed (or the user confirmed in step 4):

```bash
# from local repo
tar --exclude='./node_modules' --exclude='./.next' --exclude='./.git' \
    --exclude='./data/store.json' -czf - . | \
  ssh root@100.101.115.46 'cd /opt/just-soft-solution && tar -xzf -'

ssh root@100.101.115.46 'cd /opt/just-soft-solution && docker compose up -d --build 2>&1 | tail -10'

# smoke test
sleep 3
ssh root@100.101.115.46 'docker ps --filter name=jss-app --format "{{.Status}}"'
curl -s -o /dev/null -w "Live: %{http_code}\n" https://jss.aiosolibe.cloud/
curl -s -o /dev/null -w "Admin: %{http_code}\n" -L https://jss.aiosolibe.cloud/admin/login
```

If `no-deploy` was passed or user declined: skip and note "Deployed: skipped" in the report.

### 6. Update memory if anything material changed

Check whether any of these changed in this session and, if so, update the relevant memory file under `C:\Users\HP\.claude\projects\c--Projects-Just-Soft-Solution\memory\`:

- New service or product added → no memory update needed (source of truth is in `src/data/`).
- Production credentials rotated → update `secrets-location.md` reminding where the new value lives (don't store the value).
- Deploy pattern changed (new port, new path, env-var rename) → update `deployment.md`.
- New project decision the user explicitly endorsed ("yes, always do it that way") → save as a feedback memory.

If you update memory, also update `MEMORY.md` index lines if the description changed.

### 7. Report

Output a single concise wrap report — no padding. Format:

```
## /wrap — <one-line summary>

✅ Build: passed
✅ Committed: <sha> — "<subject>"
✅ Pushed to origin/master
[✅|↪️] Deployed: <yes & https://... HTTP 200 | skipped>
[✅] Memory: <updated entries | nothing material to record>

[!] Open items:
- <any unfinished todos>
- <anything you couldn't auto-resolve>

Next session: <one practical thing to pick up first>
```

---

## Hard rules

- **Never commit secrets.** If `.env`, `*.pem`, or any file matching `*secret*`/`*password*`/`*token*` shows up in `git status`, halt and report.
- **Never `git push --force`.** If there's a divergence, surface it and ask.
- **Never deploy a broken build.** Step 2 must pass before step 5 runs.
- **Never echo passwords/secrets to chat.** When listing what changed, redact values; reference paths only.
- **Don't invent.** If you didn't do a step (e.g. user said no-deploy), say "skipped" in the report — don't pretend.

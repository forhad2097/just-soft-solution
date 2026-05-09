# Admin Panel Guide

Step-by-step instructions for using the Just Soft Solution admin panel.

---

## Logging in

1. Go to `https://yourdomain.com/admin/login`
2. Enter your admin email and password (delivered separately at handover)
3. You'll land on the dashboard

If you're logged out automatically, the session expired (default: 7 days). Just log in again.

---

## The dashboard

The dashboard shows at a glance:
- Total services / products / blog posts
- How many are published vs. draft
- The 5 most recently updated of each
- Last time the data store was modified

Click any item in "Recent" to jump straight into editing it.

---

## Managing services

Go to **Sidebar → Services**.

### Adding a new service
1. Click **+ New Service** (top-right)
2. Fill in:
   - **Title** — required (e.g., "Mobile App Development")
   - **Slug** — URL path; auto-generated from title if left blank
   - **Category** — pick from the dropdown or type a new one
   - **Tagline** — one short line (≤ 10 words ideal)
   - **Short description** — 1–2 sentences for the card on the listing page
   - **Long description** — full prose for the detail page (3–4 paragraphs)
   - **Icon** — pick from the Lucide icon list
3. Add **Benefits** — click "Add benefit" repeatedly. Aim for 4–6.
4. Add **Process steps** — typically 4 (Discover → Design → Develop → Deliver).
5. Add **Technologies** — one per line in the textarea.
6. Add **FAQ** — questions buyers actually ask. Aim for 4–6.
7. Set **Status** to `published` to make it live, or `draft` to hide it.
8. Optionally set **SEO Meta Title** and **Meta Description** (overrides defaults).
9. Click **Save**.

You'll be returned to the list with a green "saved" banner. Click the eye icon to view the live page.

### Editing a service
Click the title in the list. Make changes. Click **Save**.

### Deleting a service
Click the trash icon next to the row. **No confirmation prompt**, so be careful.

---

## Managing products

Same as services, with a few extra fields:

- **Features** — repeatable title + description pairs (8 items is a good target)
- **Modules** — short bullet labels, one per line
- **Benefits** — short bullet text, one per line
- **Pricing** — _not in the form by default; add via code in `src/data/products.ts` if needed_

Tip: **JSS Multivendor E-commerce** is a good template to copy when adding a new product — it has all the fields filled out.

---

## Managing the blog

This is what you'll use most. Go to **Sidebar → Blog**.

### Writing a new post

1. Click **+ New Post**
2. **Title** — clear, scannable, includes a keyword you want to rank for
3. **Slug** — usually auto-generated; only change if SEO requires
4. **Author** — defaults to "Just Soft Solution Team"
5. **Excerpt** — 1–2 sentences that tease the article. **Used as the meta description** if you don't override.
6. **Content (Markdown)** — write the article. Markdown supported:
   ```markdown
   ## A second-level heading
   ### A third-level heading

   Regular paragraph text. **Bold**, *italic*, [links](https://example.com).

   - bullet
   - lists

   1. numbered
   2. lists

   > Pull-quote / blockquote

   `inline code` and:

   ```
   code blocks
   ```
   ```
7. **Status** — `draft` while writing; `published` to go live
8. **Published date** — defaults to today
9. **Category** — pick from the dropdown or type a new one
10. **Tags** — comma-separated (e.g., `QA, Automation, DevOps`)
11. **Cover Color** — pick a gradient for the card and detail-page cover
12. **SEO** — optional Meta Title and Meta Description; great for ranking

Click **Save**. Reading time is auto-calculated from word count.

### Editing a post
Click the title. Edit. Save. The live site picks up changes within ~60 seconds (ISR cache).

### SEO writing tips
- **Title** — 50–60 characters, include the main keyword near the start
- **Excerpt / meta description** — 140–160 characters, include the keyword naturally
- **First paragraph** — repeat the keyword in plain prose (no stuffing)
- **Headings** — use H2/H3 to break up sections; include related keywords
- **Internal links** — link to your services / products inside the article
- **Length** — 800+ words for ranking; 400+ is a minimum

---

## Settings

Currently read-only — shows site identity from `src/lib/utils.ts` (offices, phone, email, social links). To change, edit the source code and redeploy.

Future versions can make this editable.

---

## What happens when I save?

1. Your change is written to `data/store.json` on the server
2. The relevant pages on the public site are revalidated (ISR `revalidatePath`)
3. Within ~60 seconds, the new content is live
4. The change persists across container restarts (Docker named volume)

---

## Common scenarios

### "I want to hide a page without deleting it"
Set status to `draft`. The page disappears from listings, search, and the sitemap. The detail page returns 404 if accessed directly.

### "I made a typo and saved — how do I undo?"
There's no version history yet. Either:
- Edit the post again and fix the typo
- Restore from a backup (see `RUNBOOK.md` → Backup & restore)

### "I want to change the URL of a published post"
Change the slug. **Old URL stops working** — Google's index will catch up over a few weeks. If the post had backlinks, set up a redirect via your nginx config (see `RUNBOOK.md`).

### "Can two admins edit at once?"
Yes, but the last save wins. There's no concurrent-edit protection in v1.

### "I want a real WYSIWYG editor"
The current Markdown textarea is intentional — it produces clean output and forces semantic structure. If you need rich-text, swap in TipTap or Lexical and update `savePostAction` to handle HTML. Easy upgrade.

---

## Mobile use

The admin panel works on mobile. Open `https://yourdomain.com/admin/login` on your phone, log in, and use it like any responsive web app. The sidebar collapses to a hamburger menu.

Best for blog posts written on the go. Less great for full service/product editing — those forms have many fields.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Login fails despite correct password | `ADMIN_SESSION_SECRET` was rotated and your cookie is stale | Clear cookies for the domain, retry |
| Saved a post but it's not on the public site | ISR cache; wait 60s | Or restart the container to force-flush |
| Form fields look empty after Save | The page redirected and you're seeing the list — check for the green "saved" banner |
| "Cannot find module..." after deploy | Build wasn't fresh | `docker compose up -d --build` (note the `--build`) |
| 404 on a slug you just created | Slug auto-generation stripped a character (e.g., `&` becomes nothing) | Edit the post, set the slug manually |

When in doubt, check `docker logs jss-app --tail 50` for actual error messages.

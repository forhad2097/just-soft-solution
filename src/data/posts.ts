import type { BlogPost } from "./types";

export const posts: BlogPost[] = [
  {
    slug: "why-software-testing-is-not-optional-in-2026",
    title: "Why Software Testing Is Not Optional in 2026",
    excerpt:
      "A bug that escapes to production costs 10–100× more to fix than one caught in QA. Here's what changes that math — and how a senior QA team protects revenue without slowing release velocity.",
    category: "Software Testing",
    tags: ["QA", "Automation", "DevOps", "Quality Engineering"],
    author: "Just Soft Solution Team",
    coverColor: "from-cyan-500 to-blue-600",
    publishedAt: "2026-04-15",
    readingMinutes: 6,
    metaTitle: "Why Software Testing Is Not Optional in 2026 | JSS Blog",
    metaDescription:
      "Bugs in production cost 10–100× more than bugs caught in QA. Here's how senior testing protects revenue without slowing your release velocity.",
    status: "published",
    content: `## The cost equation has changed

For a long time, software testing was treated as a phase — something that happens after development "finishes." That model breaks at modern release velocity. When you ship daily (or hourly), the gap between "feature done" and "feature in production" is measured in minutes, not weeks. There's no room for a separate QA cycle that takes longer than the dev work itself.

The math is simple. A defect found in design costs **$1**. The same defect found in development costs **$10**. In QA, **$100**. In production, **$1,000+** — and that's before counting reputation damage, churned customers, or compliance fines. Yet many companies still treat QA as a cost center to trim.

## What "modern QA" actually looks like

Modern QA is not a team that runs scripts the day before release. It's a discipline embedded into the engineering pipeline:

- **Test strategy on day one** — risk-based, traceable to requirements, signed off by stakeholders. Not "we'll figure it out later."
- **Manual + automation balance** — exploratory testing for human intuition, automation for regression at scale.
- **CI-integrated** — every push runs the suite. Failures break the build. Nobody merges past a red pipeline.
- **Performance budgets** — p95 latency targets, throughput SLAs, error budgets. Measured continuously, not once before launch.
- **Security baselines** — OWASP Top 10 checks, dependency scanning, secret detection. Enforced as gates, not advisory.

## What it costs to skip it

Every team that "doesn't have time for proper QA" eventually pays the bill in one of three forms:

1. **Customer attrition.** A bug that hits a single high-value account quietly, then they switch quietly.
2. **Compliance penalty.** GDPR, HIPAA, PCI — the fines for a single data leak dwarf years of QA budget.
3. **Engineering velocity collapse.** Without tests, every change risks breaking unrelated things. Eventually devs spend more time firefighting than building.

## Where to start

If you're behind on this, start small and compound:

1. **Pick one critical user journey** (signup, checkout, the core workflow). Automate it end-to-end this month.
2. **Add CI gates** — no merge without passing tests. Even if you have only ten tests today.
3. **Hire one senior QA engineer or partner** with a team that's done it before. Their first three weeks will be more valuable than the next year of patch-fixing.

We've embedded senior QA practices into companies of every size, from 5-person startups to multi-plant industrial groups. The pattern is the same: it pays for itself in the first six months, and after that it's pure compounding.`,
  },
  {
    slug: "api-testing-with-postman-and-k6-a-practical-guide",
    title: "API Testing with Postman and k6: A Practical Guide",
    excerpt:
      "Two tools, two purposes — and most teams use them wrong. Here's the workflow that catches contract regressions in CI and load-test failures before launch.",
    category: "API Testing",
    tags: ["Postman", "k6", "Performance", "API"],
    author: "Just Soft Solution Team",
    coverColor: "from-blue-500 to-violet-600",
    publishedAt: "2026-03-28",
    readingMinutes: 8,
    metaTitle: "API Testing with Postman and k6 — Practical Guide | JSS",
    metaDescription:
      "How to combine Postman for contract testing with k6 for performance — a practical workflow used in production for fintech and e-commerce APIs.",
    status: "published",
    content: `## Two tools, two jobs

Most teams reach for Postman first because it has a friendly UI and great collection management. They reach for k6 (or JMeter, Gatling) when something gets slow in production. The mistake is treating these as alternatives. They solve different problems and you need both.

**Postman is for contract testing.** Does the API still return what consumers expect? Are status codes right? Are required fields present? Did the schema change without a version bump?

**k6 is for performance testing.** How does the API behave under realistic load? What's the p95 latency at peak? Where do bottlenecks emerge — DB, app server, external service?

## The workflow we use in production

### 1. Postman collections, version-controlled

Export your collections as JSON. Commit them next to the code they test. Every API change PR includes a collection update — reviewers see contract changes alongside implementation changes. Use environment variables for staging vs prod base URLs.

### 2. Newman in CI

\`newman run collection.json --environment staging.json --reporters cli,junit\` runs your collection on every push. Failures break the build. JUnit output integrates with your CI's test reporter.

### 3. k6 scripts for the hot paths

Identify the 5–10 most-trafficked endpoints. Write a k6 script per journey:

\`\`\`js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<400'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const r = http.get('https://api.example.com/products');
  check(r, { 'status 200': (res) => res.status === 200 });
  sleep(1);
}
\`\`\`

### 4. Run k6 nightly against staging

Not just before launch. The point is to catch regressions early — when a new feature triples the DB load on \`/products\` you want to know **tomorrow**, not the week before peak traffic season.

## What we report

We give clients a single dashboard with:

- Contract pass-rate (Postman) over time
- p95 latency per endpoint (k6)
- Error rate at different load levels
- Top 5 slowest queries (from APM)

That's enough for engineering leadership to make resourcing decisions. Anything more is noise.

## Where this breaks down

- **GraphQL** — Postman handles it, but contract testing requires schema diff tools (Apollo Rover, GraphQL Inspector) on top.
- **Asynchronous APIs** — webhooks, message queues. Postman/k6 alone don't model them. We use Pact for contract testing async flows.
- **Auth-heavy flows** — OAuth2 token rotation, mTLS. Worth scripting once and reusing across collections.

If you're starting from zero on API testing, the first month should produce: a Postman collection covering your top 10 endpoints, Newman running in CI, and one k6 script for your busiest journey. That alone catches 80% of the regressions teams ship by accident.`,
  },
  {
    slug: "from-spreadsheet-to-erp-when-its-time-to-graduate",
    title: "From Spreadsheet to ERP: When It's Time to Graduate",
    excerpt:
      "Spreadsheets carry many companies further than they should. Here are the five signals that say it's time, and what to look for in the system that replaces them.",
    category: "ERP",
    tags: ["ERP", "Operations", "Manufacturing", "Inventory"],
    author: "Just Soft Solution Team",
    coverColor: "from-violet-500 to-pink-600",
    publishedAt: "2026-03-10",
    readingMinutes: 5,
    metaTitle: "From Spreadsheet to ERP — When It's Time to Graduate | JSS",
    metaDescription:
      "Five clear signals your spreadsheets have outgrown their job, and what to look for in the ERP that replaces them. From a partner that's done this 200+ times.",
    status: "published",
    content: `## The most common reason companies don't switch

Spreadsheets are infinitely flexible. They start as personal tools and quietly become operational systems — until one day, the inventory file has 38 tabs, three people own different versions, and last quarter's numbers don't reconcile to this quarter's.

The reason most companies don't switch is simple: **the spreadsheet works.** Until it doesn't, and by then the migration is painful. So they patch one more time and push the decision out another quarter.

## Five signals you've outgrown them

### 1. Different teams have different "truth"

Sales says inventory is X. Warehouse says it's Y. Finance says Z. Three spreadsheets, three answers, no way to reconcile without a meeting. If your weekly stand-up has become a data-validation meeting, you've outgrown spreadsheets.

### 2. Month-end takes more than a week

When closing the books requires copy-pasting between sheets, manual reconciliations, and "asking Karim for the latest version," the bottleneck is the data model, not the people. ERP cuts this from weeks to days.

### 3. You can't answer simple questions in under five minutes

"How much profit did we make on Product X last month?" If that takes a phone call, an email, and 45 minutes of digging — you don't have data, you have files.

### 4. Audit season is a trauma

When external auditors ask for evidence of controls, segregation of duties, or audit trails, and your answer is "let me check who edited that sheet last week," you have a compliance risk.

### 5. Onboarding takes weeks

If a new finance hire needs three weeks to learn "where things are" before being productive, that's process knowledge trapped in tribal memory. ERP encodes process into software so onboarding becomes hours, not weeks.

## What to look for in the ERP

When companies graduate, they often over-buy — they pick a Tier-1 ERP because it has every feature, and 18 months later half of it is unused. We recommend the opposite:

- **Start with the modules you'll use month one** — finance, inventory, sales. Add others as needs prove themselves.
- **Open architecture** — the ERP should expose APIs. Closed systems lock you in.
- **Local compliance** — for Bangladesh, that means VAT (Mushak forms, 9.1 returns), withholding tax, NBR e-Return integration. Generic ERPs miss these.
- **Implementation partner that has done it before** — the vendor matters less than who configures it.

## How long does it take

For a single-plant or single-business deployment of our **JSS Industrial ERP**: 4–6 months from kickoff to production, including data migration, training, and parallel run. Multi-plant phased rollouts: 9–18 months.

The clients who get the best results are the ones who treat the ERP project as a process redesign opportunity, not a software install. The system encodes process — if your process is broken, you'll just automate the dysfunction faster.`,
  },
];

export const getPostBySlug = (slug: string) =>
  posts.find((p) => p.slug === slug);

export const getPostCategories = () => {
  const set = new Set(posts.map((p) => p.category));
  return ["All", ...Array.from(set)];
};

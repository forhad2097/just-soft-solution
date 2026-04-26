import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    category: "Development",
    icon: "Globe",
    tagline: "Modern, blazing-fast websites and web apps",
    description:
      "Pixel-perfect, SEO-optimized websites and web applications built with React, Next.js and Node.js. From marketing sites to enterprise dashboards.",
    longDescription:
      "At Just Soft Solution we engineer web experiences that load fast, rank well, and convert. Whether you need a marketing website, a SaaS platform, or a complex internal dashboard, our team builds with battle-tested stacks — Next.js, React, TypeScript, Node.js — and modern DevOps practices. Every project ships with mobile-first responsive design, accessibility, performance budgets, and SEO baked in. We don't just deliver code; we deliver business outcomes.",
    benefits: [
      { title: "Lightning-fast performance", description: "Lighthouse 90+ on every page, optimized Core Web Vitals." },
      { title: "SEO-ready out of the box", description: "Server-side rendering, structured data, sitemaps, OG tags." },
      { title: "Mobile-first responsive", description: "Tested on real devices from 360px to 4K." },
      { title: "Scalable architecture", description: "Cloud-native deployment, CDN, autoscaling, observability." },
      { title: "Accessibility (WCAG 2.1 AA)", description: "Inclusive design that passes audits." },
      { title: "Long-term maintainability", description: "Clean code, typed everywhere, documented." },
    ],
    process: [
      { step: "01", title: "Discovery", description: "Goals, audience, success metrics, content audit." },
      { step: "02", title: "Design", description: "Wireframes, prototypes, design system in Figma." },
      { step: "03", title: "Development", description: "Iterative sprints, weekly demos, staging reviews." },
      { step: "04", title: "Launch & Support", description: "Migration, monitoring, performance tuning, ongoing care." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "AWS", "Vercel"],
    faqs: [
      { q: "How long does a typical website take?", a: "A marketing site takes 4–6 weeks; a complex web app 8–16 weeks depending on scope." },
      { q: "Do you provide hosting?", a: "Yes. We deploy to Vercel, AWS, or your preferred cloud and manage CI/CD pipelines." },
      { q: "Will my site be SEO-friendly?", a: "Absolutely. SSR, structured data, sitemaps, optimized images and Core Web Vitals are part of every build." },
      { q: "Do you support content updates after launch?", a: "Yes. We integrate a CMS or build a custom admin panel so your team can edit content without developer help." },
    ],
    status: "published",
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "Development",
    icon: "Code2",
    tagline: "Software that fits your business — not the other way around",
    description:
      "Tailor-made desktop, web, and cloud applications engineered around your exact workflow. Agile delivery, transparent pricing, production-grade quality.",
    longDescription:
      "Off-the-shelf software forces your business into someone else's mold. Custom software does the opposite — it adapts to the way you actually work. Just Soft Solution builds bespoke applications, from internal tools that automate tedious tasks to mission-critical platforms that run entire operations. We follow agile delivery with short iterations, weekly demos, and complete visibility. You see progress every week and you can change direction whenever priorities shift.",
    benefits: [
      { title: "Built around your workflow", description: "No compromises, no plugins — just software that fits." },
      { title: "Agile, transparent delivery", description: "Weekly demos, change-friendly contracts, no surprises." },
      { title: "Production-grade quality", description: "Tests, CI/CD, monitoring, security from day one." },
      { title: "Scales as you grow", description: "Architected for 10× your current load." },
      { title: "You own the code", description: "Full source code, documentation, and IP transfer." },
      { title: "Long-term partnership", description: "Optional retainers for support, enhancements, and scaling." },
    ],
    process: [
      { step: "01", title: "Requirements & UX", description: "Workshops, user interviews, mapped workflows." },
      { step: "02", title: "Architecture", description: "Tech stack, data model, security, integrations." },
      { step: "03", title: "Build & Test", description: "2-week sprints, automated QA, UAT." },
      { step: "04", title: "Deploy & Evolve", description: "Production launch, training, ongoing roadmap." },
    ],
    technologies: [".NET", "Java", "Python", "Node.js", "React", "Flutter", "PostgreSQL", "MongoDB", "Docker", "Kubernetes"],
    faqs: [
      { q: "How do you scope custom projects?", a: "Discovery workshop → fixed-scope MVP → iterative roadmap. Hourly or fixed-price options." },
      { q: "Will I own the source code?", a: "Yes. 100% IP transfer with documentation on delivery." },
      { q: "Can you integrate with our existing systems?", a: "We routinely integrate with ERPs, CRMs, payment gateways, and legacy databases." },
      { q: "What about ongoing maintenance?", a: "We offer monthly retainers covering bug fixes, security patches, and feature enhancements." },
    ],
    status: "published",
  },
  {
    slug: "e-commerce",
    title: "E-commerce Solutions",
    category: "Development",
    icon: "ShoppingCart",
    tagline: "Online stores that sell, scale, and stand out",
    description:
      "End-to-end e-commerce — storefronts, payment gateways, inventory, multi-vendor support, mobile apps. Built to convert and scale.",
    longDescription:
      "An online store is more than a catalog — it's a 24/7 sales engine. We build conversion-optimized e-commerce experiences on platforms like Shopify, WooCommerce, Magento, and fully custom stacks. Multi-vendor marketplaces, B2B portals, headless commerce, mobile apps with offline mode — whatever your model, we engineer it for speed, security, and SEO. Local payment gateways (bKash, Nagad, SSLCommerz, Stripe, PayPal), tax compliance, and analytics are all included.",
    benefits: [
      { title: "Conversion-optimized UX", description: "Designed by data, validated by A/B tests." },
      { title: "Local payment gateways", description: "bKash, Nagad, SSLCommerz, Stripe, PayPal — all integrated." },
      { title: "Multi-channel ready", description: "Web, mobile app, marketplace integrations (Daraz, Amazon)." },
      { title: "Inventory & order management", description: "Real-time stock, multi-warehouse, automated workflows." },
      { title: "SEO that ranks", description: "Schema markup, fast loading, content strategy." },
      { title: "Secure & PCI compliant", description: "TLS everywhere, tokenized payments, fraud protection." },
    ],
    process: [
      { step: "01", title: "Strategy", description: "Market, products, pricing, conversion goals." },
      { step: "02", title: "Design", description: "Brand-aligned UX, product page templates, checkout flow." },
      { step: "03", title: "Build", description: "Storefront, payments, inventory, admin." },
      { step: "04", title: "Grow", description: "Launch, SEO, performance marketing support." },
    ],
    technologies: ["Shopify", "WooCommerce", "Magento", "Next.js Commerce", "Stripe", "bKash", "Algolia", "Sanity"],
    faqs: [
      { q: "Which platform is best for me?", a: "Depends on scale, customization, and budget. We help you choose during discovery." },
      { q: "Do you support B2B and wholesale?", a: "Yes — tiered pricing, customer groups, quote workflows, credit terms." },
      { q: "Can you build a multi-vendor marketplace?", a: "Yes. See our JSS Multivendor E-commerce product, or we build fully custom." },
      { q: "Will it handle Black Friday traffic?", a: "We load-test every store at 10× expected peak before launch." },
    ],
    status: "published",
  },
  {
    slug: "sms-services",
    title: "SMS Services",
    category: "Marketing",
    icon: "MessageSquare",
    tagline: "Bulk SMS, OTP, and messaging APIs that just work",
    description:
      "Bulk SMS marketing, OTP verification, masking, two-way SMS, and developer-friendly APIs for transactional messaging at scale.",
    longDescription:
      "SMS still has the highest open rate of any channel. Just Soft Solution provides reliable SMS gateway integrations and complete messaging platforms — bulk marketing campaigns, transactional OTP, two-way conversations, and masking (sender ID branding). Our APIs are clean, documented, and production-ready, with delivery reports, scheduling, and detailed analytics. Whether you're sending 1,000 SMS or 1 million, we keep delivery rates high and costs low.",
    benefits: [
      { title: "High delivery rates", description: "Direct operator routes across BD, UAE, USA, and 200+ countries." },
      { title: "Masking & branded sender", description: "Send SMS as your company name, not a random number." },
      { title: "OTP & 2FA APIs", description: "Sub-second OTP delivery for login and verification flows." },
      { title: "Two-way SMS", description: "Receive replies, build SMS chatbots, automate responses." },
      { title: "Real-time analytics", description: "Delivery reports, click tracking on short URLs, ROI dashboards." },
      { title: "Compliance-ready", description: "Opt-out handling, DND lists, BTRC-compliant in Bangladesh." },
    ],
    process: [
      { step: "01", title: "Setup", description: "Account, sender ID approval, API keys." },
      { step: "02", title: "Integration", description: "REST API or our admin panel — whichever fits." },
      { step: "03", title: "Test", description: "Sandbox sending, delivery validation." },
      { step: "04", title: "Scale", description: "Go live with monitoring and 24/7 support." },
    ],
    technologies: ["REST API", "Webhooks", "Twilio-compatible", "BTRC routes", "GCC routes"],
    faqs: [
      { q: "How fast is OTP delivery?", a: "Typically under 5 seconds, with operator-direct routing." },
      { q: "Do you support international SMS?", a: "Yes — 200+ countries with tiered pricing." },
      { q: "Can I get a custom sender ID?", a: "Yes. Approval times depend on country (1–7 days typical)." },
      { q: "Is there a minimum commitment?", a: "Pay-as-you-go available. Volume discounts kick in above 50k SMS/month." },
    ],
    status: "published",
  },
  {
    slug: "software-resource-rental",
    title: "Software Resource Rental",
    category: "Consulting",
    icon: "Users",
    tagline: "Rent senior engineers — by the hour, week, or quarter",
    description:
      "On-demand access to senior developers, QA engineers, designers, and DevOps. Scale your team up or down without hiring overhead.",
    longDescription:
      "Hiring a senior engineer takes months. Renting one takes days. Just Soft Solution offers a flexible resource rental model where you get pre-vetted, senior-level talent — full-stack developers, QA automation engineers, UI/UX designers, DevOps, data engineers, project managers — embedded directly into your team. Hourly, weekly, or quarterly engagements. They use your tools, attend your standups, and deliver under your processes. When the project ends, the cost ends. No long-term contracts, no severance, no overhead.",
    benefits: [
      { title: "Pre-vetted senior talent", description: "Top 5% of applicants. 5+ years experience minimum." },
      { title: "Flexible engagements", description: "Hourly, weekly, monthly, or quarterly — scale as needed." },
      { title: "Embedded in your team", description: "They use your Slack, Jira, GitHub. Standups daily." },
      { title: "All disciplines covered", description: "Frontend, backend, mobile, QA, DevOps, design, PM." },
      { title: "No HR overhead", description: "We handle payroll, benefits, equipment, sick leave." },
      { title: "Replacement guarantee", description: "Not a fit? We replace within 7 days at no extra cost." },
    ],
    process: [
      { step: "01", title: "Match", description: "Tell us the role, stack, seniority. We shortlist in 48 hours." },
      { step: "02", title: "Interview", description: "You meet 2–3 candidates. Pick your favorite." },
      { step: "03", title: "Onboard", description: "Day-one productive. Tools, accesses, intros done." },
      { step: "04", title: "Deliver", description: "Weekly check-ins, transparent timesheets, monthly reviews." },
    ],
    technologies: ["All major stacks", "Time tracking", "Slack integration", "Jira/Linear ready"],
    faqs: [
      { q: "What's the minimum engagement?", a: "20 hours per week for 4 weeks. Shorter sprints by exception." },
      { q: "Can I hire them full-time later?", a: "Yes — converting after 6 months is straightforward and waives our placement fee." },
      { q: "Where are the engineers based?", a: "Mostly Dhaka and Abu Dhabi. Time zones overlap with most regions." },
      { q: "How do you ensure quality?", a: "Vetting includes coding tests, architecture interviews, and 2 client references." },
    ],
    status: "published",
  },
  {
    slug: "software-quality-assurance",
    title: "Software Quality Assurance",
    category: "Testing",
    icon: "ShieldCheck",
    tagline: "End-to-end QA that ships confidence with every release",
    description:
      "Comprehensive QA strategy, test planning, defect management, and release governance. Lower your bug count, raise your release velocity.",
    longDescription:
      "Bugs in production cost 10–100× more than bugs caught in QA. Just Soft Solution embeds senior QA engineers and SDETs into your team to build a complete quality program — test strategy, manual scripts, automation suites, performance budgets, security baselines, and release governance. We work with your existing dev pipeline (GitHub, GitLab, Jenkins, Azure DevOps) and report defects with reproduction steps, screenshots, and severity. Result: fewer escapes, faster releases, calmer launches.",
    benefits: [
      { title: "Test strategy & planning", description: "Risk-based, traceable to requirements, signed off by stakeholders." },
      { title: "Defect lifecycle management", description: "Triage, severity, SLAs, dashboards." },
      { title: "Release governance", description: "Go/no-go criteria, smoke/regression gates, sign-off." },
      { title: "Cross-platform coverage", description: "Web, mobile (iOS/Android), desktop, embedded." },
      { title: "Compliance ready", description: "ISO 25010, ISTQB-aligned processes, audit trails." },
      { title: "Clear reporting", description: "Daily/weekly status, defect metrics, leadership dashboards." },
    ],
    process: [
      { step: "01", title: "Audit", description: "Current QA maturity, gaps, opportunities." },
      { step: "02", title: "Plan", description: "Strategy doc, test plan, automation roadmap." },
      { step: "03", title: "Execute", description: "Run cycles, log defects, track to closure." },
      { step: "04", title: "Improve", description: "Retros, metrics, continuous improvement." },
    ],
    technologies: ["Jira", "TestRail", "Zephyr", "qTest", "Selenium", "Cypress", "Playwright", "Postman"],
    faqs: [
      { q: "Do you replace our QA team or supplement it?", a: "Either model works. We frequently start as a supplement and grow into the lead role." },
      { q: "Can you set up a QA practice from scratch?", a: "Yes. Strategy, tooling, hiring, and process design — we've built QA orgs from zero." },
      { q: "What about regulated industries (finance, healthcare)?", a: "We follow PCI-DSS, HIPAA, GDPR, and ISO standards depending on your sector." },
      { q: "How is success measured?", a: "Escape rate, defect density, regression coverage, time-to-release." },
    ],
    status: "published",
  },
  {
    slug: "software-testing-manual-and-automation",
    title: "Software Testing — Manual & Automation",
    category: "Testing",
    icon: "Bug",
    tagline: "Manual + automation testing — engineered for confidence",
    description:
      "Functional, regression, UAT, smoke, and exploratory testing — plus Selenium, Cypress, Playwright automation frameworks built to scale with you.",
    longDescription:
      "Testing isn't a phase — it's a discipline. Just Soft Solution provides full-spectrum software testing: thorough manual exploratory and scripted runs for human-only intuition, plus robust automation suites that catch regressions before they reach users. We build maintainable Page Object frameworks in Selenium, Cypress, Playwright, and Appium for mobile. Your test suite becomes an asset that grows with the product, not a bottleneck that slows it down. CI/CD integration is standard.",
    benefits: [
      { title: "Manual + automation balance", description: "Right test at the right level. No over-automation." },
      { title: "Maintainable frameworks", description: "Page Objects, fixtures, data builders — reusable, readable." },
      { title: "CI/CD integrated", description: "Every push runs the suite. Failures break the build." },
      { title: "Cross-browser & mobile", description: "Chrome, Safari, Firefox, Edge, iOS, Android." },
      { title: "Visual regression", description: "Pixel-diff snapshots on every PR." },
      { title: "Fast feedback", description: "Parallel execution, smart sharding, sub-10-min suites." },
    ],
    process: [
      { step: "01", title: "Test plan", description: "Coverage matrix, prioritization, environments." },
      { step: "02", title: "Manual cycle", description: "Exploratory + scripted, defect logging." },
      { step: "03", title: "Automate", description: "High-value scenarios automated and integrated to CI." },
      { step: "04", title: "Maintain", description: "Flake fixes, new feature coverage, framework upgrades." },
    ],
    technologies: ["Selenium", "Cypress", "Playwright", "Appium", "TestNG", "JUnit", "Pytest", "BrowserStack", "Sauce Labs"],
    faqs: [
      { q: "Should I automate everything?", a: "No. Automate stable, high-value, repetitive flows. Keep exploratory testing manual." },
      { q: "Can you test mobile apps?", a: "Yes — native iOS, Android, React Native, Flutter, with Appium and Detox." },
      { q: "How do you handle flaky tests?", a: "Quarantine, root-cause, fix or remove. We track flakiness as a first-class metric." },
      { q: "Do you do accessibility testing?", a: "Yes — axe-core integrated into pipelines plus manual screen reader passes." },
    ],
    status: "published",
  },
  {
    slug: "api-and-performance-testing",
    title: "API & Performance Testing",
    category: "Testing",
    icon: "Zap",
    tagline: "APIs that are bulletproof and lightning-fast",
    description:
      "REST and GraphQL API testing, contract validation, load testing with JMeter, k6, LoadRunner — find limits before your users do.",
    longDescription:
      "An API outage at peak traffic doesn't just frustrate users — it costs revenue and trust. Just Soft Solution validates APIs end-to-end: contract testing (Postman, REST Assured, Pact), security testing (OWASP API Top 10), and performance testing under realistic load (JMeter, k6, Gatling, LoadRunner). We model real user behavior, ramp to 10× expected peak, and surface bottlenecks — DB queries, N+1s, memory leaks, slow third parties — before launch. Reports include actionable fixes, not just charts.",
    benefits: [
      { title: "Contract testing", description: "Postman, REST Assured, Pact — versioned and CI-integrated." },
      { title: "Realistic load modeling", description: "Real user journeys, not synthetic ping floods." },
      { title: "Bottleneck identification", description: "Profiling, APM, query analysis, infra metrics." },
      { title: "OWASP API Top 10", description: "Auth, injection, broken object level authorization, mass assignment — covered." },
      { title: "Performance budgets", description: "p95, p99, throughput SLAs, error budgets." },
      { title: "Actionable reports", description: "Root cause + recommended fix, not just graphs." },
    ],
    process: [
      { step: "01", title: "Scope", description: "Critical APIs, SLAs, target load, success criteria." },
      { step: "02", title: "Script", description: "Test scripts, data, parameterization, scenarios." },
      { step: "03", title: "Run", description: "Smoke, load, stress, soak, spike — all four." },
      { step: "04", title: "Report", description: "Findings, root cause, recommendations, retest." },
    ],
    technologies: ["JMeter", "k6", "Gatling", "LoadRunner", "Postman", "REST Assured", "Pact", "New Relic", "Datadog"],
    faqs: [
      { q: "How much load can you simulate?", a: "Tens of thousands of concurrent users from distributed cloud agents." },
      { q: "Can you test third-party APIs?", a: "Yes — including rate-limit handling, retry logic, circuit breakers." },
      { q: "Do you test GraphQL?", a: "Yes. Query depth, complexity, n+1, persisted queries — we cover the GraphQL-specific risks." },
      { q: "Will testing impact production?", a: "We test against staging or production-mirror environments. Production tests only with controls and your sign-off." },
    ],
    status: "published",
  },
  {
    slug: "big-data-analysis",
    title: "Big Data Analysis",
    category: "Data",
    icon: "BarChart3",
    tagline: "Turn raw data into business decisions",
    description:
      "Data pipelines, warehousing, analytics dashboards, and ML insights using Hadoop, Spark, Databricks, and modern BI tools.",
    longDescription:
      "Most companies have more data than they know what to do with. Just Soft Solution turns that raw data into operational intelligence. We design and operate end-to-end data platforms — ingestion (CDC, APIs, files), warehousing (Snowflake, BigQuery, Redshift), transformation (dbt, Spark), and visualization (Power BI, Tableau, Metabase). For advanced use cases, we apply ML for forecasting, churn prediction, anomaly detection, and natural language analytics. Self-serve dashboards put insights in the hands of decision-makers, not just analysts.",
    benefits: [
      { title: "Modern data stack", description: "Cloud warehouse, dbt, Airflow, BI — best-in-class tools, integrated." },
      { title: "Self-serve BI", description: "Non-technical teams answer their own questions." },
      { title: "Real-time analytics", description: "Streaming pipelines for live dashboards and alerting." },
      { title: "ML-ready", description: "Feature stores, training pipelines, model deployment." },
      { title: "Data quality first", description: "Tests, lineage, freshness — trust your numbers." },
      { title: "Cost-optimized", description: "Right-sized clusters, query tuning, storage tiering." },
    ],
    process: [
      { step: "01", title: "Audit", description: "Sources, current state, business questions." },
      { step: "02", title: "Architect", description: "Stack, data model, governance, access." },
      { step: "03", title: "Build", description: "Pipelines, models, dashboards, ML." },
      { step: "04", title: "Enable", description: "Training, documentation, on-call analytics." },
    ],
    technologies: ["Snowflake", "BigQuery", "Databricks", "Spark", "Hadoop", "dbt", "Airflow", "Power BI", "Tableau", "Python"],
    faqs: [
      { q: "How fresh is the data?", a: "From batch (hourly/daily) to streaming (sub-second). Depends on use case and budget." },
      { q: "Can you migrate legacy data warehouses?", a: "Yes — from Oracle, Teradata, on-prem Hadoop to cloud-native warehouses." },
      { q: "Do you train our team?", a: "Always. Knowledge transfer is part of every engagement." },
      { q: "What about data privacy?", a: "GDPR, HIPAA, PII tokenization, role-based access — built into the architecture." },
    ],
    status: "published",
  },
  {
    slug: "ui-ux-design-services",
    title: "UI & UX Design Services",
    category: "Design",
    icon: "Palette",
    tagline: "Designs that delight users and drive conversions",
    description:
      "User research, wireframing, prototyping, design systems in Figma. Every pixel chosen for usability, accessibility, and conversion.",
    longDescription:
      "Beautiful design is table stakes. Effective design moves metrics. Just Soft Solution's design team blends user research, behavioral psychology, and modern visual craft to create interfaces that users love and businesses profit from. We deliver design systems that scale, prototypes that validate before code is written, and final mockups that engineers can implement pixel-perfectly. Our process is collaborative — we co-create with you, not in isolation.",
    benefits: [
      { title: "Research-driven", description: "Interviews, surveys, analytics, competitive teardowns." },
      { title: "Validated prototypes", description: "Test before you build. Catch problems in Figma, not in code." },
      { title: "Design systems", description: "Tokens, components, documentation — scale across products." },
      { title: "Accessibility-first", description: "WCAG 2.1 AA, color contrast, keyboard nav, screen readers." },
      { title: "Conversion-optimized", description: "Funnels, friction audits, A/B test recommendations." },
      { title: "Developer-friendly", description: "Figma → Tailwind tokens, component specs, motion guidelines." },
    ],
    process: [
      { step: "01", title: "Research", description: "Users, market, competitors, business goals." },
      { step: "02", title: "Wireframe", description: "Information architecture, low-fi screens, user flows." },
      { step: "03", title: "Visual design", description: "Hi-fi mockups, design system, motion." },
      { step: "04", title: "Handoff", description: "Specs, prototypes, dev support during build." },
    ],
    technologies: ["Figma", "FigJam", "Maze", "Hotjar", "Lottie", "Framer Motion specs"],
    faqs: [
      { q: "Do you redesign existing products?", a: "Yes — many of our engagements start as a UX audit and redesign." },
      { q: "Can you work without a brand?", a: "Yes — we design brand identity (logo, colors, type) when needed." },
      { q: "How long does a design project take?", a: "A redesign of a mid-size product typically takes 6–10 weeks." },
      { q: "Can you do mobile and web?", a: "Yes — native iOS, Android, web, and responsive cross-platform." },
    ],
    status: "published",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "Marketing",
    icon: "TrendingUp",
    tagline: "Data-driven growth, not vanity metrics",
    description:
      "SEO, SEM, social media, content marketing, and email automation — engineered to grow revenue, not just impressions.",
    longDescription:
      "Most digital marketing chases vanity metrics. We chase pipeline. Just Soft Solution's marketing team builds full-funnel growth programs: technical SEO that drives qualified organic traffic, paid campaigns (Google, Meta, LinkedIn) optimized for CAC and LTV, content that ranks and educates, and email automation that nurtures and converts. Everything is measured. We report what worked, what didn't, and what we're trying next.",
    benefits: [
      { title: "Technical SEO", description: "Site audits, schema, Core Web Vitals, internal linking." },
      { title: "Paid acquisition", description: "Google Ads, Meta, LinkedIn, TikTok — optimized for ROAS." },
      { title: "Content strategy", description: "Topical authority, search intent, EEAT." },
      { title: "Email & automation", description: "Drip sequences, lifecycle, abandoned cart, win-back." },
      { title: "Analytics & attribution", description: "GA4, Mixpanel, server-side tracking, multi-touch attribution." },
      { title: "Transparent reporting", description: "Weekly dashboards, monthly reviews, no fluff." },
    ],
    process: [
      { step: "01", title: "Strategy", description: "ICP, channels, budget, KPI tree." },
      { step: "02", title: "Setup", description: "Tracking, accounts, creative pipeline." },
      { step: "03", title: "Launch", description: "Campaigns live with daily monitoring." },
      { step: "04", title: "Optimize", description: "Iterate weekly, scale winners, kill losers." },
    ],
    technologies: ["Google Ads", "Meta Ads", "LinkedIn Ads", "GA4", "GTM", "HubSpot", "Mailchimp", "Ahrefs", "SEMrush"],
    faqs: [
      { q: "Do you guarantee rankings?", a: "No one credible does. We guarantee process and effort, with a track record of results." },
      { q: "What's the minimum monthly budget?", a: "Depends on channel and competition. Typically $1,500/mo + ad spend." },
      { q: "Do you do content writing?", a: "Yes — long-form, blog, social, email, all in-house." },
      { q: "How quickly can I see results?", a: "Paid: 30 days. SEO: 3–6 months for sustained gains." },
    ],
    status: "published",
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    category: "Consulting",
    icon: "Lightbulb",
    tagline: "Technology strategy that aligns with business outcomes",
    description:
      "Technology roadmaps, architecture reviews, digital transformation strategy, and CTO-level advisory for growing businesses.",
    longDescription:
      "Picking the wrong technology stack or vendor can cost years and millions. Just Soft Solution's IT consulting team brings decades of combined experience to help you make the right calls. We provide CTO-level advisory, architecture reviews, vendor selection, digital transformation roadmaps, and tech due diligence for M&A. Our recommendations are vendor-neutral, business-driven, and always backed by clear reasoning you can defend to stakeholders.",
    benefits: [
      { title: "Vendor-neutral advice", description: "We recommend what's right, not what we resell." },
      { title: "Architecture reviews", description: "Spot risks, scaling limits, security gaps before they bite." },
      { title: "Tech due diligence", description: "M&A, investments, partnerships — we vet the tech." },
      { title: "Roadmap planning", description: "12–36 month plans tied to business outcomes." },
      { title: "Vendor selection", description: "RFPs, demos, scoring, contract negotiation support." },
      { title: "CTO advisory", description: "Fractional CTO services for early-stage and scale-up companies." },
    ],
    process: [
      { step: "01", title: "Assess", description: "Current state, pain points, opportunities." },
      { step: "02", title: "Strategize", description: "Options, trade-offs, recommendations." },
      { step: "03", title: "Plan", description: "Phased roadmap, costs, success metrics." },
      { step: "04", title: "Support", description: "Ongoing advisory through execution." },
    ],
    technologies: ["Cloud strategy", "Microservices", "DevOps", "Security frameworks", "Vendor management"],
    faqs: [
      { q: "Are engagements one-off or ongoing?", a: "Both. Many start as a 4–6 week audit and convert to ongoing fractional CTO retainers." },
      { q: "Do you cover security & compliance?", a: "Yes — ISO 27001, SOC 2, GDPR, HIPAA, PCI-DSS reviews." },
      { q: "Can you help with team structure?", a: "Yes — engineering org design, hiring plans, ICs vs managers, etc." },
      { q: "Will you sign an NDA?", a: "Always. Confidentiality is standard." },
    ],
    status: "published",
  },
  {
    slug: "accounting-consulting",
    title: "Accounting Consulting",
    category: "Consulting",
    icon: "Calculator",
    tagline: "Bookkeeping, reporting, and software-driven accounting",
    description:
      "Bookkeeping, financial reporting, software-driven accounting solutions, and ERP integration — accuracy and clarity for your finances.",
    longDescription:
      "Accounting done right is more than tax compliance — it's the financial nervous system of your business. Just Soft Solution offers accounting consulting that combines deep finance expertise with modern software. We set up your books, automate bookkeeping, design management reports that actually inform decisions, and integrate accounting with ERPs and POS systems so data flows without manual entry. From startups setting up their first chart of accounts to mature companies optimizing month-end close, we deliver accuracy, speed, and clarity.",
    benefits: [
      { title: "Bookkeeping & month-end", description: "Accurate books, fast close, audit-ready trails." },
      { title: "Management reporting", description: "P&L, cash flow, KPIs — boards-ready, weekly if needed." },
      { title: "Software setup & migration", description: "QuickBooks, Xero, Tally, Zoho Books, our JSS Accounting." },
      { title: "ERP integration", description: "Accounting tied to inventory, payroll, sales — no double entry." },
      { title: "Cash flow forecasting", description: "13-week rolling forecasts, scenario planning." },
      { title: "Audit & advisory", description: "Tax audit defense, internal controls, fraud detection." },
    ],
    process: [
      { step: "01", title: "Discover", description: "Current state, pain points, reporting needs." },
      { step: "02", title: "Setup", description: "Chart of accounts, software, processes." },
      { step: "03", title: "Operate", description: "Monthly bookkeeping, reporting cycles." },
      { step: "04", title: "Advise", description: "Quarterly business reviews, optimization." },
    ],
    technologies: ["QuickBooks", "Xero", "Tally", "Zoho Books", "JSS Accounting", "Excel", "Power BI"],
    faqs: [
      { q: "Do you handle multi-currency?", a: "Yes — multi-currency, multi-entity, consolidations all supported." },
      { q: "Can you work with our existing accountant?", a: "Yes — we often complement in-house teams with software and reporting expertise." },
      { q: "What about VAT/TAX?", a: "Bangladesh VAT/Tax is a separate specialized service — see our VAT & TAX Consulting page." },
      { q: "How is pricing structured?", a: "Fixed monthly retainer based on transaction volume + project fees for migrations." },
    ],
    status: "published",
  },
  {
    slug: "bangladesh-vat-tax-consulting",
    title: "Bangladesh VAT & TAX Consulting",
    category: "Consulting",
    icon: "FileText",
    tagline: "Stay compliant. Pay only what you owe.",
    description:
      "Full VAT registration, return submission, NBR compliance, and tax planning for businesses operating in Bangladesh.",
    longDescription:
      "Bangladesh VAT and tax compliance is complex, frequently changing, and unforgiving of mistakes. Just Soft Solution's compliance team navigates NBR rules so you don't have to. We handle BIN registration, monthly VAT returns (Mushak 9.1), withholding tax, corporate income tax filings, transfer pricing, audits, and refunds. Our advice is proactive — we help you structure transactions to minimize tax legally, not scramble after-the-fact when notices arrive.",
    benefits: [
      { title: "VAT registration & returns", description: "BIN registration, Mushak 6.1/6.2/6.3, monthly 9.1 returns." },
      { title: "Income tax filings", description: "Corporate, individual, withholding — all schedules." },
      { title: "NBR notice handling", description: "We respond to and resolve NBR queries on your behalf." },
      { title: "Tax planning", description: "Structure for legal minimization, not last-minute scramble." },
      { title: "Audit support", description: "VAT and tax audits handled end-to-end." },
      { title: "VAT software setup", description: "VAT-compliant invoicing, integrated with your ERP/POS." },
    ],
    process: [
      { step: "01", title: "Health check", description: "Compliance status, gaps, risks." },
      { step: "02", title: "Register", description: "BIN, e-TIN, withholding registration." },
      { step: "03", title: "File", description: "Monthly VAT, quarterly advance tax, annual returns." },
      { step: "04", title: "Optimize", description: "Quarterly tax planning, refund recovery." },
    ],
    technologies: ["NBR e-Return", "VAT software", "Mushak forms", "Customs systems"],
    faqs: [
      { q: "I'm a new company. Where do I start?", a: "BIN + e-TIN registration, choose VAT type (manufacturing, trading, service), then ongoing monthly compliance." },
      { q: "Can you handle past-due returns?", a: "Yes — we file backdated returns, negotiate penalties, and bring you current." },
      { q: "What about VAT refunds for exporters?", a: "Yes — we manage the refund claim process end-to-end." },
      { q: "Do you provide tax-residency certificates?", a: "Yes, including DTAA and treaty benefits where applicable." },
    ],
    status: "published",
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);

export const getServiceCategories = () => {
  const set = new Set(services.map((s) => s.category));
  return ["All", ...Array.from(set)];
};

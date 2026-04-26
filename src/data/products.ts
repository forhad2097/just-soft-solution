import type { Product } from "./types";

export const products: Product[] = [
  {
    slug: "jss-accounting-software",
    title: "JSS Accounting Software",
    category: "Finance",
    icon: "Calculator",
    tagline: "Complete double-entry accounting, built for Bangladesh and beyond",
    description:
      "Full-featured accounting platform with general ledger, AR/AP, invoicing, multi-currency, financial statements, and tax-ready reports.",
    longDescription:
      "JSS Accounting Software is a production-grade, double-entry accounting platform designed for small businesses, growing enterprises, and accounting firms. From day-to-day invoicing to month-end financial statements, it handles the full accounting cycle with audit-grade reliability. Multi-company, multi-branch, multi-currency, and multi-user — with role-based access and complete activity logs. VAT and income tax modules tailored for Bangladesh (Mushak forms, withholding, advance tax) plus international standards.",
    features: [
      { title: "Double-entry GL", description: "Full chart of accounts, journals, sub-ledgers, period closing." },
      { title: "Invoicing & receivables", description: "Customer invoicing, recurring billing, dunning, aging reports." },
      { title: "Bills & payables", description: "Vendor bills, payment runs, expense management, approval workflows." },
      { title: "Bank reconciliation", description: "Bank feeds (where available), CSV import, auto-match, exception handling." },
      { title: "Financial statements", description: "P&L, balance sheet, cash flow, trial balance — drillable to source." },
      { title: "VAT & TAX (Bangladesh)", description: "Mushak 6.1/6.2/6.3, 9.1, withholding TDS, advance tax." },
      { title: "Multi-currency", description: "Buy & sell rates, FX gain/loss, multi-currency consolidations." },
      { title: "Audit trail", description: "Every change logged, immutable history, role-based permissions." },
    ],
    modules: [
      "General Ledger", "Accounts Receivable", "Accounts Payable", "Banking & Cash",
      "Inventory Costing", "Fixed Assets", "Budgeting", "VAT & TAX", "Reports & Dashboards", "Multi-company",
    ],
    benefits: [
      "Replace spreadsheet bookkeeping with audit-grade accuracy",
      "Cut month-end close from weeks to days",
      "VAT-compliant invoicing and returns out of the box",
      "Single source of truth for finance, audit, and tax",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "REST API", "Excel/PDF export"],
    pricing: [
      { tier: "Starter", price: "Contact us", features: ["Up to 3 users", "Single company", "Email support"] },
      { tier: "Business", price: "Contact us", features: ["Up to 15 users", "Multi-branch", "API access", "Priority support"] },
      { tier: "Enterprise", price: "Custom", features: ["Unlimited users", "Multi-company consolidation", "On-prem option", "Dedicated success manager"] },
    ],
    faqs: [
      { q: "Can I migrate from QuickBooks/Tally?", a: "Yes. We provide guided migration with chart of accounts mapping and historical data import." },
      { q: "Is it cloud or on-premise?", a: "Both options available. Cloud (SaaS) for fastest start, on-premise for regulated environments." },
      { q: "Does it support Bangladesh VAT?", a: "Yes — Mushak forms, withholding, and 9.1 returns are first-class features." },
      { q: "Can my accountant access it remotely?", a: "Yes — secure role-based remote access for accountants and auditors." },
    ],
    status: "published",
  },
  {
    slug: "jss-healthcare",
    title: "JSS Healthcare",
    category: "Healthcare",
    icon: "HeartPulse",
    tagline: "Hospital & clinic management, end-to-end",
    description:
      "OPD/IPD, electronic medical records, pharmacy, billing, lab integration, and doctor scheduling — for hospitals, clinics, and diagnostics.",
    longDescription:
      "JSS Healthcare is a comprehensive hospital information system covering registration, OPD, IPD, OT, pharmacy, lab, radiology, billing, insurance, and analytics. Designed in collaboration with practicing clinicians, it streamlines patient flow, reduces documentation overhead, and provides hospital management with real-time visibility. EMR is structured yet flexible, supporting templates by specialty. Lab and imaging integrations cover most popular analyzer and PACS systems. HIPAA-aligned security, audit logs, and role-based access protect patient data.",
    features: [
      { title: "Patient registration & queues", description: "Smart queue, priority lanes, SMS notifications." },
      { title: "EMR by specialty", description: "Customizable templates for cardiology, ortho, peds, OB-GYN, etc." },
      { title: "OPD & IPD", description: "Encounters, ward management, bed allocation, transfers, discharge." },
      { title: "Pharmacy & inventory", description: "Stock, expiry, reorder, batch tracking, dispensing." },
      { title: "Lab & radiology", description: "Order entry, analyzer integration, result entry, PACS-ready." },
      { title: "Billing & insurance", description: "Self-pay, corporate, insurance claims, package billing." },
      { title: "OT & anesthesia", description: "OT scheduling, consumables, anesthesia notes, recovery." },
      { title: "Analytics", description: "Census, revenue, doctor productivity, payer mix dashboards." },
    ],
    modules: [
      "Patient Registration", "OPD", "IPD", "Pharmacy", "Lab", "Radiology",
      "Billing", "Insurance", "OT", "HR & Payroll", "Inventory", "Reports",
    ],
    benefits: [
      "Single platform replaces 4–6 disconnected systems",
      "Faster discharge cycle through integrated billing",
      "Better clinical outcomes with structured EMR",
      "Real-time hospital metrics for management",
    ],
    technologies: ["Angular", "Java/Spring Boot", "PostgreSQL", "Redis", "HL7/FHIR ready", "DICOM ready"],
    faqs: [
      { q: "Is it HIPAA compliant?", a: "Yes — HIPAA-aligned by design. We provide compliance documentation for your audits." },
      { q: "Can it integrate with our existing lab analyzer?", a: "We support the most common analyzers and protocols. Custom integrations available." },
      { q: "Cloud or on-premise?", a: "Both. Most multi-specialty hospitals deploy on-premise; clinics often choose cloud." },
      { q: "How long is implementation?", a: "Clinics: 4–6 weeks. Multi-specialty hospitals: 3–6 months phased." },
    ],
    status: "published",
  },
  {
    slug: "jss-industrial-erp",
    title: "JSS Industrial ERP Solution",
    category: "ERP",
    icon: "Factory",
    tagline: "End-to-end ERP for industrial operations",
    description:
      "Production planning, inventory, procurement, sales, HR, and finance — one platform for industrial businesses.",
    longDescription:
      "JSS Industrial ERP is a modular ERP built for manufacturing, distribution, and industrial enterprises. It unifies production planning (MRP), inventory across warehouses, procurement, sales, finance, and HR — eliminating the silos that plague growing industrial businesses. With multi-plant, multi-currency, and multi-language support, it scales from single-site operations to multi-country deployments. Real-time dashboards give plant managers and the C-suite the same view of operations.",
    features: [
      { title: "MRP & production planning", description: "BOM, work orders, capacity planning, scheduling." },
      { title: "Multi-warehouse inventory", description: "Stock, transfers, cycle counts, batch & serial tracking." },
      { title: "Procurement", description: "RFQ, PO, GRN, vendor evaluation, three-way match." },
      { title: "Sales & CRM", description: "Quotes, orders, dispatch, returns, customer 360." },
      { title: "Finance", description: "GL, AR/AP, costing, budgeting, multi-currency." },
      { title: "HR & payroll", description: "Employee master, attendance, payroll, leave, performance." },
      { title: "Quality control", description: "Inspection plans, deviations, CAPA, supplier QC." },
      { title: "Real-time analytics", description: "Plant, supply chain, finance dashboards on one screen." },
    ],
    modules: [
      "Production", "Inventory", "Procurement", "Sales", "Finance",
      "HR & Payroll", "Quality", "Maintenance", "Projects", "Reports",
    ],
    benefits: [
      "Replace 5–10 disconnected systems with one ERP",
      "Reduce inventory cost by 15–25% through MRP and forecasting",
      "Cut order-to-cash cycle by integrating sales, dispatch, and finance",
      "Real-time KPIs replace end-of-month reconciliation",
    ],
    technologies: ["Angular", "Java/Spring Boot", "PostgreSQL", "Redis", "RabbitMQ", "Docker/Kubernetes"],
    faqs: [
      { q: "How does it compare to SAP/Oracle?", a: "Faster to implement, lower TCO, configurable for industrial mid-market. We're not trying to replace SAP for global Fortune 500s." },
      { q: "Can you integrate with shop-floor machines?", a: "Yes — OPC-UA, MQTT, MES integrations are standard offerings." },
      { q: "What's a typical implementation timeline?", a: "Single plant: 4–6 months. Multi-plant phased rollouts: 9–18 months." },
      { q: "Do you provide change management?", a: "Yes — process design, training, super-user enablement, post-go-live support." },
    ],
    status: "published",
  },
  {
    slug: "jss-manufacturing",
    title: "JSS Manufacturing",
    category: "ERP",
    icon: "Cog",
    tagline: "Manufacturing execution that drives shop-floor productivity",
    description:
      "BOM, work orders, machine tracking, quality control, batch traceability — purpose-built for discrete and process manufacturing.",
    longDescription:
      "JSS Manufacturing is a manufacturing execution system (MES) tightly integrated with the production module of our ERP — or deployable standalone. It tracks every work order from release to completion, captures real-time machine and operator data, enforces quality checks at each stage, and delivers full batch and serial traceability for regulated industries (pharma, food, automotive). Operators use shop-floor terminals (or tablets) for issuing materials, recording output, scrap, and downtime — replacing paper records with structured data.",
    features: [
      { title: "Work order management", description: "Release, dispatch, status, completion, variances." },
      { title: "Real-time shop-floor data", description: "Machine status, OEE, downtime reasons, operator efficiency." },
      { title: "BOM & routing", description: "Multi-level BOM, alternate components, routing variants." },
      { title: "Quality at the source", description: "In-process inspections, NCR, hold, rework, rejection." },
      { title: "Batch & serial traceability", description: "Forward and backward genealogy. Recalls in minutes." },
      { title: "Scheduling", description: "Finite capacity scheduling, drag-drop Gantt, what-if analysis." },
      { title: "Maintenance", description: "Preventive, breakdown, spares, MTBF/MTTR." },
      { title: "Andon & alerts", description: "Real-time alerts to supervisors, escalation rules." },
    ],
    modules: [
      "Work Orders", "Shop Floor Control", "OEE", "Quality", "Traceability",
      "Scheduling", "Maintenance", "Reports",
    ],
    benefits: [
      "Increase OEE by 10–20% through visibility",
      "Cut paper and reduce data-entry errors to near zero",
      "Trace any defect to its root in minutes, not days",
      "Respond to demand changes with finite-capacity scheduling",
    ],
    technologies: ["Angular", "Java/Spring Boot", "PostgreSQL", "OPC-UA", "MQTT", "Industrial PCs", "Tablet UIs"],
    faqs: [
      { q: "Does it work for process industries (pharma, food)?", a: "Yes — batch/serial traceability, recipe management, and regulatory audit trails are first-class features." },
      { q: "Can it run without our ERP?", a: "Yes — standalone MES deployments are common, with bidirectional integration to your existing ERP." },
      { q: "What about machine integration?", a: "OPC-UA, MQTT, Modbus, and direct PLC integrations supported." },
      { q: "Can shop-floor operators use it without training?", a: "Operator UIs are tablet-friendly with large touch targets and minimal text. Training takes hours, not days." },
    ],
    status: "published",
  },
  {
    slug: "jss-hr-management",
    title: "JSS HR Management",
    category: "HR",
    icon: "UsersRound",
    tagline: "The full employee lifecycle on one platform",
    description:
      "Employee lifecycle, attendance, payroll, leave, performance, recruitment, and self-service — for SMBs to enterprises.",
    longDescription:
      "JSS HR Management automates the entire employee journey — from recruitment to retirement. It covers core HR (employee master, documents, contracts), time & attendance (biometric, geo-fenced mobile), payroll (multi-country, multi-currency), leave, performance (KPIs, OKRs, 360°), recruitment (ATS), training, and exit management. The mobile self-service portal puts payslips, leave requests, attendance, and announcements in every employee's pocket. Integrations with biometric devices, banking systems, and accounting software are standard.",
    features: [
      { title: "Employee master & records", description: "Profile, documents, contracts, confidential data, family." },
      { title: "Time & attendance", description: "Biometric, RFID, geo-fenced mobile clock-in, shift management." },
      { title: "Payroll", description: "Multi-country, statutory deductions, bonuses, arrears, bank file generation." },
      { title: "Leave & holidays", description: "Configurable policies, approvals, calendar integration." },
      { title: "Performance", description: "KPIs, OKRs, 360° reviews, calibration, talent grid." },
      { title: "Recruitment (ATS)", description: "Job posting, candidate pipeline, interview scheduling, offer letters." },
      { title: "Training & development", description: "Programs, attendance, certificates, skill matrix." },
      { title: "Self-service mobile app", description: "Payslip, leave, attendance, announcements, surveys." },
    ],
    modules: [
      "Core HR", "Time & Attendance", "Payroll", "Leave", "Performance",
      "Recruitment", "Training", "Self-service Portal", "Reports",
    ],
    benefits: [
      "Eliminate manual payroll calculations and statutory errors",
      "Cut HR admin workload by 40–60%",
      "Empower employees with self-service",
      "Real-time workforce analytics for leadership",
    ],
    technologies: ["React", "React Native (mobile app)", "Node.js", "PostgreSQL", "Redis", "Biometric SDKs"],
    faqs: [
      { q: "Does it integrate with biometric devices?", a: "Yes — most ZKTeco, Suprema, Anviz devices supported. Custom SDKs as needed." },
      { q: "Multi-country payroll?", a: "Yes — Bangladesh, UAE, KSA, India, Pakistan, USA payroll all supported with statutory rules." },
      { q: "Is the mobile app available for both iOS and Android?", a: "Yes — native apps with offline mode for attendance." },
      { q: "Can we customize approval workflows?", a: "Yes — drag-drop workflow builder for leave, expense, recruitment, etc." },
    ],
    status: "published",
  },
  {
    slug: "jss-pos",
    title: "JSS POS",
    category: "Retail",
    icon: "Store",
    tagline: "Lightning-fast Point of Sale for retail and F&B",
    description:
      "Multi-outlet POS with real-time inventory sync, barcode, customer loyalty, and offline mode — for retail, restaurants, and chains.",
    longDescription:
      "JSS POS is a fast, intuitive Point of Sale designed for the realities of retail and F&B — busy counters, intermittent internet, large catalogs, and demanding customers. It supports multi-outlet operations with real-time stock sync, barcode scanning, kitchen printing for restaurants, customer loyalty programs, and full offline mode (sales continue, sync when online). Integrated with our accounting and inventory products, or your existing ERP. From a single shop to a chain of 100+ outlets, JSS POS scales without slowing down.",
    features: [
      { title: "Lightning-fast checkout", description: "Sub-second item lookup, barcode, hotkeys, modifiers." },
      { title: "Multi-outlet & multi-counter", description: "Unlimited outlets, real-time stock, central reporting." },
      { title: "Offline mode", description: "Continue selling without internet. Auto-sync when online." },
      { title: "Customer loyalty", description: "Points, tiers, rewards, birthday offers, SMS campaigns." },
      { title: "Kitchen display (KDS)", description: "Restaurant orders flow to kitchen screens by station." },
      { title: "Inventory & purchasing", description: "Real-time stock, low-stock alerts, supplier orders." },
      { title: "Reports & dashboards", description: "Sales, profit, top items, peak hours, staff performance." },
      { title: "Hardware support", description: "Receipt printers, barcode scanners, cash drawers, kitchen printers." },
    ],
    modules: [
      "POS Counter", "Inventory", "Purchase", "Customers & Loyalty",
      "KDS (F&B)", "Reports", "Multi-outlet", "Settings",
    ],
    benefits: [
      "Replace legacy POS that crashes during peak hours",
      "Real-time visibility across all outlets",
      "Offline mode means lost internet doesn't mean lost sales",
      "Loyalty programs that actually drive repeat business",
    ],
    technologies: ["Electron (desktop)", "React Native (tablet)", "Node.js", "PostgreSQL", "SQLite (offline)", "Redis"],
    faqs: [
      { q: "Does it work without internet?", a: "Yes — full offline mode. Sales continue and auto-sync when online." },
      { q: "Can I run it on Windows, Mac, or tablets?", a: "Yes — Windows, Mac, iPad, and Android tablets all supported." },
      { q: "Multi-currency for tourist areas?", a: "Yes — multi-currency with live or fixed exchange rates." },
      { q: "Does it integrate with my accounting software?", a: "Out-of-box integration with JSS Accounting and major accounting platforms." },
    ],
    status: "published",
  },
  {
    slug: "jss-manpower",
    title: "JSS Manpower Software",
    category: "Recruitment",
    icon: "Briefcase",
    tagline: "End-to-end recruitment & deployment for manpower agencies",
    description:
      "Candidate database, visa processing, deployment tracking, billing — purpose-built for overseas recruitment and manpower agencies.",
    longDescription:
      "JSS Manpower Software is built specifically for overseas recruitment and manpower agencies sending workers to GCC, Malaysia, and other destinations. It manages the entire candidate journey — sourcing, registration, medicals, training, BMET clearance, visa processing, ticket booking, deployment, and post-deployment monitoring. Agencies operating across multiple countries get centralized visibility with country-specific compliance built in (Bangladesh BMET, KSA Musaned, Malaysia FWCMS, etc.).",
    features: [
      { title: "Candidate database", description: "Full profile, photos, documents, biometrics, history." },
      { title: "Job orders & demand letters", description: "Employer demands, allocation, fulfillment tracking." },
      { title: "Medical & training tracking", description: "Hospitals, fitness, training certificates, expiry alerts." },
      { title: "BMET & embassy", description: "BMET clearance, embassy attestation, smart card." },
      { title: "Visa & deployment", description: "Visa stages, ticket booking, departure tracking." },
      { title: "Billing & accounts", description: "Service charges, employer billing, candidate fees, accounting integration." },
      { title: "Compliance forms", description: "BMET-compliant manifests, government forms, automated." },
      { title: "Multi-branch & multi-user", description: "Branch-wise access, audit logs, role-based." },
    ],
    modules: [
      "Candidates", "Employers", "Job Orders", "Medical", "Training",
      "Visa & Embassy", "Deployment", "Billing", "Reports",
    ],
    benefits: [
      "Replace paper files with searchable, secure database",
      "Never miss a visa expiry or document deadline",
      "Compliance-ready forms and manifests on demand",
      "Real-time pipeline visibility from sourcing to deployment",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS S3 (documents)", "BMET integration"],
    faqs: [
      { q: "Does it support Bangladesh BMET?", a: "Yes — BMET clearance, smart card, and manifest generation are first-class features." },
      { q: "What about Saudi Arabia Musaned?", a: "Yes, and we also have a separate auto-form generator product for Saudi embassy forms." },
      { q: "Can it handle thousands of candidates?", a: "Yes — designed for agencies processing 5,000+ candidates per year." },
      { q: "Document storage?", a: "Encrypted cloud storage with role-based access. On-premise option for sensitive deployments." },
    ],
    status: "published",
  },
  {
    slug: "jss-multivendor-ecommerce",
    title: "JSS Multivendor E-commerce",
    category: "E-commerce",
    icon: "ShoppingBag",
    tagline: "A marketplace platform that scales with your vendors",
    description:
      "Vendor onboarding, commission engine, multi-warehouse, vendor dashboards, payments, and analytics — the full marketplace stack.",
    longDescription:
      "JSS Multivendor E-commerce powers marketplaces — Daraz-style horizontal marketplaces, niche verticals, B2B wholesale platforms, and vendor portals for retail chains. Vendors self-onboard, manage their catalogs, fulfill orders, and get paid via configurable commissions. Customers get a unified shopping experience across thousands of sellers. Multi-warehouse, multi-currency, multi-language. Payment splits, tax handling, returns, dispute resolution, and analytics dashboards for both platform owners and vendors are all built in.",
    features: [
      { title: "Vendor self-onboarding", description: "KYC, contracts, bank details, automated approval workflow." },
      { title: "Vendor dashboards", description: "Catalog, orders, inventory, payouts, performance metrics." },
      { title: "Configurable commissions", description: "Per-category, per-vendor, tiered, sliding-scale." },
      { title: "Multi-warehouse fulfillment", description: "Vendor-shipped, FBM, platform-shipped, hybrid." },
      { title: "Payment splits", description: "Automatic vendor payouts via Stripe Connect, SSLCommerz, bKash." },
      { title: "Returns & disputes", description: "Workflow with vendor, customer, platform mediation." },
      { title: "Search & merchandising", description: "Algolia/Elastic, sponsored listings, featured vendors." },
      { title: "Mobile apps", description: "Customer apps for iOS/Android, vendor apps for order management." },
    ],
    modules: [
      "Storefront", "Vendor Portal", "Admin Console",
      "Catalog", "Orders", "Payments", "Returns", "Marketing", "Analytics",
    ],
    benefits: [
      "Launch a marketplace in weeks, not years",
      "Scale to thousands of vendors and millions of products",
      "Configurable commission engine for any business model",
      "Built-in vendor performance and dispute management",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Elasticsearch", "Redis", "Stripe Connect", "AWS"],
    faqs: [
      { q: "How is it different from Shopify?", a: "Shopify is single-merchant. JSS Multivendor is built for marketplaces with vendor self-service, commissions, and platform-level admin." },
      { q: "Can vendors manage their own catalog?", a: "Yes — full vendor self-service with admin approval workflows." },
      { q: "Mobile apps included?", a: "Yes — customer and vendor mobile apps for iOS and Android." },
      { q: "Local payment gateways?", a: "bKash, Nagad, SSLCommerz, Stripe, PayPal, Razorpay — and easy to add more." },
    ],
    status: "published",
  },
  {
    slug: "saudi-arabia-embassy-auto-form-generator",
    title: "Saudi Arabia Embassy Auto Form Generator",
    category: "Government Tools",
    icon: "FileSignature",
    tagline: "Generate Saudi embassy attestation forms in seconds",
    description:
      "Auto-fill Saudi Arabia embassy attestation and visa forms — saves hours of manual paperwork for travel agencies and manpower agencies.",
    longDescription:
      "Filling Saudi embassy forms manually is slow, error-prone, and a major bottleneck for travel and manpower agencies. JSS Saudi Embassy Auto Form Generator transforms a candidate's data into pre-filled, ready-to-print embassy forms in seconds. Bulk-generate hundreds of forms at once. Built-in validation flags missing or inconsistent data before submission. Integrated with JSS Manpower or works standalone with Excel/CSV import. Reduce errors, accelerate visa processing, and free your team from data-entry drudgery.",
    features: [
      { title: "Auto-fill from candidate data", description: "From manual entry, Excel/CSV, or JSS Manpower integration." },
      { title: "Bulk generation", description: "Hundreds of forms in a single batch — print or export to PDF." },
      { title: "Validation rules", description: "Catches missing passport data, photo specs, dates before submission." },
      { title: "Photo placement", description: "Auto-place candidate photos in the right boxes, correctly sized." },
      { title: "Multi-language", description: "English, Arabic, and Bangla labels where required." },
      { title: "Latest form versions", description: "Templates updated when embassy issues new versions." },
      { title: "Audit log", description: "Who generated what, when — for compliance." },
      { title: "Cloud or on-prem", description: "Use online or install behind your firewall." },
    ],
    modules: [
      "Candidate Data Entry", "Bulk Import", "Form Templates",
      "Photo Manager", "Validation", "Print/Export", "Audit Log",
    ],
    benefits: [
      "Generate 100 forms in 5 minutes instead of 5 hours",
      "Eliminate handwriting errors that cause rejections",
      "Bulk processing for high-volume agencies",
      "Always up-to-date with latest embassy form versions",
    ],
    technologies: ["Electron / Web", "Node.js", "PDF generation", "Image processing"],
    faqs: [
      { q: "Are the forms accepted by the Saudi embassy?", a: "Yes — generated from official embassy templates. We update when templates change." },
      { q: "Can I import candidates from Excel?", a: "Yes — bulk import via Excel or CSV. Mapping wizard included." },
      { q: "Multi-user access?", a: "Yes — role-based access, branch-wise data isolation." },
      { q: "Standalone or integrated?", a: "Both — standalone application or integrated with JSS Manpower." },
    ],
    status: "published",
  },
  {
    slug: "bangladesh-bank-eft-auto-form-generator",
    title: "Bangladesh Bank EFT Auto Form Generator",
    category: "Government Tools",
    icon: "Banknote",
    tagline: "Generate EFT forms for all Bangladeshi banks — in seconds",
    description:
      "Generate Electronic Funds Transfer (EFT) forms for all Bangladeshi banks. Bulk salary disbursement and vendor payments made effortless.",
    longDescription:
      "Companies disbursing payroll or vendor payments in Bangladesh face a frustrating reality — every bank requires a slightly different EFT form format. JSS Bangladesh Bank EFT Auto Form Generator solves this once and for all. Import beneficiary data from Excel or your HR/accounting system, and generate bank-specific EFT files and printable forms for any Bangladeshi bank in seconds. Bulk-process thousands of transactions, validate routing/IBAN/account numbers, and export ready-to-submit files. A must-have for HR, payroll teams, and finance departments.",
    features: [
      { title: "All Bangladeshi banks supported", description: "DBBL, BRAC, City Bank, Eastern, EBL, IBBL, Sonali, Janata, and more." },
      { title: "Bulk import", description: "From Excel, CSV, or direct integration with JSS HR / payroll systems." },
      { title: "Account validation", description: "Routing number checks, account format validation by bank." },
      { title: "Multiple output formats", description: "Bank-specific Excel, CSV, .txt, .xml — whatever the bank accepts." },
      { title: "Printable forms", description: "Per-bank printable form templates if needed." },
      { title: "Disbursement reports", description: "Total, per-bank, per-branch summaries — auto-generated." },
      { title: "Bulk operations", description: "Process 10,000+ entries in seconds." },
      { title: "Audit & approval workflow", description: "Maker-checker, audit logs, approval before export." },
    ],
    modules: [
      "Beneficiary Master", "Bulk Import", "Bank Templates",
      "Validation", "Disbursement Reports", "Audit & Approvals",
    ],
    benefits: [
      "Cut payroll disbursement time from days to minutes",
      "Eliminate format errors that cause bank rejections",
      "Single tool replaces 20+ bank-specific spreadsheets",
      "Audit-ready reports for finance and compliance",
    ],
    technologies: ["Web app", "Excel / CSV / XML / TXT export", "Node.js", "PostgreSQL"],
    faqs: [
      { q: "Which banks are supported?", a: "All major Bangladeshi banks — and we add new bank templates within 1 week of request." },
      { q: "Can it integrate with my payroll system?", a: "Yes — direct integration with JSS HR, plus API and CSV import for any system." },
      { q: "Cloud or on-premise?", a: "Both — cloud SaaS for fastest start, on-premise for sensitive payroll data." },
      { q: "Maker-checker workflow?", a: "Yes — separate roles for entry, approval, and export. Audit logs for every action." },
    ],
    status: "published",
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductCategories = () => {
  const set = new Set(products.map((p) => p.category));
  return ["All", ...Array.from(set)];
};

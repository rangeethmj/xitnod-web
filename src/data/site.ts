function normalizeSiteUrl(raw?: string): string {
  const fallback = "https://xitnod.com";
  if (!raw) return fallback;
  try {
    const parsed = new URL(raw);
    return parsed.origin;
  } catch {
    return fallback;
  }
}

export const SITE = {
  name: "XITNOD",
  pronunciation: "Exit Node",
  tagline: "Engineered for resilience.",
  seoTitle: "XITNOD | Cloud, SOC Defense, Web & Applied AI Engineering",
  seoDescription:
    "XITNOD engineers resilient cloud infrastructure, high-signal SOC threat defense, hardened Next.js web apps, and governed internal AI workflows for lean teams.",
  headlineTop: "Cloud, security and",
  headlineMid: "engineering for teams",
  headlineHighlight: "that can't afford downtime.",
  headline: "Cloud, security and engineering for teams that can't afford downtime.",
  subheadline:
    "Cloud infrastructure, SOC threat defense, hardened web applications, and applied AI governance. Designed, built, and defended by working engineers.",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "xitnod@gmail.com",
  securityEmail: "xitnod@gmail.com",
  location: "Remote-first · Global Engineering Delivery",
};

export const NAV_LINKS = [
  { id: "services", label: "Services", href: "/#services" },
  { id: "process", label: "Process", href: "/#process" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

export const STACK_MARQUEE = [
  "AWS",
  "Cloudflare Zero Trust",
  "SentinelOne",
  "CrowdStrike",
  "Terraform",
  "Next.js",
  "Microsoft Purview",
  "Entra ID",
  "FortiGate",
  "Velociraptor",
  "Docker",
  "TypeScript",
  "Python",
  "Local LLMs",
] as const;

export const LIFECYCLE_STEPS = [
  {
    index: "03",
    action: "Build",
    serviceSlug: "web-development",
    summary: "Ship fast, hardened web applications and APIs with security built in from commit one.",
  },
  {
    index: "01",
    action: "Harden",
    serviceSlug: "cloud-infrastructure",
    summary: "Lock down cloud IAM, Zero Trust networking, CI/CD, and automated failover resilience.",
  },
  {
    index: "02",
    action: "Defend",
    serviceSlug: "soc-threat-defense",
    summary: "Monitor high-signal SIEM and XDR telemetry, tune detections, and respond quickly.",
  },
  {
    index: "04",
    action: "Govern",
    serviceSlug: "applied-ai-governance",
    summary: "Deploy scoped internal AI workflows with privacy guardrails and clear audit trails.",
  },
] as const;

export const SPRINT_CADENCE = [
  {
    window: "Week 01",
    phase: "Audit & Blueprint",
    detail: "Architecture review, threat surface mapping, and locked sprint spec.",
  },
  {
    window: "Week 02",
    phase: "Hardened Build",
    detail: "Production code, Terraform IaC, SIEM rules, or scoped AI pipelines shipped.",
  },
  {
    window: "Week 03",
    phase: "Verify & Handover",
    detail: "Security checks, failover testing, documentation, and full repo ownership.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Architecture",
    duration: "Days 1-3",
    description:
      "You scope directly with the engineers doing the build. We review your current stack, threat surface, and uptime risks to lock down a clear deliverable plan.",
  },
  {
    step: "02",
    title: "Hardened Implementation",
    duration: "Weeks 1-3",
    description:
      "We ship production code, Infrastructure-as-Code, detection rules, or governed AI workflows directly in your repositories and cloud accounts with full version control.",
  },
  {
    step: "03",
    title: "Verification & Telemetry",
    duration: "Pre-Launch",
    description:
      "Every release is checked against misconfigurations, OWASP regressions, alert fidelity, and failover behavior before handover.",
  },
  {
    step: "04",
    title: "Clean Handover or Retainer",
    duration: "Ongoing",
    description:
      "Get thorough runbooks and architecture docs your team owns outright, or keep XITNOD on retainer for fractional cloud, SOC, web, and AI engineering.",
  },
] as const;

export const ENGAGEMENT_MODELS = [
  {
    id: "sprint",
    badge: "Entry Engagement",
    title: "Fixed-Scope Sprint",
    timeline: "1-3 Weeks",
    summary:
      "Outcome-driven sprints with transparent milestones, suited for audits, infrastructure hardening, detection engineering, or production web launches.",
    idealFor: "Startups and growing teams solving a concrete architecture, security, or launch bottleneck.",
    highlights: [
      "Defined scope, architecture spec, and fixed fee upfront",
      "Direct Slack or Teams channel with the engineers on your project",
      "Production-ready code, IaC, rules, and complete handover documentation",
      "Full ownership of every artifact from day one",
    ],
    ctaLabel: "Scope a fixed sprint",
    engagementValue: "Fixed-Scope Sprint (1-3 Weeks)",
  },
  {
    id: "retainer",
    badge: "Ongoing Partnership",
    title: "Fractional Engineering Retainer",
    timeline: "Monthly",
    summary:
      "Embedded cloud, SOC, web, and AI engineering capacity at a fraction of hiring four separate full-time specialists.",
    idealFor: "Funded teams scaling production systems that need steady reliability, security, and shipping velocity.",
    highlights: [
      "Continuous cloud hardening, cost hygiene, and uptime monitoring",
      "Ongoing SIEM and XDR detection tuning, threat hunting, and IR readiness",
      "Regular web feature sprints, security maintenance, and AI workflow iteration",
      "Priority incident triage and direct architectural advisory",
    ],
    ctaLabel: "Discuss a retainer",
    engagementValue: "Fractional Engineering Retainer",
  },
] as const;

export const BENCHMARKS = [
  { value: "99.99%", label: "Target Production Availability", detail: "Multi-AZ & automated recovery architecture" },
  { value: "< 15m", label: "Critical Alert Triage SLA", detail: "High-signal detections over noisy alert queues" },
  { value: "4-in-1", label: "Unified Engineering Stack", detail: "Cloud, SOC, Web, and AI under one roof" },
  { value: "100%", label: "Client-Owned Artifacts", detail: "IaC, runbooks, and code in your repositories" },
] as const;

export const PRINCIPLES = [
  {
    title: "Engineers on the first call",
    description:
      "You speak directly with the people designing your cloud network, writing your detection rules, and shipping your production code.",
  },
  {
    title: "Resilience beats cosmetics",
    description:
      "Every interface, API, and cloud workload is built for real traffic spikes, hostile bots, and graceful degradation.",
  },
  {
    title: "Signal over security theater",
    description:
      "We replace noisy alert dashboards and checkbox policies with tested controls, clean telemetry, and practical incident playbooks.",
  },
] as const;

export const GENERAL_FAQS = [
  {
    question: "How do Fixed-Scope Sprints work?",
    answer:
      "After an initial technical call, we share a concise written scope covering deliverables, timeline (typically 1 to 3 weeks), and a flat fee. There are no surprise hourly overruns.",
  },
  {
    question: "Will our team own the code, Terraform, and detection rules?",
    answer:
      "Yes. Everything is committed directly inside your Git repositories and cloud accounts with clear runbooks, so your internal engineers can maintain or extend it freely.",
  },
  {
    question: "Can you work with our current cloud or security vendors?",
    answer:
      "Yes. We harden and integrate the tools you already pay for, including AWS, Cloudflare, Vercel, SentinelOne, CrowdStrike, Sophos, FortiGate, and Microsoft Purview or Entra ID.",
  },
  {
    question: "Do you sign NDAs before reviewing architecture or logs?",
    answer:
      "Yes. We gladly execute a mutual NDA before you share sensitive diagrams, access credentials, or telemetry exports.",
  },
] as const;

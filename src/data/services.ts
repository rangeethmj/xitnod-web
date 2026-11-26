export interface ServiceItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  seoTitle: string;
  seoDescription: string;
  tagline: string;
  summary: string;
  overview: string;
  deliverables: string[];
  stack: string[];
  highlightStat: { value: string; label: string };
  entrySprint: {
    name: string;
    duration: string;
    description: string;
    outcomes: string[];
  };
  retainerPath: string;
  orbitPreset: {
    ringSpeed: number;
    tiltX: number;
    tiltY: number;
    coreIntensity: number;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "cloud",
    number: "01",
    slug: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    shortTitle: "Cloud & Infra",
    seoTitle: "Cloud & Infrastructure Engineering Services",
    seoDescription:
      "Hardened AWS and Cloudflare architecture, Zero Trust IAM, Terraform IaC, CI/CD automation, and automated failover engineered for zero-downtime scale.",
    tagline: "Hardened cloud foundations engineered for predictable scale and zero single points of failure.",
    summary:
      "Cloud architecture, IAM and Zero Trust hardening, Infrastructure-as-Code, CI/CD automation, and automated failover resilience.",
    overview:
      "Fast-moving teams accumulate permissive IAM roles, exposed admin endpoints, fragile manual deployments, and unnecessary cloud spend. We re-architect and codify your cloud environment so deployments stay repeatable, access stays least-privilege, and outages do not take your business offline.",
    deliverables: [
      "Cloud architecture design & multi-AZ high-availability setups",
      "IAM least-privilege audits, Zero Trust access (ZTNA), and VPC segmentation",
      "Terraform Infrastructure-as-Code & reproducible CI/CD pipelines",
      "Automated backups, disaster recovery drills, and cloud cost optimization",
    ],
    stack: ["AWS", "Cloudflare", "Terraform", "Docker", "Linux", "GitHub Actions", "Zero Trust"],
    highlightStat: { value: "99.99%", label: "Target multi-AZ uptime design" },
    entrySprint: {
      name: "Cloud Resilience & Cost Audit",
      duration: "1-2 Weeks",
      description:
        "Architecture and IAM review, prioritized risk and cost breakdown, plus hands-on remediation of top critical misconfigurations.",
      outcomes: [
        "Hardened IAM policies & network boundary rules",
        "Automated backup & recovery verification checklist",
        "Actionable 90-day reliability & cost reduction roadmap",
      ],
    },
    retainerPath: "Fractional Cloud Engineering & Infrastructure Management",
    orbitPreset: { ringSpeed: 1.0, tiltX: 0.28, tiltY: -0.22, coreIntensity: 1.0 },
    faqs: [
      {
        question: "Do we need to migrate cloud providers to work with XITNOD?",
        answer:
          "No. We harden and optimize the environment you already run, most commonly AWS, Cloudflare, Vercel, and Linux VPS or hybrid setups, without disruptive migrations unless there is a clear cost or resilience gain.",
      },
      {
        question: "Who owns the Terraform modules and infrastructure documentation?",
        answer:
          "You do. Everything is committed directly to your organization's repositories with clear runbooks so your internal engineers can operate independently.",
      },
    ],
  },
  {
    id: "soc",
    number: "02",
    slug: "soc-threat-defense",
    title: "SOC & Threat Defense",
    shortTitle: "SOC & Defense",
    seoTitle: "SOC, Detection Engineering & Threat Defense",
    seoDescription:
      "Eliminate alert fatigue with custom SIEM and XDR correlation rules, threat hunting, Microsoft Purview and Entra ID monitoring, and tested DFIR playbooks.",
    tagline: "High-signal detection engineering, alert tuning, threat hunting, and incident readiness.",
    summary:
      "SIEM and XDR detection engineering, noise reduction, proactive threat hunting, DFIR readiness, and structured response playbooks.",
    overview:
      "Most security tools fail not because they lack logs, but because teams drown in false positives while real lateral movement slips past. Drawing from hands-on SOC and digital forensics investigations, we tune your telemetry, write custom correlation rules, and build response workflows that hold up under pressure.",
    deliverables: [
      "SIEM & XDR correlation rule engineering and false-positive elimination",
      "Endpoint, identity (Entra ID / O365), firewall, and cloud log pipeline validation",
      "Proactive threat hunting workflows and executive-ready hunt reports",
      "Incident Response playbooks, BEC triage procedures, and DFIR telemetry readiness",
    ],
    stack: ["SentinelOne", "CrowdStrike", "Sophos XDR", "Microsoft Purview", "Entra ID", "Velociraptor", "FortiGate"],
    highlightStat: { value: "-68%", label: "Typical low-signal alert noise drop" },
    entrySprint: {
      name: "Detection & Telemetry Health Check",
      duration: "2 Weeks",
      description:
        "Audit existing SIEM and XDR coverage, eliminate chronic alert noise, and ship custom high-signal detection rules mapped to MITRE ATT&CK.",
      outcomes: [
        "Verified log ingestion across endpoints, identity, and edge firewalls",
        "Tuned correlation rules cutting low-value alert fatigue",
        "Tested IR & Business Email Compromise response runbooks",
      ],
    },
    retainerPath: "Advisory SOC, Fractional Detection Engineering & IR Readiness Retainer",
    orbitPreset: { ringSpeed: 1.35, tiltX: -0.24, tiltY: 0.34, coreIntensity: 1.18 },
    faqs: [
      {
        question: "Do you replace our existing EDR or SIEM vendor?",
        answer:
          "No. We make the stack you already pay for significantly more effective by fixing telemetry blind spots, writing custom detections, and automating triage workflows.",
      },
      {
        question: "Can you help after a suspected security incident or account compromise?",
        answer:
          "Yes. We support rapid log correlation, endpoint forensic triage, containment guidance, and post-incident hardening with clear timeline reporting.",
      },
    ],
  },
  {
    id: "web",
    number: "03",
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Dev",
    seoTitle: "Hardened Next.js & Full-Stack Web Development",
    seoDescription:
      "High-performance Next.js and React web apps, secure admin portals, Cloudflare WAF protection, and A+ security headers engineered for speed and resilience.",
    tagline: "High-performance web applications and portals built with security headers and speed from day one.",
    summary:
      "Modern Next.js and React frontends, secure admin portals, resilient APIs, WAF protection, and fast production launches.",
    overview:
      "A company's flagship site or customer portal should not trade security for visual craft, or speed for interactivity. We design and engineer modern Next.js and TypeScript web applications with strict authentication hygiene, edge WAF protection, and crisp Core Web Vitals.",
    deliverables: [
      "Flagship Next.js & React websites and interactive 3D web experiences",
      "Full-stack web applications, dashboards, and hardened admin portals",
      "Secure REST & Edge APIs, rate limiting, Cloudflare Turnstile & Access protection",
      "A+ security headers (CSP, HSTS), technical SEO, and Core Web Vitals tuning",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js", "Node.js", "Cloudflare WAF"],
    highlightStat: { value: "A+", label: "Security headers & hardened edge" },
    entrySprint: {
      name: "Hardened Launch / Rebuild Sprint",
      duration: "2-3 Weeks",
      description:
        "Design and ship a conversion-focused flagship website, interactive web app, or hardened admin portal ready for production traffic.",
      outcomes: [
        "Responsive, accessible Next.js + TypeScript production codebase",
        "Strict CSP and HSTS headers, bot protection, and clean auth boundaries",
        "Deployed cleanly on Vercel & Cloudflare with minimal tracking footprint",
      ],
    },
    retainerPath: "Ongoing Feature Sprints, Performance & Security Maintenance",
    orbitPreset: { ringSpeed: 0.85, tiltX: 0.16, tiltY: 0.28, coreIntensity: 0.95 },
    faqs: [
      {
        question: "Can you harden our existing web app or admin panel without a full rewrite?",
        answer:
          "Yes. We regularly lock down existing admin routes and APIs using Cloudflare Access, Turnstile, WAF rate limits, strict headers, and targeted application patches.",
      },
      {
        question: "Do you handle both UI design and full-stack engineering?",
        answer:
          "Yes. We take projects directly from brand-aligned UI design straight into production Next.js code without handoff loss between separate agencies.",
      },
    ],
  },
  {
    id: "ai",
    number: "04",
    slug: "applied-ai-governance",
    title: "Applied AI & Governance",
    shortTitle: "Applied AI",
    seoTitle: "Applied AI Workflows & Enterprise Governance",
    seoDescription:
      "Deploy scoped internal AI agents, private local LLMs, client-side PII redaction guardrails, and practical shadow-AI governance without leaking sensitive data.",
    tagline: "Practical internal AI automation deployed with strict data boundaries and human oversight.",
    summary:
      "Scoped AI agents, internal workflow automation, private or local LLM setups, data-redaction guardrails, and shadow-AI policies.",
    overview:
      "Teams want the leverage of AI without leaking proprietary data into public models or shipping fragile, unmonitored automations. We design and build practical internal AI tools, from log triage and document analysis to structured tool-calling workflows, backed by clear privacy controls and governance frameworks.",
    deliverables: [
      "Custom internal AI workflows & structured tool-calling agents",
      "Private & local open-weight LLM deployments for sensitive datasets",
      "Data-redaction guardrails, access scoping, and audit logging",
      "Practical Shadow-AI usage policy & enterprise AI risk governance framework",
    ],
    stack: ["Python", "TypeScript", "Gemini / Claude APIs", "Local Open-Weight LLMs", "RAG", "Guardrails & DLP"],
    highlightStat: { value: "0", label: "Unredacted client records leaked" },
    entrySprint: {
      name: "AI Readiness & Pilot Sprint",
      duration: "2 Weeks",
      description:
        "Deliver one production-grade internal AI automation workflow alongside a clear data-privacy, tool-approval, and governance blueprint.",
      outcomes: [
        "One working, measurable internal AI workflow deployed safely",
        "Input and output redaction rules with role-based access boundaries",
        "Clear AI governance & acceptable-use policy for your team",
      ],
    },
    retainerPath: "Managed AI Workflows, Model Evaluations & Ongoing Compliance Reviews",
    orbitPreset: { ringSpeed: 1.15, tiltX: -0.3, tiltY: -0.26, coreIntensity: 1.12 },
    faqs: [
      {
        question: "Can our AI workflows run without sending sensitive client records to external APIs?",
        answer:
          "Yes. Where compliance or confidentiality requires it, we build data-redaction layers or deploy scoped open-weight models inside your own VPC or private hardware.",
      },
      {
        question: "How do you prevent AI workflows from hallucinating or taking unsafe actions?",
        answer:
          "We enforce strict structured schemas, read-only defaults, deterministic validation steps, and explicit human-in-the-loop approval gates for any write or external action.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

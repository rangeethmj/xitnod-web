export interface CaseStudy {
  slug: string;
  code: string;
  serviceNumber: string;
  serviceSlug: string;
  serviceLabel: string;
  seoTitle: string;
  seoDescription: string;
  publishedDate: string;
  title: string;
  clientProfile: string;
  duration: string;
  summary: string;
  challenge: string;
  approach: string[];
  outcomes: { metric: string; label: string }[];
  stack: string[];
  diagramType: "portal" | "siem" | "ai";
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "hardening-production-admin-portal",
    code: "CASE 01",
    serviceNumber: "03",
    serviceSlug: "web-development",
    serviceLabel: "Web Development & Cloud",
    seoTitle: "Zero-Trust Admin Portal Hardening Case Study",
    seoDescription:
      "How XITNOD blocked 100% of unauthenticated /admin probes using Cloudflare Access, Turnstile, edge WAF rate limits, and A+ security headers in 10 days.",
    publishedDate: "2026-11-24",
    title: "Zero-Trust Hardening for an Exposed B2B Admin Portal",
    clientProfile: "Industrial e-commerce & distribution business",
    duration: "10-Day Hardening Sprint",
    summary:
      "Eliminated automated credential stuffing and exposed administrative attack surface by placing Cloudflare Access, Turnstile, WAF rate limits, and hardened app headers ahead of a live portal.",
    challenge:
      "The client's `/admin` interface was directly reachable on the public internet, experiencing continuous automated login probing and bot reconnaissance with no edge identity gate or rate limiting.",
    approach: [
      "Deployed Cloudflare Access Zero Trust policy requiring identity verification before any request reaches the origin `/admin` route.",
      "Configured targeted WAF custom rules, strict rate-limiting thresholds, and invisible Cloudflare Turnstile verification on public forms.",
      "Enforced strict Content-Security-Policy, HSTS, and secure session cookie flags at the Next.js and edge layer.",
      "Locked origin access to authenticated edge tunnels so direct-to-IP bypasses are dropped immediately.",
    ],
    outcomes: [
      { metric: "100%", label: "Unauthenticated admin probes blocked at edge" },
      { metric: "A+", label: "SecurityHeaders.com grade verified post-launch" },
      { metric: "0ms", label: "Added friction for legitimate storefront visitors" },
    ],
    stack: ["Next.js", "Cloudflare Access", "Turnstile", "Edge WAF", "CSP / HSTS"],
    diagramType: "portal",
  },
  {
    slug: "siem-xdr-detection-tuning",
    code: "CASE 02",
    serviceNumber: "02",
    serviceSlug: "soc-threat-defense",
    serviceLabel: "SOC & Threat Defense",
    seoTitle: "SIEM & XDR Alert Detection Tuning Case Study",
    seoDescription:
      "How XITNOD cut repetitive SIEM alert noise by 68% and sped up forensic timeline reconstruction 3.5x across GlobalProtect VPN, FortiGate, and Entra ID.",
    publishedDate: "2026-10-15",
    title: "Turning High-Noise Firewall & VPN Telemetry Into Actionable Detections",
    clientProfile: "Multi-region enterprise security operations environment",
    duration: "2-Week Detection Sprint",
    summary:
      "Re-engineered SIEM and XDR correlation rules across GlobalProtect VPN, perimeter firewall logs, and identity telemetry, slashing false-positive fatigue while catching suspicious access patterns early.",
    challenge:
      "Analysts were overwhelmed by hundreds of noisy raw firewall and authentication alerts daily, risking missed credential abuse and delayed triage during real security events.",
    approach: [
      "Audited log ingestion pipelines across perimeter firewalls, VPN gateways, and cloud identity providers to close parsing blind spots.",
      "Authored multi-stage correlation rules linking impossible travel, brute-force bursts, and anomalous post-login actions.",
      "Built automated Python log-hunting scripts to correlate multi-gigabyte access and firewall exports rapidly during investigations.",
      "Documented repeatable analyst triage playbooks mapped directly to MITRE ATT&CK techniques.",
    ],
    outcomes: [
      { metric: "-68%", label: "Reduction in low-signal repetitive alert volume" },
      { metric: "3.5x", label: "Faster cross-log timeline reconstruction" },
      { metric: "14", label: "Custom high-fidelity correlation rules shipped" },
    ],
    stack: ["SentinelOne SIEM", "GlobalProtect", "FortiGate", "Microsoft Purview", "Python"],
    diagramType: "siem",
  },
  {
    slug: "governed-internal-ai-agent",
    code: "CASE 03",
    serviceNumber: "04",
    serviceSlug: "applied-ai-governance",
    serviceLabel: "Applied AI & Governance",
    seoTitle: "Privacy-First Internal AI Workflow Case Study",
    seoDescription:
      "How XITNOD built a local tool-calling forensic AI assistant with automatic PII redaction, cutting investigation timeline drafting by 60% with zero data leaks.",
    publishedDate: "2026-11-25",
    title: "Privacy-First Log Triage & Data-Redaction AI Workflow",
    clientProfile: "Security & IT operations engineering team",
    duration: "2-Week AI Pilot Sprint",
    summary:
      "Built a local and private tool-calling forensic assistant paired with client-side sensitive-data redaction so analysts can accelerate triage without exposing IPs, tokens, or PII to external LLMs.",
    challenge:
      "Engineers wanted AI assistance to parse heterogeneous security logs and draft timelines, but pasting raw client telemetry into public AI tools violated confidentiality and data-governance requirements.",
    approach: [
      "Engineered a browser-level PII and infrastructure redaction layer automatically masking IPs, agent IDs, hostnames, and credentials prior to analysis.",
      "Architected a structured tool-calling workflow using local open-weight models for deterministic log parsing and timeline synthesis.",
      "Implemented strict read-only tool permissions, JSON schema validation, and immutable audit logging for every analyst query.",
      "Delivered a clear Shadow-AI governance guide defining approved tools, redaction boundaries, and review cadence.",
    ],
    outcomes: [
      { metric: "0", label: "Unredacted client identifiers sent externally" },
      { metric: "~60%", label: "Time saved drafting structured investigation timelines" },
      { metric: "100%", label: "Auditability across automated tool invocations" },
    ],
    stack: ["TypeScript", "Python", "Local Open-Weight LLMs", "DLP Redaction", "Structured Tooling"],
    diagramType: "ai",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

import React from "react";

interface ArchitectureDiagramProps {
  type: "portal" | "siem" | "ai";
}

export function ArchitectureDiagram({ type }: ArchitectureDiagramProps) {
  if (type === "portal") {
    return (
      <svg
        viewBox="0 0 760 220"
        className="h-auto w-full"
        role="img"
        aria-label="Zero-Trust Admin Portal Hardening Architecture"
      >
        <defs>
          <linearGradient id="flowOrange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5C5C99" />
            <stop offset="50%" stopColor="#FFB27A" />
            <stop offset="100%" stopColor="#CCCCFF" />
          </linearGradient>
        </defs>
        <rect width="760" height="220" rx="16" fill="currentColor" className="text-[#161638] dark:text-[#121230]" />
        {/* Connector lines */}
        <line x1="168" y1="110" x2="232" y2="110" stroke="url(#flowOrange)" strokeWidth="2.5" strokeDasharray="5 5" />
        <line x1="392" y1="110" x2="456" y2="110" stroke="url(#flowOrange)" strokeWidth="2.5" />
        <line x1="596" y1="110" x2="640" y2="110" stroke="#FFB27A" strokeWidth="2.5" />

        {/* Node 1: Public Traffic */}
        <g transform="translate(24, 62)">
          <rect width="144" height="96" rx="12" fill="#212154" stroke="#5C5C99" strokeWidth="1.5" />
          <text x="16" y="30" fill="#FFB27A" fontSize="10" fontFamily="monospace" fontWeight="700">INGRESS</text>
          <text x="16" y="54" fill="#F5F6FF" fontSize="13" fontWeight="700">Public &amp; Bots</text>
          <text x="16" y="75" fill="#A3A3CC" fontSize="10.5">Untrusted requests</text>
        </g>

        {/* Node 2: Edge WAF & Zero Trust */}
        <g transform="translate(232, 50)">
          <rect width="160" height="120" rx="12" fill="#292966" stroke="#FFB27A" strokeWidth="1.8" />
          <text x="16" y="28" fill="#FFB27A" fontSize="10" fontFamily="monospace" fontWeight="700">EDGE GATE</text>
          <text x="16" y="52" fill="#F5F6FF" fontSize="13" fontWeight="700">Cloudflare Access</text>
          <text x="16" y="73" fill="#CCCCFF" fontSize="10.5">• Identity / MFA Gate</text>
          <text x="16" y="90" fill="#CCCCFF" fontSize="10.5">• Turnstile + WAF Rules</text>
          <text x="16" y="107" fill="#CCCCFF" fontSize="10.5">• Rate Limit Enforcement</text>
        </g>

        {/* Node 3: Tunnel */}
        <g transform="translate(456, 62)">
          <rect width="140" height="96" rx="12" fill="#212154" stroke="#5C5C99" strokeWidth="1.5" />
          <text x="16" y="30" fill="#CCCCFF" fontSize="10" fontFamily="monospace" fontWeight="700">TRANSPORT</text>
          <text x="16" y="54" fill="#F5F6FF" fontSize="13" fontWeight="700">Origin Tunnel</text>
          <text x="16" y="75" fill="#A3A3CC" fontSize="10.5">No public IP exposed</text>
        </g>

        {/* Node 4: Hardened Admin */}
        <g transform="translate(640, 62)">
          <rect width="98" height="96" rx="12" fill="#1E1E4A" stroke="#CCCCFF" strokeWidth="1.5" />
          <text x="14" y="30" fill="#FFB27A" fontSize="10" fontFamily="monospace" fontWeight="700">APP</text>
          <text x="14" y="54" fill="#F5F6FF" fontSize="13" fontWeight="700">/admin</text>
          <text x="14" y="75" fill="#A3A3CC" fontSize="10.5">CSP + HSTS</text>
        </g>
      </svg>
    );
  }

  if (type === "siem") {
    return (
      <svg
        viewBox="0 0 760 220"
        className="h-auto w-full"
        role="img"
        aria-label="SIEM and XDR High-Signal Detection Pipeline Architecture"
      >
        <rect width="760" height="220" rx="16" fill="currentColor" className="text-[#161638] dark:text-[#121230]" />
        {/* Flow lines */}
        <path d="M174 58 L244 110 M174 110 L244 110 M174 162 L244 110" stroke="#5C5C99" strokeWidth="2" fill="none" />
        <line x1="444" y1="110" x2="508" y2="110" stroke="#FFB27A" strokeWidth="2.5" />

        {/* Telemetry Sources */}
        <g transform="translate(24, 34)">
          <rect width="150" height="44" rx="9" fill="#212154" stroke="#5C5C99" strokeWidth="1.2" />
          <text x="14" y="27" fill="#F5F6FF" fontSize="11.5" fontWeight="600">Firewall &amp; VPN Logs</text>
        </g>
        <g transform="translate(24, 88)">
          <rect width="150" height="44" rx="9" fill="#212154" stroke="#5C5C99" strokeWidth="1.2" />
          <text x="14" y="27" fill="#F5F6FF" fontSize="11.5" fontWeight="600">Entra ID &amp; O365</text>
        </g>
        <g transform="translate(24, 142)">
          <rect width="150" height="44" rx="9" fill="#212154" stroke="#5C5C99" strokeWidth="1.2" />
          <text x="14" y="27" fill="#F5F6FF" fontSize="11.5" fontWeight="600">EDR / Endpoint Fleet</text>
        </g>

        {/* Correlation Engine */}
        <g transform="translate(244, 46)">
          <rect width="200" height="128" rx="12" fill="#292966" stroke="#FFB27A" strokeWidth="1.8" />
          <text x="16" y="28" fill="#FFB27A" fontSize="10" fontFamily="monospace" fontWeight="700">SIGNAL ENGINE</text>
          <text x="16" y="52" fill="#F5F6FF" fontSize="13.5" fontWeight="700">SIEM Correlation</text>
          <text x="16" y="74" fill="#CCCCFF" fontSize="10.5">• Noise Suppression (-68%)</text>
          <text x="16" y="92" fill="#CCCCFF" fontSize="10.5">• MITRE ATT&amp;CK Mapping</text>
          <text x="16" y="110" fill="#CCCCFF" fontSize="10.5">• Cross-Source Enrichers</text>
        </g>

        {/* Response Output */}
        <g transform="translate(508, 56)">
          <rect width="226" height="108" rx="12" fill="#1E1E4A" stroke="#CCCCFF" strokeWidth="1.5" />
          <text x="16" y="28" fill="#FFB27A" fontSize="10" fontFamily="monospace" fontWeight="700">ACTIONABLE RESPONSE</text>
          <text x="16" y="53" fill="#F5F6FF" fontSize="13.5" fontWeight="700">High-Fidelity Triage</text>
          <text x="16" y="75" fill="#A3A3CC" fontSize="10.5">Automated timeline + IR runbooks</text>
          <text x="16" y="92" fill="#CCCCFF" fontSize="10.5">Verified containment in &lt; 15m</text>
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 760 220"
      className="h-auto w-full"
      role="img"
      aria-label="Governed Privacy-First Internal AI Workflow Architecture"
    >
      <rect width="760" height="220" rx="16" fill="currentColor" className="text-[#161638] dark:text-[#121230]" />
      <line x1="176" y1="110" x2="232" y2="110" stroke="#CCCCFF" strokeWidth="2" />
      <line x1="408" y1="110" x2="464" y2="110" stroke="#FFB27A" strokeWidth="2.5" />
      <line x1="600" y1="110" x2="640" y2="110" stroke="#CCCCFF" strokeWidth="2" />

      <g transform="translate(24, 62)">
        <rect width="152" height="96" rx="12" fill="#212154" stroke="#5C5C99" strokeWidth="1.5" />
        <text x="16" y="30" fill="#CCCCFF" fontSize="10" fontFamily="monospace" fontWeight="700">ANALYST</text>
        <text x="16" y="54" fill="#F5F6FF" fontSize="13" fontWeight="700">Raw Log Input</text>
        <text x="16" y="75" fill="#A3A3CC" fontSize="10.5">IPs, IDs, credentials</text>
      </g>

      <g transform="translate(232, 48)">
        <rect width="176" height="124" rx="12" fill="#292966" stroke="#FFB27A" strokeWidth="1.8" />
        <text x="16" y="28" fill="#FFB27A" fontSize="10" fontFamily="monospace" fontWeight="700">GUARDRAIL LAYER</text>
        <text x="16" y="52" fill="#F5F6FF" fontSize="13" fontWeight="700">Client-Side DLP</text>
        <text x="16" y="74" fill="#CCCCFF" fontSize="10.5">• Auto PII / IP Redaction</text>
        <text x="16" y="92" fill="#CCCCFF" fontSize="10.5">• Token &amp; Secret Scrub</text>
        <text x="16" y="110" fill="#CCCCFF" fontSize="10.5">• Policy Audit Trail</text>
      </g>

      <g transform="translate(464, 62)">
        <rect width="136" height="96" rx="12" fill="#212154" stroke="#5C5C99" strokeWidth="1.5" />
        <text x="14" y="30" fill="#FFB27A" fontSize="10" fontFamily="monospace" fontWeight="700">RUNTIME</text>
        <text x="14" y="54" fill="#F5F6FF" fontSize="13" fontWeight="700">Scoped LLM</text>
        <text x="14" y="75" fill="#A3A3CC" fontSize="10.5">Local / VPC tools</text>
      </g>

      <g transform="translate(640, 62)">
        <rect width="98" height="96" rx="12" fill="#1E1E4A" stroke="#CCCCFF" strokeWidth="1.5" />
        <text x="12" y="30" fill="#CCCCFF" fontSize="10" fontFamily="monospace" fontWeight="700">OUTPUT</text>
        <text x="12" y="54" fill="#F5F6FF" fontSize="13" fontWeight="700">Timeline</text>
        <text x="12" y="75" fill="#A3A3CC" fontSize="10.5">Human review</text>
      </g>
    </svg>
  );
}

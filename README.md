# XITNOD - Production Website (`Next.js 15 + TypeScript + Tailwind CSS + Three.js`)

Official multi-route web platform for **XITNOD** (*Exit Node*) - **Engineered for resilience.**

Built on the **Moonlight Palette** with **Option 01 (Orbital Exit-Node Monolith)** interactive 3D hero, pure white-silver metallic header/footer branding in Dark Mode, Daylight Chrome Light Mode, **Our Services** deep-dive pages, architecture case studies, A+ security headers, and a validated contact API.

## Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template (optional for local dev)
cp .env.example .env.local

# 3. Start local development server
npm run dev
```

Open `http://localhost:3000`.

## Production Verification

```bash
npm run typecheck
npm run build
npm run start
```

## Architecture & Key Features

- **Interactive 3D Hero (`src/components/Hero3D.tsx`)**: Procedural Three.js WebGL `Ø` Exit-Node sculpture matching Option 01 colors (brushed silver-white titanium chrome outer arcs + forged metallic orange-apricot `X` slash + subtle core glow + concentric orbital rings). Smooth cursor parallax, elastic click-and-drag inspection, reduced-motion support, and graceful WebGL fallback.
- **Dual Theme System (`Dark` Default + `Light` Toggle)**:
  - **Dark Mode**: Midnight (`#161638`) surfaces, pure white-silver metallic wordmark (`public/brand/wordmark-white-metallic.png`), and silver-white/orange 3D chrome.
  - **Light Mode**: Whisper (`#F3F3FF`) daylight surfaces, brushed midnight-indigo steel wordmark (`public/brand/wordmark-light-metallic.png`), and midnight-steel/copper 3D finish.
- **Our Services Multi-Route Structure**:
  - `/services/cloud-infrastructure` (`01 · Cloud & Infrastructure`)
  - `/services/soc-threat-defense` (`02 · SOC & Threat Defense`)
  - `/services/web-development` (`03 · Web Development`)
  - `/services/applied-ai-governance` (`04 · Applied AI & Governance`)
- **Selected Work Architecture Teardowns (`/work/[slug]`)**: Dedicated pages with inline SVG architecture diagrams and measurable outcomes.
- **Hardened Contact Endpoint (`POST /api/contact`)**: Strict TypeScript payload sanitization, honeypot anti-spam trap, sliding-window rate limiting, optional Cloudflare Turnstile verification, and drop-in **Resend** email delivery.
- **Security Hygiene**: Strict `next.config.ts` security headers (`HSTS`, `CSP`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`), RFC 9116 `public/.well-known/security.txt`, and dynamic `sitemap.xml` / `robots.txt`.

## Deploying to Vercel + Cloudflare

1. Push this directory to a GitHub repository and import it in **Vercel**.
2. Set environment variables in Vercel Project Settings (`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`).
3. Connect `xitnod.com` via **Cloudflare DNS** (proxied) and enable Cloudflare WAF + Bot Fight Mode.

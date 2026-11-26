import React from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border-hairline)] bg-[var(--bg-elevated)]/60">
      <img
        src="/brand/icon-minimal-white.png"
        alt=""
        aria-hidden="true"
        width={360}
        height={360}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -bottom-24 -right-20 hidden h-[360px] w-[360px] select-none opacity-[0.035] dark:block"
      />
      <img
        src="/brand/icon-minimal-black.png"
        alt=""
        aria-hidden="true"
        width={360}
        height={360}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -bottom-24 -right-20 block h-[360px] w-[360px] select-none opacity-[0.04] dark:hidden"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" aria-label="XITNOD Home">
              <BrandLogo heightClass="h-7" />
            </Link>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-apricot-deep dark:text-apricot">
              {SITE.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
              Cloud infrastructure, SOC &amp; threat defense, hardened web development, and applied
              AI governance for engineering-driven teams.
            </p>
            <p className="mt-5 font-mono text-xs text-[var(--text-muted)]">
              Pronounced &ldquo;{SITE.pronunciation}&rdquo; ·{" "}
              <a href={`mailto:${SITE.email}`} className="hover:text-[var(--text-primary)]">
                {SITE.email}
              </a>
            </p>
          </div>

          <nav aria-label="Our Services" className="md:col-span-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)]">
              Our Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    <span className="mr-2 font-mono text-xs text-apricot-deep dark:text-apricot">
                      {svc.number}
                    </span>
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-2">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)]">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/#process" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  How We Work
                </Link>
              </li>
              <li>
                <Link href="/#work" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  About XITNOD
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Trust and Legal" className="md:col-span-2">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)]">
              Trust &amp; Legal
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Terms of Engagement
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-hairline)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
          <p>&copy; {year} XITNOD. All rights reserved.</p>
          <p className="font-mono">ENGINEERED FOR RESILIENCE</p>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Layers } from "lucide-react";
import {
  BENCHMARKS,
  ENGAGEMENT_MODELS,
  GENERAL_FAQS,
  LIFECYCLE_STEPS,
  PRINCIPLES,
  PROCESS_STEPS,
  SITE,
  SPRINT_CADENCE,
} from "@/data/site";
import { SERVICES } from "@/data/services";
import { CASE_STUDIES } from "@/data/work";
import { HeroSection } from "@/components/HeroSection";
import { TechMarquee } from "@/components/TechMarquee";
import { ServicesSection } from "@/components/ServicesSection";
import { EngagementCtaButton } from "@/components/EngagementCtaButton";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { AnimatedMetric, ScrollReveal, SpotlightCard } from "@/components/MotionPrimitives";

export default function HomePage() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        alternateName: SITE.pronunciation,
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          url: `${SITE.url}/brand/avatar-dark.png`,
          width: 1024,
          height: 1024,
        },
        description: SITE.seoDescription,
        email: SITE.email,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "technical sales",
            email: SITE.email,
            availableLanguage: ["English"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.seoDescription,
        publisher: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#service-catalog`,
        name: SITE.name,
        url: SITE.url,
        image: `${SITE.url}/brand/og-image.png`,
        description: SITE.seoDescription,
        email: SITE.email,
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Our Services",
          itemListElement: SERVICES.map((svc) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: svc.title,
              description: svc.seoDescription,
              url: `${SITE.url}/services/${svc.slug}`,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: GENERAL_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="relative">
      <JsonLd data={homeSchema} />

      {/* 01. Interactive 3D Hero with Kinetic Banner Text */}
      <HeroSection />

      <div className="horizon-divider mx-auto max-w-7xl" />

      {/* 01b. Quiet Edge-Masked Tech Stack Strip */}
      <TechMarquee />

      {/* 02. Unified Lifecycle Bar */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-apricot-deep dark:text-apricot">
                  One Resilient Architecture
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Built, hardened, defended, and governed as one system.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
                Disconnected vendors leave blind spots between application code, cloud IAM, security
                telemetry, and AI tools. One team owns all four layers cleanly.
              </p>
            </div>
          </ScrollReveal>

          <div
            aria-hidden="true"
            className="lifecycle-track mt-10 mb-4 hidden h-[2px] w-full rounded-full bg-[var(--border-hairline)] lg:block"
          />

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-4 lg:grid-cols-4">
            {LIFECYCLE_STEPS.map((item, idx) => (
              <ScrollReveal key={item.action} delayMs={idx * 85}>
                <SpotlightCard className="h-full rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)]">
                  <Link href={`/services/${item.serviceSlug}`} className="group block h-full p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-apricot-deep dark:text-apricot">
                        STEP {idx + 1} · {item.index}
                      </span>
                      <Layers className="h-4 w-4 text-[var(--text-muted)] transition-colors group-hover:text-apricot-deep dark:group-hover:text-apricot" />
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold text-[var(--text-primary)] transition-colors group-hover:text-apricot-deep dark:group-hover:text-apricot">
                      {item.action}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.summary}
                    </p>
                  </Link>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03. Our Services */}
      <ServicesSection />

      {/* 04. Process, Sprint Cadence & Engagement Models */}
      <section
        id="process"
        className="scroll-mt-24 border-t border-[var(--border-hairline)] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-apricot-deep dark:text-apricot">
                How We Work
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                Direct engineering execution, structured for clarity.
              </h2>
            </div>
          </ScrollReveal>

          {/* Visual 3-Week Sprint Cadence Strip */}
          <ScrollReveal delayMs={80} className="mt-10">
            <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Typical Sprint Cadence
                </span>
                <span className="font-mono text-[11px] text-apricot-deep dark:text-apricot">
                  1 to 3 Weeks End-to-End
                </span>
              </div>

              <div className="relative mt-5 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 right-0 top-[9px] hidden h-px bg-gradient-to-r from-apricot/60 via-dusk/50 to-apricot/60 md:block"
                />
                {SPRINT_CADENCE.map((phase) => (
                  <div key={phase.window} className="relative">
                    <div className="flex items-center gap-2.5">
                      <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border border-apricot-deep/55 bg-[var(--bg-elevated)] dark:border-apricot/60">
                        <span className="h-2 w-2 rounded-full bg-apricot-deep dark:bg-apricot" />
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-apricot-deep dark:text-apricot">
                        {phase.window}
                      </span>
                    </div>
                    <h3 className="mt-2.5 font-display text-base font-bold text-[var(--text-primary)]">
                      {phase.phase}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {phase.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 4-Step Delivery Breakdown */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((item, idx) => (
              <ScrollReveal key={item.step} delayMs={idx * 80}>
                <SpotlightCard className="h-full rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-apricot-deep dark:text-apricot">{item.step}</span>
                    <span className="text-[var(--text-muted)]">{item.duration}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <ScrollReveal key={model.id} delayMs={idx * 110}>
                <SpotlightCard
                  className={`h-full rounded-3xl border ${
                    idx === 0
                      ? "border-apricot-deep/45 bg-[var(--bg-elevated)] shadow-card-light dark:border-apricot/45 dark:shadow-card-dark"
                      : "border-[var(--border-hairline)] bg-[var(--bg-elevated)]/80"
                  }`}
                >
                  <article className="flex h-full flex-col justify-between p-8">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-apricot-deep dark:text-apricot">
                          {model.badge}
                        </span>
                        <span className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/60 px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">
                          {model.timeline}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-bold text-[var(--text-primary)]">
                        {model.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {model.summary}
                      </p>
                      <p className="mt-3 text-xs text-[var(--text-muted)]">
                        <strong className="text-[var(--text-primary)]">Ideal for:</strong>{" "}
                        {model.idealFor}
                      </p>
                      <ul className="mt-6 space-y-2.5 border-t border-[var(--border-hairline)] pt-5">
                        {model.highlights.map((hl) => (
                          <li
                            key={hl}
                            className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-apricot-deep dark:text-apricot" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <EngagementCtaButton
                        label={model.ctaLabel}
                        engagementValue={model.engagementValue}
                        primary={idx === 0}
                      />
                    </div>
                  </article>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05. Selected Work with Framed Mini Architecture Previews */}
      <section
        id="work"
        className="scroll-mt-24 border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/35 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-apricot-deep dark:text-apricot">
                  Selected Work
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  Real architectures built for reliable operations.
                </h2>
              </div>
              <p className="max-w-md text-sm text-[var(--text-secondary)]">
                Sanitized technical breakdowns covering portal hardening, SIEM and XDR signal
                engineering, and privacy-first internal AI tooling.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {CASE_STUDIES.map((study, idx) => (
              <ScrollReveal key={study.slug} delayMs={idx * 95}>
                <SpotlightCard className="h-full rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] shadow-card-light dark:shadow-card-dark">
                  <article className="group flex h-full flex-col justify-between">
                    <Link
                      href={`/work/${study.slug}`}
                      className="flex h-full flex-col justify-between p-5 sm:p-6"
                    >
                      <div>
                        {/* Visual Mini Architecture Diagram Header */}
                        <div className="mb-5 overflow-hidden rounded-xl border border-[var(--border-hairline)] bg-[#121230] p-2 transition-transform duration-500 group-hover:border-apricot/40">
                          <div className="transition-transform duration-500 group-hover:scale-[1.03]">
                            <ArchitectureDiagram type={study.diagramType} />
                          </div>
                        </div>

                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="font-bold text-apricot-deep dark:text-apricot">
                            {study.code} · {study.serviceLabel}
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-apricot-deep dark:group-hover:text-apricot" />
                        </div>

                        <h3 className="mt-3.5 font-display text-xl font-bold leading-snug text-[var(--text-primary)] transition-colors group-hover:text-apricot-deep dark:group-hover:text-apricot">
                          {study.title}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {study.summary}
                        </p>
                      </div>

                      <div className="mt-6">
                        <div className="grid grid-cols-3 gap-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/60 p-3">
                          {study.outcomes.map((o) => (
                            <div key={o.label}>
                              <div className="font-display text-lg font-bold text-[var(--text-primary)]">
                                {o.metric}
                              </div>
                              <div className="mt-0.5 text-[11px] leading-tight text-[var(--text-muted)]">
                                {o.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {study.stack.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="rounded-md bg-[var(--bg-subtle)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </article>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06. About XITNOD & Animated Benchmarks */}
      <section
        id="about"
        className="scroll-mt-24 border-t border-[var(--border-hairline)] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <ScrollReveal className="lg:col-span-5">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-apricot-deep dark:text-apricot">
                About XITNOD
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                Named after the boundary where traffic meets reality.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                In networking, an <strong className="text-[var(--text-primary)]">exit node</strong>{" "}
                is the decisive boundary between internal infrastructure and the open internet. We
                built XITNOD around that mindset, pairing disciplined software engineering with
                hands-on security operations so lean teams ship faster on solid foundations.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {BENCHMARKS.map((stat, idx) => (
                <ScrollReveal key={stat.label} delayMs={idx * 80}>
                  <SpotlightCard className="h-full rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6">
                    <div className="font-display text-3xl font-bold text-apricot-deep dark:text-apricot">
                      <AnimatedMetric value={stat.value} />
                    </div>
                    <div className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                      {stat.label}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                      {stat.detail}
                    </p>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-[var(--border-hairline)] pt-12 md:grid-cols-3">
            {PRINCIPLES.map((p, idx) => (
              <ScrollReveal key={p.title} delayMs={idx * 90}>
                <span className="font-mono text-xs font-bold text-apricot-deep dark:text-apricot">
                  0{idx + 1}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-[var(--text-primary)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {p.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06b. Pre-Contact Common Questions */}
      <section className="border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/20 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-8 text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-apricot-deep dark:text-apricot">
                Common Questions
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                Quick answers before we talk.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delayMs={80}>
            <FaqAccordion />
          </ScrollReveal>
        </div>
      </section>

      {/* 07. Direct Engineer Contact */}
      <section
        id="contact"
        className="scroll-mt-24 border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/35 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <ScrollReveal className="lg:col-span-5">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-apricot-deep dark:text-apricot">
                Start a Conversation
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                Talk directly to an engineer.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                Share your stack, goals, or security priorities. We review every brief internally
                and reply within one business day with practical options and clear scope.
              </p>

              <div className="mt-8 space-y-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 text-sm">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                    Direct Email
                  </span>
                  <p className="mt-1 font-semibold text-[var(--text-primary)]">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="hover:text-apricot-deep dark:hover:text-apricot"
                    >
                      {SITE.email}
                    </a>
                  </p>
                </div>
                <div className="border-t border-[var(--border-hairline)] pt-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                    Typical Response Time
                  </span>
                  <p className="mt-1 font-semibold text-[var(--text-primary)]">
                    Within 24 hours (priority for active incidents)
                  </p>
                </div>
                <div className="border-t border-[var(--border-hairline)] pt-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                    Delivery Model
                  </span>
                  <p className="mt-1 font-semibold text-[var(--text-primary)]">{SITE.location}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100} className="lg:col-span-7">
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}

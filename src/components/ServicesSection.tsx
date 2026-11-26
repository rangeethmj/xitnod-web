"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Cloud, Code2, Cpu, Shield } from "lucide-react";
import { SERVICES } from "@/data/services";
import { ScrollReveal, SpotlightCard } from "./MotionPrimitives";

const SERVICE_ICONS = [Cloud, Shield, Code2, Cpu];

export function ServicesSection() {
  const [activeServiceIdx, setActiveServiceIdx] = useState<number>(0);
  const activeService = SERVICES[activeServiceIdx];
  const ActiveIcon = SERVICE_ICONS[activeServiceIdx];

  useEffect(() => {
    const onSelectService = (event: Event) => {
      const custom = event as CustomEvent<{ index?: number }>;
      if (
        typeof custom.detail?.index === "number" &&
        custom.detail.index >= 0 &&
        custom.detail.index < SERVICES.length
      ) {
        setActiveServiceIdx(custom.detail.index);
      }
    };
    window.addEventListener("xitnod:select-service", onSelectService);
    return () => window.removeEventListener("xitnod:select-service", onSelectService);
  }, []);

  const handleScopeSprint = () => {
    window.dispatchEvent(
      new CustomEvent("xitnod:select-contact", {
        detail: {
          service: `${activeService.number} · ${activeService.title}`,
          engagement: "Fixed-Scope Sprint (1-3 Weeks)",
        },
      })
    );
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/35 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-apricot/20 blur-[120px] dark:bg-indigo-brand/35"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-apricot-deep dark:text-apricot">
                Our Services
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.6rem]">
                Four focused disciplines. Built to work together.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              Each discipline starts with a fixed-scope sprint that ships real hardening or
              production code quickly, with clear milestones and full client ownership.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={100} className="mt-10 lg:mt-12">
          {/* Mobile / Tablet Compact Horizontal Pill Bar (instant tap without vertical scroll) */}
          <div
            role="tablist"
            aria-label="Our Services mobile switcher"
            className="no-scrollbar mb-5 flex gap-2 overflow-x-auto pb-1 lg:hidden"
          >
            {SERVICES.map((svc, idx) => {
              const Icon = SERVICE_ICONS[idx];
              const isSelected = activeServiceIdx === idx;
              return (
                <button
                  key={`mob-${svc.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`service-panel-${svc.id}`}
                  onClick={() => setActiveServiceIdx(idx)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? "border-apricot-deep/60 bg-apricot/20 text-[var(--text-primary)] shadow-sm dark:border-apricot dark:bg-apricot/15"
                      : "border-[var(--border-hairline)] bg-[var(--bg-elevated)]/70 text-[var(--text-secondary)]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 text-apricot-deep dark:text-apricot" />
                  <span className="font-mono text-[11px] text-apricot-deep dark:text-apricot">
                    {svc.number}
                  </span>
                  <span>{svc.shortTitle}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
            {/* Desktop Left Rail: Kinetic Vertical Service Selector */}
            <div
              role="tablist"
              aria-label="Our Services"
              className="hidden flex-col gap-3 lg:col-span-5 lg:flex"
            >
              {SERVICES.map((svc, idx) => {
                const Icon = SERVICE_ICONS[idx];
                const isSelected = activeServiceIdx === idx;
                return (
                  <button
                    key={svc.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`service-panel-${svc.id}`}
                    onClick={() => setActiveServiceIdx(idx)}
                    className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-apricot-deep/55 bg-[var(--bg-elevated)] shadow-card-light dark:border-apricot/60 dark:shadow-card-dark"
                        : "border-[var(--border-hairline)] bg-[var(--bg-elevated)]/55 hover:border-[var(--border-strong)] hover:bg-[var(--bg-elevated)]/85"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-3 left-0 w-1 rounded-r-full bg-apricot-deep dark:bg-apricot transition-all duration-300 ${
                        isSelected
                          ? "scale-y-100 opacity-100"
                          : "scale-y-0 opacity-0 group-hover:scale-y-50 group-hover:opacity-40"
                      }`}
                    />

                    <div className="flex items-start justify-between gap-4 pl-2">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                            isSelected
                              ? "border-apricot/50 bg-apricot/15 text-apricot-deep dark:text-apricot"
                              : "border-[var(--border-hairline)] bg-[var(--bg-subtle)]/70 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest">
                            <span className="text-apricot-deep dark:text-apricot">{svc.number}</span>
                            <span className="text-[var(--text-muted)]">{svc.entrySprint.duration}</span>
                          </div>
                          <h3 className="mt-1 font-display text-lg font-bold text-[var(--text-primary)]">
                            {svc.title}
                          </h3>
                          <p
                            className={`mt-1.5 text-xs leading-relaxed transition-colors ${
                              isSelected ? "text-[var(--text-secondary)]" : "text-[var(--text-muted)]"
                            }`}
                          >
                            {svc.summary}
                          </p>
                        </div>
                      </div>

                      <ArrowRight
                        className={`mt-2 h-4 w-4 shrink-0 transition-all duration-300 ${
                          isSelected
                            ? "translate-x-0.5 text-apricot-deep dark:text-apricot"
                            : "-translate-x-1 text-[var(--text-muted)] opacity-50 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Stage: Interactive Spotlight Service Blueprint */}
            <div className="lg:col-span-7">
              <SpotlightCard className="h-full rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] shadow-card-light dark:shadow-card-dark">
                <div
                  key={activeService.id}
                  id={`service-panel-${activeService.id}`}
                  role="tabpanel"
                  className="animate-panel-enter relative flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-6 top-4 select-none font-display text-8xl font-bold tracking-tighter text-[var(--text-primary)] opacity-[0.04] sm:text-9xl"
                  >
                    {activeService.number}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="inline-flex items-center gap-2 rounded-full border border-apricot/35 bg-apricot/10 px-3 py-1 font-mono text-xs font-semibold text-apricot-deep dark:text-apricot">
                        <ActiveIcon className="h-3.5 w-3.5" />
                        <span>
                          {activeService.number} · {activeService.shortTitle}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/60 px-3.5 py-1.5">
                        <span className="font-display text-lg font-bold text-apricot-deep dark:text-apricot">
                          {activeService.highlightStat.value}
                        </span>
                        <span className="text-xs text-[var(--text-muted)]">
                          {activeService.highlightStat.label}
                        </span>
                      </div>
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                      {activeService.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                      {activeService.overview}
                    </p>

                    <div className="mt-7">
                      <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        Core Deliverables
                      </h4>
                      <ul className="mt-3.5 grid grid-cols-1 gap-2.5">
                        {activeService.deliverables.map((item, i) => (
                          <li
                            key={item}
                            style={{ animationDelay: `${60 + i * 55}ms` }}
                            className="animate-stagger-row flex items-start gap-2.5 rounded-xl border border-[var(--border-hairline)]/70 bg-[var(--bg-subtle)]/35 px-3.5 py-2.5 text-sm text-[var(--text-primary)]"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-apricot-deep dark:text-apricot" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {activeService.stack.map((tech, i) => (
                        <span
                          key={tech}
                          style={{ animationDelay: `${220 + i * 30}ms` }}
                          className="animate-stagger-row rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/60 px-3 py-1 font-mono text-xs text-[var(--text-secondary)] transition-colors hover:border-apricot/45 hover:text-[var(--text-primary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 rounded-2xl border border-apricot-deep/30 bg-[var(--bg-subtle)]/75 p-5 dark:border-apricot/30 dark:bg-[var(--bg-subtle)]/65">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-apricot-deep dark:text-apricot">
                          <span>Entry Sprint</span>
                          <span className="text-[var(--text-muted)]">·</span>
                          <span className="text-[var(--text-secondary)]">
                            {activeService.entrySprint.duration}
                          </span>
                        </div>
                        <h4 className="mt-1 font-display text-lg font-bold text-[var(--text-primary)]">
                          {activeService.entrySprint.name}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                          {activeService.entrySprint.description}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                        <button
                          type="button"
                          onClick={handleScopeSprint}
                          className="cta-sheen inline-flex items-center justify-center gap-2 rounded-xl bg-apricot px-5 py-2.5 text-sm font-semibold text-midnight transition-all hover:-translate-y-0.5 hover:bg-[#ffc08f] hover:shadow-apricot-glow"
                        >
                          Scope this sprint
                          <ArrowRight className="h-4 w-4" />
                        </button>
                        <Link
                          href={`/services/${activeService.slug}`}
                          className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-apricot-deep dark:hover:text-apricot"
                        >
                          Full specifications
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { BrandEmblem } from "./BrandLogo";
import { useTheme } from "./ThemeProvider";

const Hero3D = dynamic(() => import("./Hero3D").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center p-8">
      <BrandEmblem
        className="h-64 w-64 drop-shadow-[0_10px_22px_rgba(18,18,52,0.28)] dark:drop-shadow-[0_18px_34px_rgba(0,0,0,0.48)] md:h-80 md:w-80"
        size={320}
        priority
      />
    </div>
  ),
});

const FOCUS_TERMS = [
  "Cloud & Infrastructure",
  "SOC & Threat Defense",
  "Hardened Web Systems",
  "Applied AI Governance",
];

export function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const sectionRef = useRef<HTMLElement | null>(null);
  const orangeBackdropRef = useRef<HTMLDivElement | null>(null);
  const orangeFollowerRef = useRef<HTMLDivElement | null>(null);

  const [hoveredDockIndex, setHoveredDockIndex] = useState<number | null>(null);
  const [activeDockIndex, setActiveDockIndex] = useState<number>(0);
  const [tickerIndex, setTickerIndex] = useState<number>(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % FOCUS_TERMS.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  // Smooth cursor-reactive transparent orange backdrop & ambient shadow parallax
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shiftScale = reducedMotion ? 0.4 : 1.0;

    let targetNx = 0;
    let targetNy = 0;
    let curNx = 0;
    let curNy = 0;
    let targetPx = section.clientWidth * 0.68;
    let targetPy = section.clientHeight * 0.44;
    let curPx = targetPx;
    let curPy = targetPy;
    let targetOpacity = 0;
    let curOpacity = 0;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetPx = x;
      targetPy = y;
      targetNx = (x / Math.max(rect.width, 1)) * 2 - 1;
      targetNy = (y / Math.max(rect.height, 1)) * 2 - 1;
      targetOpacity = 1;
    };

    const onLeave = () => {
      const rect = section.getBoundingClientRect();
      targetNx = 0;
      targetNy = 0;
      targetPx = rect.width * 0.68;
      targetPy = rect.height * 0.44;
      targetOpacity = 0;
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      curNx += (targetNx - curNx) * 0.055;
      curNy += (targetNy - curNy) * 0.055;
      curPx += (targetPx - curPx) * 0.06;
      curPy += (targetPy - curPy) * 0.06;
      curOpacity += (targetOpacity - curOpacity) * 0.06;

      if (orangeBackdropRef.current) {
        const shiftX = curNx * 44 * shiftScale;
        const shiftY = curNy * 34 * shiftScale;
        orangeBackdropRef.current.style.transform = `translate3d(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px, 0)`;
      }

      if (orangeFollowerRef.current) {
        orangeFollowerRef.current.style.transform = `translate3d(${(curPx - 300).toFixed(1)}px, ${(curPy - 300).toFixed(1)}px, 0)`;
        orangeFollowerRef.current.style.opacity = curOpacity.toFixed(3);
      }
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const handleDockClick = (e: React.MouseEvent<HTMLAnchorElement>, idx: number) => {
    e.preventDefault();
    setActiveDockIndex(idx);
    window.dispatchEvent(new CustomEvent("xitnod:select-service", { detail: { index: idx } }));
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className="relative overflow-hidden pt-24 pb-10 sm:pt-32 sm:pb-14 lg:flex lg:min-h-[90vh] lg:flex-col lg:justify-between"
    >
      {/* Radial-Masked Blueprint Grid */}
      <div
        aria-hidden="true"
        className="hero-grid-masked pointer-events-none absolute inset-0"
      />

      {/* Ambient Base Studio Light */}
      <div
        aria-hidden="true"
        className="animate-ambient-drift pointer-events-none absolute -top-28 right-[6%] h-[500px] w-[500px] rounded-full blur-[135px]"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(41, 41, 102, 0.5) 0%, rgba(22, 22, 56, 0) 72%)"
            : "radial-gradient(circle, rgba(168, 174, 255, 0.28) 0%, rgba(244, 245, 253, 0) 72%)",
        }}
      />

      {/* Wide Subtle Transparent Orange Atmospheric Backdrop (Parallax Shift with Cursor) */}
      <div
        ref={orangeBackdropRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-[4%] right-[2%] h-[560px] w-[560px] rounded-full will-change-transform sm:h-[660px] sm:w-[660px]"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(255, 148, 66, 0.10) 0%, rgba(240, 114, 34, 0.05) 42%, rgba(255, 178, 122, 0.015) 68%, transparent 82%)"
            : "radial-gradient(circle, rgba(255, 146, 56, 0.06) 0%, rgba(255, 178, 112, 0.025) 46%, transparent 80%)",
          filter: "blur(68px)",
        }}
      />

      {/* Soft Cursor-Following Transparent Orange Wash */}
      <div
        ref={orangeFollowerRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-0 will-change-transform"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(255, 160, 86, 0.07) 0%, rgba(235, 112, 32, 0.025) 44%, transparent 74%)"
            : "radial-gradient(circle, rgba(255, 146, 56, 0.045) 0%, rgba(255, 180, 116, 0.018) 46%, transparent 74%)",
          filter: "blur(58px)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Copy Column with Modern Kinetic Banner Typography */}
          <div className="lg:col-span-6">
            <div
              className="hero-fade-up inline-flex items-center gap-2.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-elevated)]/85 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-apricot-deep shadow-sm backdrop-blur-md dark:bg-[var(--bg-elevated)]/65 dark:text-apricot"
              style={{ animationDelay: "40ms" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-apricot-warm opacity-70 dark:bg-apricot" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-apricot-deep dark:bg-apricot" />
              </span>
              {SITE.tagline}
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.05rem] xl:text-[3.4rem]">
              <span className="hero-mask-line">
                <span className="hero-mask-inner" style={{ animationDelay: "120ms" }}>
                  {SITE.headlineTop}
                </span>
              </span>
              <span className="hero-mask-line">
                <span className="hero-mask-inner" style={{ animationDelay: "230ms" }}>
                  {SITE.headlineMid}
                </span>
              </span>
              <span className="hero-mask-line">
                <span className="hero-mask-inner" style={{ animationDelay: "340ms" }}>
                  <span className="kinetic-gradient-text">{SITE.headlineHighlight}</span>
                </span>
              </span>
            </h1>

            <p
              className="hero-fade-up mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
              style={{ animationDelay: "440ms" }}
            >
              {SITE.subheadline}
            </p>

            {/* Primary & Secondary CTAs */}
            <div
              className="hero-fade-up mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
              style={{ animationDelay: "540ms" }}
            >
              <a
                href="#contact"
                className="cta-sheen inline-flex items-center justify-center gap-2 rounded-xl bg-apricot px-6 py-3.5 text-sm font-semibold text-midnight shadow-sm ring-1 ring-[#d97d3a]/40 transition-all hover:-translate-y-0.5 hover:bg-[#ffa868] hover:shadow-apricot-glow dark:ring-transparent"
              >
                Talk to an engineer
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)]/85 px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-apricot-deep/60 hover:bg-[var(--bg-subtle)] dark:bg-[var(--bg-elevated)]/60 dark:hover:border-apricot/60"
              >
                Explore Our Services
              </a>
            </div>

            {/* Subtle Kinetic Focus Ticker */}
            <div
              className="hero-fade-up mt-8 flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]"
              style={{ animationDelay: "640ms" }}
            >
              <span className="uppercase tracking-[0.18em]">Focus</span>
              <span className="h-px w-6 bg-apricot-deep/65 dark:bg-apricot/65" />
              <span
                key={tickerIndex}
                className="animate-panel-enter font-semibold text-[var(--text-primary)]"
              >
                {FOCUS_TERMS[tickerIndex]}
              </span>
            </div>
          </div>

          {/* Right Interactive 3D Hero Stage */}
          <div className="relative h-[360px] w-full sm:h-[440px] lg:col-span-6 lg:h-[520px]">
            <Hero3D activeServiceIndex={hoveredDockIndex} />
          </div>
        </div>

        {/* Clean Bottom Frosted Glass "Our Services" Dock */}
        <div className="hero-fade-up mt-8 lg:mt-10" style={{ animationDelay: "700ms" }}>
          <nav
            aria-label="Our Services quick navigation"
            className="glass-panel grid grid-cols-1 gap-2 rounded-2xl p-2 shadow-card-light dark:shadow-none sm:grid-cols-2 lg:grid-cols-4"
          >
            {SERVICES.map((svc, idx) => {
              const isActive = hoveredDockIndex === idx || activeDockIndex === idx;
              return (
                <a
                  key={svc.id}
                  href={`/services/${svc.slug}`}
                  onMouseEnter={() => setHoveredDockIndex(idx)}
                  onMouseLeave={() => setHoveredDockIndex(null)}
                  onClick={(e) => handleDockClick(e, idx)}
                  className={`group flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-apricot-deep/45 bg-[var(--bg-subtle)]/95 shadow-sm dark:border-apricot/45 dark:bg-[var(--bg-subtle)]/90"
                      : "border-transparent bg-transparent hover:border-[var(--border-hairline)] hover:bg-[var(--bg-subtle)]/60"
                  }`}
                >
                  <div>
                    <div className="font-mono text-xs font-bold text-apricot-deep dark:text-apricot">
                      {svc.number}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-[var(--text-primary)]">
                      {svc.title}
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-apricot-deep dark:group-hover:text-apricot" />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}

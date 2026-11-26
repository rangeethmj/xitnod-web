"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import { BrandLogo } from "./BrandLogo";
import { useTheme } from "./ThemeProvider";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
      if (window.scrollY < 260 && pathname === "/") {
        setActiveSection("");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith("/services")) {
      setActiveSection("services");
      return;
    }
    if (pathname.startsWith("/work")) {
      setActiveSection("work");
      return;
    }
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = NAV_LINKS.map((l) => l.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-22% 0px -55% 0px", threshold: [0.05, 0.2, 0.4] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav
          aria-label="Primary Navigation"
          className={`glass-panel flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
            scrolled ? "shadow-card-light dark:shadow-card-dark" : ""
          }`}
        >
          <Link
            href="/"
            aria-label="XITNOD Home"
            className="flex items-center gap-2 focus-visible:rounded-lg"
          >
            <BrandLogo heightClass="h-6 sm:h-7" priority />
          </Link>

          {/* Desktop Navigation with Scroll-Spy Active Pill */}
          <div className="hidden items-center gap-1.5 md:flex">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--bg-subtle)] text-[var(--text-primary)] shadow-sm ring-1 ring-apricot-deep/30 dark:bg-[var(--bg-subtle)]/95 dark:ring-apricot/30"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]/50 hover:text-[var(--text-primary)]"
                  }`}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-apricot-deep dark:bg-apricot" aria-hidden="true" />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)]/70 text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Link
              href="/#contact"
              className="cta-sheen hidden items-center gap-2 rounded-xl bg-apricot px-4 py-2.5 text-sm font-semibold text-midnight shadow-sm ring-1 ring-[#d97d3a]/40 transition-all hover:-translate-y-0.5 hover:bg-[#ffa868] hover:shadow-apricot-glow dark:ring-transparent sm:inline-flex"
            >
              Talk to an engineer
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-hairline)] text-[var(--text-primary)] md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="glass-panel animate-panel-enter mt-2 rounded-2xl p-4 shadow-card-light dark:shadow-card-dark md:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[var(--bg-subtle)] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-apricot" />}
                  </Link>
                );
              })}
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-apricot px-4 py-3 text-sm font-semibold text-midnight"
              >
                Talk to an engineer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

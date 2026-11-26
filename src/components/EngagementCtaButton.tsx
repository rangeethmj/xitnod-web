"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface EngagementCtaButtonProps {
  label: string;
  engagementValue: string;
  primary?: boolean;
}

export function EngagementCtaButton({
  label,
  engagementValue,
  primary = false,
}: EngagementCtaButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("xitnod:select-contact", {
        detail: { engagement: engagementValue },
      })
    );
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <a
      href="#contact"
      onClick={handleClick}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all ${
        primary
          ? "cta-sheen bg-apricot text-midnight hover:-translate-y-0.5 hover:bg-[#ffc08f] hover:shadow-apricot-glow"
          : "border border-[var(--border-strong)] text-[var(--text-primary)] hover:-translate-y-0.5 hover:border-apricot"
      }`}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { GENERAL_FAQS } from "@/data/site";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--border-hairline)] rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] shadow-card-light dark:shadow-card-dark">
      {GENERAL_FAQS.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question} className="px-6 py-4 sm:px-7">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 py-1 text-left"
            >
              <span className="font-display text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                {item.question}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-apricot/50 bg-apricot/15 text-apricot-deep dark:text-apricot"
                    : "border-[var(--border-hairline)] text-[var(--text-muted)]"
                }`}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "mt-2.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

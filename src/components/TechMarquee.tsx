import React from "react";
import { STACK_MARQUEE } from "@/data/site";

export function TechMarquee() {
  return (
    <section
      aria-label="Core platforms and technologies"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-elevated)]/40 py-5"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-6 sm:flex-row sm:items-center sm:gap-6 lg:px-8">
        <span className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Production Stack
        </span>

        <div className="marquee-wrapper marquee-mask w-full min-w-0 flex-1 overflow-hidden">
          <div className="marquee-track items-center">
            <div className="flex shrink-0 items-center gap-10 pr-10">
              {STACK_MARQUEE.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2.5 whitespace-nowrap font-mono text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <span
                    className="h-1 w-1 rounded-full bg-apricot-deep/75 dark:bg-apricot/75"
                    aria-hidden="true"
                  />
                  {item}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
              {STACK_MARQUEE.map((item) => (
                <span
                  key={`dup-${item}`}
                  className="inline-flex items-center gap-2.5 whitespace-nowrap font-mono text-xs font-medium text-[var(--text-secondary)]"
                >
                  <span className="h-1 w-1 rounded-full bg-apricot-deep/75 dark:bg-apricot/75" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

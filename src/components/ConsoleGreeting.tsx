"use client";

import { useEffect } from "react";
import { SITE } from "@/data/site";

export function ConsoleGreeting() {
  useEffect(() => {
    console.info(
      "%cXITNOD · Engineered for resilience.",
      "color:#FFB27A;background:#161638;padding:6px 12px;border-radius:6px;font-weight:700;font-family:monospace;"
    );
    console.info(`Inspecting our stack? Say hello at ${SITE.email}`);
  }, []);

  return null;
}

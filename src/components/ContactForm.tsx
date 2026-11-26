"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail, ShieldCheck } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";

interface ContactFormProps {
  preselectedService?: string | null;
  preselectedEngagement?: string | null;
}

const SERVICE_OPTIONS = SERVICES.map((s) => `${s.number} · ${s.title}`);
const ENGAGEMENT_OPTIONS = [
  "Fixed-Scope Sprint (1-3 Weeks)",
  "Fractional Engineering Retainer",
  "Security / Architecture Advisory",
  "Not sure yet, let's scope together",
];

export function ContactForm({ preselectedService, preselectedEngagement }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([SERVICE_OPTIONS[0]]);
  const [engagement, setEngagement] = useState<string>(ENGAGEMENT_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [receipt, setReceipt] = useState<{ referenceId: string; receivedAt: string } | null>(null);

  useEffect(() => {
    if (preselectedService && SERVICE_OPTIONS.includes(preselectedService)) {
      setSelectedServices((prev) =>
        prev.includes(preselectedService) ? prev : [...prev, preselectedService]
      );
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedEngagement && ENGAGEMENT_OPTIONS.includes(preselectedEngagement)) {
      setEngagement(preselectedEngagement);
    }
  }, [preselectedEngagement]);

  useEffect(() => {
    const onSelectContact = (event: Event) => {
      const custom = event as CustomEvent<{ service?: string; engagement?: string }>;
      const svc = custom.detail?.service;
      const eng = custom.detail?.engagement;
      if (svc && SERVICE_OPTIONS.includes(svc)) {
        setSelectedServices((prev) => (prev.includes(svc) ? prev : [...prev, svc]));
      }
      if (eng && ENGAGEMENT_OPTIONS.includes(eng)) {
        setEngagement(eng);
      }
    };
    window.addEventListener("xitnod:select-contact", onSelectContact);
    return () => window.removeEventListener("xitnod:select-contact", onSelectContact);
  }, []);

  const toggleService = (label: string) => {
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          services: selectedServices,
          engagement,
          message,
          website,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setFieldErrors(data.errors);
        setErrorMsg(data.message || "Please check the highlighted fields and try again.");
        setSubmitting(false);
        return;
      }

      setReceipt({
        referenceId: data.referenceId,
        receivedAt: data.receivedAt,
      });
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch {
      setErrorMsg(`Network error sending inquiry. You can also reach us directly at ${SITE.email}.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) {
    return (
      <div className="animate-panel-enter rounded-2xl border border-apricot/40 bg-[var(--bg-elevated)] p-8 shadow-card-light dark:shadow-card-dark">
        <div className="flex items-center gap-3 text-apricot-deep dark:text-apricot">
          <CheckCircle2 className="h-6 w-6" />
          <span className="font-mono text-xs font-semibold uppercase tracking-widest">
            Inquiry Received
          </span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold text-[var(--text-primary)]">
          We&apos;ve got your brief.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          An engineer will review your scope and respond within one business day with concrete next
          steps or a direct call slot.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/60 p-4 font-mono text-xs sm:grid-cols-2">
          <div>
            <span className="text-[var(--text-muted)]">REFERENCE ID</span>
            <p className="mt-1 font-semibold text-[var(--text-primary)]">{receipt.referenceId}</p>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">TIMESTAMP (UTC)</span>
            <p className="mt-1 font-semibold text-[var(--text-primary)]">{receipt.receivedAt}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setReceipt(null)}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-apricot"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 shadow-card-light dark:shadow-card-dark sm:p-8"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          1. What can we help you with?
        </label>
        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {SERVICE_OPTIONS.map((label) => {
            const active = selectedServices.includes(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleService(label)}
                className={`flex items-center justify-between rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition-all ${
                  active
                    ? "border-apricot-deep/60 bg-apricot/20 text-[var(--text-primary)] dark:border-apricot dark:bg-apricot/15"
                    : "border-[var(--border-hairline)] bg-[var(--bg-subtle)]/40 text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    active ? "bg-apricot-deep dark:bg-apricot" : "bg-[var(--border-strong)]"
                  }`}
                />
              </button>
            );
          })}
        </div>
        {fieldErrors.services && (
          <p className="mt-2 text-xs text-red-500 dark:text-red-400">{fieldErrors.services}</p>
        )}
      </div>

      <div className="mt-6">
        <label
          htmlFor="engagement"
          className="block font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]"
        >
          2. Engagement Model
        </label>
        <select
          id="engagement"
          value={engagement}
          onChange={(e) => setEngagement(e.target.value)}
          className="mt-2.5 w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/40 px-4 py-3 text-sm text-[var(--text-primary)] focus:border-apricot focus:outline-none"
        >
          {ENGAGEMENT_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-white text-midnight dark:bg-[#161638] dark:text-white">
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-[var(--text-secondary)]">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Alex Morgan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/40 px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/70 focus:border-apricot focus:outline-none"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-500 dark:text-red-400">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-[var(--text-secondary)]">
            Work Email *
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="alex@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/40 px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/70 focus:border-apricot focus:outline-none"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-500 dark:text-red-400">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="company" className="block text-xs font-semibold text-[var(--text-secondary)]">
          Company / Organization
        </label>
        <input
          id="company"
          type="text"
          placeholder="Acme Systems"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/40 px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/70 focus:border-apricot focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="block text-xs font-semibold text-[var(--text-secondary)]">
          Project Brief *
        </label>
        <textarea
          id="message"
          rows={4}
          required
          placeholder="Tell us about your stack, timeline, or the engineering problem you want solved..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1.5 w-full resize-y rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/40 px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/70 focus:border-apricot focus:outline-none"
        />
        {fieldErrors.message && (
          <p className="mt-1 text-xs text-red-500 dark:text-red-400">{fieldErrors.message}</p>
        )}
      </div>

      {errorMsg && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-500 dark:text-red-300">
          {errorMsg}
        </div>
      )}

      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <ShieldCheck className="h-4 w-4 text-apricot-deep dark:text-apricot" />
          <span>Direct to engineering. NDA available on request.</span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="cta-sheen inline-flex w-full items-center justify-center gap-2 rounded-xl bg-apricot px-6 py-3.5 text-sm font-semibold text-midnight shadow-sm ring-1 ring-[#d97d3a]/40 transition-all hover:-translate-y-0.5 hover:bg-[#ffa868] hover:shadow-apricot-glow disabled:cursor-not-allowed disabled:opacity-60 dark:ring-transparent sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending brief...
            </>
          ) : (
            <>
              Talk to an engineer
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      <div className="mt-5 border-t border-[var(--border-hairline)] pt-4 text-xs text-[var(--text-muted)]">
        Prefer email? Reach us directly at{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="inline-flex items-center gap-1 font-medium text-[var(--text-primary)] underline decoration-apricot/60 underline-offset-4 hover:text-apricot-deep dark:hover:text-apricot"
        >
          <Mail className="h-3.5 w-3.5" />
          {SITE.email}
        </a>
      </div>
    </form>
  );
}

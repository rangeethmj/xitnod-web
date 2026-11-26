import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";

const TERMS_TITLE = "Terms of Engagement & IP Ownership Policy";
const TERMS_DESC =
  "Review XITNOD consulting terms, Statement of Work governance, client intellectual property ownership for code and IaC, and engagement guidelines.";

export const metadata: Metadata = {
  title: TERMS_TITLE,
  description: TERMS_DESC,
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    url: `${SITE.url}/terms`,
    title: `${TERMS_TITLE} | ${SITE.name}`,
    description: TERMS_DESC,
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: "XITNOD Terms of Engagement" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TERMS_TITLE} | ${SITE.name}`,
    description: TERMS_DESC,
    images: ["/brand/og-image.png"],
  },
};

export default function TermsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TERMS_TITLE,
    description: TERMS_DESC,
    url: `${SITE.url}/terms`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Terms of Engagement", item: `${SITE.url}/terms` },
      ],
    },
  };

  return (
    <main className="pt-32 pb-24 sm:pt-40">
      <JsonLd data={schema} />
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-apricot-deep dark:text-apricot">
          Legal
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-[var(--text-primary)]">
          Terms of Engagement
        </h1>
        <p className="mt-3 font-mono text-xs text-[var(--text-muted)]">
          Effective Date: November 2026
        </p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              1. Statement of Work Governs Delivery
            </h2>
            <p className="mt-2">
              Information published on this website provides a general overview of XITNOD&apos;s
              capabilities. All consulting sprints, engineering builds, and retainers are governed
              by a mutually signed Statement of Work (SOW) and Master Services Agreement (MSA).
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              2. Intellectual Property Ownership
            </h2>
            <p className="mt-2">
              Upon full settlement of agreed milestone fees, custom application code,
              Infrastructure-as-Code modules, detection rules, and runbooks authored specifically
              for a client engagement belong to the client as defined in the SOW.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              3. Contact
            </h2>
            <p className="mt-2">
              Questions regarding terms or contracting can be directed to{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-[var(--text-primary)] underline decoration-apricot"
              >
                {SITE.email}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

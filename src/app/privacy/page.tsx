import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";

const PRIVACY_TITLE = "Privacy Policy & Data Confidentiality Standards";
const PRIVACY_DESC =
  "Learn how XITNOD minimizes data collection, protects project inquiry confidentiality, supports mutual NDAs, and handles responsible security disclosures.";

export const metadata: Metadata = {
  title: PRIVACY_TITLE,
  description: PRIVACY_DESC,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    url: `${SITE.url}/privacy`,
    title: `${PRIVACY_TITLE} | ${SITE.name}`,
    description: PRIVACY_DESC,
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: "XITNOD Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRIVACY_TITLE} | ${SITE.name}`,
    description: PRIVACY_DESC,
    images: ["/brand/og-image.png"],
  },
};

export default function PrivacyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: PRIVACY_TITLE,
    description: PRIVACY_DESC,
    url: `${SITE.url}/privacy`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE.url}/privacy` },
      ],
    },
  };

  return (
    <main className="pt-32 pb-24 sm:pt-40">
      <JsonLd data={schema} />
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-apricot-deep dark:text-apricot">
          Trust &amp; Privacy
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-[var(--text-primary)]">
          Privacy Policy
        </h1>
        <p className="mt-3 font-mono text-xs text-[var(--text-muted)]">
          Effective Date: November 2026
        </p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              1. Minimal Data Collection
            </h2>
            <p className="mt-2">
              XITNOD does not run invasive third-party advertising trackers or sell visitor data.
              We collect only the information you explicitly submit through our contact form (name,
              work email, company, selected services, and project brief).
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              2. How We Use Inquiry Information
            </h2>
            <p className="mt-2">
              Submitted project details are used strictly to evaluate your technical scope, prepare
              engineering proposals, and communicate with you regarding your request. Mutual NDAs
              are available before sharing sensitive architecture diagrams or logs.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
              3. Security &amp; Disclosure
            </h2>
            <p className="mt-2">
              To report a security issue or request deletion of your contact records, email{" "}
              <a
                href={`mailto:${SITE.securityEmail}`}
                className="font-medium text-[var(--text-primary)] underline decoration-apricot"
              >
                {SITE.securityEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

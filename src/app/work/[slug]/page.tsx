import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/data/work";
import { SITE } from "@/data/site";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { JsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study Not Found", robots: { index: false, follow: true } };

  const canonicalPath = `/work/${study.slug}`;
  const fullTitle = `${study.seoTitle} | ${SITE.name}`;

  return {
    title: study.seoTitle,
    description: study.seoDescription,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: `${SITE.url}${canonicalPath}`,
      title: fullTitle,
      description: study.seoDescription,
      publishedTime: study.publishedDate,
      images: [
        {
          url: "/brand/og-image.png",
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: study.seoDescription,
      images: ["/brand/og-image.png"],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const pageUrl = `${SITE.url}/work/${study.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: study.title,
        description: study.seoDescription,
        datePublished: study.publishedDate,
        dateModified: study.publishedDate,
        mainEntityOfPage: pageUrl,
        image: `${SITE.url}/brand/og-image.png`,
        keywords: study.stack.join(", "),
        author: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          logo: {
            "@type": "ImageObject",
            url: `${SITE.url}/brand/avatar-dark.png`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Selected Work", item: `${SITE.url}/#work` },
          { "@type": "ListItem", position: 3, name: study.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main className="bg-architectural-grid pt-28 pb-24 sm:pt-36">
      <JsonLd data={articleJsonLd} />

      <article className="mx-auto max-w-4xl px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Selected Work
          </Link>
        </nav>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <Link
              href={`/services/${study.serviceSlug}`}
              className="rounded-lg bg-apricot/15 px-3 py-1 font-bold text-apricot-deep transition-colors hover:bg-apricot/25 dark:text-apricot"
            >
              {study.code} · {study.serviceLabel}
            </Link>
            <span className="text-[var(--text-muted)]">{study.duration}</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-5xl">
            {study.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
            {study.summary}
          </p>
        </header>

        {/* Outcomes */}
        <section aria-label="Measured Outcomes" className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {study.outcomes.map((o) => (
            <div
              key={o.label}
              className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-5"
            >
              <div className="font-display text-3xl font-bold text-apricot-deep dark:text-apricot">
                {o.metric}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                {o.label}
              </p>
            </div>
          ))}
        </section>

        {/* Reference Architecture Diagram */}
        <section className="mt-10 rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-5 sm:p-6">
          <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Reference Architecture
          </h2>
          <ArchitectureDiagram type={study.diagramType} />
        </section>

        {/* Narrative Breakdown */}
        <div className="mt-10 space-y-8 rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-8">
          <section>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Context &amp; Challenge ({study.clientProfile})
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
              {study.challenge}
            </p>
          </section>

          <section className="border-t border-[var(--border-hairline)] pt-8">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Engineering Execution
            </h2>
            <ul className="mt-4 space-y-3">
              {study.approach.map((step) => (
                <li
                  key={step}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text-primary)]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-apricot-deep dark:text-apricot" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-[var(--border-hairline)] pt-8">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Technologies Used
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/70 px-3 py-1 font-mono text-xs text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom CTA */}
        <aside className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-apricot/40 bg-[var(--bg-elevated)] p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
              Need similar resilience across your stack?
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Talk directly with an engineer to scope a fixed 1-3 week sprint.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-apricot px-5 py-3 text-sm font-semibold text-midnight transition-all hover:bg-[#ffc08f] hover:shadow-apricot-glow"
          >
            Talk to an engineer
            <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </article>
    </main>
  );
}

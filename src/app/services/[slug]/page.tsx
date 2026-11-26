import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { SITE } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found", robots: { index: false, follow: true } };

  const canonicalPath = `/services/${service.slug}`;
  const fullTitle = `${service.seoTitle} | ${SITE.name}`;

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      url: `${SITE.url}${canonicalPath}`,
      title: fullTitle,
      description: service.seoDescription,
      images: [
        {
          url: "/brand/og-image.png",
          width: 1200,
          height: 630,
          alt: `${service.title} | ${SITE.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: service.seoDescription,
      images: ["/brand/og-image.png"],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const serviceFullLabel = `${service.number} · ${service.title}`;
  const pageUrl = `${SITE.url}/services/${service.slug}`;
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        serviceType: service.title,
        description: service.seoDescription,
        url: pageUrl,
        provider: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
        areaServed: "Worldwide",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Our Services", item: `${SITE.url}/#services` },
          { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="bg-architectural-grid pt-28 pb-24 sm:pt-36">
      <JsonLd data={serviceJsonLd} />

      <article className="mx-auto max-w-6xl px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Our Services
          </Link>
        </nav>

        {/* Header */}
        <header className="mt-8 max-w-3xl">
          <span className="inline-flex items-center rounded-lg bg-apricot/15 px-3 py-1 font-mono text-xs font-bold text-apricot-deep dark:text-apricot">
            OUR SERVICES · {service.number}
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
            {service.tagline}
          </p>
        </header>

        {/* Overview & Entry Sprint */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-8 lg:col-span-7">
            <section>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Engineering Overview
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
                {service.overview}
              </p>
            </section>

            <section>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                What We Deliver
              </h2>
              <ul className="mt-4 space-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-apricot-deep dark:text-apricot" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Stack &amp; Platforms
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/70 px-3 py-1.5 font-mono text-xs text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <aside className="flex flex-col justify-between rounded-3xl border border-apricot/40 bg-[var(--bg-elevated)] p-8 shadow-card-light dark:shadow-card-dark lg:col-span-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-apricot-deep dark:text-apricot">
                  Fixed Entry Sprint
                </span>
                <span className="rounded-md border border-[var(--border-hairline)] px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)]">
                  {service.entrySprint.duration}
                </span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold text-[var(--text-primary)]">
                {service.entrySprint.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {service.entrySprint.description}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-[var(--border-hairline)] pt-5">
                {service.entrySprint.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-apricot" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)]/60 p-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
                  Retainer Path
                </span>
                <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                  {service.retainerPath}
                </p>
              </div>
            </div>

            <a
              href="#service-contact"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-apricot px-6 py-3.5 text-sm font-semibold text-midnight transition-all hover:bg-[#ffc08f] hover:shadow-apricot-glow"
            >
              Scope this sprint
              <ArrowRight className="h-4 w-4" />
            </a>
          </aside>
        </div>

        {/* FAQs */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
            Common Questions
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6"
              >
                <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                  {faq.question}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-linking to Other Services */}
        <section className="mt-16 border-t border-[var(--border-hairline)] pt-12">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Explore Other Services
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="spotlight-card group flex items-center justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-5"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-apricot-deep dark:text-apricot">
                    {other.number}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold text-[var(--text-primary)] group-hover:text-apricot-deep dark:group-hover:text-apricot">
                    {other.title}
                  </h3>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-apricot-deep dark:group-hover:text-apricot" />
              </Link>
            ))}
          </div>
        </section>

        {/* Pre-selected Service Contact Form */}
        <section id="service-contact" className="mt-20 scroll-mt-28">
          <div className="mb-6 max-w-xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-apricot-deep dark:text-apricot">
              Start {service.title}
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Scope your engagement with an engineer.
            </h2>
          </div>
          <ContactForm preselectedService={serviceFullLabel} />
        </section>
      </article>
    </main>
  );
}

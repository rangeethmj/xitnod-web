import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandEmblem } from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center bg-architectural-grid px-6 pt-28 text-center">
      <BrandEmblem className="h-20 w-20" size={80} />
      <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-apricot-deep dark:text-apricot">
        404 · Route Not Found
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
        No active endpoint at this path.
      </h1>
      <p className="mt-3 max-w-md text-sm text-[var(--text-secondary)]">
        The page you requested may have moved or does not exist. Return to the main site to explore
        our services.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-apricot px-5 py-3 text-sm font-semibold text-midnight transition-all hover:bg-[#ffc08f] hover:shadow-apricot-glow"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to XITNOD
      </Link>
    </main>
  );
}

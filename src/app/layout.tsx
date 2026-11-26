import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ConsoleGreeting } from "@/components/ConsoleGreeting";
import { ScrollProgressBar } from "@/components/MotionPrimitives";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.seoTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.seoDescription,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  keywords: [
    "XITNOD",
    "Cloud & Infrastructure",
    "SOC & Threat Defense",
    "Web Development",
    "Applied AI & Governance",
    "Zero Trust",
    "Detection Engineering",
    "Next.js Engineering",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.seoTitle,
    description: SITE.seoDescription,
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "XITNOD | Cloud, SOC Defense, Web & Applied AI Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.seoTitle,
    description: SITE.seoDescription,
    images: ["/brand/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#11112E" },
    { media: "(prefers-color-scheme: light)", color: "#F3F3FF" },
  ],
};

const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('xitnod-theme');
    if (t === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen antialiased selection:bg-apricot selection:text-midnight">
        <div
          aria-hidden="true"
          className="bg-noise-overlay pointer-events-none fixed inset-0 z-[1] opacity-[0.016] dark:opacity-[0.026]"
        />
        <ThemeProvider>
          <ScrollProgressBar />
          <ConsoleGreeting />
          <Navbar />
          <div className="relative z-[2]">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

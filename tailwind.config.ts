import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#161638",
        "midnight-deep": "#0E0E26",
        indigo: {
          brand: "#292966",
          surface: "#1E1E4A",
        },
        dusk: "#5C5C99",
        mist: "#A3A3CC",
        periwinkle: "#CCCCFF",
        whisper: "#F3F3FF",
        apricot: {
          DEFAULT: "#FFB27A",
          warm: "#F0863B",
          deep: "#B84B0E",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "apricot-glow": "0 10px 32px -6px rgba(240, 134, 59, 0.45)",
        "card-dark": "0 20px 50px -15px rgba(7, 7, 22, 0.7)",
        "card-light": "0 14px 36px -12px rgba(22, 22, 56, 0.12), 0 2px 6px -1px rgba(22, 22, 56, 0.05)",
      },
      animation: {
        "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

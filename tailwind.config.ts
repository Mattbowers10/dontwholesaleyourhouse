import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FCF7EE",
          100: "#F5EBDC",
          200: "#EADBC4",
          300: "#DEC9A9",
          400: "#C9AE85",
        },
        umber: {
          50: "#F2EDE7",
          100: "#D9C9B8",
          200: "#A88E73",
          500: "#5C4434",
          700: "#3E2C21",
          900: "#1F1A17",
          950: "#100D0B",
        },
        terracotta: {
          50: "#FBEEE5",
          100: "#F2D0B8",
          300: "#DF9570",
          500: "#C2633F",
          600: "#A84F2E",
          700: "#813A20",
        },
        forest: {
          100: "#CFD8C8",
          500: "#2F3E2A",
          700: "#1D2919",
        },
        success: "#4A6E3A",
        warning: "#D08A2E",
        danger: "#A8412B",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        "tight-display": "-0.03em",
        "tighter-display": "-0.04em",
      },
      boxShadow: {
        warm: "0 1px 2px rgba(31, 26, 23, 0.04), 0 8px 24px -8px rgba(31, 26, 23, 0.12)",
        "warm-lg": "0 2px 4px rgba(31, 26, 23, 0.06), 0 20px 40px -12px rgba(31, 26, 23, 0.18)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.4)",
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
} satisfies Config;

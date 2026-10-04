import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    // Type scale from the classic typographic scale (Bringhurst, The Elements of
    // Typographic Style). Body is 18px, echoing the guidelines' 18pt slide minimum (§2.1).
    fontSize: {
      xs: ["14px", "20px"],
      sm: ["16px", "24px"],
      base: ["18px", "28px"],
      lg: ["21px", "30px"],
      xl: ["24px", "32px"],
      "2xl": ["36px", "42px"],
      "3xl": ["48px", "54px"],
      "4xl": ["60px", "64px"],
    },
    extend: {
      colors: {
        // From the Week 01 scenario decks (Hub prospectus, Strategic Plan) — see docs/00-overview.md
        westbridge: "#104862",
        mist: "#ECEFEE",
        growth: "#54A180", // decorative only — 3.09:1 on white, fails text contrast
        amber: "#FEC024", // backgrounds only — pair with westbridge or ink text
        // Derived shades (not in the source decks) so text pairings pass 4.5:1
        "westbridge-deep": "#0B3446",
        "growth-dark": "#2F6B52",
        ink: "#14202B",
        alert: "#A12A1F", // error / fail state
      },
      fontFamily: {
        sans: ["var(--font-arimo)", "Arial", "Helvetica", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

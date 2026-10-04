import {
  Arimo,
  Atkinson_Hyperlegible,
  Inter,
  Lexend,
  Open_Sans,
  Source_Sans_3,
} from "next/font/google";

// next/font is resolved at build time, so every font offered in the Typography
// step must be declared here. To change the list, add/remove a declaration
// below AND its entry in PRESET_FONTS (lib/fontOptions.ts). Any other Google
// Font is loaded at runtime by lib/loadGoogleFont.ts.

// Site UI font — Arimo is metrically compatible with Arial, the font used in
// the Westbridge scenario decks.
const arimo = Arimo({ subsets: ["latin"], variable: "--font-arimo", display: "swap" });

// Typography-step options — not preloaded, as most visitors only see one or two.
const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
  preload: false,
});
const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend", display: "swap", preload: false });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans", display: "swap", preload: false });
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans", display: "swap", preload: false });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });

/** Applied to <html> in app/layout.tsx so every font variable is available. */
export const fontVariables = [arimo, atkinson, lexend, openSans, sourceSans, inter]
  .map((f) => f.variable)
  .join(" ");


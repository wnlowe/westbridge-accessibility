// Fonts for the Typography step.
//
// - PRESET_FONTS are self-hosted at build time by next/font (declared in
//   lib/fonts.ts — keep the cssVar values in sync).
// - Any other Google Font comes from data/googleFonts.json (regenerate with
//   `npm run fonts:update`) and is loaded at runtime by lib/loadGoogleFont.ts.

export type FontCategory = "Sans Serif" | "Serif" | "Display" | "Handwriting" | "Monospace";

export interface BrandFont {
  family: string; // Google Fonts family name
  category: FontCategory;
}

/** Entry in data/googleFonts.json (short keys keep the file small). */
export interface CatalogueFont {
  f: string; // family
  c: FontCategory;
  w: number[]; // available upright weights
}

export interface PresetFont extends BrandFont {
  cssVar: string;
}

export const PRESET_FONTS: PresetFont[] = [
  { family: "Arimo", category: "Sans Serif", cssVar: "--font-arimo" },
  { family: "Atkinson Hyperlegible", category: "Sans Serif", cssVar: "--font-atkinson" },
  { family: "Lexend", category: "Sans Serif", cssVar: "--font-lexend" },
  { family: "Open Sans", category: "Sans Serif", cssVar: "--font-open-sans" },
  { family: "Source Sans 3", category: "Sans Serif", cssVar: "--font-source-sans" },
  { family: "Inter", category: "Sans Serif", cssVar: "--font-inter" },
];

export const DEFAULT_FONT: BrandFont = { family: PRESET_FONTS[0].family, category: PRESET_FONTS[0].category };

/** Guidelines §2.1 asks for sans-serif fonts. */
export function isSansSerif(font: BrandFont): boolean {
  return font.category === "Sans Serif";
}

const GENERIC: Record<FontCategory, string> = {
  "Sans Serif": "sans-serif",
  Serif: "serif",
  Display: "sans-serif",
  Handwriting: "cursive",
  Monospace: "monospace",
};

export function fontStack(font: BrandFont): string {
  const preset = PRESET_FONTS.find((p) => p.family === font.family);
  if (preset) return `var(${preset.cssVar}), Arial, sans-serif`;
  return `"${font.family}", ${GENERIC[font.category] ?? "sans-serif"}`;
}

/** Specimen page on fonts.google.com. */
export function googleFontsUrl(family: string): string {
  return `https://fonts.google.com/specimen/${family.replace(/ /g, "+")}`;
}

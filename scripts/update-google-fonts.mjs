// Regenerates data/googleFonts.json — the full Google Fonts catalogue used by
// the Typography step. Run with: npm run fonts:update
//
// Source: https://fonts.google.com/metadata/fonts — the public metadata the
// Google Fonts site itself uses. It needs no API key but is unofficial and
// could change; the official Developer API (googleapis.com/webfonts/v1)
// requires a key.
import { writeFileSync } from "node:fs";

const res = await fetch("https://fonts.google.com/metadata/fonts");
if (!res.ok) throw new Error(`Google Fonts metadata request failed: ${res.status}`);
const { familyMetadataList } = await res.json();

const fonts = familyMetadataList
  .filter((f) => f.subsets?.includes("latin"))
  .sort((a, b) => a.popularity - b.popularity) // 1 = most popular
  .map((f) => ({
    f: f.family,
    c: f.category, // "Sans Serif" | "Serif" | "Display" | "Handwriting" | "Monospace"
    w: Object.keys(f.fonts).filter((k) => /^\d+$/.test(k)).map(Number), // upright weights
  }));

writeFileSync(new URL("../data/googleFonts.json", import.meta.url), JSON.stringify(fonts));
console.log(`Wrote ${fonts.length} families to data/googleFonts.json`);

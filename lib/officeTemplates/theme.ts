import type { BrandState } from "@/lib/brandState";
import { contrastRatio, evaluateContrast, relativeLuminance } from "@/lib/contrast";
import { CONTRAST_THRESHOLDS, MIN_SLIDE_FONT_PT } from "@/data/standards";

// Turns a Develop Your Brand result into an Office theme (the colour and font
// scheme stored in theme1.xml of every .potx/.dotx/.xltx) plus the explicit
// colours each template uses. Every text/background combination the
// templates set up comes from an approved pairing that passes for all text.

export interface ColourPairHex {
  fg: string;
  bg: string;
}

export interface OfficeTheme {
  name: string; // brand name, used in titles and file names
  font: string; // Google Fonts family name
  // Theme colour slots. Office's default text is dk1 on lt1.
  dk1: string;
  lt1: string;
  dk2: string;
  lt2: string;
  accents: string[]; // exactly 6
  hlink: string;
  folHlink: string;
  /** Main slide colours (approved pairing that passes for all text) */
  primary: ColourPairHex;
  /** Section slides — second passing pairing, or the primary reversed (same contrast) */
  secondary: ColourPairHex;
  /** Word/Excel pages are white: colours that pass on white */
  bodyOnWhite: string;
  headingOnWhite: string;
  linkOnWhite: string;
  approvedPairs: (ColourPairHex & { fgName: string; bgName: string; ratio: number; allText: boolean })[];
  headingPt: number; // slide sizes, never below the 18pt minimum
  bodyPt: number;
}

export type ThemeResult = { ok: true; theme: OfficeTheme } | { ok: false; reason: string };

const passes = (fg: string, bg: string) => contrastRatio(fg, bg) >= CONTRAST_THRESHOLDS.normal;

function darkerFirst(a: string, b: string): [string, string] {
  return relativeLuminance(a) <= relativeLuminance(b) ? [a, b] : [b, a];
}

export function deriveOfficeTheme(state: BrandState): ThemeResult {
  const byId = new Map(state.colours.map((c) => [c.id, c]));
  const approvedPairs = state.approvedPairs.flatMap((p) => {
    const fg = byId.get(p.fg);
    const bg = byId.get(p.bg);
    if (!fg || !bg) return [];
    const r = evaluateContrast(fg.hex, bg.hex);
    return [{ fg: fg.hex, bg: bg.hex, fgName: fg.name, bgName: bg.name, ratio: r.ratio, allText: r.normal }];
  });

  const allText = approvedPairs.filter((p) => p.allText);
  if (allText.length === 0) {
    return {
      ok: false,
      reason: "Approve at least one colour pairing that passes for all text in the Colour & contrast step.",
    };
  }

  const primary = { fg: allText[0].fg, bg: allText[0].bg };
  const secondary = allText[1] ? { fg: allText[1].fg, bg: allText[1].bg } : { fg: primary.bg, bg: primary.fg };

  const [dk1, lt1] = darkerFirst(primary.fg, primary.bg);
  const [dk2, lt2] = darkerFirst(secondary.fg, secondary.bg);

  const brandHexes = Array.from(new Set(state.colours.map((c) => c.hex)));
  // Accents fill shapes and charts on the lt1 background: most distinct colours first
  const byDistinctness = [...brandHexes].sort((a, b) => contrastRatio(b, lt1) - contrastRatio(a, lt1));
  const accents = Array.from({ length: 6 }, (_, i) => byDistinctness[i % byDistinctness.length]);

  // Links must read on the theme background and on a white page
  const hlink = brandHexes.find((h) => passes(h, lt1) && passes(h, "#FFFFFF")) ?? dk1;

  // dk1 is the darker colour of a passing pair, so it always passes on white too
  const bodyOnWhite = passes(dk1, "#FFFFFF") ? dk1 : "#000000";
  const headingOnWhite = [primary.fg, primary.bg, ...brandHexes].find((h) => passes(h, "#FFFFFF")) ?? bodyOnWhite;

  return {
    ok: true,
    theme: {
      name: state.brandName.trim() || "Brand",
      font: state.font.family,
      dk1,
      lt1,
      dk2,
      lt2,
      accents,
      hlink,
      folHlink: hlink,
      primary,
      secondary,
      bodyOnWhite,
      headingOnWhite,
      linkOnWhite: hlink,
      approvedPairs,
      headingPt: Math.max(state.headingPt, MIN_SLIDE_FONT_PT),
      bodyPt: Math.max(state.bodyPt, MIN_SLIDE_FONT_PT),
    },
  };
}

const bare = (hex: string) => hex.replace("#", "").toUpperCase();
const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Replaces the colour scheme and the heading/body fonts in a theme1.xml. */
export function patchThemeXml(xml: string, t: OfficeTheme): string {
  const slot = (tag: string, hex: string) => `<a:${tag}><a:srgbClr val="${bare(hex)}"/></a:${tag}>`;
  const clrScheme =
    `<a:clrScheme name="${xmlEscape(t.name)}">` +
    slot("dk1", t.dk1) +
    slot("lt1", t.lt1) +
    slot("dk2", t.dk2) +
    slot("lt2", t.lt2) +
    t.accents.map((hex, i) => slot(`accent${i + 1}`, hex)).join("") +
    slot("hlink", t.hlink) +
    slot("folHlink", t.folHlink) +
    `</a:clrScheme>`;
  const font = xmlEscape(t.font);
  return xml
    .replace(/<a:clrScheme[\s\S]*?<\/a:clrScheme>/, clrScheme)
    .replace(/(<a:majorFont>\s*<a:latin typeface=")[^"]*"/, `$1${font}"`)
    .replace(/(<a:minorFont>\s*<a:latin typeface=")[^"]*"/, `$1${font}"`);
}

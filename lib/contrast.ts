import { CONTRAST_THRESHOLDS } from "@/data/standards";

// Colour contrast maths per WCAG 2.0 definitions:
// https://www.w3.org/TR/WCAG20/#relativeluminancedef
// https://www.w3.org/TR/WCAG20/#contrast-ratiodef

/** Accepts "#abc", "abc", "#aabbcc", "aabbcc". Returns "#AABBCC" or null if invalid. */
export function normaliseHex(input: string): string | null {
  const raw = input.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(raw)) {
    return ("#" + raw.split("").map((c) => c + c).join("")).toUpperCase();
  }
  if (/^[0-9a-fA-F]{6}$/.test(raw)) {
    return ("#" + raw).toUpperCase();
  }
  return null;
}

function channel(value: number): number {
  const s = value / 255;
  // WCAG 2.0 uses 0.03928 as the linearisation threshold
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/** Relative luminance of a normalised "#RRGGBB" colour (0 = black, 1 = white). */
export function relativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Contrast ratio between two normalised hex colours, from 1 to 21. */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
}

export interface ContrastResult {
  ratio: number;
  normal: boolean; // passes the normal-text threshold
  large: boolean; // passes the large-text threshold
}

/** Compares the unrounded ratio against the thresholds — 4.499:1 fails 4.5:1. */
export function evaluateContrast(fg: string, bg: string): ContrastResult {
  const ratio = contrastRatio(fg, bg);
  return {
    ratio,
    normal: ratio >= CONTRAST_THRESHOLDS.normal,
    large: ratio >= CONTRAST_THRESHOLDS.large,
  };
}

/** Truncates (never rounds up) to 2 dp so a failing 4.499 can't display as "4.50:1". */
export function formatRatio(ratio: number): string {
  return (Math.floor(ratio * 100) / 100).toFixed(2) + ":1";
}

export interface ContrastFix {
  hex: string;
  direction: "darker" | "lighter";
  ratio: number;
}

function mix(hex: string, toward: string, t: number): string {
  const ch = (h: string, i: number) => parseInt(h.slice(i, i + 2), 16);
  return (
    "#" +
    [1, 3, 5]
      .map((i) => Math.round(ch(hex, i) + (ch(toward, i) - ch(hex, i)) * t).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

/**
 * Nearest colour to `adjust` that reaches `target` against `fixed`, found by
 * mixing toward black or white in 1% steps (keeps the hue roughly the same).
 * Returns null if `adjust` already passes.
 */
export function suggestFix(adjust: string, fixed: string, target: number): ContrastFix | null {
  if (contrastRatio(adjust, fixed) >= target) return null;
  let best: (ContrastFix & { t: number }) | null = null;
  for (const [toward, direction] of [["#000000", "darker"], ["#FFFFFF", "lighter"]] as const) {
    for (let i = 1; i <= 100; i++) {
      const t = i / 100;
      const hex = mix(adjust, toward, t);
      const ratio = contrastRatio(hex, fixed);
      if (ratio >= target) {
        if (!best || t < best.t) best = { hex, direction, ratio, t };
        break;
      }
    }
  }
  return best && { hex: best.hex, direction: best.direction, ratio: best.ratio };
}

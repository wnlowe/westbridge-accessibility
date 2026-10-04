// Thresholds taken from the Digital Content Accessibility Guidelines (TLEU-ACC-2019-v2.4).
// If the guidelines are revised, update the values here — every tool reads from this file.

export const STANDARD_LABEL = "WCAG 2.0 AA";

/** §1.1 Technical Standards Requirements: "minimum 4.5:1 thresholds for normal text and 3:1 for large text" */
export const CONTRAST_THRESHOLDS = {
  normal: 4.5,
  large: 3,
} as const;

/** §2.1 PowerPoint Accessibility Implementation: "sans-serif options with minimum 18-point sizing" */
export const MIN_SLIDE_FONT_PT = 18;

/** The guidelines don't define "large text"; this is the WCAG 2.0 definition. */
export const LARGE_TEXT = {
  definition: "at least 18 point, or 14 point bold",
  sourceUrl: "https://www.w3.org/TR/WCAG20/#larger-scaledef",
} as const;

export const SOURCES = {
  contrast: "§1.1 Technical Standards Requirements",
  typography: "§2.1 Microsoft Office Accessibility Compliance — PowerPoint",
} as const;

# 01 — Contrast checker

## Thresholds (`data/standards.ts`)

| Constant | Value | Source |
|---|---|---|
| `CONTRAST_THRESHOLDS.normal` | 4.5 | Guidelines §1.1 |
| `CONTRAST_THRESHOLDS.large` | 3 | Guidelines §1.1 |
| `STANDARD_LABEL` | "WCAG 2.0 AA" | Guidelines §1.1 |
| `MIN_SLIDE_FONT_PT` | 18 | Guidelines §2.1 (PowerPoint) |
| `LARGE_TEXT` | 18pt / 14pt bold | WCAG 2.0 glossary — the guidelines don't define it |

Change a value here and every tool (checker, brand matrix, summary, JSON export) follows.

## Maths (`lib/contrast.ts`)
Implements the WCAG 2.0 [relative luminance](https://www.w3.org/TR/WCAG20/#relativeluminancedef) (0.03928 linearisation threshold) and [contrast ratio](https://www.w3.org/TR/WCAG20/#contrast-ratiodef) definitions.

- `normaliseHex(input)` → `"#RRGGBB"` or `null`; accepts 3/6 digits with or without `#`.
- `evaluateContrast(fg, bg)` → `{ ratio, normal, large }`, comparing the **unrounded** ratio (4.499 fails 4.5).
- `formatRatio(r)` **truncates** to 2 dp so a failing ratio never displays as "4.50:1".
- `suggestFix(adjust, fixed, target)` → nearest colour to `adjust` that reaches `target` against `fixed`, by mixing toward black or white in 1% steps (keeps the hue); `null` if it already passes. Used for the checker's "How to make this pass" panel (text or background, one-click apply) and the "Passes with text …" hint in the brand colour table. Supports §4.1 "clear correction guidance".

## Components
- `ContrastChecker` — two `ColourInput`s, swap, live preview (12pt / 18pt / 14pt bold), ratio announced via `aria-live`, `ResultBadge` per threshold. Props: `initialForeground`, `initialBackground`.
- `ColourInput` — native colour picker + hex text field. Text only commits valid hex; shows an error for invalid input; doesn't overwrite what the user is typing if it already represents the value (e.g. `#fff`).
- `ResultBadge` — ✓/✕ + "Normal text: passes/fails" text; never colour alone.

The brand Colour step (`components/brand/ColourStep.tsx`) runs the same `evaluateContrast` across every pair of brand colours. Pairs can be approved only if they pass at least the large-text threshold.

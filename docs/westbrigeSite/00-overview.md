# 00 — Overview

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), static export (`output: "export"`) |
| UI | React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 3 |
| Fonts | Google Fonts — 6 self-hosted via `next/font/google`, the full catalogue loaded at runtime from the Google Fonts CSS API |
| Hosting | GitHub Pages via GitHub Actions — see [04 — Deploy](./04-deploy.md) |

```bash
npm run dev     # http://localhost:3000
npm run build   # static site → out/
npm start       # serve out/ locally (npx serve)
npm run fonts:update  # refresh the Google Fonts catalogue
```

## Routes

| URL | Files | Purpose |
|---|---|---|
| `/` | `app/page.tsx`, `components/home/ModeCards.tsx` | Home — choose a mode |
| `/tutorial/` | `app/tutorial/` | Training lessons; final screen reveals the magic word |
| `/brand/` | `app/brand/`, `components/brand/` | Develop Your Brand — gated; Colour → Typography → Summary |
| `/reference/` | `app/reference/`, `components/reference/` | Quick Reference — search, filter, checklist, print |
| `/tools/contrast/` | `app/tools/contrast/page.tsx` | Standalone contrast checker, with fix suggestions |
| `/in-practice/` | `app/in-practice/`, `components/in-practice/` | How this site follows the guidelines — see [06](./06-in-practice-screenshots.md) |

Nav items: `NAV_ITEMS` in `components/ui/SiteHeader.tsx`.

## Where things live

| Folder | Contents |
|---|---|
| `data/` | Editable content and standards (`standards.ts`, `guidelines.ts`, `tutorial.ts`, `brandSteps.ts`, `inPractice.ts`, `sections.ts`), generated `googleFonts.json` |
| `scripts/` | `update-google-fonts.mjs` — regenerates `data/googleFonts.json` (`npm run fonts:update`) |
| `lib/` | Logic: `contrast.ts`, `fonts.ts` / `fontOptions.ts`, `loadGoogleFont.ts`, `brandState.ts`, `magicWord.ts`, `useLeaveWarning.ts`, `assetPath.ts`, `siteConfig.ts` |
| `lib/officeTemplates/` | PowerPoint/Word/Excel template generation — see [07](./07-office-templates.md) |
| `components/notes/` | `NotesProvider`/`useNotes`, `NotesToggle` (the switch under the header), `GuidelineNote` |
| `components/ui/` | `SiteHeader`, `SiteFooter`, `PageIntro`, `Stepper` |
| `components/tools/` | `ContrastChecker`, `ColourInput`, `ResultBadge` |

## Design tokens (`tailwind.config.ts`)

Source colours were read from the Week 01 Westbridge scenario decks (Learning Design Hub Prospectus, Strategic Plan presentation) by scanning the PDFs' vector colour operators; fonts from `pdffonts` (Arial, Aptos).

| Token | Hex | Origin | Use |
|---|---|---|---|
| `westbridge` | `#104862` | Both decks (dominant) | Primary — header, headings, buttons |
| `mist` | `#ECEFEE` | Both decks | Light backgrounds |
| `growth` | `#54A180` | Prospectus | **Decorative only** (3.09:1 on white) |
| `amber` | `#FEC024` | Strategic plan | Backgrounds/accents; text on westbridge (6.01:1) |
| `westbridge-deep` | `#0B3446` | Derived | Hover state |
| `growth-dark` | `#2F6B52` | Derived | Text in green (6.27:1 on white) |
| `ink` | `#14202B` | Derived | Body text |
| `alert` | `#A12A1F` | Derived | Errors / fail (7.32:1 on white) |

Fonts: site UI uses **Arimo** (`font-sans`) — Google's Arial-metric-compatible family, since Arial/Aptos aren't on Google Fonts.

## Type scale (`tailwind.config.ts`)
From the classic typographic scale (Bringhurst): `xs` 14 · `sm` 16 · `base` 18 (body) · `lg` 21 · `xl` 24 · `2xl` 36 · `3xl` 48 · `4xl` 60 px. Body at 18px echoes the guidelines' 18pt slide minimum (§2.1). Prose is capped at ~60–65 characters per line.

## Design principles
- **The site shows its working.** The "Show how this page follows the guidelines" switch and the In practice page are the signature feature; everything else stays quiet.
- **Colour has a job.** Navy = structure and type; mist = surfaces; amber = attention only (focus, current step, warnings); green = decoration/pass accents (text in `growth-dark`).
- **Weight follows importance.** One filled panel per page at most; checklists are ruled rows, not cards.
- **Plain copy.** Sentence case, no all-caps labels, no arrows on buttons, buttons name their action.
- **Every failure comes with a fix** (§4.1).

## Component classes (`app/globals.css`)
`.container-page`, `.btn`, `.btn-primary`, `.btn-on-dark` (amber, for navy panels), `.btn-secondary`, `.field`, `.fade-in` (reduced-motion safe), `.no-print` (hidden when printing), `.on-dark` (amber focus ring on dark backgrounds).

# 03 — Tutorial gate & state

## Flow
1. Home "Develop Your Brand" card offers **Start the tutorial** (`/tutorial/`) and **I have the magic word** (`/brand/`).
2. The tutorial's final Complete screen reveals the magic word. Finishing the tutorial does **not** unlock anything by itself.
3. `/brand/` always opens on `BrandGate`: the walkthrough appears only after the magic word is entered — **on every visit**.

## Magic word
`MAGIC_WORD` in `lib/siteConfig.ts` — currently `"pgdip"`. Matching is case-insensitive and ignores surrounding spaces (`checkMagicWord` in `lib/magicWord.ts`).

This is a **soft, client-side gate** — the word is in the static JS bundle. Fine as a training nudge; not access control.

## State — in memory only
Nothing is written to localStorage, sessionStorage or cookies. All state is plain React state and is lost when the visitor leaves or reloads the page:

| Page | State | Where |
|---|---|---|
| `/tutorial/` | current lesson, furthest lesson reached | `TutorialClient` |
| `/brand/` | unlocked flag, `BrandState` (colours, approved pairs, font, sizes, brand name), current step | `BrandClient` |
| `/reference/` | ticked guideline ids, search, filter | `ReferenceClient` |

Visitors keep their work by printing / saving the Summary as PDF or downloading the JSON.

## Leave warning
Once the brand differs from the starting state, `useLeaveWarning` (`lib/useLeaveWarning.ts`) asks for confirmation before the visitor reloads, closes the tab, or clicks a link to another page. In-page anchors (e.g. the skip link) and new-tab links are not interrupted.

The "Show how this page follows the guidelines" switch is also in-memory: it stays on while moving between pages, and resets on reload.

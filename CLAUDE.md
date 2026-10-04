# CLAUDE.md — Westbridge Accessibility

Full documentation lives in [`docs/westbrigeSite/`](./docs/westbrigeSite/):

| Doc | Contents |
|---|---|
| [00 — Overview](./docs/westbrigeSite/00-overview.md) | Stack, routes, design tokens, where things live |
| [01 — Contrast checker](./docs/westbrigeSite/01-contrast-checker.md) | Contrast maths, thresholds, ColourInput behaviour |
| [02 — Content data](./docs/westbrigeSite/02-content-data.md) | Filling in tutorial lessons, guidelines, brand-step copy |
| [03 — Tutorial gate & state](./docs/westbrigeSite/03-tutorial-gate.md) | Magic word, in-memory state (no browser storage) |
| [04 — Deploy](./docs/westbrigeSite/04-deploy.md) | Local dev, static export, GitHub Pages setup |
| [05 — Building the tutorial](./docs/westbrigeSite/05-building-the-tutorial.md) | How to write and preview tutorial lessons |
| [06 — In practice & screenshots](./docs/westbrigeSite/06-in-practice-screenshots.md) | In practice page, the notes switch, adding screenshots |
| [07 — Office templates](./docs/westbrigeSite/07-office-templates.md) | PowerPoint/Word/Excel templates from Develop Your Brand |

---

## Documentation hygiene

Whenever you make a change to the codebase, check whether any file in [`docs/westbrigeSite/`](./docs/westbrigeSite/) or this `CLAUDE.md` describes the thing you changed. If it does, update that documentation in the same response before reporting the task complete.

---

## What this is
A Next.js 15 (App Router) static site presenting Westbridge University's **Digital Content Accessibility Guidelines** (TLEU-ACC-2019-v2.4) — a fictional university from a PGDip case study. Two modes: **Develop Your Brand** (tutorial-gated guided walkthrough) and **Quick Reference** (searchable checklist + tools). Deployed to GitHub Pages via static export.

Structure mirrors `C:\Users\willi\Documents\_Code\Website` (same stack, page.tsx + *Client.tsx split, `components/` `data/` `lib/` layout), minus Cloudflare/OpenNext.

## Stack
- **Framework:** Next.js 15 (`output: "export"`), React 19, TypeScript 5 strict
- **Styling:** Tailwind CSS 3 — tokens in `tailwind.config.ts`
- **Fonts:** Google Fonts — presets self-hosted via `next/font/google` (`lib/fonts.ts`); full catalogue (`data/googleFonts.json`) loaded at runtime (`lib/loadGoogleFont.ts`)

## Rules
- Every text/background pairing used in the UI must pass 4.5:1. The site is an accessibility resource — it must model the guidance.
- Contrast thresholds come only from `data/standards.ts`. Never hard-code 4.5 / 3 elsewhere.
- Guidance must be faithful to the source document (TLEU-ACC-2019-v2.4): the Quick Reference (`data/guidelines.ts`) and the Office template guidance (`lib/officeTemplates/guidance.ts`) paraphrase it section by section — never add requirements it doesn't contain. Tutorial lessons mix the user's own copy with lessons drafted from the guidelines; keep drafted lessons and quizzes faithful to the section in `sectionRef` and on topic for the lesson title, and don't rewrite the user's own paragraphs. Quiz questions test only the lesson's own text — never legislation or other background the lesson doesn't teach.
- **Voice for learner-facing text** (tutorial lessons, Quick Reference, notes): match the user's own lessons in `data/tutorial.ts` (lessons 1 and 9) — warm, plain English, "learners" and "your course", practical steps (where to click, what to check), pointers to the learning hub and this site's tools. Don't write "the guidelines say…" or use jargon (semantic markup, executive function, scaffolding); the `section` / `sectionRef` field already links back to the document.
- Office templates (`lib/officeTemplates/`) are generated in the browser; see `docs/westbrigeSite/07-office-templates.md`.
- Pass/fail is always shown with text/icon, never colour alone.
- When adding a feature that applies a guideline, add/update its entry in `data/inPractice.ts` and place a `<GuidelineNote id="…" />` after the element.
- Follow the design principles in `docs/westbrigeSite/00-overview.md` (no all-caps labels, no arrows on buttons, sentence case, one filled panel per page).
- **No browser storage.** Nothing is saved to localStorage/sessionStorage/cookies; all state is in-memory React state. The magic word is required on every visit to `/brand/`.

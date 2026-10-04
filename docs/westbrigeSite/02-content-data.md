# 02 — Content data

Edit these files to change content — no component changes needed. Tutorial lessons and the Quick Reference guidelines are written from the source document (TLEU-ACC-2019-v2.4) and should stay faithful to it.

## Tutorial lessons — `data/tutorial.ts`
```ts
{
  id: "colour-contrast",          // unique
  title: "Colour and contrast",
  body: ["Paragraph one.", "Paragraph two."],  // each string → one <p>
  sectionRef: "§1.1",             // optional, shown above the title
}
```
Optional `quiz` (choose-all-that-apply questions that must be answered correctly to move on) and `minutes` fields are covered in 05. Order in the array = lesson order. A "Complete" screen (with the magic word) is added automatically after the last lesson. See [05 — Building the tutorial](./05-building-the-tutorial.md) for a step-by-step guide.

## Quick Reference guidelines — `data/guidelines.ts`
```ts
{
  id: "colour-contrast",          // unique — used as the React key and checklist tick id
  title: "Colour contrast",
  summary: "One or two sentences.",
  detail: "Optional longer text.",
  contentTypes: ["general", "powerpoint"],   // drives the filter chips
  section: "§1.1",                // source section in TLEU-ACC-2019-v2.4
  tools: ["contrast"],            // optional — adds a link to the tool
}
```
Content types: `general`, `word`, `powerpoint`, `excel`, `pdf`, `video`, `audio`, `assessment`, `interactive`. Labels are in `CONTENT_TYPE_LABELS`. Search covers title, summary and detail.

## Brand steps — `data/brandSteps.ts`
- `brandSteps[].intro` — intro sentence per step.
- `BRAND_COLOURS` — `default: 3`, `min: 2`, `max: 6`.

## Starter palette — `lib/brandState.ts`
`STARTER_COLOURS` (Westbridge primary, background, accent) seeds the Colour step.

## Typography options
The Typography step (`components/brand/FontPicker.tsx`) offers:
- **Recommended** — `PRESET_FONTS` in `lib/fontOptions.ts`, self-hosted at build time by `lib/fonts.ts`. To add one: declare it with `next/font/google` in `lib/fonts.ts` (with a `variable` and `preload: false`), add it to `fontVariables`, then add `{ family, category, cssVar }` to `PRESET_FONTS`.
- **All Google Fonts** — every Latin-subset family in `data/googleFonts.json` (~1,800), searchable and filterable by category. Picking one adds a stylesheet from `fonts.googleapis.com` (`lib/loadGoogleFont.ts`), so the visitor's browser contacts Google. The CSP in `app/layout.tsx` allows `fonts.googleapis.com` and `fonts.gstatic.com` for this.
- Any font whose category isn't **Sans Serif** shows a warning (Guidelines §2.1), on the Typography step and the Summary sheet. It can still be chosen.

`data/googleFonts.json` is generated — don't hand-edit. Refresh with `npm run fonts:update`, which reads `https://fonts.google.com/metadata/fonts` (the public metadata the Google Fonts site uses; no API key, but unofficial and could change).

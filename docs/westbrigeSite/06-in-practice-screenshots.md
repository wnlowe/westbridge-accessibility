# 06 — "In practice" page and screenshots

The **In practice** page (`/in-practice/`) shows where this site applies the guidelines. The **"Show how this page follows the guidelines"** switch (under the header on every page) shows short versions of the same notes next to the parts they describe.

Both come from one file: **`data/inPractice.ts`**.

## How an entry works
```ts
{
  id: "header-contrast",          // kebab-case; the page anchor (/in-practice/#header-contrast) and the screenshot name
  title: "Header and banner contrast",
  section: "§1.1",                // guidelines section — controls which group it appears in
  note: "White text on Westbridge navy.",   // one sentence for the on-page switch
  description: "Fuller explanation for the In practice page.",
  contrast: { fg: "#FFFFFF", bg: "#104862", label: "White on Westbridge navy" },  // optional — ratio is measured, never typed
  where: { label: "Home page banner", href: "/" },   // "See it on the site" link
  screenshot: {                   // optional — see below
    src: "/in-practice/header-contrast.png",
    alt: "Home page banner: white heading on dark navy, with the contrast note switched on.",
    caption: "The banner with ‘Show how this page follows the guidelines’ switched on.",
  },
},
```
- Entries are grouped by the first number of `section` (§1, §2, §3, §4), in array order within each group.
- To show a note on a page, put `<GuidelineNote id="your-id" />` directly after the element it describes (import from `@/components/notes/GuidelineNote`). It renders nothing while the switch is off.

## Adding a screenshot

### 1. Capture it
1. Run the site: `npm run dev`, open http://localhost:3000.
2. Go to the page in the entry's `where` link. Switch on **Show how this page follows the guidelines** if you want the note visible in the shot.
3. Set the browser window to roughly 1280px wide so screenshots are consistent.
4. Press **Windows + Shift + S** (Snipping Tool) and drag around just the area that shows the guideline, plus a little context. Crop tight; one idea per screenshot.

### 2. Save it
- Save as **PNG** into **`public/in-practice/`**.
- Name it after the entry `id`, e.g. `public/in-practice/header-contrast.png`.
- Aim for under ~300 KB. If it's bigger, re-save as WebP (`.webp`) or reduce the width to ~1600px.

### 3. Link it
Add a `screenshot` object to the entry in `data/inPractice.ts`:
```ts
screenshot: {
  src: "/in-practice/header-contrast.png",   // path from public/, starting with "/"
  alt: "…",
  caption: "…",                               // optional
},
```
Don't add the GitHub Pages base path yourself; `lib/assetPath.ts` does it.

### 4. Write the alt text (required)
Alt text is itself one of the guidelines (§1.1, §2.1), so this page has to get it right:
- Say **what the screenshot shows and why it matters**, not "screenshot of…". Example: *"Contrast checker failing a pale green on white, with a suggested darker green and a ‘Use #448268 for text’ button."*
- Include any text in the image that matters to the point being made.
- Keep it to one or two sentences. Put extra explanation in `caption` or `description`, where everyone can read it.

### 5. Check it
- `npm run dev` → `/in-practice/`. Entries without a screenshot show a dashed **"Screenshot slot"** box **only in development**; the live site shows nothing there.
- `npm run build` before committing.

## Writing notes
- `note` is one plain sentence about what the visitor can see on that page. Don't repeat the section number or the ratio, because they're added automatically.
- Only describe what the site really does. If a feature changes, update its entry.

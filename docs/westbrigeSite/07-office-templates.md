# 07 — Office templates

The Develop Your Brand **Summary** step offers three downloads, generated entirely in the browser (no server):

| Template | File | Contents |
|---|---|---|
| PowerPoint | `.potx` | Title, Title and content, and Section header layouts with title placeholders; a guidance slide |
| Word | `.dotx` | Title and Heading 1–3 styles in the brand font/colour; guidance; a table of approved pairings with a repeating header row |
| Excel | `.xltx` | "Read me" guidance sheet; "Data" sheet with an Excel table (header row, frozen); "Brand colours" table; brand font as the default |

Guidance text in each template is in `lib/officeTemplates/guidance.ts` and paraphrases the guidelines' §2.1 (Word, PowerPoint, Excel). Keep it faithful to the document.

## How it works (`lib/officeTemplates/`)
1. `theme.ts` — `deriveOfficeTheme(brand)` turns the brand into an Office theme. Needs **at least one approved pairing that passes for all text**, otherwise the downloads are replaced by a message.
   - Primary pairing (first all-text pass) = slide background/text; its darker/lighter colours become theme `dk1`/`lt1` (Office's default text-on-background).
   - Second all-text pairing (or the primary reversed) = section slides and `dk2`/`lt2`.
   - Accents 1–6 = brand colours, most distinct from the background first.
   - Hyperlink colour = a brand colour passing 4.5:1 on both `lt1` and white.
   - Word/Excel pages are white, so heading/body colours are chosen to pass on white.
   - Slide sizes below 18pt are raised to 18pt (§2.1).
2. `powerpoint.ts` / `word.ts` / `excel.ts` build a normal file with PptxGenJS, `docx` and ExcelJS. Each library loads only when its button is pressed.
3. `package.ts` — `toTemplate()` opens the file with JSZip, writes the brand into `theme1.xml` (colour scheme + heading/body fonts), and changes the main content type from document to template — the only structural difference between e.g. `.pptx` and `.potx` (Office Open XML, ECMA-376).
4. `kinds.ts` holds the per-format paths/content types (kept apart from JSZip so the page bundle stays small).

`next.config.ts` has a small webpack tweak: PptxGenJS references Node built-ins (`node:https`, `node:fs`) that it only uses in Node; they're stubbed out for the browser.

## Fonts
Templates name the brand font but can't include the font file. If it isn't installed, Office substitutes another. The Summary step links to the font's Google Fonts page.

## Verified
Generated files were opened with Word, PowerPoint and Excel (desktop, via automation) without repair prompts: correct theme fonts, layouts, heading styles, repeating table header rows and Excel tables with header rows.

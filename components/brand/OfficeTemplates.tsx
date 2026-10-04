"use client";

import { useState } from "react";
import type { BrandState } from "@/lib/brandState";
import { deriveOfficeTheme, type OfficeTheme } from "@/lib/officeTemplates/theme";
import { KINDS } from "@/lib/officeTemplates/kinds";
import { googleFontsUrl, PRESET_FONTS } from "@/lib/fontOptions";
import { MIN_SLIDE_FONT_PT } from "@/data/standards";
import { saveFile, slugify } from "@/lib/download";

type Kind = keyof typeof KINDS;

const TEMPLATES: { kind: Kind; label: string; file: string; what: string }[] = [
  {
    kind: "powerpoint",
    label: "PowerPoint template",
    file: "presentation-template",
    what: "Title, content and section slide layouts in your colours, with slide title placeholders.",
  },
  {
    kind: "word",
    label: "Word template",
    file: "document-template",
    what: "Title and heading styles in your colours and font, and an example table with a header row.",
  },
  {
    kind: "excel",
    label: "Excel template",
    file: "spreadsheet-template",
    what: "Named sheets, a data table with a header row, and your approved colour pairings.",
  },
];

// Builders (and their libraries) only download when a button is pressed
const BUILDERS: Record<Kind, () => Promise<(t: OfficeTheme) => Promise<Uint8Array>>> = {
  powerpoint: () => import("@/lib/officeTemplates/powerpoint").then((m) => m.buildPowerPointTemplate),
  word: () => import("@/lib/officeTemplates/word").then((m) => m.buildWordTemplate),
  excel: () => import("@/lib/officeTemplates/excel").then((m) => m.buildExcelTemplate),
};

export default function OfficeTemplates({ state }: { state: BrandState }) {
  const [status, setStatus] = useState<{ kind: Kind; state: "working" | "done" | "error" } | null>(null);
  const result = deriveOfficeTheme(state);
  const isPreset = PRESET_FONTS.some((p) => p.family === state.font.family);
  const raised = state.headingPt < MIN_SLIDE_FONT_PT || state.bodyPt < MIN_SLIDE_FONT_PT;

  const download = async (kind: Kind, file: string) => {
    if (!result.ok) return;
    setStatus({ kind, state: "working" });
    try {
      const build = await BUILDERS[kind]();
      const data = await build(result.theme);
      saveFile(data, `${slugify(state.brandName)}-${file}.${KINDS[kind].extension}`, KINDS[kind].mimeType);
      setStatus({ kind, state: "done" });
    } catch (err) {
      console.error(err);
      setStatus({ kind, state: "error" });
    }
  };

  const label = (kind: Kind) => TEMPLATES.find((t) => t.kind === kind)!.label;

  return (
    <section aria-labelledby="office-heading" className="no-print">
      <h3 id="office-heading" className="text-xl font-bold text-westbridge">
        Office templates
      </h3>
      <p className="mt-1 max-w-[60ch]">
        Start new documents with your brand already set up. Each template includes guidance from the guidelines&rsquo;
        section on Microsoft Office (§2.1).
      </p>

      {!result.ok ? (
        <p className="mt-4 rounded-md border-2 border-amber bg-amber/20 p-4">{result.reason}</p>
      ) : (
        <>
          <ul className="mt-4 divide-y divide-ink/15 border-y border-ink/15">
            {TEMPLATES.map((t) => {
              const working = status?.kind === t.kind && status.state === "working";
              return (
                <li key={t.kind} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div className="max-w-[52ch]">
                    <p className="font-bold">
                      {t.label} <span className="font-normal">(.{KINDS[t.kind].extension})</span>
                    </p>
                    <p className="text-sm">{t.what}</p>
                  </div>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => download(t.kind, t.file)}
                    disabled={status?.state === "working"}
                  >
                    {working ? "Creating…" : `Download ${t.label}`}
                  </button>
                </li>
              );
            })}
          </ul>

          <p aria-live="polite" className="mt-3 min-h-[1.75rem]">
            {status?.state === "done" && <>Your {label(status.kind)} has downloaded. Open it to start a new file in your brand.</>}
            {status?.state === "error" && (
              <span className="font-bold text-alert">
                The {label(status.kind)} couldn&rsquo;t be created. Try again, or use a different browser.
              </span>
            )}
          </p>

          <div className="mt-2 max-w-[65ch] space-y-2 text-sm">
            <p>
              <span className="font-bold">About the font:</span> templates name {state.font.family}, but don&rsquo;t
              include the font file. If it isn&rsquo;t installed on a computer, Office uses a substitute.{" "}
              <a href={googleFontsUrl(state.font.family)} target="_blank" rel="noreferrer" className="text-westbridge underline">
                Get {state.font.family} from Google Fonts (opens in a new tab)
              </a>
              {isPreset && state.font.family === "Arimo" && <> or rely on Arial, which Arimo matches.</>}
            </p>
            {raised && <p>Slide text sizes below {MIN_SLIDE_FONT_PT}pt have been raised to {MIN_SLIDE_FONT_PT}pt in the PowerPoint template.</p>}
          </div>
        </>
      )}
    </section>
  );
}

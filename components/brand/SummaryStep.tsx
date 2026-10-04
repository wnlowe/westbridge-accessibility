"use client";

import { CONTRAST_THRESHOLDS, MIN_SLIDE_FONT_PT, STANDARD_LABEL } from "@/data/standards";
import { evaluateContrast, formatRatio } from "@/lib/contrast";
import { fontStack, isSansSerif } from "@/lib/fontOptions";
import { BrandState } from "@/lib/brandState";
import { DOC_REF } from "@/lib/siteConfig";
import GuidelineNote from "@/components/notes/GuidelineNote";
import OfficeTemplates from "@/components/brand/OfficeTemplates";
import { saveFile, slugify } from "@/lib/download";

interface Props {
  state: BrandState;
  update: (fn: (s: BrandState) => BrandState) => void;
  onReset: () => void;
}

function downloadJson(state: BrandState) {
  const font = state.font;
  const byId = new Map(state.colours.map((c) => [c.id, c]));
  const data = {
    brandName: state.brandName,
    standard: { label: STANDARD_LABEL, thresholds: CONTRAST_THRESHOLDS, source: DOC_REF },
    colours: state.colours.map(({ name, hex }) => ({ name, hex })),
    approvedPairs: state.approvedPairs.flatMap((p) => {
      const fg = byId.get(p.fg);
      const bg = byId.get(p.bg);
      if (!fg || !bg) return [];
      const r = evaluateContrast(fg.hex, bg.hex);
      return [{ text: fg.hex, background: bg.hex, ratio: Number(r.ratio.toFixed(2)), normalText: r.normal, largeText: r.large }];
    }),
    typography: { font: font.family, category: font.category, headingPt: state.headingPt, bodyPt: state.bodyPt },
  };
  saveFile(JSON.stringify(data, null, 2), `${slugify(state.brandName)}-accessible-brand.json`, "application/json");
}

export default function SummaryStep({ state, update, onReset }: Props) {
  const font = state.font;
  const byId = new Map(state.colours.map((c) => [c.id, c]));

  return (
    <div className="space-y-8">
      <div className="no-print max-w-md">
        <label htmlFor="brand-name" className="font-bold">
          Brand or module name
        </label>
        <input
          id="brand-name"
          type="text"
          value={state.brandName}
          onChange={(e) => update((s) => ({ ...s, brandName: e.target.value }))}
          placeholder="e.g. School of Creative Arts"
          className="field mt-1 w-full"
        />
      </div>

      <article className="rounded-lg border-2 border-westbridge/20 bg-white p-6">
        <h3 className="text-2xl font-bold text-westbridge">{state.brandName || "Your brand"}: accessible brand sheet</h3>

        <h4 className="mt-6 text-lg font-bold">Colours</h4>
        <ul className="mt-2 flex flex-wrap gap-4">
          {state.colours.map((c) => (
            <li key={c.id} className="w-32">
              <div className="h-16 rounded-md border border-ink/20" style={{ backgroundColor: c.hex }} aria-hidden="true" />
              <p className="mt-1 font-bold">{c.name}</p>
              <p className="font-mono text-sm">{c.hex}</p>
            </li>
          ))}
        </ul>

        <h4 className="mt-6 text-lg font-bold">Approved pairings</h4>
        {state.approvedPairs.length === 0 ? (
          <p className="mt-2">No pairings approved yet. Go back to Colour &amp; contrast to approve some.</p>
        ) : (
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr className="border-b-2 border-ink/20">
                  <th scope="col" className="py-2 pr-3">Sample</th>
                  <th scope="col" className="py-2 pr-3">Text</th>
                  <th scope="col" className="py-2 pr-3">Background</th>
                  <th scope="col" className="py-2 pr-3">Ratio</th>
                  <th scope="col" className="py-2">Use for</th>
                </tr>
              </thead>
              <tbody>
                {state.approvedPairs.map((p) => {
                  const fg = byId.get(p.fg);
                  const bg = byId.get(p.bg);
                  if (!fg || !bg) return null;
                  const r = evaluateContrast(fg.hex, bg.hex);
                  return (
                    <tr key={`${p.fg}-${p.bg}`} className="border-b border-ink/10">
                      <td className="py-2 pr-3">
                        <span
                          className="inline-block rounded px-3 py-1 font-bold"
                          style={{ color: fg.hex, backgroundColor: bg.hex, fontFamily: fontStack(font) }}
                          aria-hidden="true"
                        >
                          Aa
                        </span>
                      </td>
                      <td className="py-2 pr-3">
                        {fg.name} <span className="font-mono">{fg.hex}</span>
                      </td>
                      <td className="py-2 pr-3">
                        {bg.name} <span className="font-mono">{bg.hex}</span>
                      </td>
                      <td className="py-2 pr-3 font-mono">{formatRatio(r.ratio)}</td>
                      <td className="py-2">{r.normal ? "All text" : "Large text only"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <h4 className="mt-6 text-lg font-bold">Typography</h4>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          <dt className="font-bold">Typeface</dt>
          <dd style={{ fontFamily: fontStack(font) }}>
            {font.family} (Google Fonts, {font.category.toLowerCase()})
            {!isSansSerif(font) && ". Not sans-serif, so it doesn’t meet §2.1"}
          </dd>
          <dt className="font-bold">Slide headings</dt>
          <dd>
            {state.headingPt}pt{state.headingPt < MIN_SLIDE_FONT_PT && " (below the 18pt minimum)"}
          </dd>
          <dt className="font-bold">Slide body text</dt>
          <dd>
            {state.bodyPt}pt{state.bodyPt < MIN_SLIDE_FONT_PT && " (below the 18pt minimum)"}
          </dd>
        </dl>

        <p className="mt-6 text-sm">
          Checked against {STANDARD_LABEL} ({CONTRAST_THRESHOLDS.normal}:1 normal text, {CONTRAST_THRESHOLDS.large}:1 large
          text) as set out in Westbridge&rsquo;s Digital Content Accessibility Guidelines, ref. {DOC_REF}.
        </p>
      </article>

      <div className="no-print flex flex-wrap gap-3">
        <button type="button" className="btn-primary" onClick={() => window.print()}>
          Print or save as PDF
        </button>
        <button type="button" className="btn-secondary" onClick={() => downloadJson(state)}>
          Download brand data (JSON)
        </button>
        <button
          type="button"
          className="btn text-alert underline"
          onClick={() => {
            if (window.confirm("Clear your colours, pairings and type choices and start again?")) onReset();
          }}
        >
          Start over
        </button>
      </div>
      <GuidelineNote id="alternative-formats" />

      <OfficeTemplates state={state} />
      <GuidelineNote id="office-templates" />
    </div>
  );
}

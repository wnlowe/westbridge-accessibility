"use client";

import ColourInput from "@/components/tools/ColourInput";
import { BRAND_COLOURS } from "@/data/brandSteps";
import { CONTRAST_THRESHOLDS, SOURCES } from "@/data/standards";
import { evaluateContrast, formatRatio, suggestFix } from "@/lib/contrast";
import GuidelineNote from "@/components/notes/GuidelineNote";
import { BrandState, isPairApproved, newColourId } from "@/lib/brandState";

interface Props {
  state: BrandState;
  update: (fn: (s: BrandState) => BrandState) => void;
}

export default function ColourStep({ state, update }: Props) {
  const { colours, approvedPairs } = state;
  const atMax = colours.length >= BRAND_COLOURS.max;
  const atMin = colours.length <= BRAND_COLOURS.min;

  const setColour = (id: string, patch: { name?: string; hex?: string }) =>
    update((s) => ({ ...s, colours: s.colours.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));

  const addColour = () =>
    update((s) => ({
      ...s,
      colours: [...s.colours, { id: newColourId(s.colours), name: `Colour ${s.colours.length + 1}`, hex: "#FFFFFF" }],
    }));

  const removeColour = (id: string) =>
    update((s) => ({
      ...s,
      colours: s.colours.filter((c) => c.id !== id),
      approvedPairs: s.approvedPairs.filter((p) => p.fg !== id && p.bg !== id),
    }));

  const togglePair = (fg: string, bg: string) =>
    update((s) => ({
      ...s,
      approvedPairs: isPairApproved(s.approvedPairs, fg, bg)
        ? s.approvedPairs.filter((p) => !(p.fg === fg && p.bg === bg))
        : [...s.approvedPairs, { fg, bg }],
    }));

  return (
    <div className="space-y-10">
      <section aria-labelledby="palette-heading">
        <h3 id="palette-heading" className="text-xl font-bold text-westbridge">
          Your brand colours
        </h3>
        <p className="mt-1 text-sm">
          {colours.length} of {BRAND_COLOURS.max} colours. Most brands need {BRAND_COLOURS.default}; add more if you need them.
        </p>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colours.map((c, i) => (
            <li key={c.id} className="rounded-lg border-2 border-ink/10 bg-white p-4">
              <div className="mb-3 h-10 rounded-md border border-ink/20" style={{ backgroundColor: c.hex }} aria-hidden="true" />
              <label htmlFor={`name-${c.id}`} className="font-bold">
                Name
              </label>
              <input
                id={`name-${c.id}`}
                type="text"
                value={c.name}
                onChange={(e) => setColour(c.id, { name: e.target.value })}
                className="field mb-3 mt-1 w-full"
              />
              <ColourInput label={`${c.name || `Colour ${i + 1}`} value`} value={c.hex} onChange={(hex) => setColour(c.id, { hex })} />
              <button
                type="button"
                className="mt-3 text-sm text-alert underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
                onClick={() => removeColour(c.id)}
                disabled={atMin}
              >
                Remove <span className="sr-only">{c.name || `colour ${i + 1}`}</span>
              </button>
            </li>
          ))}
        </ul>

        <button type="button" className="btn-secondary mt-4" onClick={addColour} disabled={atMax}>
          Add a colour
        </button>
        {atMax && <p className="mt-2 text-sm">You&rsquo;ve reached the maximum of {BRAND_COLOURS.max} colours.</p>}
      </section>

      <section aria-labelledby="pairs-heading">
        <h3 id="pairs-heading" className="text-xl font-bold text-westbridge">
          Check your pairings
        </h3>
        <p className="mt-1 max-w-3xl text-sm">
          Each cell shows one colour as text on another as its background. Text needs {CONTRAST_THRESHOLDS.normal}:1, or{" "}
          {CONTRAST_THRESHOLDS.large}:1 if it&rsquo;s large (Guidelines {SOURCES.contrast}). Approve the pairings you
          want in your brand.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="border-separate border-spacing-1 text-sm">
            <caption className="sr-only">Contrast of every text and background combination</caption>
            <thead>
              <tr>
                <td />
                {colours.map((bg) => (
                  <th key={bg.id} scope="col" className="px-2 pb-1 text-left font-bold">
                    <span className="sr-only">Background: </span>
                    {bg.name || bg.hex}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colours.map((fg) => (
                <tr key={fg.id}>
                  <th scope="row" className="whitespace-nowrap pr-2 text-left font-bold">
                    <span className="sr-only">Text: </span>
                    {fg.name || fg.hex}
                  </th>
                  {colours.map((bg) => {
                    if (fg.id === bg.id) {
                      return (
                        <td key={bg.id} className="min-w-[8.5rem] rounded-md bg-mist/60 text-center text-ink/70">
                          <span aria-hidden="true">—</span>
                          <span className="sr-only">Same colour</span>
                        </td>
                      );
                    }
                    const r = evaluateContrast(fg.hex, bg.hex);
                    const approved = isPairApproved(approvedPairs, fg.id, bg.id);
                    const verdict = r.normal ? "Passes for all text" : r.large ? "Large text only" : "Fails";
                    const fix = r.normal ? null : suggestFix(fg.hex, bg.hex, CONTRAST_THRESHOLDS.normal);
                    return (
                      <td key={bg.id} className="min-w-[8.5rem] rounded-md border-2 border-ink/10 bg-white p-2 align-top">
                        <div
                          className="flex h-12 items-center justify-center rounded text-lg font-bold"
                          style={{ color: fg.hex, backgroundColor: bg.hex }}
                          aria-hidden="true"
                        >
                          Aa
                        </div>
                        <p className="mt-1 font-mono font-bold">{formatRatio(r.ratio)}</p>
                        <p className={r.large ? "text-growth-dark" : "text-alert"}>
                          <span aria-hidden="true">{r.normal ? "✓ " : r.large ? "◐ " : "✕ "}</span>
                          {verdict}
                        </p>
                        {fix && (
                          <p className="text-xs">
                            Passes with text <span className="font-mono">{fix.hex}</span>
                          </p>
                        )}
                        <button
                          type="button"
                          aria-pressed={approved}
                          disabled={!r.large}
                          onClick={() => togglePair(fg.id, bg.id)}
                          className={`mt-1 w-full rounded border-2 px-2 py-1 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40 ${
                            approved ? "border-westbridge bg-westbridge text-white" : "border-westbridge bg-white text-westbridge"
                          }`}
                        >
                          {approved ? "✓ Approved" : "Approve"}
                          <span className="sr-only">
                            {" "}
                            {fg.name} text on {bg.name}
                          </span>
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm" aria-live="polite">
          {approvedPairs.length} pairing{approvedPairs.length === 1 ? "" : "s"} approved.
        </p>
        <div className="mt-4 space-y-2">
          <GuidelineNote id="not-colour-alone" />
          <GuidelineNote id="error-guidance" />
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import ColourInput from "@/components/tools/ColourInput";
import ResultBadge from "@/components/tools/ResultBadge";
import GuidelineNote from "@/components/notes/GuidelineNote";
import { evaluateContrast, formatRatio, suggestFix } from "@/lib/contrast";
import { CONTRAST_THRESHOLDS, LARGE_TEXT, SOURCES, STANDARD_LABEL } from "@/data/standards";

interface Props {
  initialForeground?: string;
  initialBackground?: string;
}

export default function ContrastChecker({ initialForeground = "#104862", initialBackground = "#FFFFFF" }: Props) {
  const [fg, setFg] = useState(initialForeground);
  const [bg, setBg] = useState(initialBackground);
  const result = evaluateContrast(fg, bg);

  // §4.1: errors should come with clear correction guidance
  const textFix = suggestFix(fg, bg, CONTRAST_THRESHOLDS.normal);
  const backgroundFix = suggestFix(bg, fg, CONTRAST_THRESHOLDS.normal);

  return (
    <section aria-labelledby="checker-heading">
      <h2 id="checker-heading" className="sr-only">
        Check a colour pairing
      </h2>
      <p className="max-w-[60ch]">
        Tests against {STANDARD_LABEL}: {CONTRAST_THRESHOLDS.normal}:1 for normal text and {CONTRAST_THRESHOLDS.large}:1
        for large text (guidelines {SOURCES.contrast}).
      </p>

      <div className="mt-6 flex flex-wrap items-end gap-4">
        <ColourInput label="Text colour" value={fg} onChange={setFg} />
        <button
          type="button"
          className="btn-secondary h-11"
          onClick={() => {
            setFg(bg);
            setBg(fg);
          }}
        >
          Swap colours
        </button>
        <ColourInput label="Background colour" value={bg} onChange={setBg} />
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[3fr_2fr]">
        <div
          className="rounded-md border border-ink/20 p-6"
          style={{ color: fg, backgroundColor: bg }}
          aria-label="Preview of the text and background colours"
          role="img"
        >
          <p style={{ fontSize: "12pt" }}>Normal text at 12pt</p>
          <p style={{ fontSize: "18pt" }} className="mt-3">
            Large text at 18pt
          </p>
          <p style={{ fontSize: "14pt" }} className="mt-2 font-bold">
            Large bold text at 14pt
          </p>
        </div>

        <div>
          <p className="font-bold">Contrast ratio</p>
          <p className="text-3xl font-bold text-westbridge" aria-live="polite" aria-atomic="true">
            <span className="sr-only">Contrast ratio </span>
            {formatRatio(result.ratio)}
            <span className="sr-only">
              . Normal text {result.normal ? "passes" : "fails"}. Large text {result.large ? "passes" : "fails"}.
            </span>
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <ResultBadge pass={result.normal} label="Normal text" threshold={CONTRAST_THRESHOLDS.normal} />
            <ResultBadge pass={result.large} label="Large text" threshold={CONTRAST_THRESHOLDS.large} />
          </div>
          <p className="mt-3 text-sm">
            Large text means {LARGE_TEXT.definition} (
            <a href={LARGE_TEXT.sourceUrl} className="text-westbridge underline" target="_blank" rel="noreferrer">
              WCAG 2.0 definition of large text
            </a>
            ).
          </p>
        </div>
      </div>

      {!result.normal && (textFix || backgroundFix) && (
        <div className="mt-8 border-l-4 border-westbridge bg-mist p-5">
          <h3 className="text-lg font-bold text-westbridge">How to make this pass for all text</h3>
          <ul className="mt-3 space-y-3">
            {textFix && (
              <li className="flex flex-wrap items-center gap-3">
                <span className="inline-block h-7 w-7 rounded border border-ink/30" style={{ backgroundColor: textFix.hex }} aria-hidden="true" />
                <span>
                  Make the text {textFix.direction}: <span className="font-mono">{textFix.hex}</span> gives{" "}
                  {formatRatio(textFix.ratio)}.
                </span>
                <button type="button" className="btn-secondary py-1 text-sm" onClick={() => setFg(textFix.hex)}>
                  Use {textFix.hex} for text
                </button>
              </li>
            )}
            {backgroundFix && (
              <li className="flex flex-wrap items-center gap-3">
                <span className="inline-block h-7 w-7 rounded border border-ink/30" style={{ backgroundColor: backgroundFix.hex }} aria-hidden="true" />
                <span>
                  Or make the background {backgroundFix.direction}: <span className="font-mono">{backgroundFix.hex}</span>{" "}
                  gives {formatRatio(backgroundFix.ratio)}.
                </span>
                <button type="button" className="btn-secondary py-1 text-sm" onClick={() => setBg(backgroundFix.hex)}>
                  Use {backgroundFix.hex} for background
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="mt-6 space-y-2">
        <GuidelineNote id="multiple-representations" />
        <GuidelineNote id="not-colour-alone" />
        <GuidelineNote id="error-guidance" />
        <GuidelineNote id="labels-and-announcements" />
      </div>
    </section>
  );
}

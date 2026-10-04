"use client";

import { useId } from "react";
import { MIN_SLIDE_FONT_PT, SOURCES } from "@/data/standards";
import FontPicker from "@/components/brand/FontPicker";
import GuidelineNote from "@/components/notes/GuidelineNote";
import { fontStack, googleFontsUrl, isSansSerif } from "@/lib/fontOptions";
import { BrandState } from "@/lib/brandState";

interface Props {
  state: BrandState;
  update: (fn: (s: BrandState) => BrandState) => void;
}

function SizeField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const id = useId();
  const tooSmall = value < MIN_SLIDE_FONT_PT;
  return (
    <div>
      <label htmlFor={id} className="font-bold">
        {label}: <span className="font-mono">{value}pt</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-describedby={tooSmall ? `${id}-warn` : undefined}
        className="mt-2 block w-full accent-westbridge"
      />
      {tooSmall && (
        <p id={`${id}-warn`} className="mt-1 text-sm font-bold text-alert">
          <span aria-hidden="true">✕ </span>Below the {MIN_SLIDE_FONT_PT}pt minimum for slides.
        </p>
      )}
    </div>
  );
}

export default function TypographyStep({ state, update }: Props) {
  const font = state.font;
  const colourById = new Map(state.colours.map((c) => [c.id, c]));
  const pairs = state.approvedPairs
    .map((p) => ({ fg: colourById.get(p.fg), bg: colourById.get(p.bg) }))
    .filter((p): p is { fg: NonNullable<typeof p.fg>; bg: NonNullable<typeof p.bg> } => !!p.fg && !!p.bg);

  return (
    <div className="space-y-10">
      <section aria-labelledby="typeface-heading">
        <h3 id="typeface-heading" className="text-xl font-bold text-westbridge">
          Typeface
        </h3>
        <p className="mt-1 text-sm">
          Choose any Google Font. The guidelines ask for sans-serif fonts ({SOURCES.typography}).
        </p>

        <div className="mt-4 rounded-lg border-2 border-westbridge/20 bg-mist p-4" aria-live="polite">
          <p>
            Selected:{" "}
            <span className="text-xl font-bold" style={{ fontFamily: fontStack(font) }}>
              {font.family}
            </span>{" "}
            <span className="text-sm">({font.category.toLowerCase()})</span>{" "}
            <a href={googleFontsUrl(font.family)} target="_blank" rel="noreferrer" className="text-sm text-westbridge underline">
              View on Google Fonts
            </a>
          </p>
          {!isSansSerif(font) && (
            <p className="mt-2 rounded-md border-2 border-alert bg-white p-3 font-bold text-alert">
              <span aria-hidden="true">⚠ </span>
              {font.family} is a {font.category.toLowerCase()} font, not sans-serif. The guidelines ask for sans-serif
              fonts for slides ({SOURCES.typography}).
            </p>
          )}
        </div>

        <GuidelineNote id="sans-serif-type" className="mt-4" />
        <div className="mt-6">
          <FontPicker value={font} onChange={(f) => update((s) => ({ ...s, font: f }))} />
        </div>
      </section>

      <section aria-labelledby="sizes-heading">
        <h3 id="sizes-heading" className="text-xl font-bold text-westbridge">
          Sizes for slides
        </h3>
        <div className="mt-4 grid max-w-2xl gap-6 sm:grid-cols-2">
          <SizeField
            label="Heading size"
            value={state.headingPt}
            min={12}
            max={60}
            onChange={(n) => update((s) => ({ ...s, headingPt: n }))}
          />
          <SizeField
            label="Body size"
            value={state.bodyPt}
            min={12}
            max={40}
            onChange={(n) => update((s) => ({ ...s, bodyPt: n }))}
          />
        </div>
      </section>

      <section aria-labelledby="preview-heading">
        <h3 id="preview-heading" className="text-xl font-bold text-westbridge">
          Preview
        </h3>
        {pairs.length === 0 ? (
          <p className="mt-2 rounded-md border-2 border-amber bg-amber/20 p-4">
            Approve at least one colour pairing in the Colour &amp; contrast step to preview it here.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {pairs.map(({ fg, bg }) => (
              <figure key={`${fg.id}-${bg.id}`}>
                <div
                  className="aspect-video overflow-hidden rounded-md border border-ink/20 p-6"
                  style={{ color: fg.hex, backgroundColor: bg.hex, fontFamily: fontStack(font) }}
                >
                  <p style={{ fontSize: `${state.headingPt}pt`, lineHeight: 1.15 }} className="font-bold">
                    Slide heading
                  </p>
                  <p style={{ fontSize: `${state.bodyPt}pt`, lineHeight: 1.4 }} className="mt-3">
                    Body text on your slide.
                  </p>
                </div>
                <figcaption className="mt-1 text-sm">
                  {fg.name} text on {bg.name}, set in {font.family}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

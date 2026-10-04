"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  BrandFont,
  CatalogueFont,
  FontCategory,
  PRESET_FONTS,
  fontStack,
} from "@/lib/fontOptions";
import { loadGoogleFont } from "@/lib/loadGoogleFont";

// Google Fonts home page — the picker below flags anything that is not sans-serif (§2.1)
const GOOGLE_FONTS_BROWSE_URL = "https://fonts.google.com/";

const CATEGORIES: FontCategory[] = ["Sans Serif", "Serif", "Display", "Handwriting", "Monospace"];

interface Props {
  value: BrandFont;
  onChange: (font: BrandFont) => void;
}

export default function FontPicker({ value, onChange }: Props) {
  const id = useId();
  const [catalogue, setCatalogue] = useState<CatalogueFont[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FontCategory | "all">("all");

  // The full catalogue (~1,800 families) is split into its own chunk and only
  // fetched when this step opens.
  useEffect(() => {
    import("@/data/googleFonts.json")
      .then((m) => setCatalogue(m.default as CatalogueFont[]))
      .catch(() => setFailed(true));
  }, []);

  // Make sure the selected font is loaded (e.g. when returning to this step)
  useEffect(() => {
    const entry = catalogue?.find((f) => f.f === value.family);
    if (entry) loadGoogleFont(entry);
  }, [catalogue, value.family]);

  const results = useMemo(() => {
    if (!catalogue) return [];
    const q = query.trim().toLowerCase();
    return catalogue.filter((f) => (category === "all" || f.c === category) && (q === "" || f.f.toLowerCase().includes(q)));
  }, [catalogue, query, category]);

  const choose = (font: CatalogueFont) => {
    loadGoogleFont(font);
    onChange({ family: font.f, category: font.c });
  };

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="text-lg font-bold">Recommended</legend>
        <p className="mt-1 text-sm">Sans-serif fonts chosen for legibility.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRESET_FONTS.map((f) => {
            const selected = f.family === value.family;
            return (
              <label
                key={f.family}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 bg-white p-4 ${
                  selected ? "border-westbridge" : "border-ink/10 hover:border-westbridge/50"
                }`}
              >
                <input
                  type="radio"
                  name={`${id}-preset`}
                  checked={selected}
                  onChange={() => onChange({ family: f.family, category: f.category })}
                  className="h-5 w-5 accent-westbridge"
                />
                <span style={{ fontFamily: fontStack(f) }} className="text-xl">
                  {f.family}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <h4 className="text-lg font-bold">All Google Fonts</h4>
        <p className="mt-1 max-w-[60ch]">
          Browse the full collection on Google Fonts, where you can preview every typeface with your own text. When
          you find one you like, search for its name below to add it to your brand.
        </p>
        <a
          href={GOOGLE_FONTS_BROWSE_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary mt-3"
        >
          Browse Google Fonts<span className="sr-only"> (opens in a new tab)</span>
          <span aria-hidden="true" className="text-sm font-normal">(new tab)</span>
        </a>
        {failed ? (
          <p className="mt-2 text-alert">The font list couldn&rsquo;t be loaded. Use a recommended font instead.</p>
        ) : !catalogue ? (
          <p className="mt-2">Loading the font list…</p>
        ) : (
          <>
            <div className="mt-3 flex flex-wrap gap-4">
              <div className="min-w-[14rem] flex-1">
                <label htmlFor={`${id}-q`} className="font-bold">
                  Search by name
                </label>
                <input
                  id={`${id}-q`}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="field mt-1 w-full"
                />
              </div>
              <div>
                <label htmlFor={`${id}-cat`} className="font-bold">
                  Category
                </label>
                <select
                  id={`${id}-cat`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FontCategory | "all")}
                  className="field mt-1 block"
                >
                  <option value="all">All categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label htmlFor={`${id}-list`} className="mt-4 block font-bold">
              Font{" "}
              <span className="font-normal" aria-live="polite">
                ({results.length} of {catalogue.length}, most popular first)
              </span>
            </label>
            <select
              id={`${id}-list`}
              size={10}
              value={results.some((f) => f.f === value.family) ? value.family : ""}
              onChange={(e) => {
                const font = results.find((f) => f.f === e.target.value);
                if (font) choose(font);
              }}
              className="field mt-1 block w-full max-w-xl"
            >
              {results.map((f) => (
                <option key={f.f} value={f.f}>
                  {f.f} ({f.c.toLowerCase()})
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </div>
  );
}

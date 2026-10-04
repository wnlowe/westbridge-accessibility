"use client";

import { useEffect, useId, useState } from "react";
import { normaliseHex } from "@/lib/contrast";

interface Props {
  label: string;
  value: string; // normalised "#RRGGBB"
  onChange: (hex: string) => void;
}

/** Native colour picker + hex text field. The text field only commits valid hex. */
export default function ColourInput({ label, value, onChange }: Props) {
  const id = useId();
  const [draft, setDraft] = useState(value);
  const invalid = normaliseHex(draft) === null;

  // Sync the text field when the value changes elsewhere (picker, swap), but
  // leave it alone if it already represents the value (e.g. user typed "#fff")
  useEffect(() => setDraft((d) => (normaliseHex(d) === value ? d : value)), [value]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`${id}-hex`} className="font-bold">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          aria-label={`${label} colour picker`}
          className="h-11 w-14 cursor-pointer rounded-md border-2 border-ink/60 bg-white p-1"
        />
        <input
          id={`${id}-hex`}
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            const hex = normaliseHex(e.target.value);
            if (hex) onChange(hex);
          }}
          onBlur={() => setDraft(value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-err` : undefined}
          className="field w-32 font-mono uppercase"
        />
      </div>
      {invalid && (
        <p id={`${id}-err`} className="text-sm text-alert">
          Enter a hex colour such as #104862 or #FFF.
        </p>
      )}
    </div>
  );
}

"use client";

import { CONTENT_TYPE_LABELS, ContentType, Guideline } from "@/data/guidelines";

interface Props {
  value: ContentType | "all";
  onChange: (v: ContentType | "all") => void;
  /** Guidelines to count against (already search-filtered) */
  items: Guideline[];
}

const TYPES = Object.keys(CONTENT_TYPE_LABELS) as ContentType[];

export default function FilterBar({ value, onChange, items }: Props) {
  const options = [
    { id: "all" as const, label: "Everything", count: items.length },
    ...TYPES.map((id) => ({ id, label: CONTENT_TYPE_LABELS[id], count: items.filter((g) => g.contentTypes.includes(id)).length })),
  ];

  return (
    <fieldset>
      <legend className="mb-2 font-bold">Show guidelines for</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.id)}
              className={`rounded-full border-2 px-3 py-1 text-sm ${
                active
                  ? "border-westbridge bg-westbridge font-bold text-white"
                  : "border-westbridge/40 bg-white text-westbridge hover:border-westbridge"
              }`}
            >
              {o.label} <span className={active ? "" : "text-ink"}>({o.count})</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

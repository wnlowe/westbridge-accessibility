"use client";

import Link from "next/link";
import { CONTENT_TYPE_LABELS, Guideline, ToolId } from "@/data/guidelines";

const TOOL_LINKS: Record<ToolId, { href: string; label: string }> = {
  contrast: { href: "/tools/contrast/", label: "Open the contrast checker" },
};

interface Props {
  guideline: Guideline;
  checked: boolean;
  onToggle: () => void;
}

/** One ruled row of the checklist. */
export default function GuidelineCard({ guideline: g, checked, onToggle }: Props) {
  const inputId = `check-${g.id}`;
  return (
    <div className="flex gap-4 py-4" style={{ breakInside: "avoid" }}>
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="mt-1 h-5 w-5 flex-none accent-westbridge"
      />
      <div className="max-w-[65ch] flex-1">
        <label htmlFor={inputId} className="cursor-pointer text-lg font-bold text-westbridge">
          {g.title}
        </label>
        <p className="mt-1">{g.summary}</p>
        {g.detail && <p className="mt-2 text-sm">{g.detail}</p>}
        <p className="mt-2 text-sm">
          Guidelines {g.section}. Applies to: {g.contentTypes.map((t) => CONTENT_TYPE_LABELS[t]).join(", ")}.
          {g.tools?.map((t) => (
            <span key={t}>
              {" "}
              <Link href={TOOL_LINKS[t].href} className="no-print text-westbridge underline">
                {TOOL_LINKS[t].label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useNotes } from "@/components/notes/NotesContext";
import { getInPractice } from "@/data/inPractice";
import { evaluateContrast, formatRatio } from "@/lib/contrast";

interface Props {
  id: string; // entry id in data/inPractice.ts
  className?: string;
}

/**
 * A callout explaining how the element next to it follows the guidelines.
 * Renders nothing unless the notes switch is on. Sits in the reading order,
 * directly after the element it describes.
 */
export default function GuidelineNote({ id, className = "" }: Props) {
  const { on } = useNotes();
  const entry = getInPractice(id);
  if (!on || !entry) return null;

  const contrast = entry.contrast && evaluateContrast(entry.contrast.fg, entry.contrast.bg);

  return (
    <aside
      aria-label={`How this follows the guidelines: ${entry.title}`}
      className={`no-print border-l-4 border-amber bg-white py-2 pl-3 pr-2 text-sm text-ink shadow-[inset_0_0_0_1px_rgba(20,32,43,0.12)] ${className}`}
    >
      <p>
        <span className="font-bold">Guidelines {entry.section}.</span> {entry.note}
        {contrast && (
          <>
            {" "}
            Contrast {formatRatio(contrast.ratio)}, {contrast.normal ? "passes" : "fails"}.
          </>
        )}{" "}
        <Link href={`/in-practice/#${entry.id}`} className="text-westbridge underline">
          More about {entry.title.toLowerCase()}
        </Link>
      </p>
    </aside>
  );
}

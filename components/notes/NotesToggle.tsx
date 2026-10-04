"use client";

import { useNotes } from "@/components/notes/NotesContext";
import GuidelineNote from "@/components/notes/GuidelineNote";

/** The switch under the site header, plus the site-wide notes it reveals. */
export default function NotesToggle() {
  const { on, setOn } = useNotes();
  return (
    <div className="no-print border-b border-ink/10 bg-mist">
      <div className="container-page py-2">
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => setOn(!on)}
          className="flex items-center gap-3 rounded-md py-1 text-sm font-bold text-westbridge"
        >
          <span
            aria-hidden="true"
            className={`relative inline-block h-6 w-11 flex-none rounded-full border-2 border-westbridge transition-colors ${
              on ? "bg-westbridge" : "bg-white"
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full transition-[left] motion-reduce:transition-none ${
                on ? "left-[22px] bg-amber" : "left-0.5 bg-westbridge"
              }`}
            />
          </span>
          Show how this page follows the guidelines
        </button>
        {on && (
          <div className="mt-2 grid gap-2 pb-2 md:grid-cols-3">
            <GuidelineNote id="text-contrast" />
            <GuidelineNote id="keyboard-access" />
            <GuidelineNote id="focus-indicators" />
          </div>
        )}
      </div>
    </div>
  );
}

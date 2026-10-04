"use client";

import { useId, useState } from "react";
import Link from "next/link";
import GuidelineNote from "@/components/notes/GuidelineNote";

interface Props {
  onMagicWord: (input: string) => boolean;
}

/** Shown on /brand until the magic word is entered — on every visit. */
export default function BrandGate({ onMagicWord }: Props) {
  const id = useId();
  const [word, setWord] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className="grid gap-10 md:grid-cols-[3fr_2fr]">
      <section aria-labelledby={`${id}-word-heading`} className="rounded-lg bg-mist p-6 sm:p-8">
        <h2 id={`${id}-word-heading`} className="text-xl font-bold text-westbridge">
          Enter the magic word
        </h2>
        <p className="mt-2 max-w-[48ch]">It&rsquo;s on the last screen of the tutorial. You&rsquo;ll need it each time you open this page.</p>
        <form
          className="mt-5 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setError(!onMagicWord(word));
          }}
        >
          <label htmlFor={`${id}-word`} className="font-bold">
            Magic word
          </label>
          <div className="flex flex-wrap gap-2">
            <input
              id={`${id}-word`}
              type="text"
              autoComplete="off"
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
                setError(false);
              }}
              aria-invalid={error}
              aria-describedby={error ? `${id}-err` : undefined}
              className="field min-w-0 flex-1"
            />
            <button type="submit" className="btn-primary">
              Open Develop Your Brand
            </button>
          </div>
          <p id={`${id}-err`} role="alert" className="min-h-[1.5rem] text-sm font-bold text-alert">
            {error ? "That isn’t the magic word. Check the last screen of the tutorial, then try again." : ""}
          </p>
        </form>
        <div className="space-y-2">
          <GuidelineNote id="error-guidance" />
          <GuidelineNote id="no-time-limits" />
        </div>
      </section>

      <section aria-labelledby={`${id}-start`} className="self-start">
        <h2 id={`${id}-start`} className="text-xl font-bold text-westbridge">
          Haven&rsquo;t done the tutorial?
        </h2>
        <p className="mt-2">It&rsquo;s a few short lessons on accessible colour and type, and it ends with the magic word.</p>
        <Link href="/tutorial/" className="btn-secondary mt-4">
          Start the tutorial
        </Link>
      </section>
    </div>
  );
}

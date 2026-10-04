import Link from "next/link";
import type { InPracticeEntry } from "@/data/inPractice";
import { evaluateContrast, formatRatio } from "@/lib/contrast";
import { assetPath } from "@/lib/assetPath";

const IS_DEV = process.env.NODE_ENV === "development";

export default function InPracticeEntryView({ entry }: { entry: InPracticeEntry }) {
  const contrast = entry.contrast && evaluateContrast(entry.contrast.fg, entry.contrast.bg);

  return (
    <article id={entry.id} aria-labelledby={`${entry.id}-title`} className="scroll-mt-6 py-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="max-w-[60ch]">
          <h3 id={`${entry.id}-title`} className="text-lg font-bold text-westbridge">
            {entry.title}
          </h3>
          <p className="mt-1 text-sm">Guidelines {entry.section}</p>
          <p className="mt-3">{entry.description}</p>

          {entry.contrast && contrast && (
            <p className="mt-4 flex flex-wrap items-center gap-3">
              <span
                className="inline-flex h-10 items-center rounded px-3 font-bold"
                style={{ color: entry.contrast.fg, backgroundColor: entry.contrast.bg }}
                aria-hidden="true"
              >
                Aa
              </span>
              <span>
                {entry.contrast.label}: <span className="font-mono">{formatRatio(contrast.ratio)}</span>,{" "}
                {contrast.normal ? "passes for all text" : contrast.large ? "passes for large text only" : "fails"}.
              </span>
            </p>
          )}

          <p className="mt-4">
            <Link href={entry.where.href} className="text-westbridge underline">
              See it on the site: {entry.where.label}
            </Link>
          </p>
        </div>

        {entry.screenshot ? (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimised */}
            <img
              src={assetPath(entry.screenshot.src)}
              alt={entry.screenshot.alt}
              loading="lazy"
              className="w-full rounded-md border border-ink/20"
            />
            {entry.screenshot.caption && <figcaption className="mt-2 text-sm">{entry.screenshot.caption}</figcaption>}
          </figure>
        ) : (
          // Only visible while running `npm run dev`, so the live site never shows empty slots
          IS_DEV && (
            <div className="flex min-h-[10rem] items-center justify-center rounded-md border-2 border-dashed border-ink/30 p-4 text-center text-sm">
              <p>
                Screenshot slot (only shown in development).
                <br />
                Add <span className="font-mono">/public/in-practice/{entry.id}.png</span> and a{" "}
                <span className="font-mono">screenshot</span> entry. See docs/westbrigeSite/06-in-practice-screenshots.md.
              </p>
            </div>
          )
        )}
      </div>
    </article>
  );
}

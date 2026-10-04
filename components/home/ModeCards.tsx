import Link from "next/link";
import { tutorialLessons } from "@/data/tutorial";

// The two modes get different weights on purpose: Develop Your Brand is the
// guided starting point (filled), Quick Reference the look-up tool (outlined).
export default function ModeCards() {
  return (
    <div className="grid gap-6 md:grid-cols-[3fr_2fr]">
      <section aria-labelledby="mode-brand" className="on-dark flex flex-col rounded-lg bg-westbridge p-6 text-white sm:p-8">
        <h3 id="mode-brand" className="text-2xl font-bold">
          Develop Your Brand
        </h3>
        <p className="mt-3 max-w-[48ch] flex-1 text-mist">
          Choose brand colours, check every pairing for contrast, pick a typeface, and finish with a brand sheet you
          can print. Starts with a short tutorial ({tutorialLessons.length} lessons) that gives you the magic word to
          open it.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/tutorial/" className="btn-on-dark">
            Start the tutorial
          </Link>
          <Link href="/brand/" className="btn border-2 border-white text-white hover:bg-westbridge-deep">
            I have the magic word
          </Link>
        </div>
      </section>

      <section aria-labelledby="mode-reference" className="flex flex-col rounded-lg border-2 border-westbridge p-6 sm:p-8">
        <h3 id="mode-reference" className="text-2xl font-bold text-westbridge">
          Quick Reference
        </h3>
        <p className="mt-3 flex-1">
          Look up a guideline by content type, from Word and PowerPoint to video and PDF, then tick it off or print
          the checklist.
        </p>
        <Link href="/reference/" className="btn-primary mt-6 self-start">
          Open Quick Reference
        </Link>
      </section>
    </div>
  );
}

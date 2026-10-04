import Link from "next/link";
import ModeCards from "@/components/home/ModeCards";
import GuidelineNote from "@/components/notes/GuidelineNote";
import { DOC_TITLE } from "@/lib/siteConfig";

export default function HomePage() {
  return (
    <>
      <div className="on-dark bg-westbridge text-white">
        <div className="container-page py-12 sm:py-16">
          <h1 className="max-w-[18ch] text-3xl font-bold sm:text-4xl">{DOC_TITLE}</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-mist">
            Make teaching materials every student can use. Build an accessible brand step by step, or look up a
            guideline when you need it.
          </p>
        </div>
        <div className="h-2 bg-growth" aria-hidden="true" />
      </div>

      <div className="container-page space-y-2 pt-4 empty:hidden">
        <GuidelineNote id="header-contrast" />
        <GuidelineNote id="sans-serif-type" />
        <GuidelineNote id="heading-structure" />
      </div>

      <div className="container-page py-10">
        <h2 className="text-xl font-bold text-westbridge">Two ways in</h2>
        <div className="mt-4">
          <ModeCards />
        </div>
        <GuidelineNote id="choice-and-progress" className="mt-4" />

        <ul className="mt-10 space-y-3 border-t border-ink/15 pt-6">
          <li>
            Need to check two colours?{" "}
            <Link href="/tools/contrast/" className="font-bold text-westbridge underline">
              Open the contrast checker
            </Link>
          </li>
          <li>
            Want to see the guidelines applied?{" "}
            <Link href="/in-practice/" className="font-bold text-westbridge underline">
              See how this site follows them
            </Link>
          </li>
        </ul>
        <GuidelineNote id="descriptive-links" className="mt-4" />
      </div>
    </>
  );
}

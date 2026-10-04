import type { Metadata } from "next";
import PageIntro from "@/components/ui/PageIntro";
import InPracticeEntryView from "@/components/in-practice/InPracticeEntry";
import { inPractice } from "@/data/inPractice";
import { groupBySection } from "@/data/sections";

export const metadata: Metadata = {
  title: "In practice",
  description: "Where and how this site applies Westbridge's Digital Content Accessibility Guidelines.",
};

export default function InPracticePage() {
  const groups = groupBySection(inPractice, (e) => e.section);

  return (
    <>
      <PageIntro title="How this site follows the guidelines">
        <p>
          This site is built to the same guidelines it teaches. Each example below shows where a guideline is applied,
          so you can see it working before using it in your own materials.
        </p>
        <p className="mt-3 text-base">
          You can also switch on &lsquo;Show how this page follows the guidelines&rsquo; at the top of any page to see
          these notes next to the parts they describe.
        </p>
      </PageIntro>

      <div className="container-page py-8">
        <nav aria-labelledby="in-practice-contents" className="max-w-3xl">
          <h2 id="in-practice-contents" className="text-lg font-bold">
            On this page
          </h2>
          <ul className="mt-2 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {inPractice.map((e) => (
              <li key={e.id}>
                <a href={`#${e.id}`} className="text-westbridge underline">
                  {e.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {groups.map(({ section, items }) => (
          <section key={section.number} aria-labelledby={`ip-section-${section.number}`} className="mt-12">
            <h2 id={`ip-section-${section.number}`} className="border-b-2 border-westbridge pb-2 text-xl font-bold text-westbridge">
              Section {section.number}: {section.title}
            </h2>
            <div className="divide-y divide-ink/15">
              {items.map((entry) => (
                <InPracticeEntryView key={entry.id} entry={entry} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

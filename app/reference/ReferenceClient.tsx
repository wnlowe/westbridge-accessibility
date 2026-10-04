"use client";

import { useId, useMemo, useState } from "react";
import PageIntro from "@/components/ui/PageIntro";
import FilterBar from "@/components/reference/FilterBar";
import GuidelineCard from "@/components/reference/GuidelineCard";
import GuidelineNote from "@/components/notes/GuidelineNote";
import { ContentType, Guideline, guidelines } from "@/data/guidelines";
import { groupBySection } from "@/data/sections";

function matchesQuery(g: Guideline, q: string) {
  return q === "" || `${g.title} ${g.summary} ${g.detail ?? ""}`.toLowerCase().includes(q);
}

export default function ReferenceClient() {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ContentType | "all">("all");
  const [checked, setChecked] = useState<string[]>([]); // in-memory — clears on reload

  const q = query.trim().toLowerCase();
  const searched = useMemo(() => guidelines.filter((g) => matchesQuery(g, q)), [q]);
  const results = useMemo(
    () => searched.filter((g) => filter === "all" || g.contentTypes.includes(filter)),
    [searched, filter]
  );
  const groups = groupBySection(results, (g) => g.section);

  const toggle = (id: string) => setChecked((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const clearFilters = () => {
    setQuery("");
    setFilter("all");
  };
  const doneCount = results.filter((g) => checked.includes(g.id)).length;

  return (
    <>
      <PageIntro title="Quick Reference">
        <p>Find the guidelines for the content you&rsquo;re making, tick off what you&rsquo;ve covered, and print the list.</p>
      </PageIntro>

      <div className="container-page py-8">
        <div className="no-print space-y-5">
          <div className="max-w-md">
            <label htmlFor={searchId} className="font-bold">
              Search guidelines
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="field mt-1 w-full"
            />
          </div>
          {/* Counts reflect the current search, so people can see where matches are before filtering */}
          <FilterBar value={filter} onChange={setFilter} items={searched} />
          <GuidelineNote id="labels-and-announcements" className="max-w-3xl" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b-2 border-westbridge pb-3">
          <p aria-live="polite" className="font-bold">
            Showing {results.length} of {guidelines.length} guidelines. {doneCount} ticked.
          </p>
          <div className="no-print flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={() => window.print()}>
              Print or save as PDF
            </button>
            <button type="button" className="btn-secondary" onClick={() => setChecked([])} disabled={checked.length === 0}>
              Clear ticks
            </button>
          </div>
        </div>
        <GuidelineNote id="alternative-formats" className="mt-4 max-w-3xl" />

        {results.length === 0 ? (
          <div className="mt-8">
            <p className="text-lg">
              {q ? <>No guidelines match &lsquo;{query.trim()}&rsquo; with this filter.</> : "No guidelines match this filter."}
            </p>
            <button type="button" className="btn-secondary mt-4" onClick={clearFilters}>
              Clear search and filters
            </button>
          </div>
        ) : (
          <div className="mt-2">
            {groups.map(({ section, items }) => (
              <section key={section.number} aria-labelledby={`section-${section.number}`} className="mt-8">
                <h2 id={`section-${section.number}`} className="text-xl font-bold text-westbridge">
                  Section {section.number}: {section.title}
                </h2>
                <ul className="mt-2 divide-y divide-ink/15 border-y border-ink/15">
                  {items.map((g) => (
                    <li key={g.id}>
                      <GuidelineCard guideline={g} checked={checked.includes(g.id)} onToggle={() => toggle(g.id)} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <GuidelineNote id="heading-structure" className="mt-6 max-w-3xl" />
          </div>
        )}
      </div>
    </>
  );
}

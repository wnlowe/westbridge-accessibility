// Top-level sections of the Digital Content Accessibility Guidelines
// (TLEU-ACC-2019-v2.4). Used to group the Quick Reference and the
// "In practice" page in the same order as the source document.

export interface DocSection {
  number: string; // "1"
  title: string;
}

export const DOC_SECTIONS: DocSection[] = [
  { number: "1", title: "Compliance standards" },
  { number: "2", title: "Document production" },
  { number: "3", title: "Universal Design for Learning" },
  { number: "4", title: "Assessment and interactive content" },
];

/** "§3.1" → "3" */
export function topLevelSection(ref: string): string {
  return ref.replace(/^§/, "").split(".")[0];
}

/** Groups items by top-level section, in document order, dropping empty sections. */
export function groupBySection<T>(items: T[], getRef: (item: T) => string) {
  return DOC_SECTIONS.map((section) => ({
    section,
    items: items.filter((item) => topLevelSection(getRef(item)) === section.number),
  })).filter((g) => g.items.length > 0);
}

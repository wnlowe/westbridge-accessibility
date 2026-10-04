// Where this site applies the Digital Content Accessibility Guidelines.
//
// One entry feeds two places:
//   - `note`: the short callout shown beside the element when "Show how this
//     page follows the guidelines" is switched on (<GuidelineNote id="…" />)
//   - everything else: the full write-up on the /in-practice/ page
//
// To add a screenshot, see docs/westbrigeSite/06-in-practice-screenshots.md.

export interface InPracticeScreenshot {
  src: string; // path under /public, e.g. "/in-practice/header-contrast.png"
  alt: string; // required — describe what the screenshot shows and why it matters
  caption?: string;
}

export interface InPracticeEntry {
  id: string; // kebab-case; also the anchor on /in-practice/ (#id)
  title: string;
  section: string; // guidelines section, e.g. "§1.1"
  note: string; // one sentence for the on-page callout
  description: string; // fuller explanation for /in-practice/
  /** If set, the measured contrast ratio is appended to the note and shown on the page. */
  contrast?: { fg: string; bg: string; label: string };
  where: { label: string; href: string }; // where on the site to see it
  screenshot?: InPracticeScreenshot;
}

export const inPractice: InPracticeEntry[] = [
  {
    id: "text-contrast",
    title: "Text contrast",
    section: "§1.1",
    note: "Body text is dark ink on white.",
    description:
      "Every text and background pairing in the site's palette was checked with the same contrast maths as the checker, and all of them reach at least 4.5:1. The lowest is green text on the light grey background at 5.42:1.",
    contrast: { fg: "#14202B", bg: "#FFFFFF", label: "Ink on white" },
    where: { label: "Any page", href: "/" },
  },
  {
    id: "header-contrast",
    title: "Header and banner contrast",
    section: "§1.1",
    note: "White text on Westbridge navy.",
    description:
      "The Westbridge navy (#104862, taken from the university's own presentations) is dark enough to carry white text. Amber and green from the same palette are kept for highlights and decoration, because neither reaches 4.5:1 as text on white.",
    contrast: { fg: "#FFFFFF", bg: "#104862", label: "White on Westbridge navy" },
    where: { label: "Home page banner", href: "/" },
  },
  {
    id: "heading-structure",
    title: "Heading structure",
    section: "§1.1",
    note: "One main heading per page, with section headings nested in order underneath.",
    description:
      "Each page has a single level-one heading, and every section below it uses the next heading level down, never skipping one. Screen reader users can jump between headings to find their way around.",
    where: { label: "Quick Reference", href: "/reference/" },
  },
  {
    id: "keyboard-access",
    title: "Keyboard access",
    section: "§1.1",
    note: "Everything works with a keyboard. Press Tab from the top of any page to reach a ‘Skip to main content’ link.",
    description:
      "Every control is a standard link, button or form field, so it can be reached with Tab and used with Enter or Space. A skip link at the top of each page lets keyboard users jump past the navigation.",
    where: { label: "Any page (press Tab)", href: "/" },
  },
  {
    id: "focus-indicators",
    title: "Visible focus",
    section: "§4.1",
    note: "The control you're on has a thick navy outline (amber on dark backgrounds).",
    description:
      "Keyboard focus is shown with a 3px outline in Westbridge navy, switching to amber on the navy header so it stays visible on both.",
    where: { label: "Any page (press Tab)", href: "/" },
  },
  {
    id: "sans-serif-type",
    title: "Sans-serif type at a readable size",
    section: "§2.1",
    note: "Arimo, a sans-serif typeface, with body text at 18px.",
    description:
      "The site is set in Arimo, a free sans-serif typeface with the same proportions as Arial, the font used in Westbridge's presentations. Body text is 18px, in line with the guidelines' 18pt minimum for slides.",
    where: { label: "Any page", href: "/" },
  },
  {
    id: "not-colour-alone",
    title: "Information isn't shown by colour alone",
    section: "§2.1",
    note: "Pass and fail are written out with a symbol, not just shown in green or red.",
    description:
      "Results in the contrast checker and the brand colour table always say ‘Passes’ or ‘Fails’ with a ✓ or ✕ symbol, so they can be understood without seeing colour.",
    where: { label: "Contrast checker", href: "/tools/contrast/" },
  },
  {
    id: "descriptive-links",
    title: "Descriptive link text",
    section: "§2.1",
    note: "Links say where they go, rather than ‘click here’.",
    description:
      "Every link and button names its destination or action, such as ‘Open the contrast checker’ or ‘Print or save as PDF’, so it makes sense when read out of context.",
    where: { label: "Home page", href: "/" },
  },
  {
    id: "error-guidance",
    title: "Error messages that explain the fix",
    section: "§4.1",
    note: "When something fails, the site says what went wrong and how to fix it.",
    description:
      "An invalid colour code shows an example of a valid one. A failing colour pairing comes with the nearest colour that would pass, which can be applied in one click.",
    where: { label: "Contrast checker", href: "/tools/contrast/" },
  },
  {
    id: "labels-and-announcements",
    title: "Labels and announcements for screen readers",
    section: "§4.1",
    note: "Every field has a label, and new results are read out automatically.",
    description:
      "Each form field has a visible label linked to it. When the contrast ratio or the number of matching guidelines changes, the new value is announced to screen reader users without them having to look for it.",
    where: { label: "Quick Reference", href: "/reference/" },
  },
  {
    id: "no-time-limits",
    title: "No time limits",
    section: "§4.1",
    note: "There are no timers. Take as long as you need.",
    description: "Nothing on the site times out: the tutorial, the walkthrough and the magic word box wait as long as needed.",
    where: { label: "Tutorial", href: "/tutorial/" },
  },
  {
    id: "multiple-representations",
    title: "More than one way to see a result",
    section: "§3.1",
    note: "Contrast is shown as a number, in words and as a live preview.",
    description:
      "Universal Design for Learning asks for information in more than one format. The contrast checker gives the ratio as a number, a written verdict and a live text sample, so people can use whichever makes most sense to them.",
    where: { label: "Contrast checker", href: "/tools/contrast/" },
  },
  {
    id: "choice-and-progress",
    title: "Choice and clear progress",
    section: "§3.1",
    note: "Two ways in, and the tutorial and walkthrough show how far you've got.",
    description:
      "Staff can follow the guided route (Develop Your Brand) or look things up directly (Quick Reference). Step-by-step parts say how many steps there are and which one you're on, so expectations are clear from the start.",
    where: { label: "Tutorial", href: "/tutorial/" },
  },
  {
    id: "quiz-feedback",
    title: "Supportive quiz feedback",
    section: "§3.1",
    note: "Quiz answers get clear, encouraging feedback, unlimited retries and no timer.",
    description:
      "Some tutorial lessons end with a short check. Feedback is written out with a ✓ or ✕, says how many correct answers were chosen without giving the answer away, offers a hint and invites another try. There's no time limit, and the Next button explains why it isn't available yet.",
    where: { label: "Tutorial", href: "/tutorial/" },
  },
  {
    id: "office-templates",
    title: "Accessible Office templates",
    section: "§2.1",
    note: "The templates start every new file with passing colours, sans-serif type and proper structure.",
    description:
      "The PowerPoint, Word and Excel templates from Develop Your Brand use only approved colour pairings that pass for all text. They set slide text to at least 18pt, and include title placeholders, real heading styles and tables with header rows. Each one also lists the guidelines' advice for that program.",
    where: { label: "Develop Your Brand summary", href: "/brand/" },
  },
  {
    id: "alternative-formats",
    title: "Alternative formats",
    section: "§2.2",
    note: "This can be printed, saved as a PDF or downloaded.",
    description:
      "The brand sheet and the Quick Reference checklist both have print-friendly layouts that save cleanly as PDF, and the brand sheet can also be downloaded as data.",
    where: { label: "Quick Reference", href: "/reference/" },
  },
];

export function getInPractice(id: string): InPracticeEntry | undefined {
  return inPractice.find((e) => e.id === id);
}

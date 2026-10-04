// Develop Your Brand walkthrough steps. Intro copy is PLACEHOLDER — replace as needed.

export type BrandStepId = "colour" | "typography" | "summary";

export interface BrandStep {
  id: BrandStepId;
  title: string;
  intro: string;
}

export const brandSteps: BrandStep[] = [
  {
    id: "colour",
    title: "Colour & contrast",
    intro: "Choose your brand colours, then check which text and background pairings meet the contrast standard.",
  },
  {
    id: "typography",
    title: "Typography",
    intro: "Pick a sans-serif typeface and sizes, previewed in your approved colour pairings.",
  },
  {
    id: "summary",
    title: "Summary",
    intro: "Review your accessible brand, then print it or download it.",
  },
];

export const BRAND_COLOURS = {
  default: 3,
  min: 2,
  max: 6,
} as const;

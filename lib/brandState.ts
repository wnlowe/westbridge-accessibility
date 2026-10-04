import { BRAND_COLOURS } from "@/data/brandSteps";
import { BrandFont, DEFAULT_FONT } from "@/lib/fontOptions";
import { MIN_SLIDE_FONT_PT } from "@/data/standards";

export interface BrandColour {
  id: string;
  name: string;
  hex: string; // normalised "#RRGGBB"
}

export interface ColourPair {
  fg: string; // BrandColour id
  bg: string; // BrandColour id
}

export interface BrandState {
  brandName: string;
  colours: BrandColour[];
  approvedPairs: ColourPair[];
  font: BrandFont;
  headingPt: number;
  bodyPt: number;
}

// Starting palette — the Westbridge colours, as an example to edit
const STARTER_COLOURS: Omit<BrandColour, "id">[] = [
  { name: "Primary", hex: "#104862" },
  { name: "Background", hex: "#ECEFEE" },
  { name: "Accent", hex: "#FEC024" },
];

export const INITIAL_BRAND: BrandState = {
  brandName: "",
  colours: STARTER_COLOURS.slice(0, BRAND_COLOURS.default).map((c, i) => ({ ...c, id: `c${i + 1}` })),
  approvedPairs: [],
  font: DEFAULT_FONT,
  headingPt: 32,
  bodyPt: MIN_SLIDE_FONT_PT,
};

export function newColourId(colours: BrandColour[]): string {
  let n = colours.length + 1;
  while (colours.some((c) => c.id === `c${n}`)) n++;
  return `c${n}`;
}

export function isPairApproved(pairs: ColourPair[], fg: string, bg: string): boolean {
  return pairs.some((p) => p.fg === fg && p.bg === bg);
}

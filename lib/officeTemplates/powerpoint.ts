import { KINDS, toTemplate } from "./package";
import type { OfficeTheme } from "./theme";
import { GUIDANCE_SOURCE, POWERPOINT_GUIDANCE } from "./guidance";
import { MIN_SLIDE_FONT_PT } from "@/data/standards";

const bare = (hex: string) => hex.replace("#", "").toUpperCase();

/** Builds a .potx: title, title-and-content and section layouts in the brand's approved pairings. */
export async function buildPowerPointTemplate(t: OfficeTheme): Promise<Uint8Array> {
  const { default: PptxGenJS } = await import("pptxgenjs");
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE"; // 13.33 × 7.5 in
  pptx.title = `${t.name} presentation template`;
  pptx.subject = GUIDANCE_SOURCE;
  pptx.theme = { headFontFace: t.font, bodyFontFace: t.font };

  const text = (pair: { fg: string }) => ({ fontFace: t.font, color: bare(pair.fg) });

  pptx.defineSlideMaster({
    title: "Title slide",
    background: { color: bare(t.primary.bg) },
    objects: [
      {
        placeholder: {
          options: { name: "title", type: "title", x: 0.8, y: 2.2, w: 11.7, h: 1.8, fontSize: t.headingPt + 12, bold: true, valign: "bottom", ...text(t.primary) },
          text: "Presentation title",
        },
      },
      {
        placeholder: {
          options: { name: "subtitle", type: "body", x: 0.8, y: 4.2, w: 11.7, h: 1.2, fontSize: t.bodyPt + 4, valign: "top", ...text(t.primary) },
          text: "Subtitle",
        },
      },
    ],
  });

  pptx.defineSlideMaster({
    title: "Title and content",
    background: { color: bare(t.primary.bg) },
    objects: [
      {
        placeholder: {
          options: { name: "title", type: "title", x: 0.6, y: 0.4, w: 12.1, h: 1.1, fontSize: t.headingPt, bold: true, valign: "bottom", ...text(t.primary) },
          text: "Unique slide title",
        },
      },
      {
        placeholder: {
          options: { name: "body", type: "body", x: 0.6, y: 1.8, w: 12.1, h: 5.0, fontSize: t.bodyPt, valign: "top", ...text(t.primary) },
          text: "Content",
        },
      },
    ],
  });

  pptx.defineSlideMaster({
    title: "Section header",
    background: { color: bare(t.secondary.bg) },
    objects: [
      {
        placeholder: {
          options: { name: "title", type: "title", x: 0.8, y: 2.6, w: 11.7, h: 1.6, fontSize: t.headingPt + 8, bold: true, valign: "middle", ...text(t.secondary) },
          text: "Section title",
        },
      },
    ],
  });

  pptx.addSlide({ masterName: "Title slide" }).addText(t.name, { placeholder: "title" });

  const guidance = pptx.addSlide({ masterName: "Title and content" });
  guidance.addText("Using this template accessibly", { placeholder: "title" });
  guidance.addText(
    [...POWERPOINT_GUIDANCE.map((line) => ({ text: line, options: { bullet: true, breakLine: true } })), { text: GUIDANCE_SOURCE, options: { fontSize: Math.max(MIN_SLIDE_FONT_PT, t.bodyPt - 4) } }],
    { placeholder: "body" }
  );
  guidance.addNotes("Delete this slide when you start your presentation.");

  pptx.addSlide({ masterName: "Section header" }).addText("Section title", { placeholder: "title" });

  const data = (await pptx.write({ outputType: "uint8array" })) as Uint8Array;
  return toTemplate(data, KINDS.powerpoint, t);
}


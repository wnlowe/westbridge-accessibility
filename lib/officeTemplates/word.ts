import { KINDS, toTemplate } from "./package";
import type { OfficeTheme } from "./theme";
import { GUIDANCE_SOURCE, WORD_GUIDANCE } from "./guidance";
import { formatRatio } from "@/lib/contrast";

const bare = (hex: string) => hex.replace("#", "").toUpperCase();

/** Builds a .dotx with brand heading styles, guidance and an example table with a header row. */
export async function buildWordTemplate(t: OfficeTheme): Promise<Uint8Array> {
  const d = await import("docx");
  const heading = bare(t.headingOnWhite);
  const cell = (text: string) => new d.TableCell({ children: [new d.Paragraph(text)] });
  const headerCell = (text: string) =>
    new d.TableCell({
      children: [new d.Paragraph({ children: [new d.TextRun({ text, bold: true, color: bare(t.primary.fg) })] })],
      shading: { type: d.ShadingType.CLEAR, fill: bare(t.primary.bg), color: "auto" },
    });

  const doc = new d.Document({
    title: `${t.name} document template`,
    description: GUIDANCE_SOURCE,
    creator: "Westbridge Accessibility",
    styles: {
      default: {
        document: { run: { font: t.font, size: 24, color: bare(t.bodyOnWhite) }, paragraph: { spacing: { after: 160, line: 300 } } },
      },
      paragraphStyles: [
        { id: "Title", name: "Title", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 56, bold: true, color: heading }, paragraph: { spacing: { after: 240 } } },
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 36, bold: true, color: heading }, paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 30, bold: true, color: heading }, paragraph: { spacing: { before: 280, after: 100 }, outlineLevel: 1 } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 26, bold: true, color: heading }, paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 2 } },
      ],
      characterStyles: [
        { id: "Hyperlink", name: "Hyperlink", basedOn: "DefaultParagraphFont", run: { color: bare(t.linkOnWhite), underline: { type: d.UnderlineType.SINGLE } } },
      ],
    },
    sections: [
      {
        children: [
          new d.Paragraph({ text: t.name, heading: d.HeadingLevel.TITLE }),
          new d.Paragraph(
            "Replace this text with your document. The guidance below follows Westbridge's accessibility guidelines; delete it when you start writing."
          ),
          new d.Paragraph({ text: "Using this template accessibly", heading: d.HeadingLevel.HEADING_1 }),
          ...WORD_GUIDANCE.map((line) => new d.Paragraph({ text: line, bullet: { level: 0 } })),
          new d.Paragraph({ children: [new d.TextRun({ text: GUIDANCE_SOURCE, italics: true })] }),

          new d.Paragraph({ text: "Example heading level 2", heading: d.HeadingLevel.HEADING_2 }),
          new d.Paragraph("Headings use the brand colour and font. Use them in order, without skipping a level."),

          new d.Paragraph({ text: "Your approved colour pairings", heading: d.HeadingLevel.HEADING_1 }),
          new d.Paragraph("This table has a repeating header row, so screen readers can announce each column."),
          new d.Table({
            width: { size: 100, type: d.WidthType.PERCENTAGE },
            rows: [
              new d.TableRow({
                tableHeader: true,
                children: ["Text colour", "Background", "Contrast", "Use for"].map(headerCell),
              }),
              ...t.approvedPairs.map(
                (p) =>
                  new d.TableRow({
                    children: [
                      cell(`${p.fgName} ${p.fg}`),
                      cell(`${p.bgName} ${p.bg}`),
                      cell(formatRatio(p.ratio)),
                      cell(p.allText ? "All text" : "Large text only"),
                    ],
                  })
              ),
            ],
          }),
        ],
      },
    ],
  });

  const data = new Uint8Array(await (await d.Packer.toBlob(doc)).arrayBuffer());
  return toTemplate(data, KINDS.word, t);
}

import { KINDS, toTemplate } from "./package";
import type { OfficeTheme } from "./theme";
import { EXCEL_GUIDANCE, GUIDANCE_SOURCE } from "./guidance";
import { formatRatio } from "@/lib/contrast";

const argb = (hex: string) => "FF" + hex.replace("#", "").toUpperCase();

/** Builds an .xltx: a Read me sheet, a Data sheet with a real Excel table, and the brand colours. */
export async function buildExcelTemplate(t: OfficeTheme): Promise<Uint8Array> {
  const ExcelJS = (await import("exceljs")).default;
  const wb = new ExcelJS.Workbook();
  wb.creator = "Westbridge Accessibility";
  wb.title = `${t.name} spreadsheet template`;
  wb.subject = GUIDANCE_SOURCE;

  const font = (extra: Record<string, unknown> = {}) => ({ name: t.font, size: 12, color: { argb: argb(t.bodyOnWhite) }, ...extra });

  // Header cells use the primary approved pairing; set directly so table styles can't override contrast
  const styleHeader = (row: { eachCell: (fn: (c: any) => void) => void }) =>
    row.eachCell((c) => {
      c.font = font({ bold: true, color: { argb: argb(t.primary.fg) } });
      c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: argb(t.primary.bg) } };
    });

  const readMe = wb.addWorksheet("Read me");
  readMe.getColumn(1).width = 100;
  readMe.addRow([`${t.name} spreadsheet template`]).getCell(1).font = font({ size: 16, bold: true, color: { argb: argb(t.headingOnWhite) } });
  readMe.addRow([]);
  readMe.addRow(["Using this template accessibly"]).getCell(1).font = font({ size: 14, bold: true, color: { argb: argb(t.headingOnWhite) } });
  EXCEL_GUIDANCE.forEach((line) => {
    const c = readMe.addRow([`• ${line}`]).getCell(1);
    c.font = font();
    c.alignment = { wrapText: true, vertical: "top" };
  });
  readMe.addRow([]);
  readMe.addRow([GUIDANCE_SOURCE]).getCell(1).font = font({ italic: true });
  readMe.addRow(["Delete this sheet when you no longer need it."]).getCell(1).font = font();

  const data = wb.addWorksheet("Data", { views: [{ state: "frozen", ySplit: 1 }] });
  data.addTable({
    name: "DataTable",
    ref: "A1",
    headerRow: true,
    style: { theme: "TableStyleLight1", showRowStripes: false },
    columns: [{ name: "Item" }, { name: "Category" }, { name: "Value" }, { name: "Notes" }],
    rows: [
      ["Example item", "Example category", 1, "Replace these rows with your data"],
      ["Example item", "Example category", 2, ""],
    ],
  });
  data.columns.forEach((col) => (col.width = 24));
  styleHeader(data.getRow(1));
  [2, 3].forEach((r) => data.getRow(r).eachCell((c) => (c.font = font())));

  const colours = wb.addWorksheet("Brand colours", { views: [{ state: "frozen", ySplit: 1 }] });
  colours.addTable({
    name: "ApprovedPairings",
    ref: "A1",
    headerRow: true,
    style: { theme: "TableStyleLight1", showRowStripes: false },
    columns: [{ name: "Text colour" }, { name: "Text hex" }, { name: "Background" }, { name: "Background hex" }, { name: "Contrast" }, { name: "Use for" }],
    rows: t.approvedPairs.map((p) => [p.fgName, p.fg, p.bgName, p.bg, formatRatio(p.ratio), p.allText ? "All text" : "Large text only"]),
  });
  colours.columns.forEach((col) => (col.width = 18));
  styleHeader(colours.getRow(1));
  for (let r = 2; r <= t.approvedPairs.length + 1; r++) colours.getRow(r).eachCell((c) => (c.font = font()));

  const out = new Uint8Array((await wb.xlsx.writeBuffer()) as ArrayBuffer);
  // New cells use the workbook's default font (xl/styles.xml), not the theme — set it to the brand font
  const fontName = t.font.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  return toTemplate(out, KINDS.excel, t, {
    "xl/styles.xml": (xml) => xml.replace(/<name val="Calibri"\/>/g, `<name val="${fontName}"/>`),
  });
}

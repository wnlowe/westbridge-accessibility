import JSZip from "jszip";
import { patchThemeXml, type OfficeTheme } from "./theme";
import type { TemplateKind } from "./kinds";

export { KINDS } from "./kinds";

// Post-processes a generated .pptx/.docx/.xlsx into a template:
//  1. writes the brand colours and fonts into the theme (theme1.xml)
//  2. switches the main part's content type from "document" to "template",
//     which is the only structural difference between e.g. .pptx and .potx
//     (Office Open XML, ECMA-376).

export async function toTemplate(
  data: ArrayBuffer | Uint8Array,
  kind: TemplateKind,
  theme: OfficeTheme,
  /** Extra per-part edits, e.g. the default font in xl/styles.xml */
  extraPatches: Record<string, (xml: string) => string> = {}
): Promise<Uint8Array> {
  const zip = await JSZip.loadAsync(data);

  const patch = async (path: string, fn: (xml: string) => string) => {
    const file = zip.file(path);
    if (!file) throw new Error(`Missing ${path} in generated file`);
    zip.file(path, fn(await file.async("string")));
  };

  await patch(kind.themePath, (xml) => patchThemeXml(xml, theme));
  await patch("[Content_Types].xml", (xml) => {
    if (!xml.includes(kind.documentType)) throw new Error("Unexpected content type in generated file");
    return xml.replace(kind.documentType, kind.templateType);
  });
  for (const [path, fn] of Object.entries(extraPatches)) await patch(path, fn);

  return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
}

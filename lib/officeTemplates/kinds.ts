// File-format details for each template type. Kept separate from package.ts
// so UI code can use them without pulling JSZip into the page bundle.

export interface TemplateKind {
  themePath: string;
  documentType: string; // main part content type in the generated file
  templateType: string; // main part content type for the template
  mimeType: string; // for the downloaded Blob
  extension: string;
}

const OOXML = "application/vnd.openxmlformats-officedocument";

export const KINDS = {
  powerpoint: {
    themePath: "ppt/theme/theme1.xml",
    documentType: `${OOXML}.presentationml.presentation.main+xml`,
    templateType: `${OOXML}.presentationml.template.main+xml`,
    mimeType: `${OOXML}.presentationml.template`,
    extension: "potx",
  },
  word: {
    themePath: "word/theme/theme1.xml",
    documentType: `${OOXML}.wordprocessingml.document.main+xml`,
    templateType: `${OOXML}.wordprocessingml.template.main+xml`,
    mimeType: `${OOXML}.wordprocessingml.template`,
    extension: "dotx",
  },
  excel: {
    themePath: "xl/theme/theme1.xml",
    documentType: `${OOXML}.spreadsheetml.sheet.main+xml`,
    templateType: `${OOXML}.spreadsheetml.template.main+xml`,
    mimeType: `${OOXML}.spreadsheetml.template`,
    extension: "xltx",
  },
} satisfies Record<string, TemplateKind>;

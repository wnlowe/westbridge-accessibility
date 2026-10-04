/** Saves data as a file via a temporary link (works on a static site, no server). */
export function saveFile(data: string | Uint8Array, filename: string, mimeType: string) {
  // Uint8Array<ArrayBufferLike> is a valid BlobPart at runtime; TS 5.7+ types are stricter
  const url = URL.createObjectURL(new Blob([data as BlobPart], { type: mimeType }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename; // the leave warning ignores download links (lib/useLeaveWarning.ts)
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function slugify(name: string, fallback = "brand"): string {
  return (name.trim() || fallback).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || fallback;
}

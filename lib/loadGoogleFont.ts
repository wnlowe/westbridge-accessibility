import { PRESET_FONTS, type CatalogueFont } from "@/lib/fontOptions";

// Loads a Google Font at runtime by adding a stylesheet <link> from the
// Google Fonts CSS API (https://developers.google.com/fonts/docs/css2).
// This sends a request to Google — the CSP in app/layout.tsx allows
// fonts.googleapis.com (CSS) and fonts.gstatic.com (font files).

export function loadGoogleFont(font: CatalogueFont): void {
  if (typeof document === "undefined") return;
  if (PRESET_FONTS.some((p) => p.family === font.f)) return; // already self-hosted

  const id = `gf-${font.f.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(id)) return;

  // Regular + bold when available (the preview uses bold headings); otherwise
  // whatever weight is closest to 400.
  const weights = font.w.length ? font.w : [400];
  const regular = weights.includes(400) ? 400 : weights.reduce((a, b) => (Math.abs(b - 400) < Math.abs(a - 400) ? b : a));
  const wanted = Array.from(new Set([regular, ...(weights.includes(700) ? [700] : [])])).sort((a, b) => a - b);

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.f).replace(/%20/g, "+")}:wght@${wanted.join(";")}&display=swap`;
  document.head.appendChild(link);
}

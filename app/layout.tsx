import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { SITE_NAME, SITE_URL, DOC_TITLE } from "@/lib/siteConfig";
import SiteHeader from "@/components/ui/SiteHeader";
import SiteFooter from "@/components/ui/SiteFooter";
import { NotesProvider } from "@/components/notes/NotesContext";
import NotesToggle from "@/components/notes/NotesToggle";

// GitHub Pages can't set response headers, so the CSP is delivered as a meta
// tag. (frame-ancestors is ignored in meta tags, so it is omitted.)
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  // Google Fonts: CSS API + font files, for fonts picked in the Typography step (lib/loadGoogleFont.ts)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${DOC_TITLE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Westbridge University's Digital Content Accessibility Guidelines: a guided brand walkthrough, quick-reference checklist and colour contrast checker.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={fontVariables}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
      </head>
      {/* suppressHydrationWarning: browser extensions add attributes to <body> (e.g. style="isolation: isolate")
          before React loads. Only affects this element's own attributes, not its children. */}
      <body
        className="flex min-h-screen flex-col bg-white font-sans text-base text-ink antialiased"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-amber focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to main content
        </a>
        <NotesProvider>
          <SiteHeader />
          <NotesToggle />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </NotesProvider>
      </body>
    </html>
  );
}

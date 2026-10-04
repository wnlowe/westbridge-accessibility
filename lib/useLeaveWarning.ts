"use client";

import { useEffect } from "react";

/**
 * While `active`, asks for confirmation before the visitor leaves the page —
 * by closing/reloading the tab (beforeunload) or by clicking a link
 * (including Next.js <Link>, which beforeunload doesn't cover).
 * Needed because nothing is saved in the browser.
 */
export function useLeaveWarning(active: boolean, message: string) {
  useEffect(() => {
    if (!active) return;

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // older browsers need this to show the prompt
    };

    // Capture phase on document runs before Next's <Link> handler (attached to the React root)
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
      if (samePage) return; // in-page anchors (e.g. skip link) are fine
      if (!window.confirm(message)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("click", onClick, true);
    };
  }, [active, message]);
}

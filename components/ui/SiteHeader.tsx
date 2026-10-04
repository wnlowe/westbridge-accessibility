"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/siteConfig";

const NAV_ITEMS = [
  { label: "Develop Your Brand", href: "/brand/", match: ["/brand", "/tutorial"] },
  { label: "Quick Reference", href: "/reference/", match: ["/reference"] },
  { label: "Contrast checker", href: "/tools/contrast/", match: ["/tools"] },
  { label: "In practice", href: "/in-practice/", match: ["/in-practice"] },
];

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="on-dark no-print bg-westbridge text-white">
      <div className="container-page flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-bold hover:underline">
          Westbridge University
          <span className="block text-sm font-normal text-mist">{SITE_NAME}</span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-base">
            {NAV_ITEMS.map((item) => {
              const active = item.match.some((m) => pathname.startsWith(m));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`underline-offset-4 hover:underline ${
                      active ? "font-bold underline decoration-amber decoration-2" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cvHref } from "@/content/site";

const TABS = [
  { href: "/about", label: "About me" },
  { href: "/research", label: "Research and publications" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact me" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="mx-auto w-full max-w-5xl px-5 py-6 font-sans">
      <nav
        aria-label="Main"
        className="flex flex-col gap-x-8 gap-y-2 sm:flex-row sm:flex-wrap sm:items-baseline"
      >
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="font-medium text-ink no-underline hover:underline sm:mr-auto"
        >
          Vamsi Sudersanam
        </Link>
        {TABS.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "border-b-2 border-cohort-a pb-0.5 text-ink no-underline"
                  : "pb-0.5 text-muted no-underline hover:text-ink"
              }
            >
              {label}
            </Link>
          );
        })}
        <a
          href={cvHref}
          target="_blank"
          rel="noopener noreferrer"
          className="pb-0.5 text-muted no-underline hover:text-ink"
        >
          CV
        </a>
      </nav>
    </header>
  );
}

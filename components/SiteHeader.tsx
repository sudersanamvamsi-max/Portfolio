"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NameBox from "@/components/NameBox";
import ThemeToggle from "@/components/ThemeToggle";

const TABS = [
  { href: "/about", label: "About me" },
  { href: "/research", label: "Research and publications" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact me" },
  { href: "/cv", label: "CV" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header w-full bg-header-bg font-sans text-header-fg">
      <nav
        aria-label="Main"
        className="relative mx-auto flex w-full max-w-5xl flex-col gap-x-8 gap-y-2 px-5 py-6 sm:flex-row sm:flex-wrap sm:items-start"
      >
        <span className="sm:mr-auto">
          <NameBox />
        </span>
        {TABS.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "border-b-2 border-header-accent pb-0.5 text-header-fg no-underline sm:mt-7"
                  : "pb-0.5 text-header-muted no-underline hover:text-header-fg sm:mt-7"
              }
            >
              {label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}

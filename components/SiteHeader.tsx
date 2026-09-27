"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The home page's h1 already carries the name, so the wordmark only appears on other routes.
export default function SiteHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <header className="mx-auto w-full max-w-5xl px-5 py-6 font-sans">
      <Link href="/" className="font-medium text-ink no-underline hover:underline">
        Vamsi Sudersanam
      </Link>
    </header>
  );
}

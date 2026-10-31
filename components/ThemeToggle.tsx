"use client";

import { useEffect } from "react";

// The theme is stored in localStorage and applied as data-theme on <html> by the inline
// script in app/layout.tsx before first paint. This button flips it. The label (which theme
// you will switch to) is chosen by CSS from data-theme, so server and client markup match.
function syncThemeColor() {
  const color = getComputedStyle(document.documentElement).getPropertyValue("--header-bg").trim();
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
    m.removeAttribute("media");
    m.setAttribute("content", color);
  });
}

export default function ThemeToggle() {
  useEffect(syncThemeColor, []);

  function toggle() {
    const root = document.documentElement;
    const dark =
      root.dataset.theme === "dark" ||
      (!root.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const next = dark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    syncThemeColor();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="self-start rounded border border-header-fg/40 px-3 py-1 text-sm text-header-fg hover:bg-header-fg/10 sm:absolute sm:right-5 sm:top-6"
    >
      <span className="theme-to-dark">Dark mode</span>
      <span className="theme-to-light">Light mode</span>
    </button>
  );
}

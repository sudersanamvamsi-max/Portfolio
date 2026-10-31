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

  const rays = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-3 grid size-8 place-items-center rounded-full text-header-fg hover:bg-header-fg/10"
    >
      <span className="sr-only theme-to-dark">Switch to dark mode</span>
      <span className="sr-only theme-to-light">Switch to light mode</span>
      {/* A moon on the light page, a sun on the dark page: the disc shrinks, the bite that
          makes the crescent slides away and the rays turn in. Pure CSS, driven by data-theme. */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="theme-icon size-5">
        <mask id="theme-moon-mask">
          <rect width="24" height="24" fill="white" />
          <circle className="theme-bite" cx="17" cy="8" r="7" fill="black" />
        </mask>
        <g mask="url(#theme-moon-mask)">
          <circle className="theme-disc" cx="12" cy="12" r="9" fill="currentColor" />
        </g>
        <g className="theme-rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {rays.map((deg) => (
            <line key={deg} x1="12" y1="1.5" x2="12" y2="4" transform={`rotate(${deg} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}

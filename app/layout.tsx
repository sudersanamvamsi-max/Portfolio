import type { ReactNode } from "react";
import { Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${publicSans.variable}`}>
      <body className="flex min-h-screen flex-col font-serif">
        <header className="mx-auto w-full max-w-5xl px-5 py-6 font-sans">
          <a href="/" className="font-medium text-ink no-underline hover:underline">
            Vamsi Sudersanam
          </a>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8">{children}</main>
        <footer className="mx-auto w-full max-w-5xl border-t border-grid px-5 py-6 font-sans text-sm text-muted">
          <p>
            <a href="mailto:sudersanamvamsi@gmail.com">sudersanamvamsi@gmail.com</a>
            {" · "}
            <a href="https://github.com/Vamsichris04">GitHub</a>
            {" · "}
            <a href="https://linkedin.com/in/sudersanam">LinkedIn</a>
          </p>
        </footer>
      </body>
    </html>
  );
}

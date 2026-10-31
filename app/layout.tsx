import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Newsreader, Public_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import { pageMetadata, siteUrl } from "@/lib/meta";
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata(
    null,
    "Clinical machine learning researcher and software engineer: survival models for ICU patients on non-invasive respiratory support, and the software around them.",
    "/",
  ),
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

// Mobile browser bar matches the header band; same values as --header-bg in globals.css.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1c2b36" },
    { media: "(prefers-color-scheme: dark)", color: "#f5f7f8" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${newsreader.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Apply the stored (or OS) theme before first paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-serif">
        <SiteHeader />
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

import type { Metadata } from "next";

export const siteUrl = "https://vamsi-sudersanam.com";
const siteName = "Vamsi Sudersanam";
const ogImage = { url: "/og.png", width: 1200, height: 630, alt: siteName };

// Per-route metadata. openGraph and twitter replace (not merge with) the layout's, so
// each route spells out the image itself.
export function pageMetadata(title: string | null, description: string, path: string): Metadata {
  const full = title ? `${title} — ${siteName}` : siteName;
  return {
    title: title ? { absolute: full } : { absolute: siteName },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      title: full,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: full, description, images: [ogImage.url] },
  };
}

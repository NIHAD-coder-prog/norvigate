import type { Metadata } from "next";
import { locales, ogLocaleOf, pick, type Locale, type LText } from "@/i18n/config";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://norvigate.com").replace(/\/+$/, "");
export const ALLOW_INDEXING = process.env.NORVIGATE_ALLOW_INDEXING === "true";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

interface MetaInput {
  locale: Locale;
  /** Path WITHOUT the locale prefix, starting with "/" or "" for home. */
  path: string;
  title: string;
  description: string;
}

/** Per-page metadata: title, description, canonical, hreflang alternates, Open Graph and Twitter cards. */
export function buildMetadata({ locale, path, title, description }: MetaInput): Metadata {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(`/${l}${path}`);
  languages["x-default"] = absoluteUrl(`/en${path}`);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: absoluteUrl(`/${locale}${path}`), languages },
    robots: ALLOW_INDEXING ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: "NORVIGATE",
      title,
      description,
      url: absoluteUrl(`/${locale}${path}`),
      locale: ogLocaleOf(locale),
      alternateLocale: locales.filter((l) => l !== locale).map(ogLocaleOf),
      images: [{ url: "/brand/og-image.jpg", width: 1200, height: 628, alt: "NORVIGATE — Your Gateway to the World's Cities" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/brand/og-image.jpg"] },
  };
}

export function t(text: LText, locale: Locale): string {
  return pick(text, locale);
}

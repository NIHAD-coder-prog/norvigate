import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDirection, isComplete, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Providers } from "@/components/client/Providers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Notice } from "@/components/ui";
import { SITE_URL, ALLOW_INDEXING } from "@/lib/seo";

export const viewport: Viewport = { themeColor: "#08192f", width: "device-width", initialScale: 1 };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = isLocale(locale) ? await getDictionary(locale) : await getDictionary("en");
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${dict.meta.siteName} — ${dict.meta.tagline}`, template: "%s" },
    description: dict.meta.description,
    robots: ALLOW_INDEXING ? undefined : { index: false, follow: false },
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/brand/favicon-64.png", sizes: "64x64", type: "image/png" }], apple: "/brand/favicon-180.png" },
  };
}

/** Rendered per request so the middleware nonce can be applied (strict CSP). */
export const dynamic = "force-dynamic";

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const dir = getDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <head>
        {/* Preload only the faces this page direction needs (self-hosted, no third-party requests). */}
        {(dir === "rtl"
          ? ["noto-naskh-arabic-arabic-wght-normal", "amiri-arabic-700-normal"]
          : ["literata-latin-wght-normal", "cormorant-latin-wght-normal"]
        ).map((f) => (
          <link key={f} rel="preload" as="font" type="font/woff2" href={`/fonts/${f}.woff2`} crossOrigin="anonymous" />
        ))}
      </head>
      <body>
        <a className="skip-link" href="#main">{dict.common.skipToContent}</a>
        <Providers locale={locale} currencyLabels={dict.currency}>
          <SiteHeader locale={locale} dict={dict} />
          {!isComplete(locale) ? (
            <div className="container" style={{ paddingBlockStart: "1rem" }}>
              <Notice tone="warn" title={dict.lang.partialTitle}>{dict.lang.partialText}</Notice>
            </div>
          ) : null}
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter locale={locale} dict={dict} />
        </Providers>
      </body>
    </html>
  );
}

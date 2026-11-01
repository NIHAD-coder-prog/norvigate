import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { collections } from "@/data";
import { SITE_URL } from "@/lib/seo";

const staticPaths = [
  "",
  "/cities",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/istanbul/store/terms",
  "/istanbul/store/shipping-returns",
  "/currency",
  "/istanbul",
  "/istanbul/services",
  "/istanbul/experiences",
  "/istanbul/travel",
  "/istanbul/flights",
  "/istanbul/hotels",
  "/istanbul/translation",
  "/istanbul/store",
  "/istanbul/store/cart",
  "/istanbul/guide",
  "/istanbul/faq",
  "/istanbul/search",
  "/istanbul/list-your-business",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicPaths = [
    ...collections.providers.map((p) => `/istanbul/services/${p.slug}`),
    ...collections.travelServices.map((s) => `/istanbul/travel/${s.slug}`),
    ...collections.products.map((p) => `/istanbul/store/${p.slug}`),
  ];
  const all = [...staticPaths, ...dynamicPaths];
  return all.flatMap((path) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}${path}`,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}${path}`])) },
    })),
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { href as mkHref } from "@/lib/href";
import { buildMetadata } from "@/lib/seo";

export type LocaleParams = { params: Promise<{ locale: string }> };

export interface PageCtx {
  locale: Locale;
  dict: Dictionary;
  /** Locale-prefixed internal link. */
  h: (path?: string) => string;
}

/** Resolves the locale from route params, loads the dictionary, or renders the 404 page. */
export async function getCtx(params: Promise<{ locale: string }>): Promise<PageCtx> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return { locale, dict, h: (p = "") => mkHref(locale, p) };
}

export async function makeMeta(
  params: Promise<{ locale: string }>,
  path: string,
  pick: (d: Dictionary) => { title: string; description: string },
): Promise<Metadata> {
  const { locale, dict } = await getCtx(params);
  const { title, description } = pick(dict);
  return buildMetadata({ locale, path, title: path.startsWith("/istanbul") || path === "" ? `${title} | NORVIGATE` : `${title} | NORVIGATE`, description });
}

/**
 * Language registry: the single place that decides which languages the site serves.
 *
 * To add a language:   npm run i18n:add -- <code>     (for example fr, pt-br, he, ur)
 *   1. creates src/i18n/dictionaries/<code>.ts   (starts empty; every missing string falls back to English)
 *   2. registers it below and in dictionaries/index.ts
 * Translate the dictionary and any content in src/data at your own pace. Missing strings show English,
 * and the site shows a visible "partly translated" notice until the language is flagged `complete`.
 *
 * `complete: true` is a claim that the UI dictionary AND all content in src/data are translated.
 * `npm run i18n:check` verifies the claim and fails if it is false.
 */
export type Locale = string;
export type Direction = "ltr" | "rtl";
export const LOCALE_COOKIE = "NV_LOCALE";

export interface LanguageEntry {
  /** Lower-case BCP-47 tag used in URLs, for example "en" or "pt-br". */
  code: string;
  /** Tag for Intl number/date formatting (for example Arabic with Latin digits). Defaults to `code`. */
  intl?: string;
  /** Open Graph locale, for example "en_US". Defaults to `code` with "_". */
  ogLocale?: string;
  /** Force a direction. Normally detected from the language. */
  dir?: Direction;
  /** Set false to keep a language registered but hidden from the switcher and not routable. */
  enabled?: boolean;
  /** UI dictionary and all src/data content fully translated (verified by i18n:check). */
  complete?: boolean;
}

export const languages: LanguageEntry[] = [
  { code: "en", intl: "en-US", ogLocale: "en_US", complete: true },
  { code: "tr", intl: "tr-TR", ogLocale: "tr_TR", complete: true },
  // Latin digits for Arabic so prices, dates and phone numbers read the same across languages.
  { code: "ar", intl: "ar-u-nu-latn", ogLocale: "ar_AR", complete: true },
  { code: "es", intl: "es-ES", ogLocale: "es_ES", complete: true },
  { code: "fr", intl: "fr-FR", ogLocale: "fr_FR", complete: true },
  // <<ADD-LANGUAGE>>  (scripts/add-language.mjs inserts new entries above this line)
];

export const defaultLocale: Locale = "en";
export const locales: readonly Locale[] = languages.filter((l) => l.enabled !== false).map((l) => l.code);

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && locales.includes(value);
}

export function baseLang(code: string): string {
  return code.split("-")[0].toLowerCase();
}

function entryOf(code: string): LanguageEntry | undefined {
  return languages.find((l) => l.code === code);
}

/** Languages written right-to-left (primary subtags). */
const RTL_LANGS = new Set(["ar", "arc", "azb", "ckb", "dv", "fa", "he", "iw", "ks", "prs", "ps", "sd", "ug", "ur", "yi"]);

export function getDirection(code: Locale): Direction {
  const e = entryOf(code);
  if (e?.dir) return e.dir;
  return RTL_LANGS.has(baseLang(code)) ? "rtl" : "ltr";
}

export function intlTag(code: Locale): string {
  return entryOf(code)?.intl ?? code;
}

export function ogLocaleOf(code: Locale): string {
  return entryOf(code)?.ogLocale ?? code.replace("-", "_");
}

export function isComplete(code: Locale): boolean {
  return entryOf(code)?.complete === true;
}

const displayNameCache = new Map<string, Intl.DisplayNames>();

/** Name of a language in the language itself (for example "Español" or "العربية"). Works for any BCP-47 code. */
export function nativeName(code: Locale): string {
  try {
    let dn = displayNameCache.get(code);
    if (!dn) {
      dn = new Intl.DisplayNames([code], { type: "language" });
      displayNameCache.set(code, dn);
    }
    const name = dn.of(code);
    if (name && name !== code) return name.charAt(0).toLocaleUpperCase(code) + name.slice(1);
  } catch {
    /* fall through */
  }
  return code.toUpperCase();
}

export function shortName(code: Locale): string {
  return baseLang(code).toUpperCase();
}

/**
 * A string available in several languages. `en` is required and is the fallback for every other language,
 * so a missing translation degrades to English instead of breaking the page.
 */
export type LText = { en: string } & Partial<Record<string, string>>;

/** Positional helper for the four launch languages: English, Turkish, Arabic, Spanish. */
export function L(en: string, tr?: string, ar?: string, es?: string): LText {
  const t: LText = { en };
  if (tr) t.tr = tr;
  if (ar) t.ar = ar;
  if (es) t.es = es;
  return t;
}

/** Object helper for any further language: LX("Hello", { fr: "Bonjour", de: "Hallo" }). */
export function LX(en: string, others: Record<string, string>): LText {
  return { ...others, en };
}

/** Choose a translation: exact code, then base language, then English. Empty strings count as missing. */
export function pick(text: LText, locale: Locale): string {
  return text[locale] || text[baseLang(locale)] || text.en;
}

/** Replace {placeholders} in a dictionary string. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => (key in vars ? String(vars[key]) : `{${key}}`));
}

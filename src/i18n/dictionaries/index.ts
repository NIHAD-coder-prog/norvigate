import { baseLang, type Locale } from "../config";
import { deepMerge, type DeepPartial } from "../merge";
import { en, type Dictionary } from "./en";

export type { Dictionary } from "./en";
export type PartialDictionary = DeepPartial<Dictionary>;

type Loader = () => Promise<PartialDictionary>;

/**
 * One loader per translated language. Each language is its own chunk, loaded only when that language is requested.
 * `npm run i18n:add` appends entries above the marker.
 */
export const dictionaryLoaders: Record<string, Loader> = {
  tr: async () => (await import("./tr")).tr,
  ar: async () => (await import("./ar")).ar,
  es: async () => (await import("./es")).es,
  // <<ADD-DICTIONARY>>
};

const cache = new Map<string, Dictionary>();

/** English dictionary overlaid with the requested language. Missing strings fall back to English. */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  if (locale === "en") return en;
  const hit = cache.get(locale);
  if (hit) return hit;
  const loader = dictionaryLoaders[locale] ?? dictionaryLoaders[baseLang(locale)];
  const merged = loader ? deepMerge(en, await loader()) : en;
  cache.set(locale, merged);
  return merged;
}

export { en };

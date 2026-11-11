import type { Locale } from "@/i18n/config";
import { baseLang } from "@/i18n/config";
import type { LegalPack } from "./types";

export type { LegalPack, LegalDoc } from "./types";

const loaders: Record<string, () => Promise<LegalPack>> = {
  en: async () => (await import("./en")).en,
  tr: async () => (await import("./tr")).tr,
  ar: async () => (await import("./ar")).ar,
  es: async () => (await import("./es")).es,
  fr: async () => (await import("./fr")).fr,
};

/** Legal text for a language. Never falls back silently to another language except English for a language with no legal text yet. */
export async function getLegal(locale: Locale): Promise<LegalPack> {
  const load = loaders[locale] ?? loaders[baseLang(locale)] ?? loaders.en;
  return load();
}

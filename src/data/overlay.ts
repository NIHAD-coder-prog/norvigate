import type { LText } from "@/i18n/config";

/** Names of the content collections that can receive translation overlays. */
export type CollectionName =
  | "cities"
  | "providerCategories"
  | "providers"
  | "experiences"
  | "travelServices"
  | "products"
  | "faqItems"
  | "guideSections"
  | "externalLinks"
  | "allergenLabels";

/**
 * A translation overlay for ONE language. It mirrors the shape of the data, keyed by collection and then by item id
 * (or by key for allergenLabels), with plain strings where the data has an LText, and arrays aligned by index:
 *
 *   providers: { "p-guesthouse": { name: "Maison d'hôtes", summary: "…", description: "…", area: "Fatih" } },
 *   products:  { "pr-lokum": { name: "…", variants: [{ label: "Boîte de 250 g" }, { label: "Boîte de 500 g" }] } },
 *
 * Anything the overlay omits falls back to English, so a language can be translated gradually.
 */
export type ContentOverlay = Partial<Record<CollectionName, Record<string, unknown>>>;

type Rec = Record<string, unknown>;
const isObj = (v: unknown): v is Rec => typeof v === "object" && v !== null && !Array.isArray(v);
export const isLText = (v: unknown): v is LText => isObj(v) && typeof v.en === "string";

/** Copies translated strings from `source` onto the matching LText objects in `target`. Mutates `target`. */
export function mergeOverlay(target: unknown, source: unknown, lang: string): void {
  if (isLText(target)) {
    if (typeof source === "string" && source.trim() !== "") target[lang] = source;
    return;
  }
  if (Array.isArray(target) && Array.isArray(source)) {
    source.forEach((s, i) => {
      if (i < target.length) mergeOverlay(target[i], s, lang);
    });
    return;
  }
  if (isObj(target) && isObj(source)) {
    for (const k of Object.keys(source)) if (k in target) mergeOverlay(target[k], source[k], lang);
  }
}

/** Walks any data structure and yields every LText with its path. Used by the translation coverage check. */
export function* walkLTexts(node: unknown, path = ""): Generator<{ path: string; text: LText }> {
  if (isLText(node)) {
    yield { path, text: node };
  } else if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) yield* walkLTexts(node[i], `${path}[${i}]`);
  } else if (isObj(node)) {
    for (const k of Object.keys(node)) yield* walkLTexts(node[k], path ? `${path}.${k}` : k);
  }
}

import { cities } from "./cities";
import { providerCategories } from "./categories";
import { providers } from "./providers";
import { experiences } from "./experiences";
import { travelServices } from "./travel";
import { products } from "./products";
import { faqItems } from "./faq";
import { guideSections } from "./guide";
import { externalLinks } from "./external-links";
import { allergenLabels } from "./allergens";
import { contentOverlays } from "./translations";
import { mergeOverlay, type CollectionName } from "./overlay";

/** Every translatable content collection. The data layer (src/lib/repo.ts) is the only normal consumer. */
export const collections = {
  cities,
  providerCategories,
  providers,
  experiences,
  travelServices,
  products,
  faqItems,
  guideSections,
  externalLinks,
  allergenLabels,
} satisfies Record<CollectionName, unknown>;

let applied = false;

/** Applies the per-language overlays once, at first use. Safe to call repeatedly. */
export function applyContentOverlays(): void {
  if (applied) return;
  applied = true;
  for (const [lang, overlay] of Object.entries(contentOverlays)) {
    for (const [name, items] of Object.entries(overlay)) {
      const collection = (collections as Record<string, unknown>)[name];
      if (!collection || typeof items !== "object" || items === null) continue;
      for (const [key, translated] of Object.entries(items as Record<string, unknown>)) {
        const target = Array.isArray(collection)
          ? collection.find((x: { id?: string }) => x.id === key)
          : (collection as Record<string, unknown>)[key];
        if (target) mergeOverlay(target, translated, lang);
      }
    }
  }
}

applyContentOverlays();

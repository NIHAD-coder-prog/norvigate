import type { Product } from "./types";

/**
 * REAL products for the live store (STORE_MODE=live). Empty on purpose: nothing real has been supplied yet.
 *
 * To add one, copy the shape of a sample product in ./products.ts and set:
 *   dataStatus: "verified"           (only after you have checked every field against the real product and label)
 *   allergens: { status: "verified", contains: [...] }
 *   variants[].weightGrams, variants[].priceMinor (kuruş, TRY), ingredients, shelfLifeDays, storage
 *   shipping.destinations: at least one rule with status "enabled" (e.g. { country: "TR", status: "enabled" })
 *   fulfilment: { status: "configured" }, taxes: { disclosure: "included" }
 *
 * The readiness check (src/store-live/readiness.ts) refuses to open checkout while any of this is missing.
 */
export const liveProducts: Product[] = [];

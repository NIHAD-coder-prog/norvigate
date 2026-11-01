/**
 * Shipping configuration. The rates below are PLACEHOLDERS for testing the flow. They are NOT carrier quotes.
 * Before going live: get written quotes from your carrier(s), replace the numbers, then set ratesConfirmed to true.
 * Checkout stays closed while ratesConfirmed is false. Amounts are in kuruş (TRY minor units). Weights in grams.
 * Add a country to a zone only after you have reviewed that country's food import rules.
 */
export interface RateBand { upToGrams: number; priceMinor: number }
export interface ShippingZone { id: string; countries: string[]; bands: RateBand[]; perExtraKgMinor: number; maxGrams: number; etaDays: [number, number] }
export interface ShippingConfig { currency: "TRY"; ratesConfirmed: boolean; packagingGrams: number; zones: ShippingZone[] }

export const shippingConfig: ShippingConfig = {
  currency: "TRY",
  ratesConfirmed: false,
  packagingGrams: 150,
  zones: [
    { id: "TR", countries: ["TR"], bands: [{ upToGrams: 1000, priceMinor: 9900 }, { upToGrams: 3000, priceMinor: 14900 }, { upToGrams: 10000, priceMinor: 24900 }], perExtraKgMinor: 2500, maxGrams: 30000, etaDays: [1, 4] },
    { id: "GCC", countries: ["AE", "SA", "QA", "KW", "BH", "OM"], bands: [{ upToGrams: 1000, priceMinor: 89900 }, { upToGrams: 3000, priceMinor: 139900 }], perExtraKgMinor: 30000, maxGrams: 10000, etaDays: [4, 10] },
  ],
};

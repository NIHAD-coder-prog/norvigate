import { products } from "../src/data/products";
import type { Product } from "../src/data/types";
import { shippingConfig } from "../src/store-live/shipping-config";
import type { ShippingConfig } from "../src/store-live/shipping-config";
import type { BusinessIdentity } from "../src/store-live/business";
import { loadStoreConfig } from "../src/store-live/config";

/** TEST fixture: a "verified" product derived from a sample. Never shipped in the site's data. */
export function verifiedProduct(): Product {
  const p = structuredClone(products[0]);
  p.dataStatus = "verified";
  p.allergens = { ...p.allergens, status: "verified" };
  p.shipping.destinations = [{ country: "TR", status: "enabled", reviewItems: [] }, { country: "AE", status: "enabled", reviewItems: [] }, { country: "*", status: "notEnabled", reviewItems: [] }] as Product["shipping"]["destinations"];
  return p;
}
export const confirmedShipping = (): ShippingConfig => ({ ...structuredClone(shippingConfig), ratesConfirmed: true });
export const fullBusiness = (): BusinessIdentity => ({
  isCompany: true, legalName: "Test Ltd", taxOffice: "Test", taxNumber: "1234567890", mersis: "0123456789012345",
  address: "Test address 1", email: "a@b.co", phone: "+900000000000", kepAddress: null, foodRegistration: "TEST-1",
});
export const liveEnv = { NODE_ENV: "production", STORE_MODE: "live", PAYMENT_PROVIDER: "iyzico", IYZICO_API_KEY: "k", IYZICO_SECRET_KEY: "s", NEXT_PUBLIC_SITE_URL: "https://example.com" };
export const liveConfig = (over: Record<string, string> = {}) => loadStoreConfig({ ...liveEnv, ...over });

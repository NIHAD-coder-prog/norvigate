import { products } from "@/data/products";
import type { Product } from "@/data/types";
import { shippingConfig, type ShippingConfig } from "./shipping-config";
import type { BusinessIdentity } from "./business";

/**
 * TEST-ONLY fixtures, used when STORE_TEST_FIXTURE=1 outside production. They let the end-to-end tests exercise the real
 * checkout path with a fully "ready" store. Every value is obviously fake. The readiness check refuses this switch in production.
 */
export function fixtureProducts(): Product[] {
  const p = structuredClone(products[0]);
  p.id = "fx-lokum";
  p.slug = "test-fixture-lokum";
  p.dataStatus = "verified";
  p.allergens = { ...p.allergens, status: "verified" };
  p.shipping.destinations = [
    { country: "TR", status: "enabled", reviewItems: [] },
    { country: "AE", status: "enabled", reviewItems: [] },
    { country: "*", status: "notEnabled", reviewItems: [] },
  ] as Product["shipping"]["destinations"];
  return [p];
}
export const fixtureShipping = (): ShippingConfig => ({ ...structuredClone(shippingConfig), ratesConfirmed: true });
export const fixtureBusiness = (): BusinessIdentity => ({
  isCompany: true, legalName: "TEST FIXTURE Ltd.", taxOffice: "Test", taxNumber: "0000000000", mersis: "0000000000000000",
  address: "1 Test Street, Istanbul", email: "test@example.invalid", phone: "+900000000000", kepAddress: null, foodRegistration: "TEST-0",
});

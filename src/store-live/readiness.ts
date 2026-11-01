import type { Product } from "@/data/types";
import type { BusinessIdentity } from "./business";
import { requiredBusinessFields } from "./business";
import type { ShippingConfig } from "./shipping-config";
import type { StoreConfig } from "./config";

export interface Readiness {
  ready: boolean;
  /** Machine-readable codes. Shown to the owner (CLI, server log), never to visitors. */
  issues: string[];
}

const blank = (v: string | null | undefined) => v == null || v.trim() === "";

/**
 * Live checkout opens only when EVERYTHING below is true. Pure function: it reads nothing from the environment,
 * so it can be tested with any inputs.
 */
export function checkReadiness(input: {
  config: StoreConfig;
  business: BusinessIdentity;
  shipping: ShippingConfig;
  products: Product[];
}): Readiness {
  const { config, business, shipping, products } = input;
  const issues: string[] = [];

  if (config.mode !== "live") issues.push("mode.notLive");

  // test-only switches never reach production
  if (config.production && config.allowSample) issues.push("testSwitch.allowSampleInProduction");
  if (config.production && config.testFixture) issues.push("testSwitch.fixtureInProduction");
  if (config.production && config.allowMock) issues.push("testSwitch.allowMockInProduction");
  if (config.production && config.provider === "mock") issues.push("provider.mockInProduction");
  if (config.provider === "mock" && !config.allowMock) issues.push("provider.mockNotAllowed");

  // seller identity
  if (business.isCompany === null) issues.push("business.isCompany");
  for (const f of requiredBusinessFields) if (blank(business[f] as string | null)) issues.push(`business.${f}`);
  if (business.isCompany === true && blank(business.mersis)) issues.push("business.mersis");

  // shipping
  if (!shipping.ratesConfirmed) issues.push("shipping.ratesNotConfirmed");
  if (shipping.zones.length === 0) issues.push("shipping.noZones");

  // products
  if (products.length === 0) issues.push("products.none");
  for (const p of products) {
    const id = p.id;
    if (p.dataStatus !== "verified" && !config.allowSample) issues.push(`product.${id}.notVerified`);
    if (p.allergens.status !== "verified" && !config.allowSample) issues.push(`product.${id}.allergensNotVerified`);
    if (!p.ingredients) issues.push(`product.${id}.ingredients`);
    if (!p.shelfLifeDays) issues.push(`product.${id}.shelfLife`);
    if (!p.variants.length) issues.push(`product.${id}.variants`);
    for (const v of p.variants) {
      if (!(v.weightGrams > 0)) issues.push(`product.${id}.${v.id}.weight`);
      if (!(v.priceMinor > 0)) issues.push(`product.${id}.${v.id}.price`);
    }
    if (!p.shipping.destinations.some((d) => d.status === "enabled")) issues.push(`product.${id}.noEnabledDestination`);
  }

  // payment
  if (config.provider === "iyzico") {
    if (blank(config.iyzico.apiKey)) issues.push("payment.iyzicoApiKey");
    if (blank(config.iyzico.secretKey)) issues.push("payment.iyzicoSecretKey");
    if (!/^https:\/\//.test(config.iyzico.baseUrl)) issues.push("payment.iyzicoBaseUrl");
  }

  // site address
  const localOk = !config.production && /^http:\/\/localhost(:\d+)?$/.test(config.siteUrl); // local testing only
  if (!/^https:\/\/[^/]+/.test(config.siteUrl) && !localOk) issues.push("site.urlNotHttps");

  return { ready: issues.length === 0, issues };
}

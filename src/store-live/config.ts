/**
 * Store configuration read from the environment.
 *   STORE_MODE=request (default)  browsing, cart and a validated order REQUEST. No payment.
 *   STORE_MODE=live               live checkout, only if the readiness check passes.
 *   STORE_ALLOW_SAMPLE=1          TEST ONLY: allows SAMPLE products to be sold. Refused in production.
 *   STORE_ALLOW_MOCK=1            TEST ONLY: allows the mock payment provider. Refused in production.
 */
export type StoreMode = "request" | "live";

export interface StoreConfig {
  mode: StoreMode;
  allowSample: boolean;
  allowMock: boolean;
  /** TEST ONLY: swap in fake seller, rates and product so end-to-end tests can run the real checkout. Refused in production. */
  testFixture: boolean;
  provider: "iyzico" | "mock";
  iyzico: { apiKey: string; secretKey: string; baseUrl: string };
  siteUrl: string;
  production: boolean;
  /** Used for the buyer identity number iyzico requires when the buyer does not give one. */
  defaultIdentityNumber: string;
}

const truthy = (v: string | undefined) => v === "1" || v === "true";

export function loadStoreConfig(env: Record<string, string | undefined> = process.env): StoreConfig {
  const production = env.NODE_ENV === "production";
  const allowMock = truthy(env.STORE_ALLOW_MOCK);
  const wantsMock = (env.PAYMENT_PROVIDER || "iyzico") === "mock";
  const sandbox = truthy(env.IYZICO_SANDBOX);
  return {
    mode: env.STORE_MODE === "live" ? "live" : "request",
    allowSample: truthy(env.STORE_ALLOW_SAMPLE),
    allowMock,
    testFixture: truthy(env.STORE_TEST_FIXTURE),
    provider: wantsMock ? "mock" : "iyzico",
    iyzico: {
      apiKey: env.IYZICO_API_KEY || "",
      secretKey: env.IYZICO_SECRET_KEY || "",
      baseUrl: env.IYZICO_BASE_URL || (sandbox ? "https://sandbox-api.iyzipay.com" : "https://api.iyzipay.com"),
    },
    siteUrl: (env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, ""),
    production,
    defaultIdentityNumber: env.IYZICO_DEFAULT_IDENTITY || "",
  };
}

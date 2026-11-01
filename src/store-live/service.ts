import "server-only";
import { collections } from "@/data";
import { liveProducts } from "@/data/live-products";
import type { Product } from "@/data/types";
import { business } from "./business";
import { shippingConfig, type ShippingConfig } from "./shipping-config";
import { fixtureBusiness, fixtureProducts, fixtureShipping } from "./test-fixture";
import { loadStoreConfig, type StoreConfig } from "./config";
import { checkReadiness, type Readiness } from "./readiness";
import { quote, type Quote, type QuoteError } from "./pricing";
import { validateBuyer, type BuyerErrors } from "./buyer";
import { IyzicoProvider } from "./iyzico";
import { MockProvider } from "./mock-provider";
import type { PaymentProvider } from "./provider";
import { verifyPayment } from "./settlement";
import { getOrder, hashToken, markPaid, markPaymentFailed, newAccessToken, newOrderId, saveNewOrder, tokenMatches, updateOrder, type OrderRecord } from "./orders";
import { notify } from "@/lib/notify";

export function storeConfig(): StoreConfig {
  return loadStoreConfig();
}

/** The catalogue that can be sold: real products, plus samples only when the test-only switch is on (never in production). */
export const useFixture = (config: StoreConfig) => config.testFixture && !config.production;
export function activeShipping(config = storeConfig()): ShippingConfig {
  return useFixture(config) ? fixtureShipping() : shippingConfig;
}
export function sellableProducts(config = storeConfig()): Product[] {
  if (useFixture(config)) return fixtureProducts();
  return config.allowSample && !config.production ? [...liveProducts, ...collections.products] : liveProducts;
}

/** Products shown in the store pages: samples in request mode, real products in live mode. */
export function storefrontProducts(config = storeConfig()): Product[] {
  if (useFixture(config) && config.mode === "live") return fixtureProducts();
  return config.mode === "live" ? sellableProducts(config) : collections.products;
}

export function readiness(config = storeConfig()): Readiness {
  return checkReadiness({ config, business: useFixture(config) ? fixtureBusiness() : business, shipping: activeShipping(config), products: sellableProducts(config) });
}

export function getProvider(config = storeConfig()): PaymentProvider {
  if (config.provider === "mock") return new MockProvider(config.siteUrl);
  return new IyzicoProvider(config.iyzico);
}

export type StartResult =
  | { ok: true; orderId: string; accessToken: string; paymentPageUrl: string; quote: Quote }
  | { ok: false; error: "closed" | "validation" | "quote" | "provider"; errors?: BuyerErrors; quoteError?: QuoteError };

export async function startCheckout(
  body: { lines: unknown; buyer: Record<string, unknown>; locale: string },
  opts: { clientIp?: string; config?: StoreConfig; provider?: PaymentProvider } = {},
): Promise<StartResult> {
  const config = opts.config ?? storeConfig();
  const ready = readiness(config);
  if (!ready.ready) {
    console.error("[store] checkout refused, not ready:", ready.issues.join(", "));
    return { ok: false, error: "closed" };
  }
  const { values, errors } = validateBuyer(body.buyer, { shipping: activeShipping(config), identityRequired: !config.defaultIdentityNumber });
  if (Object.keys(errors).length) return { ok: false, error: "validation", errors };

  const q = quote({ lines: body.lines, country: values.country }, { products: sellableProducts(config), shipping: activeShipping(config), allowSample: config.allowSample && !config.production });
  if (!q.ok) return { ok: false, error: "quote", quoteError: q.error };

  const id = newOrderId();
  const accessToken = newAccessToken();
  const now = new Date().toISOString();
  const provider = opts.provider ?? getProvider(config);
  const order: OrderRecord = {
    id, createdAt: now, updatedAt: now, locale: body.locale, status: "pending_payment", accessTokenHash: hashToken(accessToken),
    buyer: { name: values.name, surname: values.surname, email: values.email, phone: values.phone, identityNumber: values.identityNumber || config.defaultIdentityNumber },
    address: { contactName: `${values.name} ${values.surname}`, address: values.address, city: values.city, country: values.country, zip: values.zip },
    quote: q.quote, provider: { name: provider.name }, events: [{ at: now, type: "order.created", to: "pending_payment" }],
  };
  await saveNewOrder(order);

  const callbackUrl = `${config.siteUrl}/api/store/callback?order=${id}&t=${accessToken}`;
  try {
    const session = await provider.createCheckout({ orderId: id, quote: q.quote, buyer: order.buyer, address: order.address, callbackUrl, locale: body.locale, clientIp: opts.clientIp });
    await updateOrder(id, (o) => { o.provider.token = session.token; });
    return { ok: true, orderId: id, accessToken, paymentPageUrl: session.paymentPageUrl, quote: q.quote };
  } catch (err) {
    console.error("[store] provider checkout failed", err instanceof Error ? err.message : err);
    await markPaymentFailed(id, "provider initialize failed");
    return { ok: false, error: "provider" };
  }
}

export type CallbackOutcome = "paid" | "alreadyPaid" | "failed" | "rejected";

/** The callback POST is untrusted. Nothing in it is believed: we always ask the provider server-side. */
export async function handleCallback(
  input: { orderId: string; accessToken: string; providerToken: string },
  opts: { config?: StoreConfig; provider?: PaymentProvider } = {},
): Promise<{ outcome: CallbackOutcome; reason?: string }> {
  const order = await getOrder(input.orderId);
  if (!order || !tokenMatches(input.accessToken, order.accessTokenHash)) return { outcome: "rejected", reason: "order" };
  if (!input.providerToken || input.providerToken !== order.provider.token) return { outcome: "rejected", reason: "token" };
  if (order.status === "paid" || order.status === "shipped" || order.status === "delivered") return { outcome: "alreadyPaid" };

  const config = opts.config ?? storeConfig();
  const provider = opts.provider ?? getProvider(config);
  let result;
  try {
    result = await provider.retrieve(input.providerToken, order.id);
  } catch (err) {
    console.error("[store] retrieve failed", err instanceof Error ? err.message : err);
    return { outcome: "rejected", reason: "retrieve" };
  }
  const v = verifyPayment(order, result);
  if (v.ok) {
    const { changed } = await markPaid(order.id, result.paymentId, "verified with provider");
    if (changed) void notify("order.paid", { id: order.id, totalMinor: order.quote.totalMinor });
    return { outcome: changed ? "paid" : "alreadyPaid" };
  }
  // a clean provider-side failure is recorded; anything suspicious (amount, signature, ids) is NOT marked paid and is logged
  if (v.reason === "notSuccess") {
    await markPaymentFailed(order.id, `provider status ${result.paymentStatus || "unknown"}`);
    return { outcome: "failed", reason: v.reason };
  }
  console.error("[store] payment verification failed", order.id, v.reason);
  return { outcome: "rejected", reason: v.reason };
}

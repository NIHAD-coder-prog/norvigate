import { test } from "node:test";
import assert from "node:assert/strict";
import { verifiedProduct, confirmedShipping, fullBusiness, liveConfig } from "./fixtures";
import { quote } from "../src/store-live/pricing";
import { checkReadiness } from "../src/store-live/readiness";
import { products as sampleProducts } from "../src/data/products";
import { authHeaders, responseSignature, hmacHex } from "../src/store-live/iyzico";
import { parseDecimalToMinor, toDecimal, trimZeros } from "../src/store-live/money";
import { verifyPayment } from "../src/store-live/settlement";
import { validateBuyer } from "../src/store-live/buyer";
import { applyTransition, hashToken, isOrderId, newAccessToken, newOrderId, tokenMatches, TransitionError, type OrderRecord } from "../src/store-live/orders";
import type { PaymentResult } from "../src/store-live/provider";

const ctx = () => ({ products: [verifiedProduct()], shipping: confirmedShipping(), allowSample: false });

test("money: decimals round-trip without float error", () => {
  assert.equal(toDecimal(18000), "180.00");
  assert.equal(toDecimal(1), "0.01");
  assert.equal(parseDecimalToMinor("180.5"), 18050);
  assert.equal(parseDecimalToMinor("0.1"), 10);
  assert.equal(trimZeros("180.50"), "180.5");
  assert.equal(trimZeros("180.00"), "180");
  assert.equal(trimZeros("100"), "100");
});

test("quote: server computes totals and ignores client prices", () => {
  const r = quote({ lines: [{ productId: "pr-lokum", variantId: "250", qty: 2, price: 1, name: "x", weightGrams: 1 }], country: "TR" }, ctx());
  assert.ok(r.ok);
  if (r.ok) {
    assert.equal(r.quote.subtotalMinor, 36000);
    assert.equal(r.quote.weightGrams, 650); // 2 x 250 g + 150 g packaging
    assert.equal(r.quote.totalMinor, r.quote.subtotalMinor + r.quote.shippingMinor);
    assert.equal(r.quote.shippingMinor, 9900); // 500g + 150g packaging <= 1000g band
  }
});
test("quote: refuses samples, unknown items, bad quantities, disabled and unknown destinations, duplicates, overweight", () => {
  const sample = { products: sampleProducts, shipping: confirmedShipping(), allowSample: false };
  const line = [{ productId: "pr-lokum", variantId: "250", qty: 1 }];
  assert.deepEqual(quote({ lines: line, country: "TR" }, sample), { ok: false, error: "notForSale" });
  assert.deepEqual(quote({ lines: [{ productId: "nope", variantId: "250", qty: 1 }], country: "TR" }, ctx()), { ok: false, error: "unknownProduct" });
  for (const qty of [0, -1, 1.5, 51, "2"]) assert.deepEqual(quote({ lines: [{ productId: "pr-lokum", variantId: "250", qty }], country: "TR" }, ctx()), { ok: false, error: "badLine" });
  assert.deepEqual(quote({ lines: line, country: "SA" }, ctx()), { ok: false, error: "destination" }); // zone exists, product not enabled
  assert.deepEqual(quote({ lines: line, country: "FR" }, ctx()), { ok: false, error: "destination" }); // no zone
  assert.deepEqual(quote({ lines: [...line, ...line], country: "TR" }, ctx()), { ok: false, error: "badLine" });
  assert.deepEqual(quote({ lines: [], country: "TR" }, ctx()), { ok: false, error: "empty" });
  assert.deepEqual(quote({ lines: [{ productId: "pr-lokum", variantId: "500", qty: 50 }], country: "AE" }, ctx()), { ok: false, error: "tooHeavy" });
});

test("readiness: closed by default, open only when everything is real", () => {
  const base = { config: liveConfig(), business: fullBusiness(), shipping: confirmedShipping(), products: [verifiedProduct()] };
  assert.deepEqual(checkReadiness(base), { ready: true, issues: [] });
  assert.ok(checkReadiness({ ...base, config: liveConfig({ STORE_MODE: "request" }) }).issues.includes("mode.notLive"));
  assert.ok(checkReadiness({ ...base, shipping: { ...confirmedShipping(), ratesConfirmed: false } }).issues.includes("shipping.ratesNotConfirmed"));
  assert.ok(checkReadiness({ ...base, products: [] }).issues.includes("products.none"));
  assert.ok(checkReadiness({ ...base, products: sampleProducts }).issues.includes("product.pr-lokum.notVerified"));
  assert.ok(checkReadiness({ ...base, business: { ...fullBusiness(), legalName: " " } }).issues.includes("business.legalName"));
  assert.ok(checkReadiness({ ...base, business: { ...fullBusiness(), mersis: null } }).issues.includes("business.mersis"));
  assert.ok(checkReadiness({ ...base, config: liveConfig({ IYZICO_API_KEY: "" }) }).issues.includes("payment.iyzicoApiKey"));
  assert.ok(checkReadiness({ ...base, config: liveConfig({ NEXT_PUBLIC_SITE_URL: "http://x.com" }) }).issues.includes("site.urlNotHttps"));
});
test("readiness: test-only switches are refused in production", () => {
  const base = { business: fullBusiness(), shipping: confirmedShipping(), products: [verifiedProduct()] };
  assert.ok(checkReadiness({ ...base, config: liveConfig({ STORE_ALLOW_SAMPLE: "1" }) }).issues.includes("testSwitch.allowSampleInProduction"));
  assert.ok(checkReadiness({ ...base, config: liveConfig({ STORE_TEST_FIXTURE: "1" }) }).issues.includes("testSwitch.fixtureInProduction"));
  const mock = checkReadiness({ ...base, config: liveConfig({ PAYMENT_PROVIDER: "mock", STORE_ALLOW_MOCK: "1" }) });
  assert.ok(mock.issues.includes("provider.mockInProduction") && !mock.ready);
  // outside production the mock is allowed only with its switch
  const dev = { ...base, config: liveConfig({ NODE_ENV: "development", PAYMENT_PROVIDER: "mock" }) };
  assert.ok(checkReadiness(dev).issues.includes("provider.mockNotAllowed"));
});

test("iyzico: auth header v2 is HMAC(randomKey+path+body) and base64 framed", () => {
  const h = authHeaders("API", "SECRET", "/p", '{"a":1}', "RND");
  const sig = hmacHex("SECRET", 'RND/p{"a":1}');
  assert.equal(h["x-iyzi-rnd"], "RND");
  assert.equal(h.Authorization, "IYZWSv2 " + Buffer.from(`apiKey:API&randomKey:RND&signature:${sig}`).toString("base64"));
});
test("iyzico: response signature trims trailing zeros and uses the documented order", () => {
  const r = { paymentStatus: "SUCCESS", paymentId: "9", currency: "TRY", basketId: "B", conversationId: "C", paidPrice: "180.50", price: "180.00", token: "T" };
  assert.equal(responseSignature("S", r), hmacHex("S", "SUCCESS:9:TRY:B:C:180.5:180:T"));
});

function order(): OrderRecord {
  return { id: "NVO-20261029-ABCDEF", createdAt: "", updatedAt: "", locale: "en", status: "pending_payment", accessTokenHash: hashToken("tok"),
    buyer: { name: "A", surname: "B", email: "a@b.co", phone: "1234567", identityNumber: "" }, address: { contactName: "A B", address: "x", city: "c", country: "TR", zip: "" },
    quote: { lines: [], weightGrams: 500, subtotalMinor: 18000, shippingMinor: 9900, totalMinor: 27900, currency: "TRY", zoneId: "TR", etaDays: [1, 4] },
    provider: { name: "mock", token: "TOK" }, events: [] };
}
const goodResult = (o: OrderRecord): PaymentResult => ({ callStatus: "success", paymentStatus: "SUCCESS", paymentId: "P1", basketId: o.id, conversationId: o.id, currency: "TRY", paidPriceMinor: 27900, priceMinor: 27900, token: "TOK", signatureValid: true });

test("settlement: accepts only a perfect result", () => {
  const o = order();
  assert.deepEqual(verifyPayment(o, goodResult(o)), { ok: true, reason: "ok" });
  const bad: [Partial<PaymentResult>, string][] = [
    [{ callStatus: "failure" }, "callStatus"], [{ token: "OTHER" }, "token"], [{ signatureValid: false }, "signature"],
    [{ basketId: "NVO-20261029-000000" }, "basket"], [{ conversationId: "x" }, "basket"], [{ currency: "USD" }, "currency"],
    [{ paidPriceMinor: 100 }, "amount"], [{ priceMinor: 100 }, "amount"], [{ paidPriceMinor: null }, "amount"], [{ paymentStatus: "FAILURE" }, "notSuccess"],
  ];
  for (const [patch, reason] of bad) assert.equal(verifyPayment(o, { ...goodResult(o), ...patch }).reason, reason, JSON.stringify(patch));
});

test("orders: id format, token hashing, state machine", () => {
  assert.ok(isOrderId(newOrderId()));
  for (const s of ["../etc/passwd", "NVO-1", "", null, 5]) assert.equal(isOrderId(s), false);
  const t = newAccessToken();
  assert.ok(tokenMatches(t, hashToken(t)));
  assert.equal(tokenMatches("wrong", hashToken(t)), false);
  assert.equal(tokenMatches(undefined, hashToken(t)), false);
  const o = order();
  assert.throws(() => applyTransition(o, "shipped", "x"), TransitionError);
  applyTransition(o, "paid", "p");
  assert.throws(() => applyTransition(o, "paid", "p"), TransitionError);
  applyTransition(o, "shipped", "s");
  applyTransition(o, "delivered", "d");
  assert.throws(() => applyTransition(o, "cancelled", "c"), TransitionError);
  assert.equal(o.events.length, 3);
});

test("buyer: validates the checkout form", () => {
  const opts = { shipping: confirmedShipping(), identityRequired: true };
  const ok = { name: "Ali", surname: "Veli", email: "a@b.co", phone: "+90 555 000 00 00", identityNumber: "12345678901", address: "Some street 12", city: "Istanbul", country: "tr", zip: "", consentSales: true, consentPreInfo: true, consentAllergen: true };
  assert.deepEqual(validateBuyer(ok, opts).errors, {});
  assert.equal(validateBuyer(ok, opts).values.country, "TR");
  assert.equal(validateBuyer({ ...ok, email: "nope" }, opts).errors.email, "email");
  assert.equal(validateBuyer({ ...ok, country: "FR" }, opts).errors.country, "invalid");
  assert.equal(validateBuyer({ ...ok, consentAllergen: false }, opts).errors.consent, "consent");
  assert.equal(validateBuyer({ ...ok, identityNumber: "123" }, opts).errors.identityNumber, "invalid");
  assert.equal(validateBuyer({ ...ok, identityNumber: "" }, opts).errors.identityNumber, "required");
  assert.equal(validateBuyer({ ...ok, identityNumber: "" }, { ...opts, identityRequired: false }).errors.identityNumber, undefined);
  assert.equal(validateBuyer({ ...ok, consentSales: "true" }, opts).errors.consent, "consent"); // only boolean true counts
});

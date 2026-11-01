import crypto from "node:crypto";
import { parseDecimalToMinor, toDecimal, trimZeros } from "./money";
import type { CheckoutRequest, CheckoutSession, PaymentProvider, PaymentResult } from "./provider";

const INIT_PATH = "/payment/iyzipos/checkoutform/initialize/auth/ecom";
const RETRIEVE_PATH = "/payment/iyzipos/checkoutform/auth/ecom/detail";

export const hmacHex = (secret: string, data: string) => crypto.createHmac("sha256", secret).update(data).digest("hex");

/** Authentication v2: signature = HMAC-SHA256-hex(randomKey + uriPath + body) keyed with the secret key. */
export function authHeaders(apiKey: string, secretKey: string, uriPath: string, body: string, randomKey = `${Date.now()}${crypto.randomBytes(6).toString("hex")}`) {
  const signature = hmacHex(secretKey, randomKey + uriPath + body);
  const authorization = "IYZWSv2 " + Buffer.from(`apiKey:${apiKey}&randomKey:${randomKey}&signature:${signature}`).toString("base64");
  return { Authorization: authorization, "x-iyzi-rnd": randomKey };
}

/** Response signature of the checkout-form retrieve call. Prices enter the string with trailing zeros removed. */
export function responseSignature(secretKey: string, r: { paymentStatus: string; paymentId: string; currency: string; basketId: string; conversationId: string; paidPrice: string; price: string; token: string }) {
  const data = [r.paymentStatus, r.paymentId, r.currency, r.basketId, r.conversationId, trimZeros(String(r.paidPrice)), trimZeros(String(r.price)), r.token].join(":");
  return hmacHex(secretKey, data);
}

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export interface IyzicoOptions { apiKey: string; secretKey: string; baseUrl: string; fetchImpl?: typeof fetch }

export class IyzicoProvider implements PaymentProvider {
  readonly name = "iyzico";
  constructor(private o: IyzicoOptions) {}

  private async post(uriPath: string, payload: unknown): Promise<Record<string, unknown>> {
    const body = JSON.stringify(payload);
    const res = await (this.o.fetchImpl ?? fetch)(this.o.baseUrl + uriPath, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", ...authHeaders(this.o.apiKey, this.o.secretKey, uriPath, body) },
      body,
      signal: AbortSignal.timeout(20000),
    });
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return json;
  }

  async createCheckout(req: CheckoutRequest): Promise<CheckoutSession> {
    const q = req.quote;
    const items = q.lines.map((l) => ({ id: `${l.productId}:${l.variantId}`, name: `${l.name} (${l.variant}) x${l.qty}`, category1: "Food", itemType: "PHYSICAL", price: toDecimal(l.unitMinor * l.qty) }));
    items.push({ id: "shipping", name: "Shipping", category1: "Shipping", itemType: "PHYSICAL", price: toDecimal(q.shippingMinor) });
    const total = toDecimal(q.totalMinor);
    const sum = items.reduce((n, i) => n + (parseDecimalToMinor(i.price) ?? 0), 0);
    if (sum !== q.totalMinor) throw new Error("basket does not add up to the total");
    const addr = { address: req.address.address, contactName: req.address.contactName, city: req.address.city, country: req.address.country, zipCode: req.address.zip || undefined };
    const payload = {
      locale: req.locale === "tr" ? "tr" : "en",
      conversationId: req.orderId,
      price: total,
      paidPrice: total,
      currency: q.currency,
      basketId: req.orderId,
      paymentGroup: "PRODUCT",
      callbackUrl: req.callbackUrl,
      buyer: {
        id: req.orderId,
        name: req.buyer.name,
        surname: req.buyer.surname,
        identityNumber: req.buyer.identityNumber,
        email: req.buyer.email,
        gsmNumber: req.buyer.phone,
        registrationAddress: req.address.address,
        city: req.address.city,
        country: req.address.country,
        ip: req.clientIp || "127.0.0.1",
      },
      shippingAddress: addr,
      billingAddress: addr,
      basketItems: items,
    };
    const r = await this.post(INIT_PATH, payload);
    if (r.status !== "success" || typeof r.token !== "string" || typeof r.paymentPageUrl !== "string") {
      throw new Error(`iyzico initialize failed: ${String(r.errorMessage ?? r.errorCode ?? "unknown")}`);
    }
    return { token: r.token, paymentPageUrl: r.paymentPageUrl };
  }

  async retrieve(token: string, conversationId: string): Promise<PaymentResult> {
    const r = await this.post(RETRIEVE_PATH, { locale: "en", conversationId, token });
    const str = (v: unknown) => (typeof v === "string" ? v : typeof v === "number" ? String(v) : "");
    const price = str(r.price), paidPrice = str(r.paidPrice);
    const expected = responseSignature(this.o.secretKey, {
      paymentStatus: str(r.paymentStatus), paymentId: str(r.paymentId), currency: str(r.currency), basketId: str(r.basketId),
      conversationId: str(r.conversationId), paidPrice, price, token: str(r.token),
    });
    const given = str(r.signature);
    return {
      callStatus: str(r.status),
      paymentStatus: str(r.paymentStatus),
      paymentId: str(r.paymentId),
      basketId: str(r.basketId),
      conversationId: str(r.conversationId),
      currency: str(r.currency),
      paidPriceMinor: parseDecimalToMinor(paidPrice),
      priceMinor: parseDecimalToMinor(price),
      token: str(r.token),
      signatureValid: given !== "" && safeEqual(given, expected),
      errorMessage: str(r.errorMessage) || undefined,
    };
  }
}

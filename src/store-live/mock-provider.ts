import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { dataDir } from "./orders";
import { responseSignature } from "./iyzico";
import { toDecimal, parseDecimalToMinor } from "./money";
import type { CheckoutRequest, CheckoutSession, PaymentProvider, PaymentResult } from "./provider";

/**
 * TEST-ONLY payment provider. It mimics the hosted-page flow with a page that has "Pay" and "Fail" buttons
 * (see src/app/api/store/mock-pay/route.ts) and signs its responses the way iyzico does, so the same verification
 * code runs in tests. It is refused in production (see readiness.ts and config.ts).
 */
export const MOCK_SECRET = "mock-secret-for-tests-only";
const dir = () => path.join(dataDir(), "mock-payments");

interface MockPayment { token: string; orderId: string; priceMinor: number; status: "PENDING" | "SUCCESS" | "FAILURE"; paymentId: string; signature?: string }

function sign(p: MockPayment, status: string): string {
  const price = toDecimal(p.priceMinor);
  return responseSignature(MOCK_SECRET, { paymentStatus: status, paymentId: p.paymentId, currency: "TRY", basketId: p.orderId, conversationId: p.orderId, paidPrice: price, price, token: p.token });
}

async function read(token: string): Promise<MockPayment | null> {
  if (!/^[0-9a-f]{32}$/.test(token)) return null;
  try { return JSON.parse(await fs.readFile(path.join(dir(), `${token}.json`), "utf8")) as MockPayment; } catch { return null; }
}
export async function setMockResult(token: string, result: "SUCCESS" | "FAILURE"): Promise<boolean> {
  const p = await read(token);
  if (!p) return false;
  p.status = result;
  p.signature = sign(p, result);
  await fs.writeFile(path.join(dir(), `${token}.json`), JSON.stringify(p), { mode: 0o600 });
  return true;
}

export class MockProvider implements PaymentProvider {
  readonly name = "mock";
  constructor(private siteUrl: string) {}

  async createCheckout(req: CheckoutRequest): Promise<CheckoutSession> {
    const token = crypto.randomBytes(16).toString("hex");
    await fs.mkdir(dir(), { recursive: true, mode: 0o700 });
    const p: MockPayment = { token, orderId: req.orderId, priceMinor: req.quote.totalMinor, status: "PENDING", paymentId: String(Date.now()) };
    await fs.writeFile(path.join(dir(), `${token}.json`), JSON.stringify(p), { mode: 0o600 });
    // the callback URL is carried through so the mock page can send the browser back to it, like iyzico does
    const u = new URL("/api/store/mock-pay", this.siteUrl || "http://localhost:3000");
    u.searchParams.set("token", token);
    u.searchParams.set("cb", req.callbackUrl);
    return { token, paymentPageUrl: u.toString() };
  }

  async retrieve(token: string, conversationId: string): Promise<PaymentResult> {
    const p = await read(token);
    if (!p) return { callStatus: "failure", paymentStatus: "", paymentId: "", basketId: "", conversationId, currency: "", paidPriceMinor: null, priceMinor: null, token, signatureValid: false, errorMessage: "unknown token" };
    const price = toDecimal(p.priceMinor);
    const status = p.status === "SUCCESS" ? "SUCCESS" : "FAILURE";
    return {
      callStatus: "success", paymentStatus: status, paymentId: p.paymentId, basketId: p.orderId, conversationId: p.orderId, currency: "TRY",
      paidPriceMinor: parseDecimalToMinor(price), priceMinor: parseDecimalToMinor(price), token,
      signatureValid: p.signature === sign(p, status),
    };
  }
}

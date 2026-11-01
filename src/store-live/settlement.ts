import type { OrderRecord } from "./orders";
import type { PaymentResult } from "./provider";

export type SettlementReason = "ok" | "callStatus" | "notSuccess" | "basket" | "currency" | "amount" | "signature" | "token";

/**
 * Decides whether a provider payment result really pays THIS order. The callback request is untrusted, so every
 * condition must hold: provider call succeeded, payment status SUCCESS, same token we issued, basket and conversation
 * ids equal the order id, currency matches, price and paid price both equal the server-computed total, and the
 * response signature is valid.
 */
export function verifyPayment(order: OrderRecord, r: PaymentResult): { ok: boolean; reason: SettlementReason } {
  if (r.callStatus !== "success") return { ok: false, reason: "callStatus" };
  if (r.token !== order.provider.token) return { ok: false, reason: "token" };
  if (!r.signatureValid) return { ok: false, reason: "signature" };
  if (r.basketId !== order.id || r.conversationId !== order.id) return { ok: false, reason: "basket" };
  if (r.currency !== order.quote.currency) return { ok: false, reason: "currency" };
  if (r.paidPriceMinor !== order.quote.totalMinor || r.priceMinor !== order.quote.totalMinor) return { ok: false, reason: "amount" };
  if (r.paymentStatus !== "SUCCESS") return { ok: false, reason: "notSuccess" };
  return { ok: true, reason: "ok" };
}

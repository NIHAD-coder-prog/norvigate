import type { Quote } from "./pricing";

export interface CheckoutRequest {
  orderId: string;
  quote: Quote;
  buyer: { name: string; surname: string; email: string; phone: string; identityNumber: string };
  address: { contactName: string; address: string; city: string; country: string; zip: string };
  callbackUrl: string;
  locale: string;
  /** Client address, passed to the provider because it requires one. Never stored by NORVIGATE. */
  clientIp?: string;
}
export interface CheckoutSession { token: string; paymentPageUrl: string }

export interface PaymentResult {
  /** Provider-level call status ("success" | "failure"). */
  callStatus: string;
  /** Payment status; only "SUCCESS" means paid. */
  paymentStatus: string;
  paymentId: string;
  basketId: string;
  conversationId: string;
  currency: string;
  paidPriceMinor: number | null;
  priceMinor: number | null;
  token: string;
  signatureValid: boolean;
  errorMessage?: string;
}

/** Payment provider adapter. Card data never touches our server: the provider hosts the payment page. */
export interface PaymentProvider {
  readonly name: string;
  createCheckout(req: CheckoutRequest): Promise<CheckoutSession>;
  retrieve(token: string, conversationId: string): Promise<PaymentResult>;
}

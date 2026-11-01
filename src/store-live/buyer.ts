import { shippableCountries } from "./pricing";
import type { ShippingConfig } from "./shipping-config";

export interface BuyerInput {
  name: string; surname: string; email: string; phone: string; identityNumber: string;
  address: string; city: string; country: string; zip: string;
  consentSales: boolean; consentPreInfo: boolean; consentAllergen: boolean;
}
export type BuyerErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Server-side validation of the checkout form (the browser runs the same function for instant feedback). */
export function validateBuyer(raw: Record<string, unknown>, opts: { shipping: ShippingConfig; identityRequired: boolean }): { values: BuyerInput; errors: BuyerErrors } {
  const s = (k: string) => (typeof raw[k] === "string" ? (raw[k] as string).trim() : "");
  const b = (k: string) => raw[k] === true;
  const values: BuyerInput = {
    name: s("name"), surname: s("surname"), email: s("email"), phone: s("phone"), identityNumber: s("identityNumber"),
    address: s("address"), city: s("city"), country: s("country").toUpperCase(), zip: s("zip"),
    consentSales: b("consentSales"), consentPreInfo: b("consentPreInfo"), consentAllergen: b("consentAllergen"),
  };
  const errors: BuyerErrors = {};
  const need = (k: keyof BuyerInput, min: number, max: number) => {
    const v = values[k] as string;
    if (!v) errors[k] = "required";
    else if (v.length < min) errors[k] = "tooShort";
    else if (v.length > max) errors[k] = "tooLong";
  };
  need("name", 2, 80); need("surname", 2, 80); need("address", 8, 300); need("city", 2, 80);
  if (!values.email) errors.email = "required"; else if (!EMAIL_RE.test(values.email) || values.email.length > 254) errors.email = "email";
  if (!values.phone) errors.phone = "required";
  else if (!/^[+()\d][\d\s().-]*$/.test(values.phone) || values.phone.replace(/\D/g, "").length < 7 || values.phone.replace(/\D/g, "").length > 15) errors.phone = "phone";
  if (!shippableCountries(opts.shipping).includes(values.country)) errors.country = "invalid";
  if (values.zip && values.zip.length > 16) errors.zip = "tooLong";
  if (values.identityNumber ? !/^\d{11}$/.test(values.identityNumber) : opts.identityRequired) errors.identityNumber = values.identityNumber ? "invalid" : "required";
  if (!values.consentSales || !values.consentPreInfo || !values.consentAllergen) errors.consent = "consent";
  return { values, errors };
}

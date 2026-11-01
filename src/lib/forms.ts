import { worldLanguageCodes, OTHER_LANGUAGE } from "@/i18n/world-languages";

/**
 * Form definitions and validation, shared by the browser (instant feedback) and the server (authoritative).
 * Error values are CODES, mapped to localized messages by the UI (dictionary: forms.errors).
 *
 * This file deliberately imports no content data, so it adds almost nothing to the browser bundle.
 * Data-driven option lists (provider categories, travel services) are validated on the server by passing
 * `dynamicOptions` to validateForm; the browser receives the same lists as props.
 */
export type FormKind = "contact" | "listing" | "order" | "tourism" | "translation" | "travelAssist" | "premium" | "city";
export const formKinds: FormKind[] = ["contact", "listing", "order", "tourism", "translation", "travelAssist", "premium", "city"];

export type FieldType = "text" | "email" | "tel" | "url" | "textarea" | "select" | "date" | "number" | "checkbox";

export type DynamicSource = "providerCategories" | "travelServices";

export interface FieldSpec {
  name: string;
  type: FieldType;
  required?: boolean;
  min?: number; // min length (text) or min value (number)
  max?: number; // max length (text) or max value (number)
  /** Fixed allowed values. */
  options?: readonly string[];
  /** Key into dictionary forms.options for option labels. */
  optionGroup?: string;
  /** Allowed values come from content data and are supplied at runtime. */
  dynamic?: DynamicSource;
  /** Renders the world-language list (common languages first). */
  languages?: boolean;
  autoComplete?: string;
  half?: boolean;
  rows?: number;
}

export const contactTopics = ["general", "business", "listing", "store", "translation", "other"] as const;
export const premiumRoles = ["investor", "entrepreneur", "advisor", "other"] as const;
export const translationTypes = ["written", "interpreting", "assistance", "certified"] as const;
export const orderDestinations = ["turkiye", "outside"] as const;
export const listingCities = ["istanbul", "other"] as const;
export const requestKinds = ["flight", "hotel"] as const;
export const languageValues: readonly string[] = [...worldLanguageCodes, OTHER_LANGUAGE];

const consent: FieldSpec = { name: "consent", type: "checkbox", required: true };

export const formSpecs: Record<FormKind, FieldSpec[]> = {
  contact: [
    { name: "name", type: "text", required: true, min: 2, max: 120, autoComplete: "name", half: true },
    { name: "email", type: "email", required: true, max: 254, autoComplete: "email", half: true },
    { name: "topic", type: "select", required: true, options: contactTopics, optionGroup: "topic" },
    { name: "message", type: "textarea", required: true, min: 10, max: 4000, rows: 6 },
    consent,
  ],
  listing: [
    { name: "businessName", type: "text", required: true, min: 2, max: 160, half: true },
    { name: "category", type: "select", required: true, dynamic: "providerCategories", half: true },
    { name: "contactPerson", type: "text", required: true, min: 2, max: 120, autoComplete: "name", half: true },
    { name: "email", type: "email", required: true, max: 254, autoComplete: "email", half: true },
    { name: "phone", type: "tel", max: 32, autoComplete: "tel", half: true },
    { name: "website", type: "url", max: 300, autoComplete: "url", half: true },
    { name: "city", type: "select", required: true, options: listingCities, optionGroup: "city" },
    { name: "description", type: "textarea", required: true, min: 20, max: 3000, rows: 6 },
    consent,
  ],
  order: [
    { name: "name", type: "text", required: true, min: 2, max: 120, autoComplete: "name", half: true },
    { name: "email", type: "email", required: true, max: 254, autoComplete: "email", half: true },
    { name: "phone", type: "tel", max: 32, autoComplete: "tel", half: true },
    { name: "destinationCountry", type: "select", required: true, options: orderDestinations, optionGroup: "destination", half: true },
    { name: "deliveryCity", type: "text", required: true, min: 2, max: 120, half: true },
    { name: "notes", type: "textarea", max: 2000, rows: 4 },
    consent,
  ],
  tourism: [
    { name: "service", type: "select", required: true, dynamic: "travelServices" },
    { name: "name", type: "text", required: true, min: 2, max: 120, autoComplete: "name", half: true },
    { name: "email", type: "email", required: true, max: 254, autoComplete: "email", half: true },
    { name: "phone", type: "tel", max: 32, autoComplete: "tel", half: true },
    { name: "travelers", type: "number", required: true, min: 1, max: 50, half: true },
    { name: "preferredDate", type: "date", half: true },
    { name: "notes", type: "textarea", required: true, min: 10, max: 3000, rows: 5 },
    consent,
  ],
  translation: [
    { name: "name", type: "text", required: true, min: 2, max: 120, autoComplete: "name", half: true },
    { name: "email", type: "email", required: true, max: 254, autoComplete: "email", half: true },
    { name: "serviceType", type: "select", required: true, options: translationTypes, optionGroup: "translationType" },
    { name: "sourceLanguage", type: "select", required: true, options: languageValues, languages: true, half: true },
    { name: "targetLanguage", type: "select", required: true, options: languageValues, languages: true, half: true },
    { name: "deadline", type: "date", half: true },
    { name: "notes", type: "textarea", required: true, min: 10, max: 3000, rows: 5 },
    consent,
  ],
  travelAssist: [
    { name: "requestKind", type: "select", required: true, options: requestKinds, optionGroup: "requestKind" },
    { name: "name", type: "text", required: true, min: 2, max: 120, autoComplete: "name", half: true },
    { name: "email", type: "email", required: true, max: 254, autoComplete: "email", half: true },
    { name: "origin", type: "text", max: 120, half: true },
    { name: "destination", type: "text", required: true, min: 2, max: 120, half: true },
    { name: "departDate", type: "date", half: true },
    { name: "returnDate", type: "date", half: true },
    { name: "travelers", type: "number", required: true, min: 1, max: 50, half: true },
    { name: "notes", type: "textarea", max: 3000, rows: 4 },
    consent,
  ],
  premium: [
    { name: "name", type: "text", required: true, min: 2, max: 120, autoComplete: "name", half: true },
    { name: "email", type: "email", required: true, max: 254, autoComplete: "email", half: true },
    { name: "role", type: "select", required: true, options: premiumRoles, optionGroup: "role" },
    { name: "interests", type: "textarea", max: 3000, rows: 4 },
    consent,
  ],
  city: [
    { name: "cityName", type: "text", required: true, min: 2, max: 120, half: true },
    { name: "country", type: "text", required: true, min: 2, max: 120, half: true },
    { name: "name", type: "text", required: true, min: 2, max: 120, autoComplete: "name", half: true },
    { name: "email", type: "email", required: true, max: 254, autoComplete: "email", half: true },
    { name: "reason", type: "textarea", max: 3000, rows: 4 },
    consent,
  ],
};

export type FormValues = Record<string, string | boolean>;
export type FormErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function todayISO(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/**
 * Earliest accepted date. One day of slack is allowed so a visitor whose local date is still "yesterday" in UTC
 * (or already "tomorrow") is never told that today is in the past.
 */
export function earliestAllowedDate(now = new Date()): string {
  return new Date(now.getTime() - 24 * 3600 * 1000).toISOString().slice(0, 10);
}

function isValidISODate(s: string): boolean {
  if (!ISO_DATE_RE.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function isValidUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return (u.protocol === "http:" || u.protocol === "https:") && u.hostname.includes(".");
  } catch {
    return false;
  }
}

function isValidPhone(s: string): boolean {
  if (!/^[+()\d][\d\s().-]*$/.test(s)) return false;
  const digits = s.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 15;
}

export interface ValidateOptions {
  now?: Date;
  /** Allowed values for data-driven selects. The server always supplies these; the browser may omit them. */
  dynamicOptions?: Partial<Record<DynamicSource, readonly string[]>>;
}

/** Validates values against a form spec. Returns a map of field -> error code. Empty map = valid. */
export function validateForm(kind: FormKind, values: FormValues, opts: ValidateOptions = {}): FormErrors {
  const errors: FormErrors = {};
  const earliest = earliestAllowedDate(opts.now);

  for (const f of formSpecs[kind]) {
    const raw = values[f.name];

    if (f.type === "checkbox") {
      if (f.required && raw !== true && raw !== "true" && raw !== "on") errors[f.name] = "consent";
      continue;
    }

    const v = typeof raw === "string" ? raw.trim() : "";
    if (!v) {
      if (f.required) errors[f.name] = "required";
      continue;
    }

    switch (f.type) {
      case "email":
        if (v.length > (f.max ?? 254)) errors[f.name] = "tooLong";
        else if (!EMAIL_RE.test(v)) errors[f.name] = "email";
        break;
      case "url":
        if (v.length > (f.max ?? 300)) errors[f.name] = "tooLong";
        else if (!isValidUrl(v)) errors[f.name] = "url";
        break;
      case "tel":
        if (v.length > (f.max ?? 32)) errors[f.name] = "tooLong";
        else if (!isValidPhone(v)) errors[f.name] = "phone";
        break;
      case "select": {
        const allowed = f.options ?? (f.dynamic ? opts.dynamicOptions?.[f.dynamic] : undefined);
        if (allowed && !allowed.includes(v)) errors[f.name] = "invalid";
        break;
      }
      case "date":
        if (!isValidISODate(v)) errors[f.name] = "invalid";
        else if (v < earliest) errors[f.name] = "pastDate";
        break;
      case "number": {
        const n = Number(v);
        if (!Number.isInteger(n) || n < (f.min ?? 0) || n > (f.max ?? 1_000_000)) errors[f.name] = "range";
        break;
      }
      default: {
        if (f.min && v.length < f.min) errors[f.name] = "tooShort";
        else if (f.max && v.length > f.max) errors[f.name] = "tooLong";
      }
    }
  }

  // Cross-field rules (only when the individual fields are otherwise valid).
  if (kind === "translation" && !errors.sourceLanguage && !errors.targetLanguage) {
    const s = values.sourceLanguage;
    const t = values.targetLanguage;
    if (s && t && s === t && s !== OTHER_LANGUAGE) errors.targetLanguage = "sameLanguage";
  }
  if (kind === "travelAssist" && !errors.departDate && !errors.returnDate) {
    const a = values.departDate;
    const b = values.returnDate;
    if (typeof a === "string" && typeof b === "string" && a && b && b < a) errors.returnDate = "dateOrder";
  }

  return errors;
}

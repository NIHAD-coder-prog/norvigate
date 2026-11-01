import { NextResponse } from "next/server";
import { formKinds, formSpecs, validateForm, type FormKind, type FormValues } from "@/lib/forms";
import { getDynamicOptions, resolveOrderLines } from "@/lib/order";
import { saveSubmission } from "@/lib/submissions";
import { rateLimited } from "@/lib/rate-limit";
import { isLocale } from "@/i18n/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_CHARS = 64 * 1024;
/** Name of the hidden honeypot field. Real users never see or fill it. */
const HONEYPOT = "company_url";
const LIMIT = Number(process.env.RATE_LIMIT_MAX) || 12; // submissions per window per client (overridable for tests)
const WINDOW_MS = 10 * 60 * 1000;

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  // Same-origin only: browsers send Origin on cross-origin POSTs; reject mismatches.
  if (request.headers.get("sec-fetch-site") === "cross-site") return json({ ok: false, error: "forbidden" }, 403);
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ ok: false, error: "forbidden" }, 403);
    } catch {
      return json({ ok: false, error: "forbidden" }, 403);
    }
  }
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return json({ ok: false, error: "unsupported" }, 415);
  }

  const client = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (rateLimited(`submit:${client}`, LIMIT, WINDOW_MS)) return json({ ok: false, error: "rateLimited" }, 429);

  let text: string;
  try {
    text = await request.text();
  } catch {
    return json({ ok: false, error: "badRequest" }, 400);
  }
  if (text.length > MAX_BODY_CHARS) return json({ ok: false, error: "tooLarge" }, 413);

  let body: { kind?: unknown; locale?: unknown; data?: unknown; lines?: unknown };
  try {
    body = JSON.parse(text);
  } catch {
    return json({ ok: false, error: "badRequest" }, 400);
  }

  const kind = body.kind;
  if (typeof kind !== "string" || !(formKinds as string[]).includes(kind)) {
    return json({ ok: false, error: "badRequest" }, 400);
  }
  const k = kind as FormKind;
  const locale = typeof body.locale === "string" && isLocale(body.locale) ? body.locale : "en";
  const raw = body.data && typeof body.data === "object" && !Array.isArray(body.data) ? (body.data as Record<string, unknown>) : {};

  // Honeypot: pretend success, store nothing.
  if (typeof raw[HONEYPOT] === "string" && raw[HONEYPOT].trim() !== "") {
    return json({ ok: true, id: "NV-00000000-000000" });
  }

  // Keep only known fields, coerce to the shapes the validator expects.
  const known = new Set(formSpecs[k].map((f) => f.name));
  const values: FormValues = {};
  for (const [key, v] of Object.entries(raw)) {
    if (!known.has(key)) continue;
    if (typeof v === "string" || typeof v === "boolean") values[key] = v;
    else if (typeof v === "number") values[key] = String(v);
  }

  const errors = validateForm(k, values, { dynamicOptions: getDynamicOptions() });

  // Order requests carry cart lines validated against the catalogue.
  let storedLines: unknown = undefined;
  if (k === "order") {
    const checked = resolveOrderLines(body.lines);
    if (!checked.ok) errors.cart = "cart";
    else storedLines = checked.lines;
  }

  if (Object.keys(errors).length > 0) return json({ ok: false, errors }, 422);

  // Persist only the whitelisted, trimmed fields.
  const clean: Record<string, unknown> = {};
  for (const [key, v] of Object.entries(values)) clean[key] = typeof v === "string" ? v.trim() : v;
  if (storedLines) clean.lines = storedLines;

  try {
    const { id } = await saveSubmission(k, locale, clean);
    return json({ ok: true, id });
  } catch (err) {
    console.error("[submit] could not store submission", err instanceof Error ? err.message : err);
    return json({ ok: false, error: "server" }, 500);
  }
}

export async function GET() {
  return json({ ok: false, error: "methodNotAllowed" }, 405);
}

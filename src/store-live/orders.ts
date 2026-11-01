import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { Quote } from "./pricing";

/**
 * Orders are stored as one JSON file per order under <NORVIGATE_DATA_DIR>/orders (outside /public, mode 0600).
 * Writes are atomic (temp file + rename) and serialised per order inside this process. Run ONE app instance
 * against a given data directory: there is no cross-process lock.
 * No IP address is stored. Only a SHA-256 hash of the order access token is stored, never the token.
 */
export type OrderStatus = "pending_payment" | "paid" | "payment_failed" | "shipped" | "delivered" | "cancelled";

export const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending_payment: ["paid", "payment_failed", "cancelled"],
  payment_failed: ["pending_payment", "paid", "cancelled"],
  paid: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

export interface OrderEvent { at: string; type: string; from?: OrderStatus; to?: OrderStatus; note?: string }

export interface OrderRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  status: OrderStatus;
  accessTokenHash: string;
  buyer: { name: string; surname: string; email: string; phone: string; identityNumber: string };
  address: { contactName: string; address: string; city: string; country: string; zip: string };
  quote: Quote;
  provider: { name: string; token?: string; paymentId?: string };
  tracking?: { carrier: string; number: string };
  events: OrderEvent[];
}

export function dataDir(): string {
  const configured = process.env.NORVIGATE_DATA_DIR || ".data";
  return path.isAbsolute(configured) ? configured : path.join(process.cwd(), configured);
}
const ordersDir = () => path.join(dataDir(), "orders");

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
export function newAccessToken(): string {
  return crypto.randomBytes(24).toString("hex");
}
export function tokenMatches(token: string | null | undefined, hash: string): boolean {
  if (!token || typeof token !== "string") return false;
  const a = Buffer.from(hashToken(token), "hex");
  const b = Buffer.from(hash, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
export function newOrderId(now = new Date()): string {
  const day = now.toISOString().slice(0, 10).replace(/-/g, "");
  return `NVO-${day}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}
const ID_RE = /^NVO-\d{8}-[0-9A-F]{6}$/;
export const isOrderId = (s: unknown): s is string => typeof s === "string" && ID_RE.test(s);

const locks = new Map<string, Promise<unknown>>();
function withLock<T>(id: string, fn: () => Promise<T>): Promise<T> {
  const prev = locks.get(id) ?? Promise.resolve();
  const next = prev.then(fn, fn);
  locks.set(id, next.catch(() => undefined));
  return next;
}

async function writeAtomic(file: string, data: unknown): Promise<void> {
  const tmp = `${file}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), { mode: 0o600 });
  await fs.rename(tmp, file);
}

export async function saveNewOrder(order: OrderRecord): Promise<void> {
  await fs.mkdir(ordersDir(), { recursive: true, mode: 0o700 });
  await writeAtomic(path.join(ordersDir(), `${order.id}.json`), order);
}

export async function getOrder(id: string): Promise<OrderRecord | null> {
  if (!isOrderId(id)) return null;
  try {
    return JSON.parse(await fs.readFile(path.join(ordersDir(), `${id}.json`), "utf8")) as OrderRecord;
  } catch {
    return null;
  }
}

export async function listOrders(): Promise<OrderRecord[]> {
  let names: string[] = [];
  try {
    names = await fs.readdir(ordersDir());
  } catch {
    return [];
  }
  const out: OrderRecord[] = [];
  for (const n of names) {
    if (!n.endsWith(".json")) continue;
    const o = await getOrder(n.slice(0, -5));
    if (o) out.push(o);
  }
  return out.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export class TransitionError extends Error {}

/** Applies `mutate` to the stored order under a per-order lock and persists the result atomically. */
export async function updateOrder(id: string, mutate: (o: OrderRecord) => void): Promise<OrderRecord> {
  return withLock(id, async () => {
    const o = await getOrder(id);
    if (!o) throw new TransitionError("order not found");
    mutate(o);
    o.updatedAt = new Date().toISOString();
    await writeAtomic(path.join(ordersDir(), `${id}.json`), o);
    return o;
  });
}

/** Pure transition helper (also used by tests). Throws on an illegal move. */
export function applyTransition(o: OrderRecord, to: OrderStatus, type: string, note?: string): void {
  if (o.status === to) throw new TransitionError(`already ${to}`);
  if (!TRANSITIONS[o.status].includes(to)) throw new TransitionError(`illegal transition ${o.status} -> ${to}`);
  o.events.push({ at: new Date().toISOString(), type, from: o.status, to, note });
  o.status = to;
}

/**
 * Marks an order paid. IDEMPOTENT: calling it again for an order that is already paid (or shipped/delivered) changes
 * nothing and returns { changed: false }. Only one concurrent call can perform the transition (per-order lock).
 */
export async function markPaid(id: string, paymentId: string, note?: string): Promise<{ order: OrderRecord; changed: boolean }> {
  let changed = false;
  const order = await updateOrder(id, (o) => {
    if (o.status === "paid" || o.status === "shipped" || o.status === "delivered") return;
    applyTransition(o, "paid", "payment.confirmed", note);
    o.provider.paymentId = paymentId;
    changed = true;
  });
  return { order, changed };
}

export async function markPaymentFailed(id: string, note: string): Promise<OrderRecord> {
  return updateOrder(id, (o) => {
    if (o.status !== "pending_payment") return; // never downgrade a paid order
    applyTransition(o, "payment_failed", "payment.failed", note);
  });
}

export async function markShipped(id: string, carrier: string, number: string): Promise<OrderRecord> {
  return updateOrder(id, (o) => {
    applyTransition(o, "shipped", "order.shipped", `${carrier} ${number}`);
    o.tracking = { carrier, number };
  });
}
export async function markDelivered(id: string): Promise<OrderRecord> {
  return updateOrder(id, (o) => applyTransition(o, "delivered", "order.delivered"));
}
export async function cancelOrder(id: string, note: string): Promise<OrderRecord> {
  return updateOrder(id, (o) => applyTransition(o, "cancelled", "order.cancelled", note));
}

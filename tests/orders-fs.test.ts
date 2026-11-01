import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const dir = mkdtempSync(path.join(tmpdir(), "nv-orders-"));
process.env.NORVIGATE_DATA_DIR = dir;
let o: typeof import("../src/store-live/orders");

after(() => rmSync(dir, { recursive: true, force: true }));
before(async () => { o = await import("../src/store-live/orders"); });

function make(): import("../src/store-live/orders").OrderRecord {
  return { id: o.newOrderId(), createdAt: new Date().toISOString(), updatedAt: "", locale: "en", status: "pending_payment", accessTokenHash: o.hashToken("t"),
    buyer: { name: "A", surname: "B", email: "a@b.co", phone: "1234567", identityNumber: "" }, address: { contactName: "A B", address: "x", city: "c", country: "TR", zip: "" },
    quote: { lines: [], weightGrams: 1, subtotalMinor: 100, shippingMinor: 100, totalMinor: 200, currency: "TRY", zoneId: "TR", etaDays: [1, 2] },
    provider: { name: "mock", token: "T" }, events: [] };
}

test("orders on disk: save, read, list; no temp files left; bad ids rejected", async () => {
  const a = make(); await o.saveNewOrder(a);
  assert.equal((await o.getOrder(a.id))?.id, a.id);
  assert.equal(await o.getOrder("../../etc/passwd"), null);
  assert.equal((await o.listOrders()).length, 1);
  assert.deepEqual(readdirSync(path.join(dir, "orders")).filter((f) => f.endsWith(".tmp")), []);
});

test("markPaid is idempotent, even when called concurrently", async () => {
  const a = make(); await o.saveNewOrder(a);
  const results = await Promise.all([1, 2, 3, 4, 5].map(() => o.markPaid(a.id, "PAY-1")));
  assert.equal(results.filter((r) => r.changed).length, 1);
  const stored = await o.getOrder(a.id);
  assert.equal(stored?.status, "paid");
  assert.equal(stored?.events.filter((e) => e.type === "payment.confirmed").length, 1);
});

test("a failed payment never downgrades a paid order; shipping needs paid", async () => {
  const a = make(); await o.saveNewOrder(a);
  await assert.rejects(o.markShipped(a.id, "DHL", "123"), o.TransitionError);
  await o.markPaid(a.id, "P");
  await o.markPaymentFailed(a.id, "late failure");
  assert.equal((await o.getOrder(a.id))?.status, "paid");
  const s = await o.markShipped(a.id, "DHL", "123");
  assert.deepEqual(s.tracking, { carrier: "DHL", number: "123" });
  assert.equal((await o.markDelivered(a.id)).status, "delivered");
});

test("a failed order can be paid later (customer retries and succeeds)", async () => {
  const a = make(); await o.saveNewOrder(a);
  await o.markPaymentFailed(a.id, "declined");
  assert.equal((await o.markPaid(a.id, "P2")).changed, true);
});

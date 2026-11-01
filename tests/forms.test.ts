import { test } from "node:test";
import assert from "node:assert/strict";
import { formKinds, formSpecs, validateForm, type FormKind, type FormValues } from "../src/lib/forms";
import { collections } from "../src/data";
import { rateLimited } from "../src/lib/rate-limit";

const dyn = { providerCategories: collections.providerCategories.map((c) => c.id), travelServices: collections.travelServices.map((s) => s.slug) };
const future = new Date(Date.now() + 14 * 864e5).toISOString().slice(0, 10);

/** One valid example per form. Built from the SPEC so a new required field makes this test fail loudly. */
function valid(kind: FormKind): FormValues {
  const v: FormValues = {};
  for (const f of formSpecs[kind]) {
    switch (f.type) {
      case "checkbox": v[f.name] = true; break;
      case "email": v[f.name] = "person@example.com"; break;
      case "tel": v[f.name] = "+90 555 000 00 00"; break;
      case "url": v[f.name] = "https://example.com"; break;
      case "number": v[f.name] = "2"; break;
      case "date": v[f.name] = future; break;
      case "select": v[f.name] = (f.options ?? (f.dynamic ? dyn[f.dynamic] : []))[0] ?? ""; break;
      case "textarea": v[f.name] = "A sufficiently long free-text message for the test."; break;
      default: v[f.name] = "Test value";
    }
  }
  if (kind === "translation") { v.sourceLanguage = "en"; v.targetLanguage = "tr"; }
  return v;
}

for (const kind of formKinds) {
  test(`form ${kind}: valid example passes, every required field is enforced`, () => {
    const ok = valid(kind);
    assert.deepEqual(validateForm(kind, ok, { dynamicOptions: dyn }), {}, JSON.stringify(validateForm(kind, ok, { dynamicOptions: dyn })));
    for (const f of formSpecs[kind].filter((x) => x.required)) {
      const bad = { ...ok, [f.name]: f.type === "checkbox" ? false : "" };
      assert.ok(validateForm(kind, bad, { dynamicOptions: dyn })[f.name], `${kind}.${f.name} should be required`);
    }
  });
}

test("forms: type-specific rules", () => {
  const c = valid("contact");
  assert.equal(validateForm("contact", { ...c, email: "x" })["email"], "email");
  assert.equal(validateForm("contact", { ...c, topic: "not-a-topic" })["topic"], "invalid");
  assert.equal(validateForm("contact", { ...c, message: "short" })["message"], "tooShort");
  assert.equal(validateForm("contact", { ...c, name: "x".repeat(500) })["name"], "tooLong");
  const t = valid("tourism");
  assert.equal(validateForm("tourism", { ...t, travelers: "0" }, { dynamicOptions: dyn })["travelers"], "range");
  assert.equal(validateForm("tourism", { ...t, preferredDate: "2020-01-01" }, { dynamicOptions: dyn })["preferredDate"], "pastDate");
  assert.equal(validateForm("tourism", { ...t, preferredDate: "2026-02-30" }, { dynamicOptions: dyn })["preferredDate"], "invalid");
  assert.equal(validateForm("tourism", { ...t, service: "zzz" }, { dynamicOptions: dyn })["service"], "invalid");
  assert.equal(validateForm("translation", { ...valid("translation"), sourceLanguage: "tr", targetLanguage: "tr" })["targetLanguage"], "sameLanguage");
  assert.ok(validateForm("city", { ...valid("city"), consent: false })["consent"]);
});

test("forms: the browser omits dynamic options, the server supplies them (shape both sides agree on)", () => {
  const t = valid("tourism");
  assert.deepEqual(validateForm("tourism", t), {});
  assert.deepEqual(validateForm("tourism", t, { dynamicOptions: dyn }), {});
});

test("rate limit: blocks after the limit and recovers after the window", () => {
  const key = "t:" + Math.random();
  const now = 1_000_000;
  for (let i = 0; i < 3; i++) assert.equal(rateLimited(key, 3, 1000, now + i), false);
  assert.equal(rateLimited(key, 3, 1000, now + 10), true);
  assert.equal(rateLimited(key, 3, 1000, now + 5000), false);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { shownAt } from "../src/config/visibility";
import { networkCities, capabilities } from "../src/data/network";

test("each level shows exactly the statuses it promises", () => {
  assert.deepEqual(shownAt.live, ["live"]);
  assert.deepEqual(shownAt.beta, ["live", "beta"]);
  assert.deepEqual(shownAt.all, ["live", "beta", "development", "planned"]);
});

test("levels are nested: a higher level never hides what a lower level shows", () => {
  for (const s of shownAt.live) assert.ok(shownAt.beta.includes(s));
  for (const s of shownAt.beta) assert.ok(shownAt.all.includes(s));
});

test("only Istanbul can be ahead of PLANNED among the cities, and every status is a known one", () => {
  const known = new Set(shownAt.all);
  for (const c of [...networkCities, ...capabilities]) assert.ok(known.has(c.status), c.id);
  for (const c of networkCities.filter((x) => x.id !== "istanbul")) assert.equal(c.status, "planned", c.id);
});

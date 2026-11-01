/** Deep-partial helper type and merge used to layer a (possibly partial) translation over English. */
export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Returns `base` with every value present in `over` applied on top.
 * Arrays are merged index by index only when `over` has the same length; otherwise the English array is kept,
 * so a half-translated list can never mix languages or lose items.
 */
export function deepMerge<T>(base: T, over: DeepPartial<T> | undefined): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(over) || over.length !== base.length) return base;
    return base.map((b, i) => deepMerge(b, (over as unknown[])[i] as DeepPartial<typeof b>)) as unknown as T;
  }
  if (isPlainObject(base)) {
    if (!isPlainObject(over)) return base;
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(base)) {
      out[key] = deepMerge(base[key], over[key] as never);
    }
    return out as T;
  }
  return (typeof over === "string" && over.trim() !== "" ? over : base) as T;
}

/** Counts translatable string leaves in `base` and how many of them `over` provides. */
export function coverage(base: unknown, over: unknown): { total: number; present: number; missing: string[] } {
  const missing: string[] = [];
  let total = 0;
  let present = 0;
  const walk = (b: unknown, o: unknown, path: string) => {
    if (typeof b === "string") {
      total++;
      if (typeof o === "string" && o.trim() !== "") present++;
      else missing.push(path);
    } else if (Array.isArray(b)) {
      const ok = Array.isArray(o) && o.length === b.length;
      b.forEach((item, i) => walk(item, ok ? (o as unknown[])[i] : undefined, `${path}[${i}]`));
    } else if (isPlainObject(b)) {
      for (const k of Object.keys(b)) walk(b[k], isPlainObject(o) ? o[k] : undefined, path ? `${path}.${k}` : k);
    }
  };
  walk(base, over, "");
  return { total, present, missing };
}

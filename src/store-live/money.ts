/** Minor units (kuruş, cents) <-> decimal strings used by payment providers. No floating point arithmetic on money. */
export function toDecimal(minor: number): string {
  if (!Number.isInteger(minor) || minor < 0) throw new Error("minor must be a non-negative integer");
  const whole = Math.floor(minor / 100);
  const frac = String(minor % 100).padStart(2, "0");
  return `${whole}.${frac}`;
}

/** Parses "50", "50.5", "50.50" into minor units. Returns null for anything else. */
export function parseDecimalToMinor(value: unknown): number | null {
  const s = typeof value === "number" ? String(value) : typeof value === "string" ? value.trim() : "";
  const m = /^(\d{1,9})(?:\.(\d{1,2})0*)?$/.exec(s);
  if (!m) return null;
  return Number(m[1]) * 100 + Number((m[2] ?? "").padEnd(2, "0"));
}

/** iyzico signs prices with trailing zeros removed: "50.00" -> "50", "50.50" -> "50.5". */
export function trimZeros(value: string): string {
  if (!value.includes(".")) return value;
  return value.replace(/0+$/, "").replace(/\.$/, "");
}

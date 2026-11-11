// Kashida (tatweel, U+0640) for Arabic DISPLAY headings only. Keep the clean text everywhere else
// (dictionary, aria-label, <title>, search). Use: <h1 aria-label={clean}>{kashida(clean, 2)}</h1>
// Light mode (count 2): section headings and card titles. Strong mode (count 4): hero only.
const DUAL = new Set("بتثجحخسشصضطظعغفقكمنهي"); // letters that join on both sides
const LAM_ALEF = (a: string, b: string) => a === "ل" && "اأإآ".includes(b);
const ARABIC = /[ء-ي]/;
export function kashida(text: string, count = 2): string {
  return text
    .split(" ")
    .map((w) => {
      const c = [...w];
      if (c.length < 4) return w;
      const cand: number[] = [];
      for (let i = 1; i < c.length - 1; i++)
        if (DUAL.has(c[i]) && ARABIC.test(c[i + 1]) && !LAM_ALEF(c[i], c[i + 1])) cand.push(i);
      if (!cand.length) return w;
      const mid = (c.length - 1) / 2;
      cand.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
      c.splice(cand[0] + 1, 0, "ـ".repeat(count));
      return c.join("");
    })
    .join(" ");
}

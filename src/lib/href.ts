import { locales, type Locale } from "@/i18n/config";

/** Build a locale-prefixed internal path. `path` starts with "/" (or is "" for the home page). */
export function href(locale: Locale, path = ""): string {
  const p = path === "/" ? "" : path;
  return `/${locale}${p}`;
}

/** Replace the locale segment of a pathname, keeping the rest. */
export function swapLocale(pathname: string, next: Locale): string {
  const parts = pathname.split("/");
  // parts[0] is "" because pathname starts with "/"
  if (parts.length > 1 && locales.includes(parts[1])) {
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}

export function withQuery(path: string, params: Record<string, string | undefined>): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) qs.set(k, v);
  const s = qs.toString();
  return s ? `${path}?${s}` : path;
}

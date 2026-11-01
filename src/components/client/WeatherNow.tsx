"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type Cond = keyof Dictionary["tools"]["conditions"];
function cond(code: number): Cond {
  if (code === 0) return "clear";
  if (code <= 3) return "partly";
  if (code === 45 || code === 48) return "fog";
  if (code >= 95) return "storm";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  return "rain";
}

/** One-line live weather for the Istanbul home strip (Open-Meteo, no key). Honest loading and error states. */
export function WeatherNow({ t, locale }: { t: Dictionary["tools"]; locale: string }) {
  const [state, setState] = useState<{ temp: number; code: number } | "error" | null>(null);
  useEffect(() => {
    const ctl = new AbortController();
    fetch("https://api.open-meteo.com/v1/forecast?latitude=41.0082&longitude=28.9784&current=temperature_2m,weather_code&timezone=Europe%2FIstanbul", { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j) => setState({ temp: j.current.temperature_2m, code: j.current.weather_code }))
      .catch((e) => { if (e?.name !== "AbortError") setState("error"); });
    return () => ctl.abort();
  }, []);
  if (state === "error") return <span className="small muted" role="alert">{t.weatherError}</span>;
  if (!state) return <span className="small muted" role="status">{t.weatherLoading}</span>;
  const n = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(state.temp);
  return <span className="today__weather"><b dir="ltr">{n}°C</b> {t.conditions[cond(state.code)]}<span className="small muted"> · {t.weatherNote}</span></span>;
}

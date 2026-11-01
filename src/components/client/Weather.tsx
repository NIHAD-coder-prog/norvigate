"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type Cond = keyof Dictionary["tools"]["conditions"];
interface Data {
  temp: number; feels: number; wind: number; humidity: number; code: number;
  days: { date: string; min: number; max: number; code: number }[];
}

function cond(code: number): Cond {
  if (code === 0) return "clear";
  if (code <= 3) return "partly";
  if (code === 45 || code === 48) return "fog";
  if (code >= 95) return "storm";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  return "rain";
}

/** Live weather from Open-Meteo (no key). Shows an honest error state if the request fails. */
export function Weather({ t, locale }: { t: Dictionary["tools"]; locale: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctl = new AbortController();
    const url = "https://api.open-meteo.com/v1/forecast?latitude=41.0082&longitude=28.9784&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FIstanbul&forecast_days=4";
    fetch(url, { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j) => {
        const c = j.current, d = j.daily;
        setData({
          temp: c.temperature_2m, feels: c.apparent_temperature, wind: c.wind_speed_10m, humidity: c.relative_humidity_2m, code: c.weather_code,
          days: d.time.slice(1).map((date: string, i: number) => ({ date, min: d.temperature_2m_min[i + 1], max: d.temperature_2m_max[i + 1], code: d.weather_code[i + 1] })),
        });
      })
      .catch((e) => { if (e?.name !== "AbortError") setFailed(true); });
    return () => ctl.abort();
  }, []);

  if (failed) return <p role="alert" className="muted">{t.weatherError}</p>;
  if (!data) return <p className="muted" role="status">{t.weatherLoading}</p>;
  const day = new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" });
  const n = (v: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(v);
  return (
    <div>
      <p style={{ margin: 0, fontSize: "2.4rem", fontWeight: 800 }}>{n(data.temp)}°C <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>{t.conditions[cond(data.code)]}</span></p>
      <p className="muted">{t.feelsLike} {n(data.feels)}°C · {t.wind} {n(data.wind)} km/h · {t.humidity} {n(data.humidity)}%</p>
      <h3 style={{ marginBlockStart: "1rem" }}>{t.nextDays}</h3>
      <ul className="plain-list">
        {data.days.map((d) => (
          <li key={d.date}>{day.format(new Date(`${d.date}T12:00:00`))}: {n(d.min)}° / {n(d.max)}°C · {t.conditions[cond(d.code)]}</li>
        ))}
      </ul>
      <p className="small muted">{t.weatherNote}</p>
    </div>
  );
}

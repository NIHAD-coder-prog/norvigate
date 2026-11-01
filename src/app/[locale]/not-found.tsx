"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Client component on purpose: reading request headers in a server not-found turns the response into a "soft 404"
 * (HTTP 200). Reading the locale from the URL keeps the real 404 status.
 */
const COPY: Record<string, { t: string; x: string; home: string; ist: string; s: string }> = {
  en: { t: "Page not found", x: "The page you were looking for does not exist or has moved. Try one of these instead.", home: "Back to home", ist: "Istanbul", s: "Search" },
  tr: { t: "Sayfa bulunamadı", x: "Aradığınız sayfa mevcut değil veya taşınmış. Bunlardan birini deneyin.", home: "Ana sayfaya dön", ist: "İstanbul", s: "Ara" },
  ar: { t: "الصفحة غير موجودة", x: "الصفحة التي تبحث عنها غير موجودة أو نُقلت. جرّب أحد الخيارات التالية.", home: "العودة إلى الرئيسية", ist: "إسطنبول", s: "بحث" },
  es: { t: "Página no encontrada", x: "La página que buscas no existe o se ha movido. Prueba una de estas opciones.", home: "Volver al inicio", ist: "Estambul", s: "Buscar" },
};

export default function LocaleNotFound() {
  const seg = (usePathname() ?? "").split("/")[1] ?? "en";
  const c = COPY[seg.split("-")[0]] ?? COPY.en;
  return (
    <div className="container center-page">
      <div className="measure">
        <p className="code-tag">404</p>
        <h1>{c.t}</h1>
        <p className="lead">{c.x}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem" }}>
          <Link className="btn btn--primary" href={`/${seg}`}>{c.home}</Link>
          <Link className="btn btn--outline" href={`/${seg}/istanbul`}>{c.ist}</Link>
          <Link className="btn btn--outline" href={`/${seg}/istanbul/search`}>{c.s}</Link>
        </div>
      </div>
    </div>
  );
}

import { L } from "@/i18n/config";
import type { ExternalLink } from "./types";

/**
 * Plain site-level links only (no deep links, no affiliate parameters, no tracking).
 * Each was fetched on the date shown and confirmed to be the named site and to offer the described service.
 * NORVIGATE has no partnership or affiliate arrangement with any of them in this release.
 *
 * Integration point: to add a real provider/API later, add an adapter implementing the same shape
 * (see src/lib/repo.ts getExternalLinks) rather than editing page components.
 */
export const externalLinks: ExternalLink[] = [
  {
    id: "skyscanner",
    kind: "flights",
    name: "Skyscanner",
    description: L(
      "Flight comparison site that lists fares from airlines and travel agents.",
      "Havayolları ve seyahat acentelerinin fiyatlarını listeleyen uçuş karşılaştırma sitesi.",
      "موقع مقارنة رحلات جوية يعرض أسعار شركات الطيران ووكالات السفر.",
      "Sitio de comparación de vuelos que muestra tarifas de aerolíneas y agencias de viajes.",
    ),
    url: "https://www.skyscanner.com",
    checkedAt: "2026-10-16",
  },
  {
    id: "turkish-airlines",
    kind: "flights",
    name: "Turkish Airlines",
    description: L(
      "The airline's own site for searching and booking its flights.",
      "Havayolunun kendi uçuşlarını aramak ve rezerve etmek için kendi sitesi.",
      "الموقع الرسمي لشركة الطيران للبحث عن رحلاتها وحجزها.",
      "El sitio propio de la aerolínea para buscar y reservar sus vuelos.",
    ),
    url: "https://www.turkishairlines.com",
    checkedAt: "2026-10-16",
  },
  {
    id: "pegasus",
    kind: "flights",
    name: "Pegasus Airlines",
    description: L(
      "The airline's own site for searching and booking its flights.",
      "Havayolunun kendi uçuşlarını aramak ve rezerve etmek için kendi sitesi.",
      "الموقع الرسمي لشركة الطيران للبحث عن رحلاتها وحجزها.",
      "El sitio propio de la aerolínea para buscar y reservar sus vuelos.",
    ),
    url: "https://www.flypgs.com",
    checkedAt: "2026-10-16",
  },
  {
    id: "booking",
    kind: "hotels",
    name: "Booking.com",
    description: L(
      "Online accommodation booking site with a wide range of properties.",
      "Geniş bir tesis yelpazesine sahip çevrimiçi konaklama rezervasyon sitesi.",
      "موقع حجز إقامة عبر الإنترنت يضم مجموعة واسعة من المنشآت.",
      "Sitio de reserva de alojamiento en línea con una amplia gama de establecimientos.",
    ),
    url: "https://www.booking.com",
    checkedAt: "2026-10-16",
  },
  {
    id: "expedia",
    kind: "hotels",
    name: "Expedia",
    description: L(
      "Travel site offering accommodation (Stays) alongside other travel products.",
      "Diğer seyahat ürünlerinin yanında konaklama (Stays) sunan seyahat sitesi.",
      "موقع سفر يقدم الإقامة (Stays) إلى جانب منتجات سفر أخرى.",
      "Sitio de viajes que ofrece alojamiento (Stays) junto con otros productos de viaje.",
    ),
    url: "https://www.expedia.com",
    checkedAt: "2026-10-16",
  },
];

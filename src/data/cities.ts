import { L } from "@/i18n/config";
import type { City } from "./types";

export const cities: City[] = [
  {
    id: "istanbul",
    slug: "istanbul",
    name: L("Istanbul", "İstanbul", "إسطنبول", "Estambul"),
    platformName: L("ISTANBUL INTERNATIONAL GATE", "İSTANBUL ULUSLARARASI KAPISI", "بوابة إسطنبول الدولية", "PUERTA INTERNACIONAL DE ESTAMBUL"),
    tagline: L("Your Gateway to Istanbul", "İstanbul'a Açılan Kapınız", "بوابتك إلى إسطنبول", "Tu puerta a Estambul"),
    country: L("Türkiye", "Türkiye", "تركيا", "Türkiye"),
    description: L(
      "The first NORVIGATE city platform: a city guide, service categories, things to do, travel requests, translation requests and a store with order requests. Content is sample data.",
      "İlk NORVIGATE şehir platformu: şehir rehberi, hizmet kategorileri, yapılacaklar, seyahat talepleri, çeviri talepleri ve sipariş talepli bir mağaza. İçerik örnek veridir.",
      "أول منصة مدينة ضمن نورفيغيت: دليل المدينة وفئات الخدمات وأماكن للزيارة وطلبات السفر وطلبات الترجمة ومتجر بنظام طلب الشراء. المحتوى بيانات تجريبية.",
      "La primera plataforma de ciudad de NORVIGATE: guía de la ciudad, categorías de servicios, qué hacer, solicitudes de viaje, solicitudes de traducción y una tienda con solicitudes de pedido. El contenido son datos de muestra.",
    ),
    status: "preview",
    languages: ["en", "tr", "ar", "es"],
    featuredCategoryIds: ["accommodation", "transport", "business-services", "food-dining", "experiences"],
    plannedUrl: "https://istanbul.norvigate.com",
    route: "/istanbul",
  },
];

export const istanbul = cities[0];

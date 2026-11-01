import { L } from "@/i18n/config";
import type { ProviderCategory, ProviderCategoryId } from "./types";

/** Proposed categories. A category is not proof that providers exist. */
export const providerCategories: ProviderCategory[] = [
  {
    id: "accommodation",
    icon: "bed",
    name: L("Accommodation", "Konaklama", "الإقامة", "Alojamiento"),
    description: L("Hotels, guesthouses and serviced apartments.", "Oteller, pansiyonlar ve hizmetli apartlar.", "الفنادق ونُزل الضيافة والشقق المخدومة.", "Hoteles, casas de huéspedes y apartamentos con servicios."),
  },
  {
    id: "transport",
    icon: "bus",
    name: L("Transport", "Ulaşım", "النقل", "Transporte"),
    description: L("Airport transfers and local transportation.", "Havalimanı transferleri ve yerel ulaşım.", "التوصيل من المطارات والنقل المحلي.", "Traslados al aeropuerto y transporte local."),
  },
  {
    id: "business-services",
    icon: "briefcase",
    name: L("Business services", "İş hizmetleri", "خدمات الأعمال", "Servicios empresariales"),
    description: L("Company setup, accounting and professional support.", "Şirket kuruluşu, muhasebe ve profesyonel destek.", "تأسيس الشركات والمحاسبة والدعم المهني.", "Constitución de empresas, contabilidad y apoyo profesional."),
  },
  {
    id: "food-dining",
    icon: "utensils",
    name: L("Food & dining", "Yeme içme", "الطعام والمطاعم", "Gastronomía"),
    description: L("Restaurants, cafés and food experiences.", "Restoranlar, kafeler ve gastronomi deneyimleri.", "المطاعم والمقاهي وتجارب الطعام.", "Restaurantes, cafés y experiencias gastronómicas."),
  },
  {
    id: "shopping",
    icon: "bag",
    name: L("Shopping", "Alışveriş", "التسوق", "Compras"),
    description: L("Markets, gifts and local products.", "Çarşılar, hediyeler ve yerel ürünler.", "الأسواق والهدايا والمنتجات المحلية.", "Mercados, regalos y productos locales."),
  },
  {
    id: "health-wellness",
    icon: "heart",
    name: L("Health & wellness", "Sağlık ve iyi oluş", "الصحة والعافية", "Salud y bienestar"),
    description: L("Clinics, spas and wellbeing services.", "Klinikler, spalar ve iyi oluş hizmetleri.", "العيادات والمنتجعات الصحية وخدمات العافية.", "Clínicas, spas y servicios de bienestar."),
  },
  {
    id: "education",
    icon: "book",
    name: L("Education", "Eğitim", "التعليم", "Educación"),
    description: L("Language schools, courses and tutoring.", "Dil okulları, kurslar ve özel ders.", "مدارس اللغات والدورات والدروس الخصوصية.", "Escuelas de idiomas, cursos y clases particulares."),
  },
  {
    id: "relocation",
    icon: "home",
    name: L("Relocation support", "Taşınma desteği", "دعم الانتقال", "Apoyo para la mudanza"),
    description: L("Settling-in help for newcomers.", "Yeni gelenler için uyum desteği.", "مساعدة القادمين الجدد على الاستقرار.", "Ayuda de instalación para recién llegados."),
  },
  {
    id: "experiences",
    icon: "compass",
    name: L("Experiences", "Deneyimler", "التجارب", "Experiencias"),
    description: L("Tours, activities and things to do.", "Turlar, etkinlikler ve yapılacak şeyler.", "الجولات والأنشطة وأماكن الزيارة.", "Excursiones, actividades y planes."),
  },
];

export function getProviderCategory(id: string): ProviderCategory | undefined {
  return providerCategories.find((c) => c.id === id);
}

export function isProviderCategoryId(id: string): id is ProviderCategoryId {
  return providerCategories.some((c) => c.id === id);
}

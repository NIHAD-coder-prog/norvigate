import { L } from "@/i18n/config";
import type { TravelService } from "./types";

/**
 * SAMPLE SERVICES: demonstrations of how travel services will be presented.
 * None has a verified price, availability or provider. Forms record a request only.
 */
const updated = "2026-10-16";

const requestRecorded = L("Request recorded by NORVIGATE", "Talebin NORVIGATE tarafından kaydedilmesi", "تسجيل الطلب لدى نورفيغيت", "Solicitud registrada por NORVIGATE");
const followUp = L("Follow-up on your request (not guaranteed)", "Talebiniz için geri dönüş (garanti edilmez)", "متابعة الطلب (غير مضمونة)", "Seguimiento de tu solicitud (no garantizado)");
const noAvailability = L("Confirmed availability", "Onaylanmış müsaitlik", "توافر مؤكد", "Disponibilidad confirmada");
const noPrice = L("Fixed price", "Sabit fiyat", "سعر ثابت", "Precio fijo");
const noMonitoring = L("Flight monitoring", "Uçuş takibi", "متابعة الرحلة", "Seguimiento del vuelo");

export const travelServices: TravelService[] = [
  {
    id: "t-ist-transfer",
    slug: "istanbul-airport-transfer",
    category: "transfers",
    title: L("Istanbul Airport (IST) transfer", "İstanbul Havalimanı (IST) transferi", "التوصيل من مطار إسطنبول (IST)", "Traslado del Aeropuerto de Estambul (IST)"),
    summary: L(
      "Private transfer request between Istanbul Airport and your accommodation.",
      "İstanbul Havalimanı ile konaklama yeriniz arasında özel transfer talebi.",
      "طلب توصيل خاص بين مطار إسطنبول ومكان إقامتك.",
      "Solicitud de traslado privado entre el Aeropuerto de Estambul y tu alojamiento.",
    ),
    description: L(
      "Describe your flight, arrival time and destination in the city, and we record the request. No vehicle, price or driver is reserved by sending it.",
      "Uçuşunuzu, varış saatinizi ve şehirdeki varış noktanızı yazın; talebi kaydederiz. Göndermekle araç, fiyat veya şoför ayrılmış olmaz.",
      "اكتب تفاصيل رحلتك ووقت الوصول ووجهتك في المدينة وسنسجّل الطلب. لا يؤدي إرساله إلى حجز مركبة أو سعر أو سائق.",
      "Describe tu vuelo, la hora de llegada y tu destino en la ciudad, y registramos la solicitud. Al enviarla no se reserva ningún vehículo, precio ni conductor.",
    ),
    location: L("Istanbul Airport (IST) to city addresses", "İstanbul Havalimanı (IST) – şehir içi adresler", "من مطار إسطنبول (IST) إلى عناوين المدينة", "Del Aeropuerto de Estambul (IST) a direcciones de la ciudad"),
    inclusions: [requestRecorded, followUp],
    exclusions: [noAvailability, noPrice, noMonitoring],
    dataStatus: "sample",
    lastUpdated: updated,
  },
  {
    id: "t-saw-transfer",
    slug: "sabiha-gokcen-transfer",
    category: "transfers",
    title: L("Sabiha Gökçen (SAW) transfer", "Sabiha Gökçen (SAW) transferi", "التوصيل من مطار صبيحة غوكشن (SAW)", "Traslado de Sabiha Gökçen (SAW)"),
    summary: L(
      "Private transfer request between Sabiha Gökçen Airport and your accommodation.",
      "Sabiha Gökçen Havalimanı ile konaklama yeriniz arasında özel transfer talebi.",
      "طلب توصيل خاص بين مطار صبيحة غوكشن ومكان إقامتك.",
      "Solicitud de traslado privado entre el Aeropuerto Sabiha Gökçen y tu alojamiento.",
    ),
    description: L(
      "Describe your flight, arrival time and destination in the city, and we record the request. No vehicle, price or driver is reserved by sending it.",
      "Uçuşunuzu, varış saatinizi ve şehirdeki varış noktanızı yazın; talebi kaydederiz. Göndermekle araç, fiyat veya şoför ayrılmış olmaz.",
      "اكتب تفاصيل رحلتك ووقت الوصول ووجهتك في المدينة وسنسجّل الطلب. لا يؤدي إرساله إلى حجز مركبة أو سعر أو سائق.",
      "Describe tu vuelo, la hora de llegada y tu destino en la ciudad, y registramos la solicitud. Al enviarla no se reserva ningún vehículo, precio ni conductor.",
    ),
    location: L("Sabiha Gökçen Airport (SAW) to city addresses", "Sabiha Gökçen Havalimanı (SAW) – şehir içi adresler", "من مطار صبيحة غوكشن (SAW) إلى عناوين المدينة", "Del Aeropuerto Sabiha Gökçen (SAW) a direcciones de la ciudad"),
    inclusions: [requestRecorded, followUp],
    exclusions: [noAvailability, noPrice, noMonitoring],
    dataStatus: "sample",
    lastUpdated: updated,
  },
  {
    id: "t-old-city-tour",
    slug: "old-city-sightseeing-tour",
    category: "tours",
    title: L("Old City sightseeing tour (sample)", "Tarihi Yarımada gezi turu (örnek)", "جولة سياحية في المدينة القديمة (تجريبية)", "Visita turística del casco antiguo (muestra)"),
    summary: L(
      "A sample guided sightseeing tour of the historic peninsula.",
      "Tarihi yarımadada rehberli gezi turu örneği.",
      "جولة سياحية مصحوبة بمرشد في شبه الجزيرة التاريخية (مثال).",
      "Una visita guiada de muestra por la península histórica.",
    ),
    description: L(
      "Demonstrates how a tour service page is laid out: description, inclusions, exclusions, location and a request form. No tour operator, itinerary, guide or price is behind this sample.",
      "Bir tur hizmeti sayfasının düzenini gösterir: açıklama, dâhil olanlar, dâhil olmayanlar, konum ve talep formu. Bu örneğin arkasında bir tur operatörü, program, rehber veya fiyat yoktur.",
      "يعرض تخطيط صفحة خدمة الجولات: الوصف والمشمول وغير المشمول والموقع ونموذج الطلب. ولا يقف خلف هذا المثال منظّم رحلات أو برنامج أو مرشد أو سعر.",
      "Muestra cómo se presenta la página de un servicio de excursiones: descripción, qué incluye, qué no incluye, ubicación y formulario de solicitud. Detrás de esta muestra no hay operador, itinerario, guía ni precio.",
    ),
    location: L("Historic peninsula (Fatih)", "Tarihi yarımada (Fatih)", "شبه الجزيرة التاريخية (الفاتح)", "Península histórica (Fatih)"),
    duration: L("About half a day (indicative)", "Yaklaşık yarım gün (tahmini)", "نحو نصف يوم (تقريبي)", "Aproximadamente media jornada (orientativo)"),
    inclusions: [
      L("Route planning around well-known sites", "Bilinen yerler çevresinde güzergâh planı", "تخطيط مسار حول المعالم المعروفة", "Planificación de una ruta por lugares conocidos"),
      L("Guide (if a qualified guide is arranged)", "Rehber (nitelikli rehber ayarlanırsa)", "مرشد (إذا جرى ترتيب مرشد مؤهل)", "Guía (si se organiza un guía cualificado)"),
    ],
    exclusions: [
      L("Entrance tickets", "Giriş biletleri", "تذاكر الدخول", "Entradas"),
      L("Meals and drinks", "Yemek ve içecekler", "الوجبات والمشروبات", "Comidas y bebidas"),
      L("Hotel pick-up", "Otelden alınış", "الاستقبال من الفندق", "Recogida en el hotel"),
    ],
    dataStatus: "sample",
    lastUpdated: updated,
  },
  {
    id: "t-bosphorus",
    slug: "bosphorus-ferry-assistance",
    category: "tours",
    title: L("Bosphorus cruise assistance (sample)", "Boğaz turu yardımı (örnek)", "مساعدة في رحلة البوسفور (تجريبية)", "Asistencia para crucero por el Bósforo (muestra)"),
    summary: L(
      "Help choosing between public ferries and organised cruises.",
      "Şehir hatları vapurları ile organize turlar arasında seçim yapmak için yardım.",
      "مساعدة في الاختيار بين العبّارات العامة والرحلات المنظمة.",
      "Ayuda para elegir entre ferris públicos y cruceros organizados.",
    ),
    description: L(
      "A sample assistance service that explains options and sends you to the operator's own booking channel. NORVIGATE does not sell tickets.",
      "Seçenekleri açıklayan ve sizi işletmecinin kendi rezervasyon kanalına yönlendiren örnek bir yardım hizmeti. NORVIGATE bilet satmaz.",
      "خدمة مساعدة تجريبية تشرح الخيارات وتوجّهك إلى قناة الحجز الخاصة بالمشغّل. نورفيغيت لا تبيع التذاكر.",
      "Un servicio de asistencia de muestra que explica las opciones y te remite al canal de reservas del propio operador. NORVIGATE no vende billetes.",
    ),
    location: L("Bosphorus piers", "Boğaz iskeleleri", "أرصفة البوسفور", "Embarcaderos del Bósforo"),
    duration: L("About 1–2 hours (indicative)", "Yaklaşık 1–2 saat (tahmini)", "نحو ساعة إلى ساعتين (تقريبي)", "Entre 1 y 2 horas (orientativo)"),
    inclusions: [L("Information on options", "Seçenekler hakkında bilgi", "معلومات عن الخيارات", "Información sobre las opciones")],
    exclusions: [
      L("Tickets", "Biletler", "التذاكر", "Billetes"),
      L("Confirmed schedules", "Onaylı seferler", "مواعيد مؤكدة", "Horarios confirmados"),
    ],
    dataStatus: "sample",
    lastUpdated: updated,
  },
  {
    id: "t-local-transport",
    slug: "local-transport-orientation",
    category: "transport",
    title: L("Local transport orientation (sample)", "Şehir içi ulaşım rehberliği (örnek)", "إرشاد حول النقل المحلي (تجريبي)", "Orientación sobre transporte local (muestra)"),
    summary: L(
      "Help understanding metro, tram, ferry and bus options.",
      "Metro, tramvay, vapur ve otobüs seçeneklerini anlamak için yardım.",
      "مساعدة في فهم خيارات المترو والترام والعبّارة والحافلة.",
      "Ayuda para entender las opciones de metro, tranvía, ferry y autobús.",
    ),
    description: L(
      "A sample service describing orientation help for newcomers. It links to the official transport card information in the city guide and does not sell transport products.",
      "Yeni gelenlere yönelik oryantasyon yardımını anlatan örnek hizmet. Şehir rehberindeki resmî ulaşım kartı bilgilerine yönlendirir; ulaşım ürünü satmaz.",
      "خدمة تجريبية تصف المساعدة التعريفية للقادمين الجدد. تحيل إلى معلومات بطاقة النقل الرسمية في دليل المدينة ولا تبيع منتجات نقل.",
      "Un servicio de muestra que describe la ayuda de orientación para recién llegados. Remite a la información oficial de la tarjeta de transporte de la guía de la ciudad y no vende productos de transporte.",
    ),
    location: L("Istanbul", "İstanbul", "إسطنبول", "Estambul"),
    inclusions: [L("Explanation of the main modes", "Başlıca ulaşım türlerinin açıklaması", "شرح الوسائل الرئيسية", "Explicación de los principales medios")],
    exclusions: [
      L("Transport cards or tickets", "Ulaşım kartı veya biletleri", "بطاقات أو تذاكر النقل", "Tarjetas o billetes de transporte"),
      L("Fare information (check the operator)", "Ücret bilgisi (işletmeciyi kontrol edin)", "معلومات الأجرة (راجع المشغّل)", "Información de tarifas (consulta al operador)"),
    ],
    dataStatus: "sample",
    lastUpdated: updated,
  },
  {
    id: "t-assistance",
    slug: "travel-assistance",
    category: "assistance",
    title: L("Travel assistance and itinerary help (sample)", "Seyahat yardımı ve program desteği (örnek)", "مساعدة السفر ووضع البرنامج (تجريبية)", "Asistencia de viaje y ayuda con el itinerario (muestra)"),
    summary: L(
      "General help planning a trip to Istanbul.",
      "İstanbul gezisini planlamak için genel yardım.",
      "مساعدة عامة في التخطيط لرحلة إلى إسطنبول.",
      "Ayuda general para planificar un viaje a Estambul.",
    ),
    description: L(
      "A sample assistance service: tell us what you want to see and when, and we record your request. It does not include booking flights, hotels or tours.",
      "Örnek bir yardım hizmeti: ne görmek istediğinizi ve ne zaman gelmeyi planladığınızı yazın, talebinizi kaydederiz. Uçak, otel veya tur rezervasyonu içermez.",
      "خدمة مساعدة تجريبية: أخبرنا بما تريد رؤيته ومتى، وسنسجّل طلبك. لا تشمل حجز الطيران أو الفنادق أو الجولات.",
      "Un servicio de asistencia de muestra: dinos qué quieres ver y cuándo, y registramos tu solicitud. No incluye reservar vuelos, hoteles ni excursiones.",
    ),
    location: L("Istanbul", "İstanbul", "إسطنبول", "Estambul"),
    inclusions: [requestRecorded],
    exclusions: [
      L("Flight, hotel or tour bookings", "Uçak, otel veya tur rezervasyonu", "حجوزات الطيران أو الفنادق أو الجولات", "Reservas de vuelos, hoteles o excursiones"),
      L("Visa or legal advice", "Vize veya hukuki danışmanlık", "المشورة بشأن التأشيرات أو القانون", "Asesoramiento sobre visados o jurídico"),
    ],
    dataStatus: "sample",
    lastUpdated: updated,
  },
];

export const travelCategories: TravelService["category"][] = ["tours", "transfers", "transport", "assistance"];

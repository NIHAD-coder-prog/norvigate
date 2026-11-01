import { L } from "@/i18n/config";
import type { GuideSection } from "./types";

/**
 * EDITORIAL DRAFT. Intentionally general: no fares, timetables, visa rules or fees, because they change.
 * Every link below was fetched on 2026-10-16 and confirmed to be the site named. Links that could not be
 * confirmed (for example the Istanbul Airport operator site, which refused automated fetching) are omitted.
 */
const reviewed = "2026-10-16";
const checked = "2026-10-16";

export const guideSections: GuideSection[] = [
  {
    id: "arriving",
    title: L(
      "Arriving: airports and entry",
      "Varış: havalimanları ve giriş",
      "الوصول: المطارات والدخول",
      "Llegada: aeropuertos y entrada",
    ),
    body: [
      L(
        "Istanbul has two main commercial airports: Istanbul Airport (IST) on the European side and Sabiha Gökçen (SAW) on the Asian side. Check which airport your ticket uses before arranging onward travel.",
        "İstanbul'da iki ana ticari havalimanı vardır: Avrupa yakasında İstanbul Havalimanı (IST) ve Anadolu yakasında Sabiha Gökçen (SAW). Yola devam etmeyi planlamadan önce biletinizin hangi havalimanını kullandığına bakın.",
        "في إسطنبول مطاران تجاريان رئيسيان: مطار إسطنبول (IST) في الجانب الأوروبي ومطار صبيحة غوكشن (SAW) في الجانب الآسيوي. تحقق من المطار المذكور في تذكرتك قبل ترتيب التنقل.",
        "Estambul tiene dos aeropuertos comerciales principales: el Aeropuerto de Estambul (IST), en el lado europeo, y Sabiha Gökçen (SAW), en el lado asiático. Comprueba qué aeropuerto figura en tu billete antes de organizar el traslado.",
      ),
      L(
        "Entry and visa requirements depend on your nationality and can change. Use the official e-visa system and your own government's travel advice rather than relying on a third-party summary.",
        "Giriş ve vize şartları uyruğunuza bağlıdır ve değişebilir. Üçüncü taraf özetlere güvenmek yerine resmî e-vize sistemini ve kendi hükûmetinizin seyahat tavsiyelerini kullanın.",
        "تختلف شروط الدخول والتأشيرة بحسب جنسيتك وقد تتغير. استخدم نظام التأشيرة الإلكترونية الرسمي وتوجيهات حكومتك للسفر بدلًا من الاعتماد على ملخصات من أطراف ثالثة.",
        "Los requisitos de entrada y de visado dependen de tu nacionalidad y pueden cambiar. Usa el sistema oficial de visado electrónico y las recomendaciones de viaje de tu propio gobierno en lugar de fiarte de un resumen de terceros.",
      ),
    ],
    timeSensitive: true,
    reviewedAt: reviewed,
    links: [
      {
        label: L(
          "Republic of Türkiye e-Visa (official)",
          "T.C. e-Vize (resmî)",
          "التأشيرة الإلكترونية لجمهورية تركيا (رسمي)",
          "e-Visa de la República de Türkiye (oficial)",
        ),
        url: "https://www.evisa.gov.tr",
        checkedAt: checked,
      },
      {
        label: L(
          "Sabiha Gökçen Airport operator",
          "Sabiha Gökçen Havalimanı işletmecisi",
          "مشغّل مطار صبيحة غوكشن",
          "Operador del aeropuerto Sabiha Gökçen",
        ),
        url: "https://www.sgairport.com",
        checkedAt: checked,
      },
    ],
    dataStatus: "editorial",
  },
  {
    id: "transport",
    title: L("Getting around", "Şehir içi ulaşım", "التنقل داخل المدينة", "Cómo moverse"),
    body: [
      L(
        "Istanbul's public transport combines metro, tram, suburban rail, buses, funiculars and ferries across the Bosphorus. The city's smart transport card, İstanbulkart, is the usual way to pay on most public transport.",
        "İstanbul'un toplu taşıması metro, tramvay, banliyö treni, otobüs, füniküler ve Boğaz'daki vapurları birleştirir. Şehrin akıllı ulaşım kartı İstanbulkart, çoğu toplu taşıma aracında ödeme yapmanın olağan yoludur.",
        "يجمع النقل العام في إسطنبول بين المترو والترام والقطار الضواحي والحافلات والقطارات المعلّقة والعبّارات عبر البوسفور. بطاقة النقل الذكية «إسطنبول كارت» هي الوسيلة المعتادة للدفع في معظم وسائل النقل العام.",
        "El transporte público de Estambul combina metro, tranvía, tren de cercanías, autobuses, funiculares y transbordadores a través del Bósforo. La tarjeta inteligente de transporte de la ciudad, İstanbulkart, es la forma habitual de pagar en la mayoría del transporte público.",
      ),
      L(
        "Fares, routes, timetables and where to buy or top up a card change. Always check the official operator information.",
        "Ücretler, güzergâhlar, saatler ve kartın nereden alınıp yükleneceği değişir. Her zaman resmî işletmeci bilgilerine bakın.",
        "تتغير الأجور والمسارات والمواعيد ومكان شراء البطاقة أو شحنها. راجع دائمًا معلومات المشغّل الرسمية.",
        "Las tarifas, rutas, horarios y los puntos de compra o recarga de la tarjeta cambian. Consulta siempre la información oficial del operador.",
      ),
    ],
    timeSensitive: true,
    reviewedAt: reviewed,
    links: [
      {
        label: L("İstanbulkart (official)", "İstanbulkart (resmî)", "إسطنبول كارت (رسمي)", "İstanbulkart (oficial)"),
        url: "https://istanbulkart.istanbul",
        checkedAt: checked,
      },
      {
        label: L(
          "Istanbul Metropolitan Municipality",
          "İstanbul Büyükşehir Belediyesi",
          "بلدية إسطنبول الكبرى",
          "Ayuntamiento Metropolitano de Estambul",
        ),
        url: "https://www.ibb.istanbul",
        checkedAt: checked,
      },
    ],
    dataStatus: "editorial",
  },
  {
    id: "connectivity",
    title: L("Connectivity", "Bağlantı", "الاتصال بالإنترنت", "Conectividad"),
    body: [
      L(
        "Mobile data, SIM cards and the rules for using a foreign phone in Türkiye are set by the authorities and operators and can change. Check with a licensed operator and official sources before you travel or buy a SIM.",
        "Mobil veri, SIM kartları ve yabancı telefonun Türkiye'de kullanım kuralları yetkililer ve operatörler tarafından belirlenir ve değişebilir. Seyahat etmeden veya SIM satın almadan önce lisanslı bir operatöre ve resmî kaynaklara danışın.",
        "تحدد الجهات الرسمية والمشغّلون خطط البيانات وبطاقات SIM وقواعد استخدام هاتف أجنبي في تركيا، وقد تتغير. استشر مشغّلًا مرخّصًا ومصادر رسمية قبل السفر أو شراء شريحة.",
        "Los datos móviles, las tarjetas SIM y las normas para usar un teléfono extranjero en Türkiye las fijan las autoridades y los operadores y pueden cambiar. Consulta con un operador autorizado y con fuentes oficiales antes de viajar o comprar una SIM.",
      ),
    ],
    timeSensitive: true,
    reviewedAt: reviewed,
    links: [],
    dataStatus: "editorial",
  },
  {
    id: "essentials",
    title: L("Essential services", "Temel hizmetler", "الخدمات الأساسية", "Servicios esenciales"),
    body: [
      L(
        "The single emergency number in Türkiye is 112. Confirm this and other local numbers with an official source; numbers and services can change.",
        "Türkiye'de tek acil çağrı numarası 112'dir. Bu ve diğer yerel numaraları resmî bir kaynaktan doğrulayın; numaralar ve hizmetler değişebilir.",
        "رقم الطوارئ الموحّد في تركيا هو 112. تأكد منه ومن الأرقام المحلية الأخرى عبر مصدر رسمي؛ فقد تتغير الأرقام والخدمات.",
        "El número único de emergencias en Türkiye es el 112. Confírmalo, junto con otros números locales, en una fuente oficial; los números y servicios pueden cambiar.",
      ),
      L(
        "For visitor information, the official national tourism portal is a good starting point.",
        "Ziyaretçi bilgisi için resmî ulusal turizm portalı iyi bir başlangıç noktasıdır.",
        "للحصول على معلومات الزوار، تُعد بوابة السياحة الوطنية الرسمية نقطة انطلاق جيدة.",
        "Para información al visitante, el portal turístico nacional oficial es un buen punto de partida.",
      ),
    ],
    timeSensitive: true,
    reviewedAt: reviewed,
    links: [
      {
        label: L(
          "GoTürkiye (official tourism portal)",
          "GoTürkiye (resmî turizm portalı)",
          "GoTürkiye (بوابة السياحة الرسمية)",
          "GoTürkiye (portal turístico oficial)",
        ),
        url: "https://www.goturkiye.com",
        checkedAt: checked,
      },
    ],
    dataStatus: "editorial",
  },
  {
    id: "customs",
    title: L("Local customs", "Yerel gelenekler", "العادات المحلية", "Costumbres locales"),
    body: [
      L(
        "When visiting mosques, dress modestly, cover your shoulders and knees, and expect to remove your shoes. Women may be asked to cover their hair. Avoid visiting during prayer times unless you are there to pray, and follow the instructions of staff.",
        "Camileri ziyaret ederken mütevazı giyinin, omuz ve dizlerinizi örtün ve ayakkabılarınızı çıkarmanız gerekeceğini bilin. Kadınlardan saçlarını örtmeleri istenebilir. İbadet için gitmiyorsanız namaz vakitlerinde ziyaretten kaçının ve görevlilerin yönlendirmelerine uyun.",
        "عند زيارة المساجد، ارتدِ ملابس محتشمة وغطِّ الكتفين والركبتين وتوقّع خلع الحذاء. قد يُطلب من النساء تغطية الشعر. تجنّب الزيارة وقت الصلاة ما لم تكن للصلاة، واتبع تعليمات العاملين.",
        "Al visitar mezquitas, vístete con modestia, cúbrete los hombros y las rodillas y cuenta con quitarte los zapatos. A las mujeres puede pedírseles que se cubran el cabello. Evita visitar durante las horas de oración salvo que vayas a rezar, y sigue las indicaciones del personal.",
      ),
      L(
        "Bargaining is common in many bazaar shops but not in shops with posted prices.",
        "Pazarlık birçok çarşı dükkânında yaygındır ancak etiket fiyatlı dükkânlarda değildir.",
        "المساومة شائعة في كثير من محلات الأسواق لكنها ليست كذلك في المحلات ذات الأسعار المعلنة.",
        "Regatear es habitual en muchas tiendas de los bazares, pero no en las tiendas con precios marcados.",
      ),
    ],
    timeSensitive: false,
    reviewedAt: reviewed,
    links: [],
    dataStatus: "editorial",
  },
  {
    id: "money",
    title: L("Money and prices", "Para ve fiyatlar", "المال والأسعار", "Dinero y precios"),
    body: [
      L(
        "The currency is the Turkish lira (TRY). Exchange rates and prices change frequently. The NORVIGATE currency converter shows indicative daily reference rates from a third-party service; they are not live market prices. Prices shown on this site are sample data.",
        "Para birimi Türk lirasıdır (TRY). Döviz kurları ve fiyatlar sık değişir. NORVIGATE döviz çevirici, üçüncü taraf bir hizmetin günlük referans kurlarını gösterir; bunlar canlı piyasa fiyatı değildir. Bu sitede gösterilen fiyatlar örnek veridir.",
        "العملة هي الليرة التركية (TRY). تتغير أسعار الصرف والأسعار كثيرًا. يعرض محوّل العملات في نورفيغيت أسعارًا مرجعية يومية من خدمة طرف ثالث، وهي ليست أسعار سوق مباشرة. الأسعار المعروضة في هذا الموقع بيانات تجريبية.",
        "La moneda es la lira turca (TRY). Los tipos de cambio y los precios cambian con frecuencia. El conversor de divisas de NORVIGATE muestra tipos de referencia diarios de un servicio de terceros; no son precios de mercado en vivo. Los precios que se muestran en este sitio son datos de muestra.",
      ),
    ],
    timeSensitive: true,
    reviewedAt: reviewed,
    links: [],
    dataStatus: "editorial",
  },
];

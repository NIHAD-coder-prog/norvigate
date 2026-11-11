import { L } from "@/i18n/config";
import type { FaqItem } from "./types";

export const faqItems: FaqItem[] = [
  {
    id: "what",
    q: L("What is NORVIGATE?", "NORVIGATE nedir?", "ما هي نورفيغيت؟", "¿Qué es NORVIGATE?"),
    a: L(
      "NORVIGATE is a city-gateway platform that helps people discover a city, plan what they need, find local services and connect with providers. Istanbul is the first city platform.",
      "NORVIGATE; insanların bir şehri keşfetmesine, ihtiyaçlarını planlamasına, yerel hizmetleri bulmasına ve sağlayıcılarla bağlantı kurmasına yardımcı olan bir şehir geçidi platformudur. İlk şehir platformu İstanbul'dur.",
      "نورفيغيت منصة بوابة مدن تساعد الناس على اكتشاف المدينة والتخطيط لاحتياجاتهم وإيجاد الخدمات المحلية والتواصل مع مقدّميها. إسطنبول هي أول منصة مدينة.",
      "NORVIGATE es una plataforma de puerta de entrada a ciudades que ayuda a descubrir una ciudad, planificar lo que se necesita, encontrar servicios locales y conectar con proveedores. Estambul es la primera plataforma de ciudad.",
    ),
  },
  {
    id: "sample",
    q: L(
      "Why does the site say “sample data”?",
      "Site neden “örnek veri” diyor?",
      "لماذا يذكر الموقع «بيانات تجريبية»؟",
      "¿Por qué el sitio dice «datos de muestra»?",
    ),
    a: L(
      "This is a preview. Providers, products, prices and services shown here were created to demonstrate the platform and are not real. Real, verified listings will replace them, and we will say so clearly.",
      "Bu bir önizlemedir. Burada gösterilen sağlayıcılar, ürünler, fiyatlar ve hizmetler platformu göstermek için oluşturulmuştur ve gerçek değildir. Gerçek ve doğrulanmış ilanlar bunların yerini alacak ve bunu açıkça belirteceğiz.",
      "هذا إصدار معاينة. المزوّدون والمنتجات والأسعار والخدمات المعروضة هنا أُنشئت لعرض المنصة وليست حقيقية. ستحل محلها إدراجات حقيقية موثّقة وسنوضح ذلك بجلاء.",
      "Esta es una versión preliminar. Los proveedores, productos, precios y servicios que se muestran aquí se crearon para demostrar la plataforma y no son reales. Serán sustituidos por fichas reales y verificadas, y lo indicaremos con claridad.",
    ),
  },
  {
    id: "book",
    q: L(
      "Can I book or pay on NORVIGATE?",
      "NORVIGATE'te rezervasyon yapabilir veya ödeme yapabilir miyim?",
      "هل يمكنني الحجز أو الدفع عبر نورفيغيت؟",
      "¿Puedo reservar o pagar en NORVIGATE?",
    ),
    a: L(
      "Not at the moment. Forms record a request only. There is no payment, booking engine, login or reservation system. Flights and hotels link to external sites where you can book on their terms.",
      "Şimdilik hayır. Formlar yalnızca bir talep kaydeder. Ödeme, rezervasyon sistemi, giriş veya ayırma sistemi yoktur. Uçak ve otel sayfaları, kendi koşullarıyla rezervasyon yapabileceğiniz harici sitelere bağlanır.",
      "ليس حاليًا. تسجّل النماذج الطلب فقط. لا يوجد دفع أو محرك حجز أو تسجيل دخول أو نظام حجوزات. تحيلك صفحتا الطيران والفنادق إلى مواقع خارجية يمكنك الحجز فيها وفق شروطها.",
      "Todavía no. Los formularios solo registran una solicitud. No hay pagos, motor de reservas, inicio de sesión ni sistema de reservas. Las páginas de vuelos y hoteles enlazan a sitios externos donde puedes reservar según sus condiciones.",
    ),
  },
  {
    id: "verified",
    q: L("Are the providers verified?", "Sağlayıcılar doğrulanmış mı?", "هل المزوّدون موثّقون؟", "¿Están verificados los proveedores?"),
    a: L(
      "No provider is real for now or verified. When real providers are added, only fields with real data will be shown, with a last-updated date. We do not display invented reviews, ratings, addresses or availability.",
      "Şu an hiçbir sağlayıcı gerçek veya doğrulanmış değildir. Gerçek sağlayıcılar eklendiğinde yalnızca gerçek veri içeren alanlar, son güncelleme tarihiyle gösterilecektir. Uydurma yorum, puan, adres veya müsaitlik göstermeyiz.",
      "لا يوجد حاليًا أي مزوّد حقيقي أو موثّق. عند إضافة مزوّدين حقيقيين ستُعرض الحقول التي لها بيانات حقيقية فقط مع تاريخ آخر تحديث. لا نعرض مراجعات أو تقييمات أو عناوين أو توافرًا مختلقة.",
      "Por ahora ningún proveedor es real ni está verificado. Cuando se añadan proveedores reales, solo se mostrarán los campos con datos reales y con fecha de última actualización. No mostramos reseñas, valoraciones, direcciones ni disponibilidad inventadas.",
    ),
  },
  {
    id: "contact-business",
    q: L(
      "How do I contact a business?",
      "Bir işletmeyle nasıl iletişime geçerim?",
      "كيف أتواصل مع نشاط تجاري؟",
      "¿Cómo contacto con un negocio?",
    ),
    a: L(
      "Sample listings have no contact details. For now, you can send an enquiry to NORVIGATE through the contact form; it is received by NORVIGATE and is not forwarded to a provider automatically.",
      "Örnek ilanların iletişim bilgisi yoktur. Şimdilik iletişim formu üzerinden NORVIGATE'e bir soru gönderebilirsiniz; bu soru NORVIGATE'e ulaşır ve otomatik olarak bir sağlayıcıya iletilmez.",
      "الإدراجات التجريبية بلا بيانات اتصال. حاليًا يمكنك إرسال استفسار إلى نورفيغيت عبر نموذج الاتصال؛ يصل إلى نورفيغيت ولا يُحوَّل تلقائيًا إلى مزوّد.",
      "Las fichas de muestra no tienen datos de contacto. Por ahora puedes enviar una consulta a NORVIGATE mediante el formulario de contacto; la recibe NORVIGATE y no se reenvía automáticamente a un proveedor.",
    ),
  },
  {
    id: "store",
    q: L("How does the store work?", "Mağaza nasıl çalışır?", "كيف يعمل المتجر؟", "¿Cómo funciona la tienda?"),
    a: L(
      "You can browse sample products, fill a cart and send an order request. That records your interest. It does not charge you, reserve stock or confirm an order, and delivery and shipping are not operational.",
      "Örnek ürünlere göz atabilir, sepet oluşturabilir ve sipariş talebi gönderebilirsiniz. Bu, ilginizi kaydeder. Sizden ücret alınmaz, stok ayrılmaz, sipariş onaylanmaz; teslimat ve gönderim henüz işlemez.",
      "يمكنك تصفح منتجات تجريبية وملء سلة وإرسال طلب شراء. يسجّل ذلك اهتمامك ولا يخصم منك مبلغًا ولا يحجز مخزونًا ولا يؤكد طلبًا، والتوصيل والشحن غير مفعّلين.",
      "Puedes explorar productos de muestra, llenar un carrito y enviar una solicitud de pedido. Eso registra tu interés. No se te cobra, no se reserva stock ni se confirma un pedido, y la entrega y el envío no están operativos.",
    ),
  },
  {
    id: "international",
    q: L(
      "Can products be shipped abroad?",
      "Ürünler yurt dışına gönderilebilir mi?",
      "هل يمكن شحن المنتجات إلى الخارج؟",
      "¿Se pueden enviar productos al extranjero?",
    ),
    a: L(
      "Not yet. International shipping, especially of food, needs a review of destination import restrictions, labelling rules, shipping feasibility and fulfilment before any destination is enabled. We will not switch a destination on before that review.",
      "Henüz değil. Uluslararası gönderim, özellikle gıda için, herhangi bir varış noktası açılmadan önce ithalat kısıtlamalarının, etiketleme kurallarının, gönderim uygulanabilirliğinin ve tedarik süreçlerinin incelenmesini gerektirir. Bu inceleme olmadan hiçbir varış noktasını açmayacağız.",
      "ليس بعد. يتطلب الشحن الدولي، وخاصة للأغذية، مراجعة قيود الاستيراد في بلد الوجهة وقواعد الوسم وجدوى الشحن وتنفيذ الطلبات قبل تفعيل أي وجهة. ولن نفعّل وجهة قبل هذه المراجعة.",
      "Todavía no. El envío internacional, especialmente de alimentos, requiere revisar las restricciones de importación del destino, las normas de etiquetado, la viabilidad del envío y el cumplimiento logístico antes de activar cualquier destino. No activaremos un destino antes de esa revisión.",
    ),
  },
  {
    id: "translation",
    q: L(
      "Is certified translation available?",
      "Yeminli çeviri mevcut mu?",
      "هل الترجمة المعتمدة متاحة؟",
      "¿Hay traducción jurada disponible?",
    ),
    a: L(
      "Certified translation can only be offered when an appropriately qualified provider is available. For now, a request records your interest; availability is not confirmed.",
      "Yeminli çeviri yalnızca uygun nitelikte bir sağlayıcı mevcut olduğunda sunulabilir. Şimdilik talep ilginizi kaydeder; müsaitlik onaylanmış değildir.",
      "لا يمكن تقديم الترجمة المعتمدة إلا عند توفر مزوّد مؤهل بما يلزم. حاليًا يسجّل الطلب اهتمامك فقط ولا يُؤكَّد التوافر.",
      "La traducción jurada solo puede ofrecerse cuando hay un proveedor con la cualificación adecuada. Por ahora una solicitud registra tu interés; la disponibilidad no está confirmada.",
    ),
  },
  {
    id: "languages",
    q: L(
      "Which languages does the site support?",
      "Site hangi dilleri destekliyor?",
      "ما اللغات التي يدعمها الموقع؟",
      "¿Qué idiomas admite el sitio?",
    ),
    a: L(
      "English, Turkish, Arabic, Spanish and French, with a full right-to-left layout for Arabic. The platform is built so more languages can be added; text that is not yet translated is shown in English. Use the language switcher in the header.",
      "İngilizce, Türkçe, Arapça, İspanyolca ve Fransızca; Arapça için tam sağdan sola düzen vardır. Platform, yeni diller eklenebilecek şekilde kurulmuştur; henüz çevrilmemiş metin İngilizce gösterilir. Üst bilgideki dil değiştiriciyi kullanın.",
      "الإنجليزية والتركية والعربية والإسبانية والفرنسية، مع تخطيط كامل من اليمين إلى اليسار للعربية. بُنيت المنصة بحيث يمكن إضافة لغات أخرى، وأي نص لم يُترجم بعد يظهر بالإنجليزية. استخدم مبدّل اللغة في أعلى الصفحة.",
      "Inglés, turco, árabe, español y francés, con diseño completo de derecha a izquierda para el árabe. La plataforma está construida para poder añadir más idiomas; el texto aún sin traducir se muestra en inglés. Usa el selector de idioma de la cabecera.",
    ),
  },
  {
    id: "currency",
    q: L(
      "Are converted prices exact?",
      "Dönüştürülen fiyatlar kesin mi?",
      "هل الأسعار المحوَّلة دقيقة؟",
      "¿Son exactos los precios convertidos?",
    ),
    a: L(
      "No. Conversions are indicative, based on daily reference rates from a third-party service. Store prices are sample prices in Turkish lira and nothing is charged. If the rate service cannot be reached, no converted amount is shown.",
      "Hayır. Dönüştürmeler, üçüncü taraf bir hizmetin günlük referans kurlarına dayanan tahmini değerlerdir. Mağaza fiyatları Türk lirası cinsinden örnek fiyatlardır ve hiçbir ücret alınmaz. Kur hizmetine ulaşılamazsa dönüştürülmüş tutar gösterilmez.",
      "لا. التحويلات استرشادية وتستند إلى أسعار مرجعية يومية من خدمة طرف ثالث. أسعار المتجر أسعار تجريبية بالليرة التركية ولا يُخصم أي مبلغ. وإذا تعذر الوصول إلى خدمة الأسعار فلا يُعرض أي مبلغ محوَّل.",
      "No. Las conversiones son orientativas y se basan en tipos de referencia diarios de un servicio de terceros. Los precios de la tienda son precios de muestra en liras turcas y no se cobra nada. Si no se puede acceder al servicio de tipos de cambio, no se muestra ningún importe convertido.",
    ),
  },
  {
    id: "listing",
    q: L(
      "If I submit my business, will it be listed?",
      "İşletmemi gönderirsem listelenir mi?",
      "إذا أرسلت نشاطي التجاري، هل سيُدرج؟",
      "Si envío mi negocio, ¿se publicará?",
    ),
    a: L(
      "Not automatically. Submission registers interest and does not guarantee publication. Submissions are reviewed before anything is published.",
      "Otomatik olarak değil. Gönderim ilginizi kaydeder ve yayınlanmayı garanti etmez. Herhangi bir şey yayınlanmadan önce başvurular incelenir.",
      "ليس تلقائيًا. الإرسال يسجّل الاهتمام ولا يضمن النشر. تُراجَع الطلبات قبل نشر أي شيء.",
      "No automáticamente. El envío registra el interés y no garantiza la publicación. Las solicitudes se revisan antes de publicar nada.",
    ),
  },
  {
    id: "privacy",
    q: L(
      "What happens to the details I send?",
      "Gönderdiğim bilgilere ne olur?",
      "ماذا يحدث للبيانات التي أرسلها؟",
      "¿Qué ocurre con los datos que envío?",
    ),
    a: L(
      "They are stored by NORVIGATE to follow up on your request. No analytics or advertising cookies are used. The Privacy Policy is a draft awaiting legal review.",
      "Talebinizi takip etmek için NORVIGATE tarafından saklanır. Analiz veya reklam çerezi kullanılmaz. Gizlilik Politikası, hukuki incelemeyi bekleyen bir taslaktır.",
      "تُخزَّن لدى نورفيغيت لمتابعة طلبك. لا تُستخدم ملفات تعريف ارتباط للتحليلات أو الإعلانات حاليًا. سياسة الخصوصية مسودة بانتظار المراجعة القانونية.",
      "NORVIGATE los guarda para dar seguimiento a tu solicitud. Por ahora no se usan cookies de analítica ni de publicidad. La Política de privacidad es un borrador pendiente de revisión jurídica.",
    ),
  },
];

import type { LegalPack } from "./types";

/** TASLAKTIR. Bir yapay zekâ asistanı tarafından hazırlanmıştır, avukat tarafından değil. Yayından önce bir Türk avukat incelemelidir. */
export const tr: LegalPack = {
  ui: {
    banner: "Bir Türk avukat tarafından incelenmeyi bekleyen taslaktır. Bu metin hukuki danışmanlık değildir ve işletmenin herhangi bir mevzuata uygun olduğu anlamına gelmez.",
    notLawyer: "Metin, avukat olmayan bir yapay zekâ asistanı tarafından hazırlanmıştır.",
    drafted: "Taslak tarihi: 29 Ekim 2026",
    toComplete: "[Satıcı tarafından doldurulacak]",
    sellerTitle: "Satıcı bilgileri",
    sellerFields: { legalName: "Ticaret unvanı", taxOffice: "Vergi dairesi", taxNumber: "Vergi kimlik numarası", mersis: "MERSİS numarası", address: "Kayıtlı adres", email: "E-posta", phone: "Telefon", kepAddress: "KEP adresi", foodRegistration: "Gıda işletme kaydı" },
    storeNotOpen: "Çevrimiçi mağaza henüz satışa açık değildir. Açılana kadar bu sitedeki formlar yalnızca talep kaydeder; hiçbir ürün satılmaz ve ödeme alınmaz.",
    related: "İlgili belgeler",
  },

  privacy: {
    title: "Gizlilik Politikası ve KVKK Aydınlatma Metni",
    intro: "Bu metin, NORVIGATE'in bu web sitesi üzerinden hangi kişisel verileri, neden işlediğini ve 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamındaki haklarınızı açıklar. Aynı zamanda ilgili kişilere yönelik aydınlatma yükümlülüğünü yerine getirir.",
    sections: [
      { h: "1. Veri sorumlusu", p: ["Veri sorumlusu NORVIGATE'in işletmecisidir: [ticaret unvanı, adres, MERSİS veya vergi numarası ve iletişim e-postası; yayından önce işletme tarafından doldurulacaktır]."] },
      { h: "2. Ne topluyoruz ve nasıl", p: [
        "Formlar: yalnızca formlara yazdıklarınız; ad, e-posta, isteğe bağlı telefon, mesaj veya talep ve sipariş taleplerinde seçtiğiniz ürünler ile adetler. Ayrıca sayfa dilini ve gönderim zamanını kaydederiz.",
        "Siparişler (yalnızca çevrimiçi ödeme açıkken): ad, soyad, e-posta, telefon, teslimat adresi, sipariş içeriği ve tutarları, ödeme kuruluşu isterse kimlik numarası. Ödemeyi ödeme kuruluşunun kendi sayfasında yaparsınız; kart bilgileriniz NORVIGATE'e ulaşmaz.",
        "Teknik veriler: sunucu güvenlik ve arıza tespiti için teknik istek bilgilerini kaydedebilir. IP adresiniz form gönderimleriyle veya siparişlerle birlikte saklanmaz. Kötüye kullanımı sınırlamak için sunucu belleğinde kısa süre kullanılır; ödeme sırasında ise ödeme kuruluşu zorunlu tuttuğu için ona iletilir.",
      ] },
      { h: "3. Amaçlar ve hukuki sebepler", p: [
        "Sorularınızı yanıtlamak ve talepleri işleme almak: formdaki onay kutusunu işaretleyerek verdiğiniz açık rıza ve sözleşme öncesi adımlar.",
        "Siparişleri işlemek, teslim etmek ve muhasebe ile vergi yükümlülüklerini yerine getirmek: sözleşmenin ifası ve hukuki yükümlülük.",
        "Sitenin güvenliğini sağlamak ve kötüye kullanımı önlemek: veri sorumlusunun meşru menfaati.",
        "[KVKK madde 5 ve 6 kapsamındaki nihai sebep listesi avukat tarafından doğrulanacaktır.]",
      ] },
      { h: "4. Verilerin aktarıldığı taraflar", p: [
        "Barındırma ve altyapı sağlayıcısı: [ad ve ülke, doldurulacaktır].",
        "Ödeme kuruluşu (yalnızca çevrimiçi ödeme açıkken): [iyzico veya seçilen kuruluş, doldurulacaktır].",
        "Kargo şirketi (yalnızca gönderilen siparişlerde): [kargo firması, doldurulacaktır].",
        "Döviz kurları sunucumuz tarafından herkese açık bir kur hizmetinden alınır ve kişisel verilerinizi içermez. İstanbul sayfasındaki hava durumu kutusu güncel hava durumunu tarayıcınızdan Open-Meteo'dan ister; bu nedenle Open-Meteo, her web isteğinde olduğu gibi IP adresinizi görebilir.",
        "Veriler satılmaz. Türkiye dışında barındırma dâhil yurt dışına aktarımlar KVKK madde 9 kapsamında değerlendirilmelidir. [Avukat ile tamamlanacaktır.]",
      ] },
      { h: "5. Saklama süresi", p: ["Talepler, yanıtlanmaları için gereken süre ve sonrasında makul bir süre saklanır. [Kesin süreleri işletme belirleyecektir.] Sipariş ve fatura kayıtları Türk ticaret ve vergi mevzuatının öngördüğü süre boyunca saklanır. [Süreler avukat tarafından doğrulanacaktır.]"] },
      { h: "6. Haklarınız", p: [
        "KVKK madde 11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, aktarıldığı kişileri bilme, düzeltme isteme, silinmesini veya yok edilmesini isteme, bu işlemlerin alıcılara bildirilmesini isteme, yalnızca otomatik sistemle analiz edilmesi sonucu ortaya çıkan sonuca itiraz etme ve hukuka aykırı işleme nedeniyle zararın giderilmesini talep etme haklarına sahipsiniz.",
        "Başvurmak için adınızı ve size ulaşılacak bir yolu belirterek 1. bölümdeki iletişim adresine yazın. Veri sorumlusu başvuruyu en geç 30 gün içinde yanıtlar. Kişisel Verileri Koruma Kurulu'na şikâyette de bulunabilirsiniz.",
      ] },
      { h: "7. Kayıt yükümlülüğü", p: ["İşletmecinin Veri Sorumluları Sicili'ne (VERBİS) kaydolma yükümlülüğü, büyüklüğüne ve işlediği verilere bağlıdır. [Avukat tarafından doğrulanacaktır.]"] },
      { h: "8. Değişiklikler", p: ["Verileri işleme biçimimiz değiştiğinde bu metni güncelleriz ve son sürümün tarihini gösteririz."] },
    ],
  },

  terms: {
    title: "Kullanım Koşulları",
    intro: "Bu koşullar NORVIGATE web sitesinin kullanım kurallarını belirler. Çevrimiçi satışların ayrı koşulları vardır: Satış Koşulları'na bakın.",
    sections: [
      { h: "1. Site hakkında", p: ["NORVIGATE bir şehir kapısı platformudur. İlk kapısı İstanbul'dur. Örnek olarak işaretlenen içerik bir örnektir; gerçek bir sağlayıcı, fiyat, ürün veya müsaitlik değildir."] },
      { h: "2. Talepler sözleşme değildir", p: ["Formlar talep ve soruları kaydeder. Talep; rezervasyon, sipariş veya sözleşme değildir. NORVIGATE veya bir sağlayıcı bunu ayrıca ve açıkça onaylamadıkça hiçbir şey kesinleşmez."] },
      { h: "3. Üçüncü taraf hizmetler ve bağlantılar", p: ["Uçuş, otel ve diğer bağlantılar bağımsız sitelere gider. NORVIGATE bu sitelerin içeriğini, fiyatlarını veya müsaitliğini denetlemez. Ödeme yapmadan önce tarihleri ve koşulları o sitelerde kontrol edin."] },
      { h: "4. Gönderdikleriniz", p: ["Doğru bilgi verin ve yalnızca paylaşma hakkınız olan bilgileri gönderin. Hukuka aykırı, yanıltıcı veya taciz edici içerik ya da başkalarının kişisel verilerini izinsiz göndermeyin."] },
      { h: "5. İlanlar", p: ["İlan talebi yayımlanacağı anlamına gelmez. NORVIGATE bir ilanı reddedebilir, düzenleyebilir veya kaldırabilir."] },
      { h: "6. Bilgiler ve çevrimler", p: ["Namaz vakitleri standart bir yöntemle hesaplanır ve yerel resmî takvimden küçük farklar gösterebilir. Hava durumu üçüncü bir taraftan gelir. Para birimi çevirileri günlük referans kurlara dayanan bilgi amaçlı değerlerdir, teklif değildir; banka veya ödeme kuruluşunun tahsil ettiği tutar farklı olabilir."] },
      { h: "7. Fikrî mülkiyet", p: ["NORVIGATE adı, logosu ve görselleri sahibine aittir. Yazılı izin olmadan kopyalanamaz veya yeniden kullanılamaz. [Sahiplik ifadesi doğrulanacaktır.]"] },
      { h: "8. Sorumluluk", p: ["[Sorumluluk sınırları ve feragatler avukat tarafından hazırlanacaktır. Türk hukukunda sınırlandırılamayan sorumluluğu ve tüketici haklarını sınırlayamazlar.]"] },
      { h: "9. Değişiklikler ve uygulanacak hukuk", p: ["Bu koşulları değiştirebiliriz ve tarihi göstereriz. [Uygulanacak hukuk ile yetkili mahkeme veya tüketici hakem heyetleri avukat tarafından doğrulanacaktır.]"] },
    ],
  },

  sales: {
    title: "Satış Koşulları ve Ön Bilgilendirme",
    intro: "Bu metin, açıldığında NORVIGATE çevrimiçi mağazasındaki alışverişler için geçerlidir. Türk tüketici hukuku (6502 sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği) uyarınca mesafeli sözleşmeler için gereken ön bilgilendirmedir. Alıcı, ödemeden önce bunu okuyabilmeli ve onaylayabilmelidir.",
    sections: [
      { h: "1. Satıcı", p: ["Satıcının kimliği, adresi ve iletişim bilgileri bu sayfanın başındaki tablodadır. Bu bilgiler tamamlanmadan mağaza açılmaz."] },
      { h: "2. Ürünler", p: ["Her ürünün ağırlık, içerik, alerjen, raf ömrü ve saklama koşulları dâhil temel nitelikleri ürün sayfasındadır. Bunları ve paket üzerindeki etiketi kontrol edin. Ödemedeki alerjen onayı zorunludur."] },
      { h: "3. Fiyat ve ödeme", p: ["Fiyatlar Türk lirasıdır ve satıcının dâhil etmek zorunda olduğu vergileri içerir. [Vergi ifadesi doğrulanacaktır.] Teslimat bedeli ödemeden önce hesaplanır ve ayrı gösterilir. Ödeme anında görünen toplam, ödeyeceğiniz tutardır. Ödeme, ödeme kuruluşunun güvenli sayfasında yapılır; NORVIGATE kart bilgilerinizi almaz."] },
      { h: "4. Sipariş ve sözleşme", p: ["Sözleşme, ödeme onaylandığında ve sipariş durumu Ödendi göründüğünde kurulur. Satıcı, yerine getiremediği bir siparişi, örneğin stok yoksa, iptal edip iade edebilir."] },
      { h: "5. Teslimat", p: ["Teslimat koşulları, süreleri ve gönderim yapılan yerler Kargo ve İade sayfasındadır. Teslimat yalnızca ödemede listelenen yerlere yapılır."] },
      { h: "6. Cayma hakkı", p: [
        "Tüketici, mesafeli sözleşmeden malı teslim aldığı tarihten itibaren 14 gün içinde gerekçe göstermeden cayabilir.",
        "Yönetmelik bazı malları bu haktan ayırır; çabuk bozulabilen veya son kullanma tarihi geçebilecek mallar ile sağlık ve hijyen nedeniyle iade edilemeyen, ambalajı açılmış mallar bunlar arasındadır. Gıdanın bu istisnalara girmesi muhtemeldir. [Hangi ürünlerin hariç olduğunu avukat doğrulamalı ve ürün sayfaları bunu belirtmelidir.]",
        "Hak geçerliyse 14 gün içinde satıcıya yazılı bildirin. Satıcı, bildirimden itibaren 14 gün içinde aynı ödeme yöntemiyle iade yapar. [İade kargo bedeli ifadesi doğrulanacaktır.]",
      ] },
      { h: "7. Ayıplı veya yanlış ürün", p: ["Ürün hasarlı, yanlış veya ayıplı gelirse fotoğraflarla birlikte vakit kaybetmeden satıcıya başvurun. Türk tüketici hukukundan doğan yasal haklarınız bu koşullarla sınırlanmaz."] },
      { h: "8. Şikâyet ve uyuşmazlık", p: ["Önce satıcıya başvurun. Tüketici ayrıca her yıl belirlenen parasal sınırlar içinde, yerleşim yerindeki veya satıcının bulunduğu yerdeki Tüketici Hakem Heyeti'ne ya da Tüketici Mahkemesi'ne başvurabilir. [Güncel sınırlar ve ifade avukat tarafından doğrulanacaktır.]"] },
      { h: "9. Türkiye dışındaki alıcılar", p: ["Alıcının ülkesinin tüketici hukuku da uygulanabilir. [Avukat bu konuda ve her varış yerindeki gıda ithalat kuralları hakkında bilgi vermelidir.] Mağaza yalnızca satıcının kontrol ettiği varış yerlerini açar."] },
      { h: "10. Kişisel veriler", p: ["Kişisel veriler Gizlilik Politikası ve KVKK Aydınlatma Metni'nde açıklandığı gibi işlenir."] },
    ],
  },

  shipping: {
    title: "Kargo ve İade",
    intro: "Siparişlerin teslimat için nasıl fiyatlandırıldığı, ne kadar sürdüğü ve bir sorun olursa ne olacağı. Beklemede olarak işaretlenen rakamlar, mağaza açılmadan önce satıcının gerçek kargo tekliflerleriyle değiştirmesi gereken yer tutuculardır.",
    sections: [
      { h: "1. Nereye teslim ediyoruz", p: ["Yalnızca ödemede sunulan ülkelere. Liste, satıcı her varış yerinin gıda ithalat kurallarını kontrol ettikten sonra belirlenir. Ülkeniz sunulmuyorsa siparişi alamayız."] },
      { h: "2. Teslimat bedeli", p: ["Bedel, varış yerine ve ambalaj dâhil siparişin toplam ağırlığına bağlıdır. Sunucu tarafından hesaplanır ve ödemeden önce gösterilir. [Kargo teklifleri kesinleşince fiyat tablosu yayımlanacaktır.]"] },
      { h: "3. Teslimat süresi", p: ["Ödemede gösterilen tahmin, gönderimden itibaren bir gün aralığıdır ve garanti değildir. Türkiye dışındaki gümrük kontrolleri süreyi uzatabilir. [Tahminler kargo firmasıyla doğrulanacaktır.]"] },
      { h: "4. Takip", p: ["Sipariş gönderildiğinde durum sayfasında kargo firması ve takip numarası görünür. Ödemeden sonra aldığınız özel bağlantıyı saklayın; durum sayfasını açmanın tek yolu budur."] },
      { h: "5. Gümrük, vergi ve ithalat kuralları", p: ["Gıda varışta kısıtlanabilir veya vergilendirilebilir. [Satıcı her varış yeri için vergileri kimin ödeyeceğini belirtecektir.] Gümrükte reddedilen veya bekletilen bir paket iade edilemeyebilir. [Avukat tarafından doğrulanacaktır.]"] },
      { h: "6. Bozulabilir gıda ve iade", p: ["Gıda bozulabileceğinden cayma hakkı genellikle gıdaya uygulanmaz (Satış Koşulları'na bakın). [Avukat doğrulamalıdır.] Ürün hasarlı, bozulmuş veya yanlış gelirse teslimattan sonraki [gün sayısı belirlenecektir] gün içinde fotoğraflarla bize yazın; kanunun gerektirdiği şekilde değiştirir veya iade ederiz."] },
      { h: "7. Gönderimden önce iptal", p: ["Mümkün olan en kısa sürede bize yazın. Sipariş gönderilmemişse iptal edilir ve ilk ödeme yöntemine iade edilir. [Süre doğrulanacaktır.]"] },
    ],
  },

  cookies: {
    title: "Çerez Bildirimi",
    intro: "NORVIGATE reklam veya analiz çerezi kullanmaz ve üçüncü taraf betik yüklemez. Bu bildirim, cihazınızda sakladığı küçük öğeleri listeler.",
    sections: [
      { h: "1. Neler saklanır", p: [
        "NV_LOCALE (çerez, bir yıl): seçtiğiniz dili hatırlar. Dil seçiminin çalışması için zorunludur.",
        "nv_currency (tarayıcı depolaması): bilgi amaçlı fiyatlar için seçtiğiniz para birimini hatırlar.",
        "nv_cart_v1 (tarayıcı depolaması): sepetinizdeki ürünleri cihazınızda tutar. Bir sipariş talebi gönderene veya ödemeye geçene kadar sunucuya gönderilmez.",
      ] },
      { h: "2. İzleme yok", p: ["Analiz, reklam pikseli veya sosyal medya yerleşimi yoktur. Daha sonra eklenirse bu bildirim güncellenir ve kanunun gerektirdiği hâllerde önce onay istenir."] },
      { h: "3. Üçüncü taraf istekleri", p: ["İstanbul ana sayfasındaki hava durumu kutusu güncel hava durumunu doğrudan tarayıcınızdan Open-Meteo'dan ister. Bu istek çerez bırakmaz ama sağlayıcı, her web isteğinde olduğu gibi IP adresinizi görebilir. Çevrimiçi ödeme açıkken ödeme kuruluşunun sayfasının kendi bildirimleri vardır."] },
      { h: "4. Seçimleriniz", p: ["Çerezi ve tarayıcı depolamasını tarayıcı ayarlarınızdan istediğiniz zaman silebilirsiniz. Site de dilinizi, para biriminizi ve sepetinizi unutur."] },
    ],
  },
};

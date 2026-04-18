import { Link } from "react-router-dom";
import { Package, Clock, Truck, Shield } from "lucide-react";

/**
 * HAQIDA SAHIFASI KOMPONENTI - Brend Hikoyasi & Kompaniya Ma'lumoti
 *
 * Bu sahifa kompaniyaning hikoyasi, missiyasi va asosiy xususiyatlarini ko'rsatadi.
 * Layout (Veb):
 *   - Yuqorida navigatsiya yo'li
 *   - Qahramoni bo'lim kompaniya hikoyasi + rasm bilan
 *   - Statistika bo'limi (Sotuvchi, Xaridor, Mahsulot)
 *   - Asosiy farqlashtirgichlarni ko'rsatadigan xususiyat kartalari
 *
 * Layout (Mobil):
 *   - Vertikal yig'ish: Hikoya tarkibi, keyin rasm, keyin statistika, keyin xususiyatlar
 *   - Barcha shrift va bo'sh joylar o'qish uchun kamayadi
 *
 * Rang sxemasi:
 *   - Asosiy apelsin: #E44B26 sarlavhalar va CTA uchun
 *   - Kulrang matn tanasi tarkibiga uchun
 *   - Toza estetikaga uchun oq fon
 */

export default function AboutPage() {
  // ═══════════════════════════════════════════════════════════════════════════════════
  // XUSUSIYAT KARTALARI MA'LUMOTI
  // ═══════════════════════════════════════════════════════════════════════════════════

  /**
   * Sahifaning pastida ko'rsatilgan xususiyat kartalari massivi.
   * Har bir xususiyat Foodzy'ning asosiy farqini ta'kidlaydi.
   * Ikonkalar ilovaning boshqasiga mos kelish uchun lucide-react dan.
   */
  const features = [
    {
      id: 1,
      icon: Package,
      title: "Mahsulot To'plash",
      description:
        "Barcha buyurtmalaringiz uchun xavfsiz va atrof-muhitga mos qadoqlash.",
    },
    {
      id: 2,
      icon: Clock,
      title: "24x7 Qo'llab-Quvvatlash",
      description:
        "Sizning qulayligi uchun kunning hamma vaqtida xizmat ko'rsatish.",
    },
    {
      id: 3,
      icon: Truck,
      title: "5 Kundan Ichida Yetkazish",
      description: "Barcha mintaqalar bo'ylab tez va ishonchli yetkazish.",
    },
    {
      id: 4,
      icon: Shield,
      title: "To'lov Xavfsiz",
      description:
        "Xotirjamlik uchun xavfsiz va shifrlangan to'lov qayta ishlash.",
    },
  ];

  // ═══════════════════════════════════════════════════════════════════════════════════
  // STATISTIKA MA'LUMOTI
  // ═══════════════════════════════════════════════════════════════════════════════════

  /**
   * Qahramoni bo'limida ko'rsatilgan kompaniya statistikasi.
   * Bu miqyos va ishonchni ko'rsatadi: sotuvchi, xaridor va mahsulotlar soni.
   * O'qish osonligi uchun 'k' suffiksi (minglab) bilan formatlangan.
   */
  const stats = [
    { label: "Sotuvchi", value: "0.1k" },
    { label: "Xaridor", value: "23k" },
    { label: "Mahsulot", value: "2k" },
  ];

  // ═══════════════════════════════════════════════════════════════════════════════════
  // RENDER - ASOSIY HAQIDA SAHIFASI
  // ═══════════════════════════════════════════════════════════════════════════════════

  return (
    <main className="bg-white">
      {/* ─── NAVIGATSIYA YO'LI ─── */}
      <div className="bg-[#E44B26] text-white px-4 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Biz Haqida</h1>
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              Bosh sahifa
            </Link>
            <span className="text-white/60">•</span>
            <span className="text-white/80">Biz Haqida</span>
          </nav>
        </div>
      </div>

      {/* ─── QAHRAMONI BO'LIM: Kompaniya Hikoyasi + Rasm ─── */}
      <section className="max-w-[1200px] mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Chap: Hikoya Tarkibi */}
          <div className="space-y-4 md:space-y-6">
            {/* Section heading - large and prominent */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              About The Carrot
            </h2>

            {/* Kompaniya ta'rifi - missiya va qiymatlarini tushuntiradigan uchta paragraf */}
            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Ratione, recusandae necessitatibus quasi incidunt alias adipisci
                pariatur eorum iure beatae assumenda rerum quod. Tempora magni
                autem a voluptatibus neque.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                vitae rerum cum accusamus magni consequuntur architecto. ipsum
                delenti expedita doloribus suscipit voluptatum ius perferendis
                amet.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium, maxime amet architecto est exercitationem optio eo
                maiores corporis beatae, dolores doloribus libero nesciunt qui
                illum? Voluptates deserunt adipisci voluptatem magni sunt sed
                blandititis quod apertentu! Iusto?
              </p>
            </div>

            {/* ─── STATISTIKA QATORI ─── */}
            {/* Kompaniya miqyosini ko'rsatish uchun katta formatda ko'rsatilgan uchta asosiy metrika */}
            <div className="grid grid-cols-3 gap-6 pt-4 md:pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  {/* Diqqatni tortish uchun katta qiymat apelsinga */}
                  <div className="text-2xl md:text-3xl font-bold text-[#E44B26]">
                    {stat.value}
                  </div>
                  {/* Statistika yorlig'i kulrang */}
                  <div className="text-xs md:text-sm text-gray-600 font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* O'ng: Xususiyat Rasmi */}
          <div className="flex justify-center lg:justify-end">
            {/* Sabzavot/yangi mahsulot rasmi uchun placeholder */}
            <div className="w-full max-w-sm bg-gradient-to-br from-green-50 to-orange-50 rounded-lg overflow-hidden shadow-lg">
              {/* Haqiqiy ilovada bu haqiqiy rasm bo'ladi */}
              <div className="aspect-square bg-gradient-to-b from-green-100 to-yellow-100 flex items-center justify-center">
                <p className="text-center text-gray-500 px-4">
                  Yangi sabzavotlar va bozorvoy rasm
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── XUSUSIYATLAR BO'LIMI ─── */}
      {/* 
        Asosiy farqlarni xususiyat kartalari sifatida ko'rsatish.
        Har bir karta ikonka, sarlavha va tavsifga ega.
        Veb: 4 ustun yon-yana
        Mobil: 2 ustun, keyin juda kichik ekranlarda yig'ish
      */}
      <section className="bg-gray-50 px-4 py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto">
          {/* To'r layout: ekran o'lchamiga asosida javob beruvchi ustunlar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              // Lucide-react dan dinamik ravishda ikonka komponentini olish
              const IconComponent = feature.icon;

              return (
                <div
                  key={feature.id}
                  className="bg-white rounded-lg p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Feature icon - centered and colored */}
                  <div className="flex justify-center mb-4">
                    <IconComponent
                      size={40}
                      className="text-[#E44B26]"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Xususiyat sarlavhasi - qo'lin va naminon */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>

                  {/* Xususiyat ta'rifi - kichikroq kulrang matn */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA BO'LIMI ─── */}
      {/* 
        Foydalanuvchilarni mahsulotlarni o'rganishga undaydigan havolani chiqarish bo'limi.
        Oddiy bo'lim do'konga bog'lantirilgan tugma bilan.
      */}
      <section className="max-w-[1200px] mx-auto px-4 py-12 md:py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Biz bilan xarid qilishga tayormi?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Sizning eshikinggacha yetkazilgan keng ko'lamli yangi va sifatli
          mahsulotlarni o'rganib chiqing.
        </p>
        {/* Do'kon sahifasiga havola tugmasi */}
        <Link
          to="/shop"
          className="inline-block bg-[#E44B26] hover:bg-[#c93f1e] text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Xarid Qilishni Boshlash
        </Link>
      </section>
    </main>
  );
}

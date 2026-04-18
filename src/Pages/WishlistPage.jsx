import { Link } from "react-router-dom";
import { Heart, ArrowRight, ShoppingCart, Trash2 } from "lucide-react";
import useWishlistStore from "../Store/wishlistStore";
import useCartStore from "../Store/cartStore";

/**
 * WISHLIST SAHIFASI KOMPONENTI - Sevimli Mahsulotlar Ko'rsatish & Boshqarish
 *
 * Bu sahifa foydalanuvchilar wishlist/sevimlisiga qo'shgan barcha mahsulotlarni ko'rsatadi.
 * Xususiyatlar:
 *   - Barcha wishlist mahsulotlarining to'r yoki ro'yxat ko'rinishi
 *   - Wishlistdan o'chirish funksionalligini
 *   - Har qanday mahsulot uchun tez savat qo'shish
 *   - Mahsulot bo'lmaganda bo'sh holat havolani chiqarish
 *   - Mahsulot narxi, rasmlari va baholari
 *
 * Layout:
 *   Veb: 4 ustunli mahsulot kartalari to'ri
 *   Planshet: 3 ustunli to'r
 *   Mobil: Optimal joydan foydalanish uchun 2 ustunli to'r
 *
 * Holatni Boshqarish:
 *   - Zustand dan wishlist mahsulotlarini olish uchun useWishlistStore ishlatiladi
 *   - Savat qo'shish uchun useCartStore ishlatiladi
 */

export default function WishlistPage() {
  // ═══════════════════════════════════════════════════════════════════════════════════
  // ZUSTAND STORE'LARDAN HOLATNI BOSHQARISH
  // ═══════════════════════════════════════════════════════════════════════════════════

  /**
   * Zustand store'dan barcha wishlist mahsulotlarini olish.
   * Wishlist o'zgarganida komponent qayta renderleninadigan qilib store'ga ajratiladi.
   * Mahsulotlar massivi to'liq mahsulot ob'ektlarini o'z ichiga oladi: { id, name, price, image_url, ... }
   */
  const wishlistItems = useWishlistStore((s) => s.items);

  /**
   * Wishlist store'dan removeItem funksiyasini olish.
   * Foydalanuvchi o'chirish tugmasini bosganda mahsulotni wishlistdan o'chirish uchun ishlatiladi.
   */
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);

  /**
   * Wishlist store'dan toggleWishlist funksiyasini olish.
   * Mahsulotlarni o'chirish uchun alternativ usulni taqdim etish uchun ishlatiladi (shift-almashtirgich funksionalligini).
   */
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  /**
   * Savat store'dan addItem funksiyasini olish.
   * Wishlist mahsulotlarini bitta bosilgan bilan savat qo'shish uchun ishlatiladi.
   */
  const addToCart = useCartStore((s) => s.addItem);

  // ═══════════════════════════════════════════════════════════════════════════════════
  // VOQEA BOSHQARUVCHILARI
  // ═══════════════════════════════════════════════════════════════════════════════════

  /**
   * Bitta mahsulotni wishlistdan o'chirish boshqaruvchisi.
   * To'rdan uni darhol olib tashlash orqali vizual qayta-javob beradi.
   * @param {number|string} productId - O'chirilishi kerak bo'lgan mahsulotning ID'si
   */
  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    // Ixtiyoriy: Bu yerga UX qayta-javob uchun toast bildirish qo'shish mumkin edi
  };

  /**
   * Wishlist mahsulotini savat qo'shish boshqaruvchisi.
   * Bu miqdori 1 bo'lgan yangi savat mahsuloti yaratadi.
   * @param {Object} product - Savat qo'shish uchun to'liq mahsulot ob'ekti
   */
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
    // Ixtiyoriy: Savat qo'shilganligini tasdiqlovchi toast bildirish ko'rsatishi mumkin
  };

  /**
   * Butun wishlistni bir vaqtda o'chirish boshqaruvchisi.
   * Tasodifiy ma'lumotlar yo'qotilishini oldini olish uchun tasdiqlov dialogi ko'rsatadi.
   */
  const handleClearWishlist = () => {
    const confirmed = window.confirm(
      "Siz butun wishlistni o'chirib tashlamoqchi ekaningizga ishonchli ekanmisiz? Bu harakatni qaytarish mumkin emas.",
    );
    if (confirmed) {
      useWishlistStore.setState({ items: [] });
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════════════
  // RENDER - ASOSIY WISHLIST SAHIFASI
  // ═══════════════════════════════════════════════════════════════════════════════════

  return (
    <main className="bg-white min-h-screen">
      {/* ─── NAVIGATSIYA YO'LI & SARLAVHA ─── */}
      <div className="bg-[#E44B26] text-white px-4 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Mening Wishlistim</h1>
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              Bosh sahifa
            </Link>
            <span className="text-white/60">•</span>
            <span className="text-white/80">Wishlist</span>
          </nav>
        </div>
      </div>

      {/* ─── ASOSIY TARKIB ─── */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* ──── WISHLIST MAHSULOTLAR SONI & AMALLAR ──── */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              {wishlistItems.length === 0
                ? "Wishlistda mahsulot yo'q"
                : `Wishlistda ${wishlistItems.length} ta${wishlistItems.length !== 1 ? "" : ""} mahsulot`}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {wishlistItems.length > 0
                ? "Ushbu mahsulotlardan istalganini savat qo'shish yoki wishlistdan o'chirish mumkin."
                : "Sevimli mahsulotlaringizni wishlistga qo'sha boshlangu!"}
            </p>
          </div>

          {/* Barcha wishlistni o'chirish tugmasi - faqat mahsulot mavjud bo'lsa ko'rsatish */}
          {wishlistItems.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="hidden md:block px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Butun wishlistni o'chirish"
            >
              Hammasini O'chirish
            </button>
          )}
        </div>

        {/* ──── BO'SH HOLAT ──── */}
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 md:py-20">
            {/* Vizual qa'ytaga uchun yurak ikonkasi */}
            <Heart size={64} className="text-gray-300 mb-4 stroke-1" />

            {/* Bo'sh holat xabari */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Wishlistingiz bo'sh
            </h3>
            <p className="text-gray-600 text-center max-w-sm mb-6">
              Mahsulotlarni wishlistga qo'sha boshlangu va ular bu yerda
              ko'rinadi.
            </p>

            {/* CTA tugmasi do'konga */}
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#E44B26] hover:bg-[#c93f1e] text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Xarid Qilishni Davom Ettirish
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          /* ──── WISHLIST MAHSULOTLAR TO'RI ──── */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* ──── MAHSULOT RASMI KONTEYNER ──── */}
                <div className="relative bg-gray-100 aspect-square overflow-hidden group">
                  {/* Mahsulot rasmi */}
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    /* Rasm bo'lmasa placeholder */
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Rasm yo'q
                    </div>
                  )}

                  {/* ──── WISHLISTDAN O'CHIRISH TUGMASI ──── */}
                  {/* 
                    Mutlaq o'ng yuqori burchagiga joylashtirilgan.
                    Amal-harakatning aniq chaqiruvini uchun suring ortida ko'rinadi.
                    Mahsulot wishlistda ekanligini ko'rsatadigan to'liq yurak ikonkasi.
                  */}
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-red-600 text-gray-600 hover:text-white p-2 rounded-full transition-colors shadow-md"
                    title="Wishlistdan o'chirish"
                    aria-label="Wishlistdan o'chirish"
                  >
                    <Heart size={18} className="fill-current" />
                  </button>
                </div>

                {/* ──── MAHSULOT MA'LUMOT BO'LIMI ──── */}
                <div className="flex-1 p-3 md:p-4 flex flex-col">
                  {/* Mahsulot nomi - 2 qatoriga kesish */}
                  <h3 className="font-bold text-sm md:text-base text-gray-900 line-clamp-2 mb-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="hover:text-[#E44B26] transition-colors"
                    >
                      {product.name}
                    </Link>
                  </h3>

                  {/* Ixtiyoriy: Mahsulot kategoriyasi badge */}
                  {product.category && (
                    <span className="text-xs text-gray-500 mb-2 capitalize">
                      {typeof product.category === "string"
                        ? product.category
                        : product.category.title}
                    </span>
                  )}

                  {/* Mahsulot narxi - apertadasida noto'qiblangan */}
                  <div className="text-lg md:text-xl font-bold text-[#E44B26] mb-3 mt-auto">
                    ${product.price?.toFixed(2) || "N/A"}
                  </div>

                  {/* ──── AMALIYOT TUGMALARI ──── */}
                  <div className="flex gap-2">
                    {/* Savat qo'shish tugmasi */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-[#E44B26] hover:bg-[#c93f1e] text-white font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 text-sm"
                      title="Savat qo'shish"
                    >
                      <ShoppingCart size={16} />
                      <span className="hidden md:inline">Qo'shish</span>
                    </button>

                    {/* O'chirish tugmasi - mobil optimallashtirilgan */}
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="flex-shrink-0 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                      title="Wishlistdan o'chirish"
                      aria-label="Wishlistdan o'chirish"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ──── TAVSIYA QISMI ──── */}
        {/* Wishlist bo'sh bo'lmasa ko'rsatish - ko'proq xarid qilishga undaydi */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 md:mt-16 py-8 border-t border-gray-200 text-center">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              Ko'proq mahsulotlarni ko'rmoqchimisiz?
            </h3>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#E44B26] hover:bg-[#c93f1e] text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Xarid Qilishni Davom Ettirish
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

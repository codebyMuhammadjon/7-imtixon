import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Phone,
  Menu,
  X,
} from "lucide-react";
import useCartStore from "../../Store/cartStore";
import useWishlistStore from "../../Store/wishlistStore";
import logo from "../../assets/icons/logo.svg";

/**
 * HEADER KOMPONENT - Javob berish uchun tuzilgan Navigatsiya & Brending
 *
 * Desktop ko'rinishi (lg breakpoint+):
 *   - Yuqori qator: Navigatsiya havolalari + Telefon
 *   - Pastki qator: Logotip + Qidirish paneli + Harakatlar ikonkalari (Account, Wishlist, Cart)
 *
 * Mobil ko'rinishi (lg breakpoint ostida):
 *   - Kompakt yagona qator: Menyu o'zgartgichi + Logotip + Harakatlar ikonkalari
 *   - Oshib chiqadigan nav drawer: Navigatsiya havolalari + Qidirish (o'zgartgich bosilganda pastga suriladi)
 *
 * Xususiyatlar:
 *   - Yapishqoq pozisyonlash (sahifaning yuqorisida qoladi harid qilayotganida)
 *   - Savat badge summani ko'rsatadi
 *   - Wishlist counter badge
 *   - Kategoriya filtriga havola bilan qidirish
 *   - Tailwind breakpointlari bilan javob berish dizayni
 */

// Navigatsiya havolalarining asosiy massivi (desktop va mobil menyularda ishlatiladi)
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
];

export default function Header() {
  // ═══════════════════════════════════════════════════════════════════════════════════
  // HOLATNI BOSHQARISH
  // ═══════════════════════════════════════════════════════════════════════════════════

  // Mobil menyun ochiq/yopiq ekanligini kuzatish
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Qidirish sorovi input qiymatini saqlash
  const [searchQuery, setSearchQuery] = useState("");

  // Router hooks uchun navigatsiya va joriy sahifa kuzatish
  const navigate = useNavigate();
  const location = useLocation();

  // ═══════════════════════════════════════════════════════════════════════════════════
  // ZUSTAND STORE HOOKS - Savat va Wishlist Holatini Boshqarish
  // ═══════════════════════════════════════════════════════════════════════════════════

  /**
   * Savat storege obuna bo'ling va jami miqdor hisoblab oling.
   * Bu savat o'zgarsa, qayta-render bo'ladi.
   * Badge jami 10 yoki undan ortiq bo'lsa "9+" ko'rsatadi joyni tejash uchun.
   */
  const cartItems = useCartStore((s) => s.items);
  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  /**
   * Wishlist storege obuna bo'ling jami wishlist soni uchun.
   * Foydalanuvchi qancha mahsulotni sevimliga qo'shganini ko'rsatadi.
   */
  const wishlistTotal = useWishlistStore((s) => s.totalItems);

  // ═══════════════════════════════════════════════════════════════════════════════════
  // VOQEA BOSHQARUVCHILARI
  // ═══════════════════════════════════════════════════════════════════════════════════

  /**
   * Qidirish shakli yuborish uchun boshqaruvchi.
   * Qidirish sorovi bilan shop sahifasiga yo'naltiriladi.
   * Qidirish va mobil menyni yopgach inputni tozalaydi.
   * @param {Event} e - Shakli yuborish voqeasi
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Maxsus belgini xavfsiz qilib olish uchun URL-kodlang
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Input maydoni tozalash
      setMobileMenuOpen(false); // Qidirish keyin mobil menyu yopish
    }
  };

  /**
   * Navigatsiya havolasi bosilganda mobil menyuni yopish.
   * Foydalanuvchi yangi sahifaga o'tgandan keyin menyun ochiq qolmasligini ta'minlaydi.
   */
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  /**
   * Havola joriy faol sahifa ekanligini tekshirish.
   * Faol navigatsiya havolasini vizual ko'rsatish uchun ishlatiladi.
   * @param {string} to - Tekshirilacak marshrutning yo'li
   * @returns {boolean} Agar bu marshrut hozir faol bo'lsa True
   */
  const isActive = (to) => location.pathname === to;

  // ═══════════════════════════════════════════════════════════════════════════════════
  // RENDER - ASOSIY HEADER KOMPONENT
  // ═══════════════════════════════════════════════════════════════════════════════════

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* ─── DESKTOP: YUQORI NAVIGATSIYA QATORI (mobilda yashirinadi) ─── */}
      <div className="hidden lg:flex border-b border-gray-100">
        <div className="w-full max-w-[1200px] mx-auto px-4 flex items-center justify-between h-10">
          {/* Desktop navigatsiya havolalari - tartibli joyni saqlash bilan flex layout */}
          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-[#E44B26]" // Faol havola rangi
                    : "text-gray-600 hover:text-[#E44B26]" // Faol bo'lmagan havola o'qish effekti bilan
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Telefon kontakt ma'lumoti - o'ng tomoniga hizalangan */}
          <a
            href="tel:+1234567890"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#E44B26] transition-colors"
          >
            <Phone size={13} />
            +123 (456) 7890
          </a>
        </div>
      </div>

      {/* ─── ASOSIY HEADER QATORI (Desktop: Logotip + Qidirish + Ikonkalar) ─── */}
      <div className="w-full max-w-[1200px] mx-auto px-4 flex items-center justify-between gap-3 h-16 lg:gap-4">
        {/* ──── MOBIL MENYU SHIFT-ALMASHTIR (kichik ekranda ko'rinadi) ──── */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex-shrink-0 text-gray-600 hover:text-[#E44B26] transition-colors"
          aria-label="Menyuni shift-almashtirgich"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* ──── LOGOTIP (barcha ekran o'lchami) ──── */}
        <Link
          to="/"
          className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity"
          aria-label="Foodzy Asosiy sahifa"
        >
          <img src={logo} alt="Foodzy Logotipi" className="h-8 w-auto" />
        </Link>

        {/* ──── QIDIRISH PANELI (mobilda joyni tejash uchun yashirinadi) ──── */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md items-center border border-gray-200 rounded-lg overflow-hidden hover:border-[#E44B26] transition-colors"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Mahsulot izlang..."
            className="flex-1 px-4 py-2.5 text-sm focus:outline-none bg-transparent"
          />
          <button
            type="submit"
            className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-3.5 py-2.5 transition-colors flex items-center justify-center"
            aria-label="Qidirish"
          >
            <Search size={16} />
          </button>
        </form>

        {/* ──── HARAKATLAR IKONKALARI QATORI (Hisob, Wishlist, Savat) ──── */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto flex-shrink-0">
          {/* Hisob / Kirish Tugmasi */}
          <button className="flex items-center gap-1 text-gray-600 hover:text-[#E44B26] transition-colors text-xs md:text-sm font-medium group">
            <User
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="hidden md:inline">Hisob</span>
          </button>

          {/* Wishlist Tugmasi - sevimli mahsulotlar soni badge ko'rsatadi */}
          <Link
            to="/wishlist"
            className="flex items-center gap-1 text-gray-600 hover:text-[#E44B26] transition-colors text-xs md:text-sm font-medium relative group"
          >
            <div className="relative">
              <Heart
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              {/* Wishlist mahsulotlar soni badge */}
              {wishlistTotal > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E44B26] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistTotal > 9 ? "9+" : wishlistTotal}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Wishlist</span>
          </Link>

          {/* Savat Tugmasi - asosiy CTA mahsulotlar soni badge bilan */}
          <Link
            to="/cart"
            className="flex items-center gap-1 text-gray-600 hover:text-[#E44B26] transition-colors text-xs md:text-sm font-medium relative group"
          >
            <div className="relative">
              <ShoppingCart
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              {/* Jami savat mahsulotlar soni badge (faqat miqdor hisoblanadi, mahsulotlar emas) */}
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E44B26] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartItems > 9 ? "9+" : totalCartItems}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Savat</span>
          </Link>
        </div>
      </div>

      {/* ─── MOBIL MENYU DRAWER (menyu o'zgartirgich bosilganda pastga suriladi) ─── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-gray-50 px-4 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Mobil qidirish paneli - menyu drawerda ko'rsatiladi */}
          <form
            onSubmit={handleSearch}
            className="mb-4 flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Izlang..."
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-3 py-2 transition-colors"
              aria-label="Qidirish"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Mobil menyudagi navigatsiya havolalari */}
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleNavLinkClick}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-[#E44B26] text-white" // Faol havola foni
                    : "text-gray-700 hover:bg-gray-100" // Faol bo'lmagan havola o'qish foni bilan
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

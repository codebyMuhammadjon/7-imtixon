import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Phone,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import useCartStore from "../../Store/cartStore";
import logo from "../../assets/icons/logo.svg";

/**
 * Шапка сайта.
 * Состоит из двух строк:
 *  1. Верхняя — телефон, навигация
 *  2. Нижняя — логотип, поиск, иконки корзины/вишлиста/аккаунта
 */

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Получаем количество товаров из Zustand
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* ── Верхняя строка ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-9">
          {/* Иконка мобильного меню */}
          <button
            className="lg:hidden text-gray-500"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Навигация (десктоп) */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-gray-600 hover:text-[#E44B26] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Телефон */}
          <a
            href="tel:+1234567890"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#E44B26]"
          >
            <Phone size={13} />
            +123 (456) 7890
          </a>
        </div>
      </div>

      {/* ── Нижняя строка ── */}
      <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-4 h-16">
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Foodzy" className="" />
        </Link>

        {/* Поиск */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for items..."
            className="flex-1 border border-gray-200 rounded-l-md px-4 py-2 text-sm
                       focus:outline-none focus:border-[#E44B26] transition-colors"
          />
          {/* Выбор категории */}
          <select
            className="border-y border-gray-200 px-3 text-sm text-gray-500
                       focus:outline-none bg-white"
          >
            <option>All Categories</option>
          </select>
          {/* Кнопка поиска */}
          <button
            type="submit"
            className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-4 rounded-r-md
                       transition-colors flex items-center"
            aria-label="Поиск"
          >
            <Search size={16} />
          </button>
        </form>

        {/* Иконки */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Аккаунт */}
          <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E44B26] transition-colors">
            <User size={18} />
            <span className="hidden md:inline">Account</span>
          </button>

          {/* Вишлист */}
          <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E44B26] transition-colors">
            <Heart size={18} />
            <span className="hidden md:inline">Wishlist</span>
          </button>

          {/* Корзина */}
          <Link
            to="/cart"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E44B26] transition-colors relative"
          >
            <div className="relative">
              <ShoppingCart size={18} />
              {/* Счётчик */}
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-[#E44B26] text-white text-[10px]
                                 w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Cart</span>
          </Link>
        </div>
      </div>

      {/* ── Мобильное меню ── */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-gray-700 hover:text-[#E44B26] py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

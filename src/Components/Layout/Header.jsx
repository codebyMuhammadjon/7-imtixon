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
 * HEADER COMPONENT - Responsive Navigation & Branding
 *
 * Desktop view (lg breakpoint+):
 *   - Top row: Navigation links + Phone contact
 *   - Bottom row: Logo + Search bar + Action icons (Account, Wishlist, Cart)
 *
 * Mobile view (below lg breakpoint):
 *   - Compact single row: Menu toggle + Logo + Action icons
 *   - Expandable nav drawer: Navigation links + Search (slides down when toggled)
 *
 * Features:
 *   - Sticky positioning (stays at top while scrolling)
 *   - Cart badge showing total items
 *   - Wishlist counter badge
 *   - Search with category filter
 *   - Responsive design with Tailwind breakpoints
 */

// Array of main navigation links used in both desktop and mobile menus
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
];

export default function Header() {
  // ═══════════════════════════════════════════════════════════════════════════════════
  // STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════════════

  // Track if mobile menu is open/closed
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Store the search query input value
  const [searchQuery, setSearchQuery] = useState("");

  // Get router hooks for navigation and current page tracking
  const navigate = useNavigate();
  const location = useLocation();

  // ═══════════════════════════════════════════════════════════════════════════════════
  // ZUSTAND STORE HOOKS - Cart & Wishlist State Management
  // ═══════════════════════════════════════════════════════════════════════════════════

  /**
   * Subscribe to cart store to get cart items and calculate total quantity.
   * This updates whenever items are added/removed from cart.
   * The badge displays "9+" for 10+ items to save space.
   */
  const cartItems = useCartStore((s) => s.items);
  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  /**
   * Subscribe to wishlist store to get total wishlist count.
   * Shows how many items user has favorited.
   */
  const wishlistTotal = useWishlistStore((s) => s.totalItems);

  // ═══════════════════════════════════════════════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════════════

  /**
   * Handle search form submission.
   * Navigates to shop page with search query as URL parameter.
   * Clears input after search and closes mobile menu if open.
   * @param {Event} e - Form submit event
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // URL-encode the search query to handle special characters safely
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear input field
      setMobileMenuOpen(false); // Close mobile menu after search
    }
  };

  /**
   * Close mobile menu when navigation link is clicked.
   * Ensures menu doesn't stay open after user navigates to a new page.
   */
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  /**
   * Check if a link is the current active page.
   * Used for visual highlighting of active navigation link.
   * @param {string} to - The route path to check
   * @returns {boolean} True if this route is currently active
   */
  const isActive = (to) => location.pathname === to;

  // ═══════════════════════════════════════════════════════════════════════════════════
  // RENDER - MAIN HEADER COMPONENT
  // ═══════════════════════════════════════════════════════════════════════════════════

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* ─── DESKTOP: TOP NAVIGATION ROW (hidden on mobile) ─── */}
      <div className="hidden lg:flex border-b border-gray-100">
        <div className="w-full max-w-[1200px] mx-auto px-4 flex items-center justify-between h-10">
          {/* Desktop navigation links - flex layout with consistent spacing */}
          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-[#E44B26]" // Active link color
                    : "text-gray-600 hover:text-[#E44B26]" // Inactive link with hover effect
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Phone contact info - right aligned */}
          <a
            href="tel:+1234567890"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#E44B26] transition-colors"
          >
            <Phone size={13} />
            +123 (456) 7890
          </a>
        </div>
      </div>

      {/* ─── MAIN HEADER ROW (Desktop: Logo + Search + Icons) ─── */}
      <div className="w-full max-w-[1200px] mx-auto px-4 flex items-center justify-between gap-3 h-16 lg:gap-4">
        {/* ──── MOBILE MENU TOGGLE (visible only on small screens) ──── */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex-shrink-0 text-gray-600 hover:text-[#E44B26] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* ──── LOGO (all screen sizes) ──── */}
        <Link
          to="/"
          className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity"
          aria-label="Foodzy Home"
        >
          <img src={logo} alt="Foodzy Logo" className="h-8 w-auto" />
        </Link>

        {/* ──── SEARCH BAR (hidden on mobile due to space constraints) ──── */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md items-center border border-gray-200 rounded-lg overflow-hidden hover:border-[#E44B26] transition-colors"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for items..."
            className="flex-1 px-4 py-2.5 text-sm focus:outline-none bg-transparent"
          />
          <button
            type="submit"
            className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-3.5 py-2.5 transition-colors flex items-center justify-center"
            aria-label="Search"
          >
            <Search size={16} />
          </button>
        </form>

        {/* ──── ACTION ICONS ROW (Account, Wishlist, Cart) ──── */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto flex-shrink-0">
          {/* Account / Login Button */}
          <button className="flex items-center gap-1 text-gray-600 hover:text-[#E44B26] transition-colors text-xs md:text-sm font-medium group">
            <User
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="hidden md:inline">Account</span>
          </button>

          {/* Wishlist Button - shows badge with count of favorited items */}
          <Link
            to="/wishlist"
            className="flex items-center gap-1 text-gray-600 hover:text-[#E44B26] transition-colors text-xs md:text-sm font-medium relative group"
          >
            <div className="relative">
              <Heart
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              {/* Badge showing wishlist item count */}
              {wishlistTotal > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E44B26] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistTotal > 9 ? "9+" : wishlistTotal}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Wishlist</span>
          </Link>

          {/* Shopping Cart Button - main CTA with item count badge */}
          <Link
            to="/cart"
            className="flex items-center gap-1 text-gray-600 hover:text-[#E44B26] transition-colors text-xs md:text-sm font-medium relative group"
          >
            <div className="relative">
              <ShoppingCart
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              {/* Badge showing total cart items (counts quantity, not just products) */}
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E44B26] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartItems > 9 ? "9+" : totalCartItems}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Cart</span>
          </Link>
        </div>
      </div>

      {/* ─── MOBILE MENU DRAWER (slides down when menu toggle clicked) ─── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-gray-50 px-4 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Mobile search bar - shown in menu drawer */}
          <form
            onSubmit={handleSearch}
            className="mb-4 flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-3 py-2 transition-colors"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Navigation links in mobile menu */}
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleNavLinkClick}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-[#E44B26] text-white" // Active link background
                    : "text-gray-700 hover:bg-gray-100" // Inactive link with hover background
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

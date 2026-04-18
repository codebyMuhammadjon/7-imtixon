import { Link } from "react-router-dom";
import { Heart, ArrowRight, ShoppingCart, Trash2 } from "lucide-react";
import useWishlistStore from "../Store/wishlistStore";
import useCartStore from "../Store/cartStore";

/**
 * WISHLIST PAGE COMPONENT - Favorite Products Display & Management
 *
 * This page displays all products that users have added to their wishlist/favorites.
 * Features:
 *   - Grid or list view of all wishlist items
 *   - Remove from wishlist functionality
 *   - Quick add-to-cart for any item
 *   - Empty state with call-to-action when no items
 *   - Product price, images, and ratings
 *
 * Layout:
 *   Desktop: 4-column grid of product cards
 *   Tablet: 3-column grid
 *   Mobile: 2-column grid for optimal space usage
 *
 * State Management:
 *   - Uses useWishlistStore to fetch wishlist items from Zustand
 *   - Uses useCartStore to add items to cart
 */

export default function WishlistPage() {
  // ═══════════════════════════════════════════════════════════════════════════════════
  // STATE MANAGEMENT FROM ZUSTAND STORES
  // ═══════════════════════════════════════════════════════════════════════════════════

  /**
   * Get all wishlist items from Zustand store.
   * Subscribes to store so component re-renders when wishlist changes.
   * Items array contains full product objects: { id, name, price, image_url, ... }
   */
  const wishlistItems = useWishlistStore((s) => s.items);

  /**
   * Get the removeItem function from wishlist store.
   * Used to remove a product from wishlist when user clicks remove button.
   */
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);

  /**
   * Get the toggleWishlist function from wishlist store.
   * Used to provide alternative way to remove items (toggle functionality).
   */
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  /**
   * Get the addItem function from cart store.
   * Used to add wishlist items to shopping cart with one click.
   */
  const addToCart = useCartStore((s) => s.addItem);

  // ═══════════════════════════════════════════════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════════════

  /**
   * Handle removing a single product from the wishlist.
   * Shows visual feedback by removing it from the grid immediately.
   * @param {number|string} productId - ID of the product to remove
   */
  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    // Optional: Could add a toast notification here for UX feedback
  };

  /**
   * Handle adding a wishlist product to the shopping cart.
   * This creates a new cart item with quantity of 1.
   * @param {Object} product - Full product object to add to cart
   */
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
    // Optional: Could show a toast notification confirming item added to cart
  };

  /**
   * Handle clearing entire wishlist at once.
   * Shows confirmation dialog to prevent accidental data loss.
   */
  const handleClearWishlist = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your entire wishlist? This action cannot be undone.",
    );
    if (confirmed) {
      useWishlistStore.setState({ items: [] });
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════════════
  // RENDER - MAIN WISHLIST PAGE
  // ═══════════════════════════════════════════════════════════════════════════════════

  return (
    <main className="bg-white min-h-screen">
      {/* ─── BREADCRUMB & HEADER ─── */}
      <div className="bg-[#E44B26] text-white px-4 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>
            <span className="text-white/60">•</span>
            <span className="text-white/80">Wishlist</span>
          </nav>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* ──── WISHLIST ITEMS COUNT & ACTIONS ──── */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              {wishlistItems.length === 0
                ? "No items in your wishlist"
                : `${wishlistItems.length} item${wishlistItems.length !== 1 ? "s" : ""} in your wishlist`}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {wishlistItems.length > 0
                ? "Add any of these items to your cart or remove them from your wishlist."
                : "Start adding your favorite products to your wishlist!"}
            </p>
          </div>

          {/* Clear all wishlist button - only show if items exist */}
          {wishlistItems.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="hidden md:block px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Clear entire wishlist"
            >
              Clear All
            </button>
          )}
        </div>

        {/* ──── EMPTY STATE ──── */}
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 md:py-20">
            {/* Heart icon for visual feedback */}
            <Heart size={64} className="text-gray-300 mb-4 stroke-1" />

            {/* Empty state message */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 text-center max-w-sm mb-6">
              Start adding products to your wishlist and they'll appear here.
            </p>

            {/* CTA button to shop */}
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#E44B26] hover:bg-[#c93f1e] text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          /* ──── WISHLIST ITEMS GRID ──── */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* ──── PRODUCT IMAGE CONTAINER ──── */}
                <div className="relative bg-gray-100 aspect-square overflow-hidden group">
                  {/* Product image */}
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    /* Placeholder if no image */
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}

                  {/* ──── REMOVE FROM WISHLIST BUTTON ──── */}
                  {/* 
                    Positioned absolutely in top-right corner.
                    Shows red background on hover for clear call-to-action.
                    Heart icon filled to indicate item is in wishlist.
                  */}
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-red-600 text-gray-600 hover:text-white p-2 rounded-full transition-colors shadow-md"
                    title="Remove from wishlist"
                    aria-label="Remove from wishlist"
                  >
                    <Heart size={18} className="fill-current" />
                  </button>
                </div>

                {/* ──── PRODUCT INFO SECTION ──── */}
                <div className="flex-1 p-3 md:p-4 flex flex-col">
                  {/* Product name - truncate to 2 lines */}
                  <h3 className="font-bold text-sm md:text-base text-gray-900 line-clamp-2 mb-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="hover:text-[#E44B26] transition-colors"
                    >
                      {product.name}
                    </Link>
                  </h3>

                  {/* Optional: Product category badge */}
                  {product.category && (
                    <span className="text-xs text-gray-500 mb-2 capitalize">
                      {typeof product.category === "string"
                        ? product.category
                        : product.category.title}
                    </span>
                  )}

                  {/* Product price - prominent in orange */}
                  <div className="text-lg md:text-xl font-bold text-[#E44B26] mb-3 mt-auto">
                    ${product.price?.toFixed(2) || "N/A"}
                  </div>

                  {/* ──── ACTION BUTTONS ──── */}
                  <div className="flex gap-2">
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-[#E44B26] hover:bg-[#c93f1e] text-white font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 text-sm"
                      title="Add to cart"
                    >
                      <ShoppingCart size={16} />
                      <span className="hidden md:inline">Add</span>
                    </button>

                    {/* Remove Button - mobile optimized */}
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="flex-shrink-0 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                      title="Remove from wishlist"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ──── RECOMMENDATIONS SECTION ──── */}
        {/* Only show if wishlist is not empty - encourages more shopping */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 md:mt-16 py-8 border-t border-gray-200 text-center">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
              Want to explore more products?
            </h3>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#E44B26] hover:bg-[#c93f1e] text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

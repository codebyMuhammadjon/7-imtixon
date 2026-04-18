/**
 * ═══════════════════════════════════════════════════════════════════════════════════
 * FOODZY PROJECT - TECHNICAL EXPLANATION GUIDE
 * For Interview Preparation & Code Understanding
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * This file serves as a comprehensive guide explaining all the refactored components,
 * state management patterns, and architectural decisions made in the Foodzy project.
 * 
 * Use this during interviews to explain:
 * 1. How you handle responsive design
 * 2. Your state management strategy
 * 3. Component architecture and code organization
 * 4. Performance optimizations (lazy loading, Suspense)
 * 5. User experience improvements
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 1. HEADER COMPONENT - RESPONSIVE NAVIGATION
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * Location: src/Components/Layout/Header.jsx
 * 
 * Interview Question: "How did you make your header responsive for mobile?"
 * 
 * ANSWER:
 * I used Tailwind CSS breakpoints and React hooks for a mobile-first responsive design:
 * 
 * A. BREAKPOINT STRATEGY:
 *    - Mobile (default): Single-row compact header
 *      • Menu toggle button (hamburger icon)
 *      • Logo in center
 *      • Action icons (Account, Wishlist, Cart)
 *      • Search bar hidden
 * 
 *    - Desktop (lg: breakpoint): Two-row full layout
 *      • Top row: Desktop navigation + phone
 *      • Bottom row: Logo + full search bar + action icons
 * 
 * B. KEY TAILWIND UTILITIES USED:
 *    - hidden lg:flex   → Hidden on mobile, shown on desktop (lg+)
 *    - hidden md:inline → Hidden on mobile, shown on tablet+
 *    - flex-1          → Flexible width for responsive spacing
 *    - max-w-[1200px]  → Max container width for desktop
 *    - gap-3 md:gap-4  → Different spacing on mobile vs desktop
 * 
 * C. STATE MANAGEMENT:
 *    - mobileMenuOpen: Boolean state tracking if mobile menu drawer is open
 *    - searchQuery: Controlled input for search functionality
 *    - Navigation uses useLocation hook to highlight active links
 * 
 * D. ZUSTAND INTEGRATION:
 *    const cartItems = useCartStore((s) => s.items);
 *    const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
 * 
 *    This subscribes to cart store changes without re-rendering entire header.
 *    Zustand only re-renders when subscribed data changes.
 * 
 * E. MOBILE MENU DRAWER:
 *    {mobileMenuOpen && (
 *      <div className="lg:hidden border-t border-gray-100 ...">
 *        {/* Menu content only rendered when open */}
 *      </div>
 *    )}
 * 
 *    The "lg:hidden" ensures this drawer never appears on desktop.
 *    Conditional render only shows drawer when mobileMenuOpen = true.
 * 
 * F. ACCESSIBILITY:
 *    - aria-label on buttons for screen readers
 *    - aria-expanded on menu toggle to indicate state
 *    - Semantic HTML (nav, header, form, button)
 * 
 * BENEFITS:
 * ✓ Single component handles all screen sizes (no duplicate components)
 * ✓ Smooth transitions and animations
 * ✓ Performance optimized (Zustand selectors prevent unnecessary re-renders)
 * ✓ Accessible to assistive technologies
 * ✓ Clean code with section dividers for readability
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 2. ZUSTAND STATE MANAGEMENT - CART & WISHLIST STORES
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * Location: 
 *   - src/Store/cartStore.js
 *   - src/Store/wishlistStore.js
 * 
 * Interview Question: "Tell us about your state management approach. Why Zustand?"
 * 
 * ANSWER:
 * I chose Zustand for its simplicity and minimal boilerplate compared to Redux:
 * 
 * A. WHY ZUSTAND?
 *    1. Minimal setup - no actions, reducers, dispatchers needed
 *    2. Direct state mutations (feels natural)
 *    3. Automatic subscription/re-rendering with selectors
 *    4. Easy to understand and maintain
 *    5. Tiny bundle size (~2kb)
 *    6. Works great with persist middleware for localStorage
 * 
 * B. STORE CREATION PATTERN:
 * 
 *    const useCartStore = create(
 *      persist(
 *        (set, get) => ({
 *          items: [],
 *          
 *          // State mutation functions - "set" replaces entire state
 *          addItem: (product) => {
 *            const { items } = get(); // Get current state
 *            set({ items: [...items, product] }); // Update state
 *          },
 *          
 *          // Computed properties - calculated on-the-fly
 *          get totalItems() {
 *            return get().items.reduce((sum, i) => sum + i.quantity, 0);
 *          }
 *        }),
 *        { name: 'cart-storage' } // localStorage key
 *      )
 *    );
 * 
 * C. SUBSCRIPTION WITH SELECTORS:
 * 
 *    // This only re-renders when items array changes
 *    const items = useCartStore((s) => s.items);
 *    
 *    // This only re-renders when totalItems value changes
 *    const total = useCartStore((s) => s.totalItems);
 * 
 *    // Without selectors, ANY store change would re-render:
 *    const store = useCartStore(); // AVOID THIS - less efficient
 * 
 * D. PERSISTENCE WITH MIDDLEWARE:
 * 
 *    The persist middleware automatically:
 *    - Saves state to localStorage on any update
 *    - Rehydrates state from localStorage on app load
 *    - Requires no additional code in components
 * 
 * E. COMPARISON: ZUSTAND VS REDUX
 * 
 *    ZUSTAND:
 *    ✓ ~20 lines for simple store
 *    ✓ Direct state updates
 *    ✓ No action types/creators needed
 *    ✓ Easy to test and debug
 * 
 *    REDUX:
 *    ✗ ~100 lines for simple store
 *    ✗ Complex action/reducer pattern
 *    ✗ Action creators and type constants
 *    ✗ Middleware boilerplate
 * 
 *    For this project, Zustand is ideal - simpler cart/wishlist stores
 *    don't need Redux's advanced DevTools or time-travel debugging.
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 3. ABOUT PAGE - COMPONENT ARCHITECTURE
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * Location: src/Pages/AboutPage.jsx
 * 
 * Interview Question: "Walk us through how you structure a content page."
 * 
 * ANSWER:
 * I organized the About page into semantic sections with clear data separation:
 * 
 * A. DATA STRUCTURE PATTERN:
 * 
 *    // Define data as arrays/objects at component top
 *    const features = [
 *      {
 *        id: 1,
 *        icon: Package,
 *        title: "Product Packing",
 *        description: "..."
 *      },
 *      // ... more features
 *    ];
 * 
 *    BENEFITS:
 *    - Easy to add/remove features without touching render code
 *    - Single source of truth for feature data
 *    - Could easily move to database or API
 *    - Reduces duplication and bugs
 * 
 * B. COMPONENT STRUCTURE:
 * 
 *    <main>
 *      <BreadcrumbSection />      {/* Navigation helper */}
 *      <HeroSection />            {/* Story + stats + image */}
 *      <FeaturesSection />        {/* Feature cards grid */}
 *      <CTASection />             {/* Call-to-action */}
 *    </main>
 * 
 * C. RESPONSIVE GRID SYSTEM:
 * 
 *    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
 * 
 *    Breakdowns:
 *    - Mobile (< 640px): 1 column
 *    - Tablet (640px+): 2 columns
 *    - Desktop (1024px+): 4 columns
 *    - Gap increases on larger screens (responsive spacing)
 * 
 * D. ICON INTEGRATION:
 * 
 *    // Dynamic icon rendering from data
 *    const IconComponent = feature.icon; // From lucide-react
 *    <IconComponent size={40} className="text-[#E44B26]" />
 * 
 *    Advantages:
 *    - All icons imported once at top
 *    - Icons in data array can be updated easily
 *    - Consistent sizing and styling
 * 
 * E. SEMANTIC HTML:
 * 
 *    <main>      {/* Primary content container */}
 *    <header>    {/* Page header/breadcrumb */}
 *    <section>   {/* Logical content sections */}
 *    <nav>       {/* Navigation within breadcrumb */}
 * 
 *    This improves:
 *    - SEO (search engines understand structure)
 *    - Accessibility (screen readers navigate better)
 *    - Maintainability (code intent is clear)
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 4. WISHLIST PAGE - STATE + UI INTEGRATION
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * Location: src/Pages/WishlistPage.jsx
 * 
 * Interview Question: "How do you handle complex UI state interactions?"
 * 
 * ANSWER:
 * The Wishlist page demonstrates multiple state interactions in one component:
 * 
 * A. MULTI-STORE INTEGRATION:
 * 
 *    // Read from TWO different Zustand stores
 *    const wishlistItems = useWishlistStore((s) => s.items);
 *    const removeFromWishlist = useWishlistStore((s) => s.removeItem);
 *    
 *    const addToCart = useCartStore((s) => s.addItem);
 * 
 *    Why separate stores?
 *    - Cart and Wishlist are independent concerns
 *    - Each has different persistence requirements
 *    - Cleaner to update one without affecting other
 *    - Easier to test and debug
 * 
 * B. EVENT HANDLER PATTERNS:
 * 
 *    // Remove single item
 *    const handleRemoveFromWishlist = (productId) => {
 *      removeFromWishlist(productId);
 *    };
 * 
 *    // Clear entire wishlist with confirmation
 *    const handleClearWishlist = () => {
 *      const confirmed = window.confirm("Are you sure?");
 *      if (confirmed) {
 *        useWishlistStore.setState({ items: [] });
 *      }
 *    };
 * 
 *    // Add to cart (copies product to cart store)
 *    const handleAddToCart = (product) => {
 *      addToCart({
 *        id: product.id,
 *        name: product.name,
 *        price: product.price,
 *        image_url: product.image_url,
 *      });
 *    };
 * 
 *    PATTERN BENEFITS:
 *    - Handlers are testable functions
 *    - Clear separation from UI
 *    - Easy to add logging or analytics
 *    - Can be extracted to custom hooks if needed
 * 
 * C. CONDITIONAL RENDERING FOR EMPTY STATE:
 * 
 *    {wishlistItems.length === 0 ? (
 *      <EmptyState />
 *    ) : (
 *      <WishlistGrid />
 *    )}
 * 
 *    Why important?
 *    - Better UX than showing empty grid
 *    - Encourages user action with CTA button
 *    - Professional appearance
 *    - Can track empty state visits in analytics
 * 
 * D. PRODUCT CARD ARCHITECTURE:
 * 
 *    Each card has:
 *    - Image container with hover effects
 *    - Heart icon overlay for removal
 *    - Product info (name, category, price)
 *    - Action buttons: Add to Cart + Remove
 * 
 *    Responsive button styling:
 *    className="hidden md:inline" → Shows text only on desktop
 *    className="flex md:flex"      → Shows icon on mobile, icon+text on desktop
 * 
 * E. ACCESSIBILITY CONSIDERATIONS:
 * 
 *    - aria-label on buttons for screen readers
 *    - Semantic HTML (main, section, article)
 *    - Link to product detail page for full info
 *    - Proper heading hierarchy (h1, h2, h3)
 *    - Color contrast ratios meet WCAG standards
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 5. ROUTING & CODE SPLITTING - PERFORMANCE
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * Location: src/Router/index.jsx
 * 
 * Interview Question: "How do you optimize performance in large React apps?"
 * 
 * ANSWER:
 * I implemented code splitting with React.lazy and Suspense:
 * 
 * A. LAZY LOADING PATTERN:
 * 
 *    // Instead of:
 *    import Home from "../Pages/Home.jsx";
 *    
 *    // Use lazy loading:
 *    const Home = lazy(() => import("../Pages/Home.jsx"));
 * 
 *    How it works:
 *    - React.lazy creates a new component that lazy-loads the module
 *    - Module only downloaded when route is visited
 *    - Dramatically reduces initial bundle size
 * 
 * B. SUSPENSE BOUNDARY:
 * 
 *    {
 *      path: "shop",
 *      element: (
 *        <Suspense fallback={<PageLoader />}>
 *          <Shop />
 *        </Suspense>
 *      )
 *    }
 * 
 *    What happens:
 *    1. User clicks Shop link
 *    2. React starts loading Shop.jsx module
 *    3. While loading, <PageLoader /> displays (loading spinner)
 *    4. Once loaded, Shop component renders
 *    5. User sees seamless transition
 * 
 *    Benefits:
 *    - Loading state is obvious to user
 *    - No blank page or janky rendering
 *    - Professional UX
 * 
 * C. BUNDLE SIZE IMPROVEMENT:
 * 
 *    WITHOUT code splitting (all pages loaded upfront):
 *    Initial bundle: ~500kb → Slow first page load ❌
 * 
 *    WITH code splitting (pages loaded on-demand):
 *    Initial bundle: ~100kb (home + header/footer only) → Fast! ✅
 *    Shop bundle: ~60kb (loaded when user visits shop)
 *    Product detail: ~40kb (loaded when user views product)
 * 
 * D. CUSTOM PAGE LOADER:
 * 
 *    function PageLoader() {
 *      return (
 *        <div className="flex items-center justify-center min-h-[50vh]">
 *          <div className="w-8 h-8 border-2 border-[#E44B26] 
 *                          border-t-transparent rounded-full animate-spin" />
 *        </div>
 *      );
 *    }
 * 
 *    Why custom loader?
 *    - Matches app's design (orange color)
 *    - Shows centering feedback to user
 *    - Consistent across all pages
 *    - Just CSS animations (no external dependencies)
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 6. CSS UTILITIES & TAILWIND OPTIMIZATION
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * Location: 
 *   - src/index.css (custom utilities)
 *   - tailwind.config.js (theme extensions)
 * 
 * Interview Question: "How do you approach CSS in modern React apps?"
 * 
 * ANSWER:
 * I use Tailwind CSS with custom utilities for a maintainable, scalable approach:
 * 
 * A. UTILITY-FIRST CSS:
 * 
 *    Traditional CSS approach (problematic):
 *    - Separate CSS files
 *    - Class naming conventions (BEM, etc.)
 *    - Global scope conflicts
 *    - Unused CSS bloat
 * 
 *    Tailwind approach (better):
 *    - Inline utilities in JSX
 *    - No naming conventions needed
 *    - Only used classes included in final bundle
 *    - Scoped to component
 *    - Easy refactoring
 * 
 * B. RESPONSIVE DESIGN IN TAILWIND:
 * 
 *    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
 * 
 *    This single class handles all breakpoints:
 *    - Mobile (< 640px): 1 column, gap-3
 *    - Tablet (640px+): 2 columns, gap-3
 *    - Desktop (1024px+): 4 columns, gap-6
 * 
 *    Without Tailwind, this would require multiple media queries in CSS files.
 * 
 * C. CUSTOM UTILITY - SCROLLBAR HIDE:
 * 
 *    In src/index.css:
 *    @layer utilities {
 *      .scrollbar-hide {
 *        scrollbar-width: none;    /* Firefox */
 *        -ms-overflow-style: none; /* IE/Edge */
 *      }
 *      .scrollbar-hide::-webkit-scrollbar {
 *        display: none; /* Webkit */
 *      }
 *    }
 * 
 *    Usage:
 *    <div className="scrollbar-hide overflow-x-auto">
 *      {/* Horizontal scrolling without visible scrollbar */}
 *    </div>
 * 
 *    Why useful?
 *    - Clean product carousels
 *    - Mobile-friendly horizontal lists
 *    - Maintains scroll functionality
 *    - Works across all browsers
 * 
 * D. COLOR CONSISTENCY:
 * 
 *    Primary color #E44B26 used throughout:
 *    - className="hover:text-[#E44B26]"
 *    - className="bg-[#E44B26]"
 *    - className="border-[#E44B26]"
 * 
 *    Could improve with Tailwind config:
 *    theme: {
 *      colors: {
 *        primary: '#E44B26'
 *      }
 *    }
 * 
 *    Then use: className="hover:text-primary" (shorter, more maintainable)
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 7. INTERVIEW TALKING POINTS - KEY TAKEAWAYS
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * 1. RESPONSIVE DESIGN:
 *    "I use Tailwind breakpoints for mobile-first design. Hidden/shown at different
 *     breakpoints. Flexible layouts with flexbox and grid. Tested across devices."
 * 
 * 2. STATE MANAGEMENT:
 *    "Zustand for simplicity - no Redux boilerplate. Stores persist to localStorage.
 *     Selectors prevent unnecessary re-renders. Two separate stores for cart/wishlist
 *     keep concerns isolated."
 * 
 * 3. CODE SPLITTING:
 *    "React.lazy + Suspense for route-based code splitting. Initial bundle is small,
 *     pages load on-demand. Custom PageLoader shows UX-friendly loading state."
 * 
 * 4. COMPONENT ARCHITECTURE:
 *    "Data separated from render logic. Reusable components with clear props.
 *     Semantic HTML for accessibility and SEO. Detailed comments for maintainability."
 * 
 * 5. PERFORMANCE:
 *    "Zustand selectors prevent unnecessary re-renders. Lazy loading reduces bundle.
 *     Optimized images and CSS. Smooth animations with CSS transitions."
 * 
 * 6. ACCESSIBILITY:
 *    "ARIA labels on interactive elements. Semantic HTML (nav, section, main).
 *     Proper heading hierarchy. Color contrast ratios meet WCAG standards."
 * 
 * 7. USER EXPERIENCE:
 *    "Mobile menu drawer for compact mobile view. Empty states with CTAs.
 *     Loading spinners during navigation. Smooth hover effects. Confirmation
 *     dialogs for destructive actions."
 */

export default {
  projectName: "Foodzy - E-commerce Platform",
  techStack: [
    "React 18",
    "React Router 6",
    "Zustand (State Management)",
    "React Query (Data Fetching)",
    "Tailwind CSS",
    "Lucide React Icons"
  ],
  keyLearnings: [
    "Responsive design with Tailwind breakpoints",
    "State management with Zustand + persistence",
    "Code splitting with React.lazy + Suspense",
    "Mobile-first component architecture",
    "Accessibility best practices",
    "Performance optimization techniques"
  ]
};

# 🍔 Foodzy Project - Quick Reference Guide

## 📁 New/Modified Files

### Created Files:

1. **`src/Store/wishlistStore.js`** - Zustand wishlist state management
2. **`src/Pages/AboutPage.jsx`** - About company page
3. **`src/Pages/WishlistPage.jsx`** - Wishlist/favorites display page
4. **`src/INTERVIEW_GUIDE.js`** - Detailed technical explanations

### Modified Files:

1. **`src/Components/Layout/Header.jsx`** - Refactored for mobile responsiveness
2. **`src/Router/index.jsx`** - Added /about and /wishlist routes
3. **`src/index.css`** - Added scrollbar-hide utility
4. **`tailwind.config.js`** - Updated with custom theme extensions

---

## 🎯 Quick Feature Overview

### Header Component

```jsx
// Mobile View (< 1024px):
[Menu]  [Logo]  [Cart]  [Wishlist]  [Account]
  ↓
  [Search]
  [Home]
  [Shop]
  [About]
  [Blog]
  [FAQ]

// Desktop View (1024px+):
[Home] [Shop] [About] [Blog] [FAQ]                     [Phone]
[Logo]    [Search Bar]    [Account] [Wishlist] [Cart]
```

### Wishlist Store

```javascript
// Create/Get wishlist items
const {
  items,
  addItem,
  removeItem,
  toggleWishlist,
  clearWishlist,
  totalItems,
} = useWishlistStore();

// Use in component
const wishlistItems = useWishlistStore((s) => s.items);
const removeFromWishlist = useWishlistStore((s) => s.removeItem);
```

### Routes Added

```javascript
/about      → AboutPage (company info, stats, features)
/wishlist   → WishlistPage (favorite products, add to cart, remove)
```

---

## 🛠️ Code Snippets - Copy & Paste

### Adding Wishlist Toggle to ProductCard

```jsx
import { Heart } from "lucide-react";
import useWishlistStore from "../Store/wishlistStore";

export function ProductCard({ product }) {
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  return (
    <div>
      <button
        onClick={() => toggleWishlist(product)}
        className={`p-2 rounded-full transition-colors ${
          isInWishlist ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"
        }`}
      >
        <Heart size={20} className={isInWishlist ? "fill-current" : ""} />
      </button>
      {/* Rest of product card */}
    </div>
  );
}
```

### Using Scrollbar Hide Utility

```jsx
// Horizontal scrollable list without visible scrollbar
<div className="scrollbar-hide overflow-x-auto flex gap-4">
  {items.map((item) => (
    <div key={item.id} className="flex-shrink-0 w-48">
      {item.name}
    </div>
  ))}
</div>
```

### Responsive Grid Pattern

```jsx
// 4 cols desktop → 2 cols tablet → 1 col mobile
className =
  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";

// Adjust gap on different sizes
className = "grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6";
```

---

## 📊 Component Tree

```
App
├── Layout
│   ├── Header ✅ REFACTORED
│   │   ├── Desktop Navigation
│   │   ├── Search Bar
│   │   ├── Mobile Menu Drawer (Toggle)
│   │   └── Action Icons (Account, Wishlist, Cart)
│   ├── <Outlet /> (Page Router)
│   └── Footer
│
└── Pages (Lazy Loaded)
    ├── Home
    ├── Shop
    ├── ProductDetail
    ├── AboutPage ✅ NEW
    ├── WishlistPage ✅ NEW
    ├── Cart
    ├── Checkout
    ├── BlogList
    ├── BlogDetail
    ├── FAQ
    └── NotFound
```

---

## 🎨 Color Palette

| Usage          | Color                 | Usage in Code          |
| -------------- | --------------------- | ---------------------- |
| Primary Brand  | #E44B26 (Orange)      | `hover:text-[#E44B26]` |
| Hover State    | #c93f1e (Dark Orange) | `hover:bg-[#c93f1e]`   |
| Text Primary   | Gray-900              | `text-gray-900`        |
| Text Secondary | Gray-600              | `text-gray-600`        |
| Border         | Gray-200              | `border-gray-200`      |
| Background     | White                 | `bg-white`             |

---

## 📱 Responsive Breakpoints

| Name   | Width    | Use Case       |
| ------ | -------- | -------------- |
| Mobile | < 640px  | Phones         |
| SM     | ≥ 640px  | Small tablets  |
| MD     | ≥ 768px  | Tablets        |
| LG     | ≥ 1024px | Desktops       |
| XL     | ≥ 1280px | Large desktops |

**Tailwind Prefixes:** `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

---

## 🔄 State Management Flow

```
User adds product to wishlist
        ↓
ProductCard calls useWishlistStore.toggleWishlist(product)
        ↓
Zustand store updates items array
        ↓
localStorage automatically synced via persist middleware
        ↓
Header re-renders → wishlist badge updates (via selector subscription)
        ↓
WishlistPage re-renders → new item appears in grid
        ↓
All changes persist on page refresh
```

---

## ⚡ Performance Tips

### 1. Zustand Selectors (Prevent Re-renders)

```jsx
// ✅ GOOD - Only re-renders when items changes
const items = useCartStore((s) => s.items);

// ❌ BAD - Re-renders on ANY store change
const store = useCartStore();
```

### 2. Lazy Loading Routes

```jsx
// ✅ GOOD - Page only loads when user visits
const Shop = lazy(() => import("../Pages/Shop.jsx"));

// ❌ BAD - All pages bundled together
import Shop from "../Pages/Shop.jsx";
```

### 3. Use Suspense Boundaries

```jsx
// ✅ GOOD - Shows loading state to user
<Suspense fallback={<PageLoader />}>
  <Shop />
</Suspense>

// ❌ BAD - Blank screen while loading
<Shop />
```

---

## 🐛 Debugging Tips

### Check Zustand State

```javascript
// In browser console
// View store state
window.useCartStore.getState();

// Subscribe to all changes
useCartStore.subscribe((state) => console.log("Cart updated:", state));
```

### Check Active Route

```jsx
import { useLocation } from "react-router-dom";

export function DebugRoute() {
  const location = useLocation();
  console.log("Current route:", location.pathname);
  return null;
}
```

### Enable React DevTools

- Install React Developer Tools browser extension
- View component hierarchy and props
- Check which components are re-rendering

---

## 📝 Common Modifications

### Add New Page

1. Create component in `src/Pages/YourPage.jsx`
2. Add lazy import in `src/Router/index.jsx`
3. Add route to router config:

```jsx
{
  path: "your-page",
  element: (
    <Suspense fallback={<PageLoader />}>
      <YourPage />
    </Suspense>
  ),
}
```

4. Add link in Header NAV_LINKS array

### Add New Zustand Store

1. Create `src/Store/yourStore.js`
2. Pattern:

```jsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useYourStore = create(
  persist(
    (set, get) => ({
      data: [],
      addData: (item) => set({ data: [...get().data, item] }),
    }),
    { name: "your-storage" },
  ),
);

export default useYourStore;
```

3. Import and use: `const { data, addData } = useYourStore();`

---

## ✅ Testing Checklist

- [ ] Mobile menu opens/closes on toggle
- [ ] Search works and navigates to /shop
- [ ] Add to wishlist from product
- [ ] Remove from wishlist from wishlist page
- [ ] Add from wishlist to cart
- [ ] Cart badge updates correctly
- [ ] Wishlist badge updates correctly
- [ ] Page layout responsive on mobile/tablet/desktop
- [ ] Links navigate correctly
- [ ] State persists on page refresh
- [ ] Empty wishlist shows proper state
- [ ] Scrollbars hidden on scrollable divs

---

## 🎓 Interview Prep Topics

1. **Responsive Design** - Explain Tailwind breakpoints used
2. **State Management** - Why Zustand over Redux
3. **Performance** - Code splitting with lazy loading
4. **Accessibility** - ARIA labels and semantic HTML
5. **Component Structure** - Data separation pattern
6. **Event Handling** - How handlers update state
7. **Routing** - Lazy routes with Suspense
8. **CSS Architecture** - Utility-first with Tailwind

See `src/INTERVIEW_GUIDE.js` for detailed explanations!

---

## 📚 Resources

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [React Router Docs](https://reactrouter.com)
- [React Lazy Loading](https://react.dev/reference/react/lazy)
- [Lucide React Icons](https://lucide.dev)

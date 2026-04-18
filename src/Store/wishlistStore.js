import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Zustand store wishlist uchun (sevimli mahsulotlar).
 * persist — avtomatik ravishda localStorage ga saqlanadi.
 *
 * Wishlist item tuzilmasi:
 *   { id, name, price, image_url, rating, description, category, ... }
 *   (barcha mahsulot maydonlarini o'z ichiga olishi mumkin)
 */
const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      /**
       * Mahsulotni wishlistga qo'shadi.
       * Agar mahsulot allaqachon bor bo'lsa — hech nima bo'lmaydi (dublikatlarni oldini olamiz).
       * @param {Object} product - Mahsulot object'i: id, name, price, image_url, va boshq.
       */
      addItem: (product) => {
        const { items } = get();
        const exists = items.find((i) => i.id === product.id);
        if (!exists) {
          set({ items: [...items, product] });
        }
      },

      /**
       * ID bo'yicha wishlistdan mahsulotni o'chiradi.
       * @param {number|string} id - O'chirish uchun mahsulot ID'si
       */
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      /**
       * Mahsulot wishlistda borligini tekshiradi.
       * "Sevimliga qo'shish" tugmasini holatini belgilash uchun ishlatiladi.
       * @param {number|string} id - Tekshirish uchun mahsulot ID'si
       * @returns {boolean} true mahsulot wishlistda bo'lsa, aks holda false
       */
      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id);
      },

      /**
       * Wishlistda mahsulotni o'zgartirib turadi (borsa o'chiradi, yo'q bo'lsa qo'shadi).
       * Bir klik bilan "seving" tugmasi uchun qulay.
       * @param {Object} product - Mahsulot object'i
       */
      toggleWishlist: (product) => {
        const { items } = get();
        const exists = items.find((i) => i.id === product.id);
        if (exists) {
          set({ items: items.filter((i) => i.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },

      /**
       * Butun wishlistni tozalaydi (barcha mahsulotlarni o'chiradi).
       */
      clearWishlist: () => set({ items: [] }),

      /**
       * Hisoblanadigan xususiyat — wishlistdagi mahsulotlar soni.
       */
      get totalItems() {
        return get().items.length;
      },
    }),
    {
      name: "wishlist-storage", // localStorage da kalit
    },
  ),
);

export default useWishlistStore;

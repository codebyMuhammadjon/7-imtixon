import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Zustand store для вишлиста (избранного).
 * persist — автоматически сохраняет состояние в localStorage.
 *
 * Структура wishlistItem:
 *   { id, name, price, image_url, rating, description, category, ... }
 *   (может содержать все поля продукта)
 */
const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      /**
       * Добавляет товар в вишлист.
       * Если товар уже есть — ничего не происходит (избегаем дубликатов).
       * @param {Object} product - Объект товара с полями: id, name, price, image_url, etc.
       */
      addItem: (product) => {
        const { items } = get();
        const exists = items.find((i) => i.id === product.id);
        if (!exists) {
          set({ items: [...items, product] });
        }
      },

      /**
       * Удаляет товар из вишлиста по ID.
       * @param {number|string} id - ID товара для удаления
       */
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      /**
       * Проверяет, находится ли товар в вишлисте.
       * Используется для определения состояния кнопки "добавить в избранное".
       * @param {number|string} id - ID товара для проверки
       * @returns {boolean} true если товар в вишлисте, иначе false
       */
      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id);
      },

      /**
       * Переключает товар в вишлисте (удаляет если есть, добавляет если нет).
       * Удобно для кнопки "люблю" с одним кликом.
       * @param {Object} product - Объект товара
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
       * Очищает весь вишлист (удаляет все товары).
       */
      clearWishlist: () => set({ items: [] }),

      /**
       * Вычисляемое свойство — количество товаров в вишлисте.
       */
      get totalItems() {
        return get().items.length;
      },
    }),
    {
      name: "wishlist-storage", // ключ в localStorage
    },
  ),
);

export default useWishlistStore;

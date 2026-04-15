import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Zustand store для корзины.
 * persist — сохраняет состояние в localStorage автоматически.
 *
 * Структура cartItem:
 *   { id, name, price, image_url, quantity }
 */
const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Добавить товар (или увеличить кол-во если уже есть)
      addItem: (product) => {
        const { items } = get()
        const existing = items.find((i) => i.id === product.id)
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }
      },

      // Убрать один экземпляр товара
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },

      // Изменить количество товара
      updateQuantity: (id, quantity) => {
        if (quantity < 1) return
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })
      },

      // Очистить корзину
      clearCart: () => set({ items: [] }),

      // Вычисляемые значения
      get totalItems() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },
      get totalPrice() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      },
    }),
    {
      name: 'cart-storage', // ключ в localStorage
    }
  )
)

export default useCartStore

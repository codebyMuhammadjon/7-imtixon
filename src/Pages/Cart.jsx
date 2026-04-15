import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularProducts } from "../Api/products";
import ProductCard from "../Components/Ui/ProductCard";
import Breadcrumb from "../Components/Ui/Breadcrumb";
import useCartStore from "../Store/cartStore";

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);

  const { data: popular = [] } = useQuery({
    queryKey: ["products", "popular", 4],
    queryFn: () => fetchPopularProducts(4),
  });

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div>
      {/* Заголовок */}
      <div className="bg-[#E44B26] py-5">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">Cart</h1>
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {items.length === 0 ? (
          /* Пустая корзина */
          <div className="text-center py-24">
            <ShoppingBag size={56} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 text-lg mb-6">Your cart is empty.</p>
            <Link
              to="/shop"
              className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-8 py-3 rounded-lg
                         font-medium transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Таблица */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                      Product
                    </th>
                    <th className="text-center px-4 py-3 text-gray-600 font-semibold">
                      Price
                    </th>
                    <th className="text-center px-4 py-3 text-gray-600 font-semibold">
                      Quantity
                    </th>
                    <th className="text-center px-4 py-3 text-gray-600 font-semibold">
                      Total
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Товар */}
                      <td className="px-4 py-4">
                        <Link
                          to={`/product/${item.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <span
                            className="font-medium text-gray-800 group-hover:text-[#E44B26]
                                           transition-colors line-clamp-2 max-w-[200px]"
                          >
                            {item.name}
                          </span>
                        </Link>
                      </td>

                      {/* Цена */}
                      <td className="px-4 py-4 text-center text-gray-600">
                        ${item.price}
                      </td>

                      {/* Количество */}
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-gray-500
                                         hover:bg-gray-50 transition-colors"
                            >
                              −
                            </button>
                            <span className="w-10 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center text-gray-500
                                         hover:bg-gray-50 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Итого */}
                      <td className="px-4 py-4 text-center font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>

                      {/* Удалить */}
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-[#E44B26] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer таблицы */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
              <div className="flex gap-3">
                <Link
                  to="/shop"
                  className="border border-gray-200 text-gray-600 hover:border-[#E44B26]
                             hover:text-[#E44B26] px-5 py-2 rounded-lg text-sm transition-colors"
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="border border-gray-200 text-gray-600 hover:border-red-300
                             hover:text-red-500 px-5 py-2 rounded-lg text-sm transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              {/* Итог */}
              <div className="bg-white rounded-xl shadow-sm p-5 w-full sm:w-72">
                <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>Delivery</span>
                  <span className="text-[#3BB77E] font-semibold">Free</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#E44B26]">${subtotal.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  className="w-full mt-4 bg-[#E44B26] hover:bg-[#c93f1e] text-white text-sm
                             font-medium py-2.5 rounded-lg transition-colors flex items-center
                             justify-center"
                >
                  Check Out
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Популярные товары */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Popular Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {popular.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { usePopularProducts } from "../../Hooks/useProducts";
import { useCategories } from "../../Hooks/useCategories";
import ProductCard from "../Ui/ProductCard";

/**
 * Секция Popular Products.
 * Табы — реальные категории из таблицы categories.
 * Фильтрация на клиенте по categories.name из join-поля.
 */

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-100" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-1/4" />
        <div className="h-8 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export default function PopularProducts() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Все featured товары
  const { data: products = [], isLoading } = usePopularProducts(20);

  // Категории для табов
  const { data: categories = [] } = useCategories();

  const tabs = ["All", ...categories.map((c) => c.name)];

  // Фильтр по categories.name (приходит из join)
  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.categories?.name === activeCategory);

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Popular Products</h2>

        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`
                px-3 py-1 text-sm rounded transition-colors
                ${
                  activeCategory === tab
                    ? "text-[#E44B26] font-semibold border-b-2 border-[#E44B26]"
                    : "text-gray-500 hover:text-gray-800"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {!isLoading && filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12">No products found.</p>
      )}
    </section>
  );
}

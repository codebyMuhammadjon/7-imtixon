import { Link } from "react-router-dom";
import StarRating from "../Ui/StarRating";
import {
  useTopSelling,
  useTrending,
  useRecentlyAdded,
  useTopRated,
} from "../../Hooks/useProducts";

/**
 * Секция "Top Selling / Trending / Recently Added / Top Rated".
 * Четыре колонки, в каждой 3 компактных карточки.
 */

const COLUMNS = [
  { key: "topSelling", label: "Top Selling" },
  { key: "trending", label: "Trending Products" },
  { key: "recentlyAdded", label: "Recently added" },
  { key: "topRated", label: "Top Rated" },
];

// Скелетон одной строки
function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3 animate-pulse">
      <div className="w-14 h-14 bg-gray-100 rounded flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/4" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
  );
}

/** Одна компактная строка товара */
function ProductRow({ product }) {
  if (!product) return null;
  const { id, name, price, old_price, image_url, rating } = product;

  return (
    <Link
      to={`/product/${id}`}
      className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 group"
    >
      {/* Превью */}
      <div className="w-14 h-14 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-contain
                     group-hover:scale-105 transition-transform"
          loading="lazy"
        />
      </div>

      {/* Инфо */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-medium text-gray-800 line-clamp-2
                      group-hover:text-[#E44B26] transition-colors leading-snug"
        >
          {name}
        </p>
        <StarRating rating={rating} />
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[#E44B26] font-semibold text-sm">${price}</span>
          {old_price && (
            <span className="text-gray-400 text-xs line-through">
              ${old_price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/** Одна колонка: заголовок + 3 товара */
function Column({ label, products = [], isLoading }) {
  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-3 text-base">{label}</h3>
      <div>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <RowSkeleton key={i} />)
          : products.map((p) => <ProductRow key={p.id} product={p} />)}
      </div>
    </div>
  );
}

export default function TopListsSection() {
  const { data: topSelling = [], isLoading: l1 } = useTopSelling(3);
  const { data: trending = [], isLoading: l2 } = useTrending(3);
  const { data: recentlyAdded = [], isLoading: l3 } = useRecentlyAdded(3);
  const { data: topRated = [], isLoading: l4 } = useTopRated(3);

  const columnsData = [
    { key: "topSelling", label: "Top Selling", data: topSelling, loading: l1 },
    {
      key: "trending",
      label: "Trending Products",
      data: trending,
      loading: l2,
    },
    {
      key: "recentlyAdded",
      label: "Recently added",
      data: recentlyAdded,
      loading: l3,
    },
    { key: "topRated", label: "Top Rated", data: topRated, loading: l4 },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {columnsData.map((col) => (
          <Column
            key={col.key}
            label={col.label}
            products={col.data}
            isLoading={col.loading}
          />
        ))}
      </div>
    </section>
  );
}

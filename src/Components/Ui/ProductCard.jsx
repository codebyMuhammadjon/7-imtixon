import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useCartStore from "../../Store/cartStore";

/**
 * Карточка товара — стиль по макету:
 * - серый фон изображения с закруглёнными углами
 * - иконка корзины по центру снизу (на белом кружке)
 * - категория серым, звёзды, название, цена красная + зачёркнутая
 */
export default function ProductCard({ product, variant = "default" }) {
  const addItem = useCartStore((s) => s.addItem);

  if (!product) return null;

  const {
    id,
    name,
    price,
    old_price,
    image_url,
    rating,
    review_count,
    is_featured,
    is_new,
    is_sale,
    categories,
  } = product;

  const categoryName = categories?.name ?? "";

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  }

  // Бейдж
  function getBadge() {
    if (is_new) return { label: "New", bg: "bg-[#3BB77E]" };
    if (is_sale) return { label: "Sale", bg: "bg-[#4096EE]" };
    if (is_featured) return { label: "Hot", bg: "bg-[#E44B26]" };
    return null;
  }
  const badge = getBadge();

  // Скидка %
  const discountPct = old_price
    ? Math.round(((old_price - price) / old_price) * 100)
    : null;

  // ── Компактный вид для TopLists ──
  if (variant === "compact") {
    return (
      <Link to={`/product/${id}`} className="flex items-center gap-3 group">
        <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          <img
            src={image_url}
            alt={name}
            className="max-h-full max-w-full object-contain
                       group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium text-gray-800 line-clamp-2
                        group-hover:text-[#E44B26] transition-colors leading-snug"
          >
            {name}
          </p>
          <StarRow rating={rating} count={review_count} />
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[#E44B26] font-bold text-sm">${price}</span>
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

  // ── Стандартный вид ──
  return (
    <Link
      to={`/product/${id}`}
      className="group bg-white rounded-2xl border border-gray-100
                 hover:shadow-lg transition-all duration-300 flex flex-col
                 overflow-visible relative"
    >
      {/* Бейдж сверху слева */}
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`${badge.bg} text-white text-[10px] font-bold px-2 py-0.5 rounded-md`}
          >
            {badge.label}
          </span>
        </div>
      )}

      {/* Скидка сверху справа */}
      {discountPct && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            -{discountPct}%
          </span>
        </div>
      )}

      {/* ── Блок изображения ── */}
      {/* Относительный контейнер чтобы кнопка корзины вышла снизу по центру */}
      <div className="relative mx-3 mt-3">
        {/* Серый фон с картинкой */}
        <div className="bg-[#F3F4F6] rounded-xl h-44 flex items-center justify-center overflow-hidden p-4">
          <img
            src={image_url}
            alt={name}
            className="max-h-full max-w-full object-contain
                       group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Кнопка корзины — выступает снизу по центру */}
        <button
          onClick={handleAddToCart}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2
                     w-9 h-9 bg-white rounded-full border border-gray-200 shadow-sm
                     flex items-center justify-center
                     hover:bg-[#E44B26] hover:border-[#E44B26] hover:text-white
                     text-gray-400 transition-all duration-200 z-10"
          aria-label={`Добавить ${name} в корзину`}
        >
          <ShoppingCart size={15} />
        </button>
      </div>

      {/* ── Информация ── */}
      <div className="px-3 pt-7 pb-4 flex flex-col flex-1 text-center">
        {/* Категория */}
        {categoryName && (
          <p className="text-xs text-gray-400 mb-1">{categoryName}</p>
        )}

        {/* Звёзды */}
        <div className="flex items-center justify-center gap-1 mb-1">
          <StarRow rating={rating} count={review_count} />
        </div>

        {/* Название */}
        <p
          className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2
                      group-hover:text-[#E44B26] transition-colors leading-snug flex-1"
        >
          {name}
        </p>

        {/* Цена */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-[#E44B26] font-bold text-base">${price}</span>
          {old_price && (
            <span className="text-gray-400 text-sm line-through">
              ${old_price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// Звёзды
function StarRow({ rating = 0, count }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            className={`text-sm ${rating >= s ? "text-yellow-400" : "text-gray-200"}`}
          >
            ★
          </span>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-gray-400 text-xs">({count})</span>
      )}
    </div>
  );
}

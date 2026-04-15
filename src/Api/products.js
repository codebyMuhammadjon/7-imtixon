import axiosClient from "./axiosClient";
import { buildSupabaseUrl } from "../Utils/buildSupabaseQuery";

/**
 * Реальная схема таблицы products:
 * id, name, slug, description, price, old_price, image_url,
 * category_id, brand, weight, stock, rating, review_count,
 * is_featured, is_new, is_sale, diet_type, speciality, flavour, created_at
 *
 * Реальная схема таблицы categories:
 * id, name, slug, created_at
 */

// Поля для карточки товара (join с categories через select)
const CARD_FIELDS =
  "id,name,slug,price,old_price,image_url,brand,weight,stock,rating,review_count,is_featured,is_new,is_sale,categories(name,slug)";

// Список товаров с фильтрами и пагинацией
export async function fetchProducts({
  categoryId,
  order = "id.asc",
  limit = 12,
  offset = 0,
  textSearch,
  rangeGte,
  rangeLte,
} = {}) {
  const filters = {};
  if (categoryId) filters.category_id = categoryId;

  const url = buildSupabaseUrl("products", {
    select: CARD_FIELDS,
    filters,
    rangeGte,
    rangeLte,
    textSearch,
    order,
    limit,
    offset,
  });
  const response = await axiosClient.get(url);
  const contentRange = response.headers["content-range"];
  const total = contentRange ? parseInt(contentRange.split("/")[1]) : 0;
  return { data: response.data, total };
}

// Один товар по id — все поля
export async function fetchProductById(id) {
  const url = buildSupabaseUrl("products", {
    select: "*,categories(name,slug)",
    filters: { id },
    limit: 1,
  });
  const response = await axiosClient.get(url);
  return response.data[0] ?? null;
}

// Популярные товары — is_featured = true
export async function fetchPopularProducts(limit = 10) {
  const url = buildSupabaseUrl("products", {
    select: CARD_FIELDS,
    filters: { is_featured: true },
    order: "rating.desc",
    limit,
  });
  const response = await axiosClient.get(url);
  return response.data;
}

// Daily Best Sells — is_sale товары отсортированные по рейтингу
export async function fetchDailyBestSells(limit = 8) {
  const url = buildSupabaseUrl("products", {
    select: CARD_FIELDS,
    filters: { is_sale: true },
    order: "rating.desc",
    limit,
  });
  const response = await axiosClient.get(url);
  return response.data;
}

// Deals of the Day — товары с old_price (есть скидка)
export async function fetchDeals(limit = 4) {
  const url = buildSupabaseUrl("products", {
    select: CARD_FIELDS,
    filters: { is_sale: true },
    order: "review_count.desc",
    limit,
  });
  const response = await axiosClient.get(url);
  return response.data;
}

// Top Selling — featured по убыванию review_count
export async function fetchTopSelling(limit = 3) {
  const url = buildSupabaseUrl("products", {
    select: CARD_FIELDS,
    filters: { is_featured: true },
    order: "review_count.desc",
    limit,
  });
  const response = await axiosClient.get(url);
  return response.data;
}

// Trending — is_new товары
export async function fetchTrending(limit = 3) {
  const url = buildSupabaseUrl("products", {
    select: CARD_FIELDS,
    filters: { is_new: true },
    order: "rating.desc",
    limit,
  });
  const response = await axiosClient.get(url);
  return response.data;
}

// Recently Added — по дате создания
export async function fetchRecentlyAdded(limit = 3) {
  const url = buildSupabaseUrl("products", {
    select: CARD_FIELDS,
    order: "created_at.desc",
    limit,
  });
  const response = await axiosClient.get(url);
  return response.data;
}

// Top Rated — по рейтингу
export async function fetchTopRated(limit = 3) {
  const url = buildSupabaseUrl("products", {
    select: CARD_FIELDS,
    order: "rating.desc",
    limit,
  });
  const response = await axiosClient.get(url);
  return response.data;
}

import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductById,
  fetchPopularProducts,
  fetchDailyBestSells,
  fetchDeals,
  fetchTopSelling,
  fetchTrending,
  fetchRecentlyAdded,
  fetchTopRated,
} from "../Api/products";
import { QUERY_KEYS } from "../constants/queryKeys";

// Список товаров с фильтрами (для страницы Shop)
export function useProducts(params = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.products.list(params),
    queryFn: () => fetchProducts(params),
    keepPreviousData: true, // не мигает при смене страницы
  });
}

// Один товар по id
export function useProduct(id) {
  return useQuery({
    queryKey: QUERY_KEYS.products.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}

// Популярные товары (главная)
export function usePopularProducts(limit = 10) {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.popular, limit],
    queryFn: () => fetchPopularProducts(limit),
  });
}

// Daily Best Sells
export function useDailyBestSells(limit = 4) {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.dailyBestSells, limit],
    queryFn: () => fetchDailyBestSells(limit),
  });
}

// Deals of the Day
export function useDeals(limit = 4) {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.deals, limit],
    queryFn: () => fetchDeals(limit),
  });
}

// Top Selling / Trending / Recently Added / Top Rated — для секции TopLists
export function useTopSelling(limit = 3) {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.topSelling, limit],
    queryFn: () => fetchTopSelling(limit),
  });
}

export function useTrending(limit = 3) {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.trending, limit],
    queryFn: () => fetchTrending(limit),
  });
}

export function useRecentlyAdded(limit = 3) {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.recentlyAdded, limit],
    queryFn: () => fetchRecentlyAdded(limit),
  });
}

export function useTopRated(limit = 3) {
  return useQuery({
    queryKey: [...QUERY_KEYS.products.topRated, limit],
    queryFn: () => fetchTopRated(limit),
  });
}

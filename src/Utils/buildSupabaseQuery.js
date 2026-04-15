/**
 * Утилита для ручной сборки URL-запросов к Supabase REST API.
 *
 * ПОЧЕМУ НЕ URLSearchParams:
 * URLSearchParams дважды кодирует кириллицу при передаче в axios.
 * Строим query string вручную.
 *
 * ВАЖНО: Supabase поддерживает вложенные select через foreign key:
 * select=id,name,categories(name,slug) — это работает без JOIN
 */

const BASE_URL = import.meta.env.VITE_SUPABASE_URL;

export function buildSupabaseUrl(table, options = {}) {
  const {
    filters = {},
    select = "*",
    order,
    limit,
    offset,
    textSearch,
    rangeGte,
    rangeLte,
  } = options;

  const params = [];

  // select — не кодируем, там могут быть скобки для вложенных таблиц
  params.push(`select=${select}`);

  // eq-фильтры
  Object.entries(filters).forEach(([column, value]) => {
    if (value === null || value === undefined) return;

    if (typeof value === "boolean") {
      params.push(`${column}=eq.${value}`);
    } else if (typeof value === "number") {
      params.push(`${column}=eq.${value}`);
    } else {
      // Строка — кодируем для поддержки кириллицы
      params.push(`${column}=eq.${encodeURIComponent(value)}`);
    }
  });

  // Диапазон >=
  if (rangeGte) {
    params.push(`${rangeGte.column}=gte.${rangeGte.value}`);
  }

  // Диапазон <=
  if (rangeLte) {
    params.push(`${rangeLte.column}=lte.${rangeLte.value}`);
  }

  // Полнотекстовый поиск (ilike)
  if (textSearch) {
    params.push(
      `${textSearch.column}=ilike.*${encodeURIComponent(textSearch.query)}*`,
    );
  }

  if (order) params.push(`order=${order}`);
  if (limit !== undefined) params.push(`limit=${limit}`);
  if (offset !== undefined) params.push(`offset=${offset}`);

  return `${BASE_URL}/rest/v1/${table}?${params.join("&")}`;
}

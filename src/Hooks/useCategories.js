import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../Api/categories";
import { QUERY_KEYS } from "../constants/queryKeys";

export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.categories.all,
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // категории меняются редко — кэш 10 минут
  });
}

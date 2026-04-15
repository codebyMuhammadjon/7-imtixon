import axiosClient from "./axiosClient";
import { buildSupabaseUrl } from "../Utils/buildSupabaseQuery";

/**
 * Схема таблицы categories:
 * id, name, slug, created_at
 */
export async function fetchCategories() {
  const url = buildSupabaseUrl("categories", {
    select: "id,name,slug",
    order: "id.asc",
  });
  const response = await axiosClient.get(url);
  return response.data;
}

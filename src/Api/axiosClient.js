import axios from 'axios'

/**
 * Базовый axios-клиент для Supabase REST API.
 * Все запросы идут через этот экземпляр — ключи и заголовки задаются один раз.
 */
const axiosClient = axios.create({
  // baseURL не нужен — URL строим полностью в buildSupabaseQuery
  headers: {
    // Публичный ключ Supabase (anon key)
    apikey: import.meta.env.VITE_SUPABASE_KEY,
    Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    // Возвращать количество записей в заголовке для пагинации
    Prefer: 'count=exact',
  },
})

// Глобальный перехватчик ошибок
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error?.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default axiosClient

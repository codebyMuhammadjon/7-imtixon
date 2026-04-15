import { useQuery } from '@tanstack/react-query'
import { fetchBlogs, fetchBlogById } from '../Api/blogs'
import { QUERY_KEYS } from '../constants/queryKeys'

export function useBlogs(params = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.list(params),
    queryFn: () => fetchBlogs(params),
    keepPreviousData: true,
  })
}

export function useBlog(id) {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.detail(id),
    queryFn: () => fetchBlogById(id),
    enabled: !!id,
  })
}

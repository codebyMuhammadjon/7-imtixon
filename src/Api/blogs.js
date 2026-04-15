import axiosClient from "./axiosClient";

export async function fetchBlogs(params = {}) {
  const { data } = await axiosClient.get("/blogs", { params });
  return data;
}

export async function fetchBlogById(id) {
  const { data } = await axiosClient.get(`/blogs?id=eq.${id}&limit=1`);
  return data?.[0] ?? null;
}

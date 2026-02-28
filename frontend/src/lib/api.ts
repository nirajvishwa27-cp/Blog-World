import axios from 'axios';

const BASE = 'https://blog-world-3.onrender.com';

function headers() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const register = (email: string, password: string) =>
  axios.post(`${BASE}/auth/register`, { email, password }, { headers: headers() });

export const login = (email: string, password: string) =>
  axios.post(`${BASE}/auth/login`, { email, password }, { headers: headers() });

export const getMyBlogs = () =>
  axios.get(`${BASE}/blogs/my`, { headers: headers() });

export const createBlog = (data: { title: string; content: string; isPublished: boolean }) =>
  axios.post(`${BASE}/blogs`, data, { headers: headers() });

export const updateBlog = (id: string, data: object) =>
  axios.patch(`${BASE}/blogs/${id}`, data, { headers: headers() });

export const deleteBlog = (id: string) =>
  axios.delete(`${BASE}/blogs/${id}`, { headers: headers() });

export const getFeed = (page = 1, limit = 10) =>
  axios.get(`${BASE}/public/feed?page=${page}&limit=${limit}`);

export const getBlogBySlug = (slug: string) =>
  axios.get(`${BASE}/public/blogs/${slug}`);

export const likeBlog = (id: string) =>
  axios.post(`${BASE}/blogs/${id}/like`, {}, { headers: headers() });

export const unlikeBlog = (id: string) =>
  axios.delete(`${BASE}/blogs/${id}/like`, { headers: headers() });

export const getComments = (id: string) =>
  axios.get(`${BASE}/blogs/${id}/comments`, { headers: headers() });

export const addComment = (id: string, content: string) =>
  axios.post(`${BASE}/blogs/${id}/comments`, { content }, { headers: headers() });
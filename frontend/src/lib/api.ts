import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Auto-attach token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (email: string, password: string) =>
  api.post('/auth/register', { email, password });

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

// Blogs
export const getMyBlogs = () => api.get('/blogs/my');

export const createBlog = (data: { title: string; content: string; isPublished: boolean }) =>
  api.post('/blogs', data);

export const updateBlog = (id: string, data: Partial<{ title: string; content: string; isPublished: boolean }>) =>
  api.patch(`/blogs/${id}`, data);

export const deleteBlog = (id: string) => api.delete(`/blogs/${id}`);

// Public
export const getFeed = (page = 1, limit = 10) =>
  api.get(`/public/feed?page=${page}&limit=${limit}`);

export const getBlogBySlug = (slug: string) =>
  api.get(`/public/blogs/${slug}`);

// Likes
export const likeBlog = (id: string) => api.post(`/blogs/${id}/like`);
export const unlikeBlog = (id: string) => api.delete(`/blogs/${id}/like`);

// Comments
export const getComments = (id: string) => api.get(`/blogs/${id}/comments`);
export const addComment = (id: string, content: string) =>
  api.post(`/blogs/${id}/comments`, { content });
import axios from 'axios';

// Feature: hanuvansh-mern-estate
// Axios instance configured with base URL and 15-second timeout.
// Requirements: 18.1, 18.2, 18.3
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

// Request interceptor: attach JWT from localStorage as Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: on HTTP 401, clear token and redirect to admin login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;

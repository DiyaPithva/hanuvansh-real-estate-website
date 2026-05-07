/**
 * API client for HANUVANSH ESTATE CONSULTANT
 * Simple fetch-based client, no Redux needed
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  // Properties
  getProperties: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null))
    ).toString();
    return request(`/properties${qs ? `?${qs}` : ''}`);
  },

  getFeaturedProperties: () => request('/properties/featured'),

  getPropertyById: (id) => request(`/properties/${id}`),

  // Testimonials
  getTestimonials: () => request('/testimonials'),

  // Inquiries
  submitInquiry: (data) => request('/inquiries', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export default api;

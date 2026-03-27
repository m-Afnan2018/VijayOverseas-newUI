/**
 * Vijay Overseas — Frontend API client
 * Connects to the Node.js/Express/MongoDB backend
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Network error" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// ── Notices ────────────────────────────────────────────────────────────────
export async function getActiveNotices() {
  const data = await apiFetch("/notices/active");
  return data.data || [];
}

// ── Categories ─────────────────────────────────────────────────────────────
export async function getCategories(params = {}) {
  const qs = new URLSearchParams({ isActive: "true", limit: "100", ...params }).toString();
  const data = await apiFetch(`/categories?${qs}`);
  return data.data || [];
}

// ── Products ───────────────────────────────────────────────────────────────
export async function getProducts(params = {}) {
  const defaults = { isActive: "true", limit: "10", page: "1" };
  const qs = new URLSearchParams({ ...defaults, ...params }).toString();
  const data = await apiFetch(`/products?${qs}`);
  return data;
}

export async function getFeaturedProducts(limit = 8) {
  const data = await apiFetch(`/products?isFeatured=true&isActive=true&limit=${limit}`);
  return data.data || [];
}

export async function getProductBySlug(slug) {
  const data = await apiFetch(`/products/${slug}`);
  return data.data;
}

export async function getProductsByType(productType, limit = 10) {
  const qs = new URLSearchParams({ productType, isActive: "true", limit: String(limit) }).toString();
  const data = await apiFetch(`/products?${qs}`);
  return data.data || [];
}

export async function getProductsByState(state, limit = 20) {
  const qs = new URLSearchParams({ state, isActive: "true", limit: String(limit) }).toString();
  const data = await apiFetch(`/products?${qs}`);
  return data.data || [];
}

// ── Blogs ──────────────────────────────────────────────────────────────────
export async function getPublishedBlogs(params = {}) {
  const defaults = { isPublished: "true", limit: "10", page: "1" };
  const qs = new URLSearchParams({ ...defaults, ...params }).toString();
  const data = await apiFetch(`/blogs?${qs}`);
  return data;
}

export async function getLatestBlogs(limit = 4) {
  const data = await apiFetch(`/blogs?isPublished=true&limit=${limit}`);
  return data.data || [];
}

export async function getBlogBySlug(slug) {
  const data = await apiFetch(`/blogs/${slug}`);
  return data.data;
}

// ── Testimonials ───────────────────────────────────────────────────────────
export async function getActiveTestimonials() {
  const data = await apiFetch("/testimonials?isActive=true&limit=20");
  return data.data || [];
}

export async function getProductTestimonials(productId) {
  const data = await apiFetch(`/testimonials?isActive=true&product=${productId}&limit=20`);
  return data.data || [];
}

export { BASE_URL };

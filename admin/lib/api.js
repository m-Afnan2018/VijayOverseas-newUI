import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send httpOnly cookies
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — attach token from localStorage (fallback for SSR edge cases)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — redirect to login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !window.location.pathname.includes("/login")
    ) {
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

// ── Auth ───────────────────────────────────────────────────────────────────
export const authApi = {
  login: (data) => api.post("/auth/login", data),
  me: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
};

// ── Notices ────────────────────────────────────────────────────────────────
export const noticesApi = {
  list: (params) => api.get("/notices", { params }),
  get: (id) => api.get(`/notices/${id}`),
  create: (data) => api.post("/notices", data),
  update: (id, data) => api.put(`/notices/${id}`, data),
  delete: (id) => api.delete(`/notices/${id}`),
};

// ── Categories ─────────────────────────────────────────────────────────────
export const categoriesApi = {
  list: (params) => api.get("/categories", { params }),
  get: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post("/categories", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  update: (id, data) => api.put(`/categories/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  delete: (id) => api.delete(`/categories/${id}`),
};

// ── Products ───────────────────────────────────────────────────────────────
export const productsApi = {
  list: (params) => api.get("/products", { params }),
  get: (id) => api.get(`/products/${id}`),
  create: (data) => api.post("/products", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  update: (id, data) => api.put(`/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  delete: (id) => api.delete(`/products/${id}`),
};

// ── Blogs ──────────────────────────────────────────────────────────────────
export const blogsApi = {
  list: (params) => api.get("/blogs", { params }),
  get: (id) => api.get(`/blogs/${id}`),
  create: (data) => api.post("/blogs", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  update: (id, data) => api.put(`/blogs/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  delete: (id) => api.delete(`/blogs/${id}`),
};

// ── Testimonials ───────────────────────────────────────────────────────────
export const testimonialsApi = {
  list: (params) => api.get("/testimonials", { params }),
  get: (id) => api.get(`/testimonials/${id}`),
  create: (data) => api.post("/testimonials", data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  update: (id, data) => api.put(`/testimonials/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

// ── Upload ─────────────────────────────────────────────────────────────────
export const uploadApi = {
  single: (file) => {
    const form = new FormData();
    form.append("image", file);
    return api.post("/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  multiple: (files) => {
    const form = new FormData();
    files.forEach((f) => form.append("images", f));
    return api.post("/upload/multiple", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

// ── Dashboard stats ────────────────────────────────────────────────────────
export const dashboardApi = {
  stats: async () => {
    const [products, blogs, categories, testimonials, notices] =
      await Promise.all([
        api.get("/products", { params: { limit: 1 } }),
        api.get("/blogs", { params: { limit: 1 } }),
        api.get("/categories", { params: { limit: 1 } }),
        api.get("/testimonials", { params: { limit: 1 } }),
        api.get("/notices", { params: { limit: 1, isActive: true } }),
      ]);
    return {
      products: products.data.pagination?.total || 0,
      blogs: blogs.data.pagination?.total || 0,
      categories: categories.data.pagination?.total || 0,
      testimonials: testimonials.data.pagination?.total || 0,
      activeNotices: notices.data.pagination?.total || 0,
    };
  },
  recent: async () => {
    const [products, blogs] = await Promise.all([
      api.get("/products", { params: { limit: 5 } }),
      api.get("/blogs", { params: { limit: 5 } }),
    ]);
    return {
      recentProducts: products.data.data || [],
      recentBlogs: blogs.data.data || [],
    };
  },
};

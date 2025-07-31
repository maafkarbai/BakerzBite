import axios from "axios";

// In development, use empty string to let Vite proxy handle the requests
// In production, use the environment variable
const API_BASE_URL = import.meta.env.DEV ? "" : (import.meta.env.VITE_API_URL || "");

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("❌ API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(
      "❌ API Response Error:",
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  // Get all products with optional filters
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/api/products", { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },

  // Get products by category
  getByCategory: async (category) => {
    try {
      const response = await api.get(`/api/products/${category}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch products for category ${category}: ${error.message}`
      );
    }
  },

  // Get featured products
  getFeatured: async () => {
    try {
      const response = await api.get("/api/products", {
        params: { featured: "true" },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch featured products: ${error.message}`);
    }
  },

  // Get single product by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/products/item/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch product ${id}: ${error.message}`);
    }
  },

  // Create new product (Admin)
  create: async (productData) => {
    try {
      const response = await api.post("/api/admin/products", productData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  },

  // Update product (Admin)
  update: async (id, productData) => {
    try {
      const response = await api.put(`/api/admin/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update product ${id}: ${error.message}`);
    }
  },

  // Delete product (Admin)
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/admin/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete product ${id}: ${error.message}`);
    }
  },
};

// Contact API
export const contactAPI = {
  // Submit contact form
  submit: async (contactData) => {
    try {
      const response = await api.post("/api/contact", contactData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(`Failed to submit contact form: ${errorMessage}`);
    }
  },
};

// Health API
export const healthAPI = {
  // Check API health
  check: async () => {
    try {
      const response = await api.get("/api/health");
      return response.data;
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  },
};

// Generic error handler
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message =
      error.response.data?.message ||
      error.response.data?.error ||
      "Unknown error";

    switch (status) {
      case 400:
        return `Bad request: ${message}`;
      case 404:
        return `Not found: ${message}`;
      case 500:
        return `Server error: ${message}`;
      default:
        return `Error ${status}: ${message}`;
    }
  } else if (error.request) {
    // Network error
    return "Network error: Unable to connect to server. Please check your connection.";
  } else {
    // Other error
    return `Error: ${error.message}`;
  }
};

// Orders API (Admin)
export const ordersAPI = {
  // Get all orders
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/api/admin/orders", { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  },

  // Get order by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/admin/orders/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch order ${id}: ${error.message}`);
    }
  },

  // Update order status
  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(`/api/admin/orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update order ${id} status: ${error.message}`);
    }
  },

  // Get order statistics
  getStats: async () => {
    try {
      const response = await api.get("/api/admin/orders/statistics");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch order statistics: ${error.message}`);
    }
  },
};

// Customers API (Admin)
export const customersAPI = {
  // Get all customers
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/api/admin/customers", { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch customers: ${error.message}`);
    }
  },

  // Get customer by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/admin/customers/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch customer ${id}: ${error.message}`);
    }
  },

  // Get customer statistics
  getStats: async () => {
    try {
      const response = await api.get("/api/admin/customers/statistics");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch customer statistics: ${error.message}`);
    }
  },
};

// Analytics API (Admin)
export const analyticsAPI = {
  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await api.get("/api/admin/analytics/dashboard");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch dashboard statistics: ${error.message}`);
    }
  },

  // Get sales data
  getSalesData: async (period = 'week') => {
    try {
      const response = await api.get("/api/admin/analytics/sales", {
        params: { period }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch sales data: ${error.message}`);
    }
  },
};

// Promotions API (Admin)
export const promotionsAPI = {
  // Get all promotions
  getAll: async () => {
    try {
      const response = await api.get("/api/admin/promotions");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch promotions: ${error.message}`);
    }
  },

  // Create promotion
  create: async (promotionData) => {
    try {
      const response = await api.post("/api/admin/promotions", promotionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create promotion: ${error.message}`);
    }
  },

  // Update promotion
  update: async (id, promotionData) => {
    try {
      const response = await api.put(`/api/admin/promotions/${id}`, promotionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update promotion: ${error.message}`);
    }
  },

  // Delete promotion
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/admin/promotions/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete promotion: ${error.message}`);
    }
  },
};

// Coupons API (Admin)
export const couponsAPI = {
  // Get all coupons
  getAll: async () => {
    try {
      const response = await api.get("/api/admin/coupons");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch coupons: ${error.message}`);
    }
  },

  // Create coupon
  create: async (couponData) => {
    try {
      const response = await api.post("/api/admin/coupons", couponData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create coupon: ${error.message}`);
    }
  },

  // Update coupon
  update: async (id, couponData) => {
    try {
      const response = await api.put(`/api/admin/coupons/${id}`, couponData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update coupon: ${error.message}`);
    }
  },

  // Delete coupon
  delete: async (id) => {
    try {
      const response = await api.delete(`/api/admin/coupons/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete coupon: ${error.message}`);
    }
  },
};

export default api;

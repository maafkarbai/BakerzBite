import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

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

export default api;

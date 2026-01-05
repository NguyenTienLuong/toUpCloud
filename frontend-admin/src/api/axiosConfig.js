// ===============================================
// Location: src/api/axiosConfig.js
// ===============================================
import axios from "axios";
import { tokenStorage } from "../utils/token";

const api = axios.create({
  // Vite proxy sẽ chuyển:
  // /superadmin/... -> http://localhost:5001/superadmin/...

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Gửi cookies nếu cần
  timeout: 10000, // 10s timeout
});

// ============= REQUEST INTERCEPTOR =============
api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Only log in development
    if (process.env.NODE_ENV === "development") {
      console.log(" Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error(" Request error:", error);
    return Promise.reject(error);
  }
);

// ============= RESPONSE INTERCEPTOR =============
api.interceptors.response.use(
  (response) => {
    //  Only log in development
    if (process.env.NODE_ENV === "development") {
      console.log(" Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error(" API Error:", {
        status: error.response.status,
        url: error.config?.url,
        message: error.response.data?.message || error.message,
      });

      //  Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Token expired or invalid
          console.error(" Unauthorized - Token invalid");
      
          break;
        case 403:
          console.error(" Forbidden - No permission");
          break;
        case 404:
          console.error(" Not Found");
          break;
        case 500:
          console.error(" Server Error");
          break;
      }
    } else if (error.request) {
      // Request was made but no response
      console.error(" No response from server");
    } else {
      // Something else happened
      console.error(" Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;

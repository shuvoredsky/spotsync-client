import axios, { AxiosError } from "axios";
import { store } from "@/store";
import { logout } from "@/store/slices/authSlice";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request Interceptor: Attach JWT Bearer Token
apiClient.interceptors.request.use(
  (config) => {
    let token: string | null = null;
    try {
      const state = store.getState();
      token = state.auth.token;
    } catch {
      // Store may not be initialized yet
    }

    if (!token && typeof window !== "undefined") {
      token = localStorage.getItem("spotsync_token");
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: 401 Session Expiry Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      try {
        store.dispatch(logout());
      } catch {
        if (typeof window !== "undefined") {
          localStorage.removeItem("spotsync_token");
          localStorage.removeItem("spotsync_user");
        }
      }
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = `/login?expired=true`;
      }
    }
    return Promise.reject(error);
  }
);

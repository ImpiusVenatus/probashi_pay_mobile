import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { API_URL, REQUEST_TIMEOUT, AUTH_ENDPOINTS } from "@/config/api";
import {
  tokenCache,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@/utils/tokens";
import { router } from "expo-router";

// Create base axios instance (used only for refresh token call)
export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Queue for requests waiting for token refresh
let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}[] = [];

// Process queued requests
const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach(({ config, resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      resolve(axios(config));
    }
  });

  failedQueue = [];
};

// Add a flag to prevent multiple redirects to login
let hasRedirectedToLogin = false;

// Function to reset the redirect flag (call after successful login)
export const resetLoginRedirectFlag = () => {
  hasRedirectedToLogin = false;
};

// Refresh token logic
const refreshTokens = async (): Promise<string | null> => {
  try {
    const storedRefreshToken = await tokenCache.getToken(REFRESH_TOKEN_KEY);
    if (!storedRefreshToken) throw new Error("No refresh token");

    const response = await axiosInstance.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
      refresh_token: storedRefreshToken,
      platform: "native",
    });

    const { access_token, refresh_token } = response.data;

    await tokenCache.saveToken(ACCESS_TOKEN_KEY, access_token);
    await tokenCache.saveToken(REFRESH_TOKEN_KEY, refresh_token);

    return access_token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    await tokenCache.deleteToken(ACCESS_TOKEN_KEY);
    await tokenCache.deleteToken(REFRESH_TOKEN_KEY);
    if (!hasRedirectedToLogin) {
      hasRedirectedToLogin = true;
      setTimeout(() => router.replace("/(auth)/login"), 100);
    }
    return null;
  }
};

// Create an authenticated axios instance
export const createAuthAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      const token = await tokenCache.getToken(ACCESS_TOKEN_KEY);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== AUTH_ENDPOINTS.REFRESH_TOKEN
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ config: originalRequest, resolve, reject });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshTokens();

          if (newToken) {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newToken}`,
            };
            processQueue(null, newToken);
            return instance(originalRequest);
          } else {
            throw new Error("Token refresh returned null");
          }
        } catch (refreshError) {
          processQueue(refreshError as AxiosError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

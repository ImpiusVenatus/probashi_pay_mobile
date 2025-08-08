export const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_URL}/auth/login`,
  LOGOUT: `${API_URL}/auth/logout`,
  SIGNUP: `${API_URL}/auth/register`,
  CHECK_EMAIL: `${API_URL}/auth/check-email`,
  RESEND_OTP: `${API_URL}/auth/resend-otp`,
  VERIFY_OTP: `${API_URL}/auth/verify-otp`,
  REFRESH_TOKEN: `${API_URL}/auth/refresh-token`,
  GOOGLE_AUTH: `${API_URL}/auth/google`,
  USER_INFO: `${API_URL}/auth/userinfo`,
  AUTHORIZE: `${API_URL}/auth/authorize`,
  TOKEN: `${API_URL}/auth/token`,
  RESET_PASSWORD: `${API_URL}/auth/reset-password`,
  UPDATE_PASSWORD: `${API_URL}/auth/update-password`,

  // Google OAuth endpoints
  GOOGLE_LOGIN: `${API_URL}/auth/google/login`, // Redirects user to Google's OAuth
  GOOGLE_CALLBACK: `${API_URL}/auth/google/callback`, // Backend handles OAuth response
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 15000;

// A function to logout a user
// This function should make a request to the backend to logout the user

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { AUTH_ENDPOINTS } from "@/config/api";
import { tokenCache, ACCESS_TOKEN_KEY } from "@/utils/tokens";
import { clearAllStorage } from "@/utils/storage";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { clearTokens } = useAuth();

  const logoutUser = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get the access token from secure store
      const accessToken = await tokenCache.getToken(ACCESS_TOKEN_KEY);

      // Make the API call if we have a token
      if (accessToken) {
        await axiosInstance.post(
          AUTH_ENDPOINTS.LOGOUT,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
      }

      // Clear auth state and storage data
      await clearTokens();
      clearAllStorage();
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to logout";
      setError(errorMessage);

      // Still clear tokens and storage data even if API call fails
      await clearTokens();
      clearAllStorage();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    logout: logoutUser,
  };
};

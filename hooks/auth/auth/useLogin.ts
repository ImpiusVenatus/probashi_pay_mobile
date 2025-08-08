// A function to login a user
// This function should make a request to the backend with the email and password to login the user

import { useState } from "react";
import { LoginFormData } from "@/schemas/auth";
import { axiosInstance } from "@/utils/axios";
import { AUTH_ENDPOINTS } from "@/config/api";
import { useAuth } from "@/contexts/AuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const { setTokens } = useAuth();

  const loginUser = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, data);

      if (response.data) {
        // Handle tokens through AuthContext
        if (response.data.access_token && response.data.refresh_token) {
          await setTokens(
            response.data.access_token,
            response.data.refresh_token
          );
        }

        // Store user data locally in the hook state
        if (response.data.user) {
          setUser(response.data.user);
        }

        return true;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Invalid email or password";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    user,
    login: loginUser,
  };
};

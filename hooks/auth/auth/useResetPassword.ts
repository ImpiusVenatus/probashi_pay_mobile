import { useState } from "react";
import axios from "axios";
import { AUTH_ENDPOINTS } from "@/config/api";

interface ResetPasswordData {
  email: string;
}

interface UpdatePasswordData {
  email: string;
  code: string;
  new_password: string;
}

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (data: ResetPasswordData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post(AUTH_ENDPOINTS.RESET_PASSWORD, data);
      return response.status === 200 || response.status === 201;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "Network error - Please check your internet connection";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (data: UpdatePasswordData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.patch(AUTH_ENDPOINTS.UPDATE_PASSWORD, data);
      return response.status === 200 || response.status === 201;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "Network error - Please check your internet connection";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    resetPassword,
    updatePassword,
  };
};

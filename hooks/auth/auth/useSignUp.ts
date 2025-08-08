import { useState } from "react";
import {
  CreateAccountFormData,
  SignupEmailFormData,
  OTPFormData,
  UserCreateData,
} from "@/schemas/auth";
import axios from "axios";
import { AUTH_ENDPOINTS } from "@/config/api";
import { useAuth } from "@/contexts/AuthContext";
import { storeUserDefaultCurrency } from "@/utils/storage";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTokens } = useAuth();

  const checkEmailUnique = async (data: SignupEmailFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(`${AUTH_ENDPOINTS.CHECK_EMAIL}`, data);

      // If we get here, it means the email is unique and OTP was sent
      return true;
    } catch (err: any) {
      console.error("Check email error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      const errorMessage =
        err.response?.data?.detail || // Changed from message to detail to match backend
        err.message ||
        "Network error - Please check your internet connection";

      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async (data: SignupEmailFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(`${AUTH_ENDPOINTS.RESEND_OTP}`, data);
      return response.status === 200;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Network error - Please check your internet connection";

      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (data: OTPFormData & SignupEmailFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Transform the data to match backend schema
      const payload = {
        email: data.email,
        code: data.code,
      };

      const response = await axios.post(
        `${AUTH_ENDPOINTS.VERIFY_OTP}`,
        payload
      );
      return response.status === 200;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError("Invalid OTP");
        } else if (err.response?.status === 500) {
          setError("Something went wrong");
        } else {
          setError(err.message);
        }
      } else {
        setError("An unexpected error occurred");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (data: UserCreateData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(`${AUTH_ENDPOINTS.SIGNUP}`, data);

      // Handle tokens through AuthContext
      if (response.data.access_token && response.data.refresh_token) {
        await setTokens(
          response.data.access_token,
          response.data.refresh_token
        );
        // Store user's default currency
        storeUserDefaultCurrency(data.currency);
      }

      return true;
    } catch (err: any) {
      console.error("Create user error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

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
    checkEmailUnique,
    resendOTP,
    verifyOTP,
    createUser,
  };
};

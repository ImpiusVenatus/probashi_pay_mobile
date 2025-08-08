import React, { createContext, useState, useContext, useEffect } from "react";
import {
  tokenCache,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@/utils/tokens";

// Define types
type AuthContextType = {
  isAuthenticated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  clearTokens: () => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if tokens exist and update authentication state
  const checkTokens = async () => {
    try {
      const accessToken = await tokenCache.getToken(ACCESS_TOKEN_KEY);
      const refreshToken = await tokenCache.getToken(REFRESH_TOKEN_KEY);
      const tokensExist = !!(accessToken && refreshToken);
      setIsAuthenticated(tokensExist);
      return tokensExist;
    } catch (error) {
      console.error("Error checking tokens:", error);
      setIsAuthenticated(false);
      return false;
    }
  };

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        await checkTokens();
      } catch (error) {
        console.error("Error restoring session:", error);
      }
    };

    restoreSession();
  }, []);

  // Function to set auth tokens
  const setTokens = async (accessToken: string, refreshToken: string) => {
    try {
      await tokenCache.saveToken(ACCESS_TOKEN_KEY, accessToken);
      await tokenCache.saveToken(REFRESH_TOKEN_KEY, refreshToken);
      setIsAuthenticated(true); // Update authentication status immediately
    } catch (error) {
      console.error("Error setting auth tokens:", error);
      throw error;
    }
  };

  // Function to clear auth tokens
  const clearTokens = async () => {
    try {
      await tokenCache.deleteToken(ACCESS_TOKEN_KEY);
      await tokenCache.deleteToken(REFRESH_TOKEN_KEY);
      console.log("Tokens cleared");
      setIsAuthenticated(false); // Update authentication status immediately
    } catch (error) {
      console.error("Error clearing auth tokens:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setTokens,
        clearTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

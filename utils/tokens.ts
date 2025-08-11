import * as SecureStore from "expo-secure-store";

// Keys for secure storage - using only allowed characters
export const ACCESS_TOKEN_KEY = "access_token_key";
export const REFRESH_TOKEN_KEY = "refresh_token_key";

/**
 * Creates a token cache for secure storage
 * @returns a token cache object with getToken, saveToken and deleteToken methods
 */
const createTokenCache = () => {
  return {
    /**
     * Gets a token from secure storage
     * @param key - The key to get the token from
     * @returns the token or null if it doesn't exist
     */
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        return item;
      } catch (error) {
        console.error(`Error retrieving ${key} from secure storage:`, error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },

    /**
     * Saves a token to secure storage
     * @param key - The key to save the token to
     * @param token - The token to save
     */
    saveToken: async (key: string, token: string) => {
      try {
        await SecureStore.setItemAsync(key, token);
      } catch (error) {
        console.error(`Error saving ${key} to secure storage:`, error);
        throw error;
      }
    },

    /**
     * Deletes a token from secure storage
     * @param key - The key to delete the token from
     */
    deleteToken: async (key: string) => {
      try {
        await SecureStore.deleteItemAsync(key);
      } catch (error) {
        console.error(`Error deleting ${key} from secure storage:`, error);
        throw error;
      }
    },
  };
};

export const tokenCache = createTokenCache();

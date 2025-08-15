import { tokenManager } from "./token-manager";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Create a separate axios instance for auth calls to avoid circular dependency
const authAPI = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

export const authService = {
  async refreshToken(): Promise<string | null> {
    try {
      const response = await authAPI.post('/auth/refresh');
      
      const { accessToken } = response.data;
      tokenManager.setAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      console.log("Error while refresh token", error)
      tokenManager.clearAccessToken();
      return null;
    }
  },

  async logout(): Promise<void> {
    try {
      await authAPI.post('/auth/logout');
    } catch (error) {
      console.log("Error while logout", error)
    } finally {
      tokenManager.clearAccessToken();
    }
  }
};
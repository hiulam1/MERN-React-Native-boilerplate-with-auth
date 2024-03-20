import axios from "axios";
import * as Keychain from "react-native-keychain";
import * as SecureStore from "expo-secure-store";

import storeTokens from "./storeTokens";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3002/api",
});

const getTokens = async () => {
  try {
    const credentials = await SecureStore.getItemAsync("tokens");
    if (credentials) {
      const { accessToken, refreshToken } = JSON.parse(credentials);
      return { accessToken, refreshToken };
    }
    return null;
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    return null;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = await getTokens();
      if (tokens?.refreshToken) {
        try {
          const response = await axiosInstance.post(
            "/auth/refresh-token",
            {},
            {
              headers: {
                "x-refresh-token": tokens?.refreshToken,
              },
            }
          );
          const { accessToken } = response.data;
          await storeTokens(accessToken, tokens?.refreshToken);
          originalRequest.headers["authorization"] = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (error) {
          console.log("Error refreshing token:", error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

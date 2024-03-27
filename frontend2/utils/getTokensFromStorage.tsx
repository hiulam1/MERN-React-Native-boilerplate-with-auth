import * as SecureStore from "expo-secure-store";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const getTokensFromStorage = async (): Promise<Tokens | null> => {
  try {
    const credentials = await SecureStore.getItemAsync("tokens");
    if (credentials) {
      const { accessToken, refreshToken } = JSON.parse(credentials);
      console.log("credentials retrieved" + JSON.stringify(credentials));
      console.log("access token retrieved" + accessToken);
      console.log("refresh token retrieved" + refreshToken);
      return { accessToken, refreshToken };
    }
    return null;
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    return null;
  }
};

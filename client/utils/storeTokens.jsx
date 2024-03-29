  import * as SecureStore from "expo-secure-store";
  export default async function storeTokens(accessToken, refreshToken) {
    try {
      const tokens = JSON.stringify({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      console.log(tokens);
      const storage = await SecureStore.setItemAsync("tokens", tokens);
      console.log("storage: " + storage);
      console.log("Tokens stored successfully");
      console.log(`refresh token stored: ${refreshToken}`);
      return true;
    } catch (error) {
      console.error("Error storing tokens: ", error);
      throw new Error("Failed to store tokens");
    }
  }

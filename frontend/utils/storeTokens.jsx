import * as SecureStore from "expo-secure-store";
export default async function storeTokens(accessToken, refreshToken) {
  try {
    const tokens = JSON.stringify({ accessToken, refreshToken });
    await SecureStore.setItemAsync("tokens", tokens);
    console.log("Tokens stored successfully");
    return true;
  } catch (error) {
    console.error("Error storing tokens: ", error);
    throw new Error("Failed to store tokens");
  }
}

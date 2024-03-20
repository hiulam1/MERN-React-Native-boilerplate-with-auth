import * as SecureStore from "expo-secure-store";
const checkAuthTokenValidity = async () => {
  try {
    const credentials = await SecureStore.getItemAsync("tokens");
    if (credentials) {
      const tokens = JSON.parse(credentials);
      if (tokens && tokens.accessToken) {
        console.log("Tokens found");
        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error checking token validity: " + error);
  }
};
export default checkAuthTokenValidity;

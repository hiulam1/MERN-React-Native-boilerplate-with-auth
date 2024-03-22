import { getTokensFromStorage } from "./getTokensFromStorage";
const checkAuthTokenValidity = async () => {
  try {
    const tokens = await getTokensFromStorage();
    return !!tokens;
  } catch (error) {
    console.error("Error checking token validity:", error);
    throw new Error("Error checking token validity: " + error);
  }
};
export default checkAuthTokenValidity;

import { getTokensFromStorage } from "@/utils/getTokensFromStorage";
import axios from "axios";

export default async function logout() {
  const tokens = await getTokensFromStorage();
  if (!tokens) {
    throw new Error("No tokens found");
  }
  const { accessToken, refreshToken } = tokens;
  console.log("Refresh Token:", refreshToken); // For debugging
  const response = await axios.post(
    "http://localhost:3002/api/auth/logout",
    {},
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
        "x-refresh-token": refreshToken,
      },
    }
  );
  return response.status;
}

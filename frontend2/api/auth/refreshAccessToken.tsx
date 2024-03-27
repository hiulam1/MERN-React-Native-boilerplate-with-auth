import axios from "axios";

export default async function refreshAccessToken(refreshToken: string) {
  try {
    console.log("refresh token: fds " + refreshToken);
    const response = await axios.post(
      `http://localhost:3002/api/auth/refresh-token`,
      {},
      {
        headers: {
          "x-refresh-token": refreshToken,
        },
      }
    );
    const newAccessToken = response.data.accessToken;
    console.log("new access token" + newAccessToken);
    return newAccessToken;
  } catch (error: any) {
    console.log(error);
  }
}

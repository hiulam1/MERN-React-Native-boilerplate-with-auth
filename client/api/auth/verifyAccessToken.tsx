import axios from "axios";

export const verifyAccessToken = async (accessToken: string) => {
  return axios.get(`http://localhost:3002/api/auth/verify`, {
    headers: { authorization: `Bearer ${accessToken}` },
  });
};

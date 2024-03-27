import React, { createContext, useState, useEffect, useContext } from "react";
import { getTokensFromStorage } from "@/utils/getTokensFromStorage";
import storeTokens from "@/utils/storeTokens";
import { verifyAccessToken } from "@/api/auth/verifyAccessToken";
import refreshAccessToken from "@/api/auth/refreshAccessToken";

interface AuthContextType {
  isAuthenticated: boolean;
  verifyAuthToken: () => void;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function useProvideAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyAuthToken = async () => {
    let tokens = await getTokensFromStorage();
    console.log(tokens);
    if (!tokens) {
      console.log("no tokens found, please log in");
      return;
    }
    const { accessToken, refreshToken } = tokens;
    try {
      await verifyAccessToken(accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("no valid access token: ", error);
      console.log("existing refresh token: " + refreshToken);
      const newAccessToken = await refreshAccessToken(refreshToken);
      console.log("went to get new tokens" + newAccessToken);
      if (newAccessToken) {
        await storeTokens(newAccessToken, refreshToken);
        setIsAuthenticated(true);
        console.log("got new access Tokens" + newAccessToken);
      } else {
        setIsAuthenticated(false);
        throw new Error("No valid access token, please log in");
      }
    }
  };
  useEffect(() => {
    verifyAuthToken();
  }, []);
  return { isAuthenticated, verifyAuthToken, setIsAuthenticated };
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import checkAuthTokenValidity from "@/utils/checkTokenValidity";
import * as SplashScreen from "expo-splash-screen";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    async function checkAuth() {
      try {
        const isTokenValid = await checkAuthTokenValidity();
        setIsAuthenticated(isTokenValid!);
        console.log("isTokenValid", isTokenValid);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
        SplashScreen.hideAsync();
      }
    }
    checkAuth();
  }, []);

  const memoValue = useMemo(
    () => ({
      isAuthenticated,
      loading,
    }),
    [isAuthenticated, loading]
  );
  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

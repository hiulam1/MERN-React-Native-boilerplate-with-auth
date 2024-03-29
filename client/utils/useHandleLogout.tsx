import logout from "@/api/auth/logout";
import useAuth from "@/hooks/useAuth";
import { Alert } from "react-native";

export const useHandleLogout = () => {
  const { setIsAuthenticated } = useAuth();

  const signout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", onPress: signout },
      ],
      { cancelable: false }
    );
  };
};

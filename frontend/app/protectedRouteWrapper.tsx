import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native"; // Import the useNavigation hook
import useAuth from "@/hooks/useAuth";

const protectedRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {}, [isAuthenticated, navigation]);
  if (!isAuthenticated) {
    return <ActivityIndicator size="large" />;
  }
  return <>{children}</>;
};

export default protectedRouteWrapper;

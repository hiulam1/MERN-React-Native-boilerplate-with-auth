import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { AuthProvider } from "@/hooks/useAuth";
import StackNavigator from "./StackNavigator";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().then(() => {
      setLoading(false);
      SplashScreen.hideAsync();
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <StackNavigator />
    </AuthProvider>
  );
}

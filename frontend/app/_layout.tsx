import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import OTP from "./screens/OTP";
import Registration from "./screens/Registration";
import AuthenticatedStackScreens from "./AuthenticatedStack";
import checkAuthTokenValidity from "@/utils/checkTokenValidity";

export type RootStackParamList = {
  Login: undefined;
  OTP: { phoneNumber: string };
  Registration: undefined;
  AuthenticatedStack: undefined;
};

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <RootStack.Screen
          name="AuthenticatedStack"
          component={AuthenticatedStackScreens}
        />
      ) : (
        <>
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="OTP" component={OTP} />
          <RootStack.Screen name="Registration" component={Registration} />
        </>
      )}
    </RootStack.Navigator>
  );
}

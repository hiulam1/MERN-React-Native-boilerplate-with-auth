import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import { useColorScheme } from "@/components/useColorScheme";
import Login from "./Login";
import OTP from "./OTP";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  Login: undefined; // No parameters for the Login route
  OTP: { phoneNumber: string }; // The OTP route expects a phone number
};
const RootStack = createNativeStackNavigator<RootStackParamList>();
export type OTPScreenProps = NativeStackScreenProps<RootStackParamList, "OTP">;

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
const Stack = createNativeStackNavigator();
function RootLayoutNav() {
  const colorScheme = "dark";

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="OTP" component={OTP} />
      </RootStack.Navigator>
    </ThemeProvider>
  );
}

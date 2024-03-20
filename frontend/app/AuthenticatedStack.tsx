import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Authenticated/Home";

export type AuthenticatedStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

const AuthenticatedStackScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
export default AuthenticatedStackScreens;

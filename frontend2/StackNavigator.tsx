import useAuth from "@/hooks/useAuth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Home from "./screens/Authenticated/Home";
import OTP from "./screens/OTP";
import Registration from "./screens/Registration";
import { AuthenticatedScreens } from "./screens/DrawerNavigator";

export type RootStackParamList = {
  Login: undefined;
  OTP: { phoneNumber: string };
  Registration: undefined;
  Authenticated: undefined;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <>
          <RootStack.Screen
            name="Authenticated"
            component={AuthenticatedScreens}
          />
        </>
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

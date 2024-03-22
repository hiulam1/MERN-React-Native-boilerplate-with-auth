import useAuth from "@/hooks/useAuth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import OTP from "./OTP";
import Registration from "./Registration";
import Home from "./Home";

export type RootStackParamList = {
  Login: undefined;
  OTP: { phoneNumber: string };
  Registration: undefined;
  Home: undefined;
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
          <RootStack.Screen name="Home" component={Home} />
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

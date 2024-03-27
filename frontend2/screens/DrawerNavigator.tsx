import Home from "./Authenticated/Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyDocuments from "./Authenticated/MyDocuments";

export type AuthenticatedStackParamList = {
  Home: undefined;
  MyDocuments: undefined;
};

const Drawer = createDrawerNavigator<AuthenticatedStackParamList>();

export function AuthenticatedScreens() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="MyDocuments" component={MyDocuments} />
    </Drawer.Navigator>
  );
}

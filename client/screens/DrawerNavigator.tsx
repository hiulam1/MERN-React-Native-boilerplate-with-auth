import Home from "./Authenticated/Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyDocuments from "./Authenticated/MyDocuments";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View } from "react-native";
import { useHandleLogout } from "@/utils/useHandleLogout";

export type AuthenticatedStackParamList = {
  Home: undefined;
  MyDocuments: undefined;
};

const Drawer = createDrawerNavigator<AuthenticatedStackParamList>();

function DrawerContent(props: any) {
  const handleLogout = useHandleLogout();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View className="flex-1 justify-end bottom-7">
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={handleLogout} />
      </View>
    </DrawerContentScrollView>
  );
}
export function AuthenticatedScreens() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="MyDocuments"
        component={MyDocuments}
        options={{ title: "My Documents" }}
      />
    </Drawer.Navigator>
  );
}

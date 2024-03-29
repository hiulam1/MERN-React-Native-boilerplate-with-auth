import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { AuthenticatedStackParamList } from "@/screens/DrawerNavigator";

const Header = () => {
  const navigation =
    useNavigation<DrawerNavigationProp<AuthenticatedStackParamList>>();
  return (
    <View className="bg-light-grey pl-6">
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Entypo name="menu" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

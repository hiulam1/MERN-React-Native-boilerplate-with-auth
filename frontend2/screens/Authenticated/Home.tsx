import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import "react-native-gesture-handler";
import logout from "@/api/auth/logout";
import { AuthenticatedStackParamList } from "../DrawerNavigator";
import { DrawerScreenProps } from "@react-navigation/drawer";

const Home: React.FC<
  DrawerScreenProps<AuthenticatedStackParamList, "Home">
> = () => {
  const { setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  return (
    <AuthenticatedLayout>
      <View className="bg-light-grey flex-1 justify-center items-center p-4">
        <TouchableOpacity className="absolute top-12" onPress={handleLogout}>
          <Text className="text-white">logout</Text>
        </TouchableOpacity>
        <Text className="text-white semi-bold mb-6 text-[18px]">
          Please enter the six-digit code on the listing
        </Text>
        <TextInput
          className="text-white mb-4 w-46 h-10 rounded-md text-[24px] tracking-wide"
          keyboardType="default"
          placeholder="*      *     *     *     *     *"
          placeholderTextColor={"white"}
        ></TextInput>
      </View>
    </AuthenticatedLayout>
  );
};

export default Home;

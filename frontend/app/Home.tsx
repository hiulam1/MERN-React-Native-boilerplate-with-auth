import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import RegistrationLayout from "@/app/RegistrationLayout";
import logout from "@/app/api/auth/logout";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { RootStackParamList } from "./StackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useAuth from "@/hooks/useAuth";

type OTPScreenRouteProp = RouteProp<RootStackParamList, "Home">;

const Home: React.FC<
  NativeStackScreenProps<RootStackParamList, "Home">
> = () => {
  const [input, setInput] = useState("");
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
    <RegistrationLayout>
      <View className="bg-light-grey flex-1 justify-center items-center">
        <TouchableOpacity
          className="absolute top-14 left-14"
          onPress={handleLogout}
        >
          <Text className="text-white">logout</Text>
        </TouchableOpacity>
        <Text className="text-white semi-bold mb-6">
          Please enter the six-digit code on the listing
        </Text>
        <TextInput
          className="text-white mb-4 w-46 h-10 rounded-md text-[20px] "
          keyboardType="default"
          placeholder="*      *     *     *     *     *"
          placeholderTextColor={"white"}
        ></TextInput>
      </View>
    </RegistrationLayout>
  );
};

export default Home;

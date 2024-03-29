import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import "react-native-gesture-handler";
import { AuthenticatedStackParamList } from "../DrawerNavigator";
import { DrawerScreenProps } from "@react-navigation/drawer";

const Home: React.FC<
  DrawerScreenProps<AuthenticatedStackParamList, "Home">
> = () => {
  return (
    <AuthenticatedLayout>
      <View className="bg-light-grey flex-1 p-4 items-center justify-center">
        <View className="justify-center items-center bg-[#4504FD5E] p-5 rounded-md">
          <Text className="text-white text-center bold mb-6 text-[18px]">
            Please enter the six-digit code on the listing
          </Text>
          <TextInput
            className="text-white mb-4 w-46 h-10 rounded-md text-[24px] mb-10 "
            keyboardType="default"
            placeholder="*      *     *     *     *     *"
            placeholderTextColor={"white"}
          ></TextInput>
          <TouchableOpacity className="bg-[#7F76FFAD] p-4 rounded-lg">
            <Text className="text-white">Submit my documents</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthenticatedLayout>
  );
};

export default Home;

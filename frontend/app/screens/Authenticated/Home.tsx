import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import RegistrationLayout from "@/app/RegistrationLayout";

const Home = () => {
  const [input, setInput] = useState("");

  return (
    <RegistrationLayout>
      <View className="bg-light-grey flex-1 justify-center items-center">
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

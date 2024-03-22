import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import React, { useState } from "react";
import {
  checkPhoneIfValid,
  modifyInput,
  createUsableInput,
} from "@/utils/validatePhone";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import RegistrationLayout from "./RegistrationLayout";
import RegistrationButton from "@/components/registrationButton";
import { RootStackParamList } from "./StackNavigator";
import * as Haptics from "expo-haptics";
import receiveOTP from "./api/auth/receiveOTPApi";

const Login: React.FC<
  NativeStackScreenProps<RootStackParamList, "Login">
> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Login">>();

  const [input, setIput] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("" as string | null);

  const handleInputChange = (text: string) => {
    const isValid = checkPhoneIfValid(text);
    Haptics.selectionAsync();
    const formattedInput = isValid ? modifyInput(text) : text;
    setIput(formattedInput);
    setValid(isValid);
  };

  const handleSubmit = async () => {
    console.log("input" + input);
    const readyPhoneNumber = createUsableInput(input);
    console.log("phone number sent: " + readyPhoneNumber);
    try {
      await receiveOTP(readyPhoneNumber);
      navigation.navigate("OTP", { phoneNumber: readyPhoneNumber });
      console.log("OTP sent");
      setError(null);
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      if (error instanceof Error && error.hasOwnProperty("status")) {
        console.error("Error sending OTP", (error as any).status);
      } else {
        console.error("Error sending OTP" + error);
        setError("Server error, error sending OTP");
      }
    }
  };

  return (
    <RegistrationLayout>
      <View className="flex-1 bg-light-grey justify-center items-center">
        <Text className="text-[20px] mb-6 text-white">
          Please log in with your phone number
        </Text>

        <View className="flex-row items-center bg-transparent rounded-md">
          <TouchableOpacity className="items-center justify-center ">
            <Text className="text-[20px] mx-4 mb-4 text-center text-white">
              +41
            </Text>
          </TouchableOpacity>
          <TextInput
            className="text-white mb-4 w-40 h-10 rounded-md text-[20px] "
            keyboardType="numeric"
            value={input}
            onChangeText={(text) => {
              handleInputChange(text);
            }}
          ></TextInput>
        </View>
        {error ? <Text className="text-red-500">{error}</Text> : null}
        <RegistrationButton
          text={"Send OTP"}
          onPress={handleSubmit}
          disabled={!valid}
          buttonStyle={{}}
          textStyle={{}}
        />
      </View>
    </RegistrationLayout>
  );
};
export default Login;
const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: "gray",
    opacity: 0.5,
  },
  buttonAbled: {
    backgroundColor: "white",
    opacity: 1,
  },
});

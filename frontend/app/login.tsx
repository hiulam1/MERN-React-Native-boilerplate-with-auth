import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import {
  checkPhoneIfValid,
  modifyInput,
  createUsableInput,
} from "@/utils/validatePhone";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { OTPScreenProps, RootStackParamList } from "./_layout";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

const Login: React.FC<
  NativeStackScreenProps<RootStackParamList, "Login">
> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Login">>();

  const [input, setIput] = useState("");
  const [valid, setValid] = useState(false);

  const handleInputChange = (text: string) => {
    const isValid = checkPhoneIfValid(text);
    setIput(text);
    setValid(isValid);

    if (isValid) {
      const formattedInput = modifyInput(text);
      setIput(formattedInput);
    }
  };

  const handleSubmit = async () => {
    console.log("input" + input);
    const readyPhoneNumber = createUsableInput(input);
    console.log("phone number sent: " + readyPhoneNumber);
    navigation.navigate("OTP", { phoneNumber: readyPhoneNumber });
    try {
      await axios.post("http://localhost:3002/api/auth/send-otp", {
        phoneNumber: readyPhoneNumber,
      });
    } catch (error) {
      console.error("Error sending OTP", error);
    }
  };

  return (
    <View className="flex-1 bg-light-grey justify-center items-center">
      <Text className="text-[20px] mb-6 text-white">
        Please log in with your phone number
      </Text>

      <View className="flex-row items-center bg-transparent rounded-md ">
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
      {/* when clicked, check mongodb for phone number, then send oTP */}
      <TouchableOpacity
        className="bg-white p-3 rounded-md"
        style={valid ? {} : styles.buttonDisabled}
        disabled={!valid}
        onPress={() => handleSubmit()}
      >
        <Text>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: "gray",
    opacity: 0.5,
  },
});

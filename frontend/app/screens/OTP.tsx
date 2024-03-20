import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import React from "react";
import { checkOTPDigits } from "@/utils/validatePhone";
import axios from "axios";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../_layout";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCountdownTimer from "@/hooks/useCountdownTimer";

type OTPScreenRouteProp = RouteProp<RootStackParamList, "OTP">;
type Props = {
  route: OTPScreenRouteProp;
};

const OTP: React.FC<Props> = ({ route }) => {
  const { phoneNumber } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "OTP">>();

  const { seconds, resetCounter, disabled } = useCountdownTimer(30);

  const sendNewCode = async () => {
    resetCounter();
    console.log("sending new code");
    try {
      await axios.post("http://localhost:3002/api/auth/send-otp", {
        phoneNumber: phoneNumber,
      });
      console.log("correct number");
    } catch (error) {
      console.error("Error sending OTP", error);
    }
  };

  const storeSession = async (token: string) => {
    try {
      await AsyncStorage.setItem("sessionToken", token);
    } catch (error) {
      console.error("Error storing the session token", error);
    }
  };

  const handleVerificationCode = async (OTP: string) => {
    console.log(phoneNumber, OTP);
    try {
      if (checkOTPDigits(OTP)) {
        const response = await axios.post(
          "http://localhost:3002/api/auth/verify-otp",
          {
            phoneNumber: phoneNumber,
            otp: OTP,
          }
        );
        storeSession(response.data.sessionToken);
        navigation.navigate("Registration");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
        <View className="flex-1 justify-center items-center bg-light-grey">
          <Text className="text-[20px] mb-6 text-white font-bold">
            Enter below the six digit code
          </Text>
          <TextInput
            className="text-white mb-4 w-46 h-10 rounded-md text-[20px] "
            keyboardType="numeric"
            placeholder="*      *     *     *     *     *"
            placeholderTextColor={"white"}
            onChangeText={(OTP) => handleVerificationCode(OTP)}
          ></TextInput>
          <TouchableOpacity
            className="bg-white p-3 bottom-12 rounded-md absolute"
            onPress={sendNewCode}
            disabled={disabled}
            style={disabled ? styles.buttonDisabled : {}}
          >
            {disabled ? (
              <Text>Send new code in {seconds} seconds</Text>
            ) : (
              <Text>Send new code</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: "gray",
    opacity: 0.5,
  },
});

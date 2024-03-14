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
import React, { useEffect, useState } from "react";
import { checkOTPDigits } from "@/utils/validatePhone";
import axios from "axios";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./_layout";

type OTPScreenRouteProp = RouteProp<RootStackParamList, "OTP">;
type Props = {
  route: OTPScreenRouteProp;
};

const OTP: React.FC<Props> = ({ route }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [seconds, setSeconds] = useState(30);
  const { phoneNumber } = route.params;
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setButtonDisabled(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [seconds]);

  const sendNewCode = async () => {
    resetCounter();
    console.log("sending new code");
    try {
      await axios.post("http://localhost:3002/api/auth/send-otp", {
        phoneNumber: phoneNumber,
      });
    } catch (error) {
      console.error("Error sending OTP", error);
    }
  };

  const handleVerificationCode = async (phoneNumber: string, OTP: string) => {
    console.log(phoneNumber, OTP);
    if (checkOTPDigits(OTP)) {
      try {
        await axios.post("http://localhost:3002/api/auth/verify-otp", {
          phoneNumber: phoneNumber,
          otp: OTP,
        });
      } catch (error) {
        console.error("Error verifying OTP", error);
      }
    } else {
      console.error("Invalid OTP");
    }
  };
  const resetCounter = () => {
    setSeconds(30);
    setButtonDisabled(true);
  };
  return (
    <KeyboardAvoidingView className="flex-1 bg-light-grey">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
        <View className="flex-1 justify-center items-center">
          <Text className="text-[20px] mb-6 text-white font-bold">
            Enter below the six digit code
          </Text>
          <TextInput
            className="text-white mb-4 w-46 h-10 rounded-md text-[20px] "
            keyboardType="numeric"
            placeholder="*      *     *     *     *     *"
            placeholderTextColor={"white"}
            onChangeText={(OTP) => handleVerificationCode(phoneNumber, OTP)}
          ></TextInput>
          <TouchableOpacity
            className="bg-white p-3 bottom-12 rounded-md absolute"
            onPress={sendNewCode}
            disabled={buttonDisabled}
            style={buttonDisabled ? styles.buttonDisabled : {}}
          >
            {buttonDisabled ? (
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

import { View, Text, TextInput } from "react-native";
import React from "react";
import { checkOTPDigits } from "@/utils/validatePhone";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCountdownTimer from "@/hooks/useCountdownTimer";
import RegistrationButton from "@/components/registrationButton";
import RegistrationLayout from "./RegistrationLayout";
import { RootStackParamList } from "./StackNavigator";
import verifyOTP from "./api/auth/verifyOTP";
import receiveOTP from "./api/auth/receiveOTPApi";
import useAuth from "@/hooks/useAuth";
import storeTokens from "@/utils/storeTokens";
import { getTokensFromStorage } from "@/utils/getTokensFromStorage";

type OTPScreenRouteProp = RouteProp<RootStackParamList, "OTP">;
type Props = {
  route: OTPScreenRouteProp;
};

const OTP: React.FC<Props> = ({ route }) => {
  const { phoneNumber } = route.params;
  const { verifyAuthToken } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "OTP">>();

  const { seconds, resetCounter, disabled } = useCountdownTimer(30);

  const sendNewCode = async () => {
    resetCounter();
    console.log("sending new code");
    try {
      await receiveOTP(phoneNumber);
      console.log("correct OTP sent");
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
        const response = await verifyOTP(phoneNumber, OTP, 2);
        if (response && !response.data.userExists) {
          storeSession(response.data.sessionToken);
          navigation.navigate("Registration");
        } else if (response && response.data.accessToken) {
          await storeTokens(
            response.data.accessToken,
            response.data.refreshToken
          );
          await getTokensFromStorage();
          verifyAuthToken();
          console.log("tokens verified");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RegistrationLayout>
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
        <RegistrationButton
          text={
            disabled ? `Send new code in ${seconds} seconds` : "Send new code"
          }
          onPress={sendNewCode}
          disabled={disabled}
          buttonStyle={{}}
          textStyle={{}}
        />
        {/* <TouchableOpacity
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
              </TouchableOpacity> */}
      </View>
    </RegistrationLayout>
  );
};

export default OTP;

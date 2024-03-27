import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import useAuth from "./useAuth";
import useCountdownTimer from "./useCountdownTimer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkOTPDigits } from "@/utils/validatePhone";
import storeTokens from "@/utils/storeTokens";
import { getTokensFromStorage } from "@/utils/getTokensFromStorage";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { RootStackParamList } from "@/StackNavigator";
import receiveOTP from "@/api/auth/receiveOTPApi";
import verifyOTP from "@/api/auth/verifyOTP";

export const useOTPVerification = (phoneNumber: string) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "OTP">>();
  const { verifyAuthToken } = useAuth();
  const { seconds, resetCounter, disabled } = useCountdownTimer(30);
  const [error, setError] = useState("" as string | null);

  const sendNewCode = async () => {
    resetCounter();
    console.log("sending new code");
    try {
      await receiveOTP(phoneNumber);
      console.log("correct OTP sent");
    } catch (error) {
      setError("Server error, error sending OTP");
    }
  };
  const storeSession = async (token: string) => {
    try {
      await AsyncStorage.setItem("sessionToken", token);
    } catch (error) {
      setError("Error storing session token");
    }
  };

  const handleVerificationCode = async (OTP: string) => {
    console.log(phoneNumber, OTP);
    try {
      if (checkOTPDigits(OTP)) {
        const response = await verifyOTP(phoneNumber, OTP, 2);
        console.log(response);
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
    } catch (error: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

      setError(error.message);
    }
  };
  return { sendNewCode, handleVerificationCode, seconds, disabled, error };
};
export default useOTPVerification;

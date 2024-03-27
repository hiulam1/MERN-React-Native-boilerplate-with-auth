import { View, Text, TextInput } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import RegistrationButton from "@/components/registrationButton";
import RegistrationLayout from "../components/RegistrationLayout";
import useOTPVerification from "@/hooks/useOTPVerification";
import { RootStackParamList } from "@/StackNavigator";

type OTPScreenRouteProp = RouteProp<RootStackParamList, "OTP">;
type Props = {
  route: OTPScreenRouteProp;
};

const OTP: React.FC<Props> = ({ route }) => {
  const { phoneNumber } = route.params;
  const { sendNewCode, handleVerificationCode, seconds, disabled, error } =
    useOTPVerification(phoneNumber);

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
        <Text className="text-[20px] mb-6 text-white font-bold">{error}</Text>
        <RegistrationButton
          text={
            disabled ? `Send new code in ${seconds} seconds` : "Send new code"
          }
          onPress={sendNewCode}
          disabled={disabled}
          buttonStyle={{}}
          textStyle={{}}
        />
      </View>
    </RegistrationLayout>
  );
};

export default OTP;

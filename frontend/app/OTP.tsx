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

const OTP = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [seconds, setSeconds] = useState(30);

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
          ></TextInput>
          <TouchableOpacity
            className="bg-white p-3 bottom-12 rounded-md absolute"
            onPress={resetCounter}
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

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import React from "react";

const RegistrationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
      <KeyboardAvoidingView className="flex-1">{children}</KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationLayout;

import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import React from "react";

const RegistrationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegistrationLayout;

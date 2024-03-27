import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

type RegistrationButtonProps = {
  text: string;
  onPress: () => void;
  buttonStyle: object;
  textStyle: object;
  disabled: boolean;
};

const RegistrationButton: React.FC<RegistrationButtonProps> = ({
  text,
  onPress,
  buttonStyle,
  textStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      className="bottom-12"
      onPress={onPress}
      style={[styles.button, disabled && styles.disabledButton, buttonStyle]}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.textDisabled, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    position: "absolute",
  },
  disabledButton: {
    backgroundColor: "gray",
    opacity: 0.5,
  },
  textDisabled: {
    color: "white",
  },
  text: {
    color: "black",
    fontSize: 16,
  },
});

export default RegistrationButton;

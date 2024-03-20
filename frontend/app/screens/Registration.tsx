import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import RegistrationLayout from "../RegistrationLayout";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateEmail } from "@/utils/validateEmail";
import storeTokens from "@/utils/storeTokens";

const Registration = () => {
  const [input, setIput] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (text: string) => {
    setIput(text);
    if (validateEmail(input)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };
  const handleSubmit = async () => {
    try {
      const sessionToken = await AsyncStorage.getItem("sessionToken");
      console.log("sessionToken ", sessionToken);
      if (!sessionToken) {
        setError(
          "Session likely expired. Please restart the registration process."
        );
        return;
      }

      const response = await createAccount(sessionToken);
      console.log("response", response);
      const { accessToken, refreshToken } = response.data;

      const tokensStored = await storeTokens(accessToken, refreshToken);
      console.log("tokensStored ", tokensStored);

      setValid(true);
      console.log("registration successful" + accessToken + refreshToken);
    } catch (error) {
      console.error("Error registering", error);
    }
  };

  const createAccount = async (token: string): Promise<any> => {
    try {
      console.log(input);
      const response = await axios.post(
        "http://localhost:3002/register",
        {
          email: input,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("account created");
      return response;
    } catch (error) {
      throw new Error("Error creating account: " + error);
    }
  };

  return (
    <RegistrationLayout>
      <View className="flex-1 justify-center items-center bg-light-grey">
        <Text className="text-[18px] mb-6 text-white font-semi-bold">
          Please enter your email address
        </Text>
        <Text className="text-[18px] mb-6 text-white font-semi-bold">
          {error}
        </Text>
        <View className="flex-row items-center bg-transparent rounded-md ">
          <TextInput
            className="text-white mb-4 w-46 h-10 rounded-md text-[20px] "
            keyboardType="email-address"
            placeholderTextColor={"white"}
            value={input}
            onChangeText={(text) => handleInputChange(text)}
            autoFocus={true}
          ></TextInput>
        </View>
        <TouchableOpacity
          className="bg-white p-3 bottom-12 rounded-md absolute"
          onPress={handleSubmit}
          style={valid ? styles.buttonAbled : styles.buttonDisabled}
          disabled={!valid}
        >
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </RegistrationLayout>
  );
};

export default Registration;
const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: "gray",
    opacity: 0.5,
  },
  buttonAbled: {
    backgroundColor: "white",
    opacity: 1,
  },
});

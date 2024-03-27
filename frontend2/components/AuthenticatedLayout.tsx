import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
};

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  return (
    <View className="flex-1 bg-light-grey">
      <SafeAreaView className="flex-1">
        <Header />
        {children}
      </SafeAreaView>
    </View>
  );
};

export default AuthenticatedLayout;

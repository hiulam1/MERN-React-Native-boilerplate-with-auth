import { View, Text } from "react-native";
import React from "react";
import { AuthenticatedStackParamList } from "../DrawerNavigator";
import { DrawerScreenProps } from "@react-navigation/drawer";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

const MyDocuments: React.FC<
  DrawerScreenProps<AuthenticatedStackParamList, "MyDocuments">
> = () => {
  return (
    <AuthenticatedLayout>
      <View>
        <Text>MyDocuments</Text>
      </View>
    </AuthenticatedLayout>
  );
};

export default MyDocuments;

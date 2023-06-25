import { Text, SafeAreaView } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import LogoutButton from "../../components/LogoutButton";

const UserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView className="flex-1">
      <Text>LOG OUT</Text>
      <LogoutButton />
    </SafeAreaView>
  );
};

export default UserScreen;

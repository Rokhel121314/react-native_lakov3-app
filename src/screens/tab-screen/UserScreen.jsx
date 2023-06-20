import { View, Text, Button, SafeAreaView } from "react-native";
import React from "react";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

const UserScreen = ({ navigation }) => {
  const { removeUserInfo } = useAsyncStorage();
  const { fireBaseLogout } = useFirebaseAuth();
  return (
    <SafeAreaView>
      <Button
        title="LOG OUT"
        color={"red"}
        onPress={() => {
          fireBaseLogout();
          removeUserInfo();
        }}
      />
    </SafeAreaView>
  );
};

export default UserScreen;

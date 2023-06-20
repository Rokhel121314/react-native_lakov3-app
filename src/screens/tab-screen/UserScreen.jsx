import { View, Text, Button, SafeAreaView } from "react-native";
import React from "react";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { useDispatch } from "react-redux";
import { unGetAllProduct } from "../../redux/productSlice";

const UserScreen = ({ navigation }) => {
  const { removeUserInfo } = useAsyncStorage();
  const { fireBaseLogout } = useFirebaseAuth();

  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      <Button
        title="LOG OUT"
        color={"red"}
        onPress={() => {
          fireBaseLogout();
          removeUserInfo();
          dispatch(unGetAllProduct());
        }}
      />
    </SafeAreaView>
  );
};

export default UserScreen;

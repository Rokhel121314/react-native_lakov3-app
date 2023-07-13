import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useAsyncStorage } from "../hooks/useAsyncStorage";
import { useDispatch } from "react-redux";
import { unGetAllProduct } from "../redux/productSlice";
import { removeTransactionList } from "../redux/transactionSlice";
import { resetCounter } from "../redux/counterSlice";

const LogoutButton = () => {
  const { fireBaseLogout, fireBaseAuthenticateUser, uid } = useFirebaseAuth();
  const { removeUserInfo } = useAsyncStorage();

  const dispatch = useDispatch();

  useEffect(() => {
    fireBaseAuthenticateUser();
  }, [uid]);
  return (
    <TouchableOpacity
      className="bg-blue-dianne"
      onPress={() => {
        fireBaseLogout().then(() =>
          removeUserInfo().then(() => {
            dispatch(unGetAllProduct());
            dispatch(removeTransactionList());
            dispatch(resetCounter());
          })
        );
      }}>
      <Text className="px-5 py-2">Log out</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

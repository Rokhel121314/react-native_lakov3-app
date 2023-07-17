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
      className="bg-deep-amethyst w-full items-center"
      onPress={() => {
        fireBaseLogout().then(() =>
          removeUserInfo().then(() => {
            dispatch(unGetAllProduct());
            dispatch(removeTransactionList());
            dispatch(resetCounter());
          })
        );
      }}>
      <Text className="py-3 text-gray-50 text-lg font-semibold tracking-widest">
        Sign out
      </Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

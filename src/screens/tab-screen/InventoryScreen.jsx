import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";
import { styled } from "nativewind";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const StyledText = styled(Text);

const InventoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView className="w-full bg-pink-200 flex-1 mb-[70]">
      <StatusBar />
      <StyledText className="text-blue-dianne text-center pt-36">
        InventoryScreen
      </StyledText>
      <Button
        title="add product"
        onPress={() => navigation.navigate("add-product")}
      />
      <Button
        title="LOG OUT"
        color={"red"}
        onPress={() => dispatch(logout())}
      />
    </SafeAreaView>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({});

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

const StyledText = styled(Text);

const InventoryScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="w-full bg-gray-200 flex-1">
      <StatusBar />
      <StyledText className="text-blue-dianne text-center pt-36">
        InventoryScreen
      </StyledText>
      <Button
        title="add product"
        onPress={() => navigation.navigate("add-product")}
      />
    </SafeAreaView>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({});

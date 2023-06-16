import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";

const InventoryScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <Text>InventoryScreen</Text>
      <Button
        title="add product"
        onPress={() => navigation.navigate("add-product")}
      />
    </SafeAreaView>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({});

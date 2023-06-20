import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const ViewProductScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={{ uri: item.product_image.secure_url }}
        style={{ width: 200, height: 200, resizeMode: "contain" }}
      />
      <Text>{item.product_name}</Text>
    </View>
  );
};

export default ViewProductScreen;

const styles = StyleSheet.create({});

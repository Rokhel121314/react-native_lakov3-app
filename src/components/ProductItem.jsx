import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const ProductItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      className="w-[110px] h-[110px] m-2 rounded-lg items-center relative"
      onPress={() => {
        navigation.navigate("view-product", { item });
      }}>
      <Image
        source={{ uri: item.product_image.secure_url }}
        style={{ width: 90, height: 90, resizeMode: "contain" }}
      />
      <Text className="text-gray-700 absolute bottom-0" numberOfLines={1}>
        {item.product_name}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductItem;

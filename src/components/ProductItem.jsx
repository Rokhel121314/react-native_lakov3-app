import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { getProductDetail } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({ item, navigation }) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      className="w-[110px] h-[110px] m-2 rounded-lg items-center relative"
      onPress={() => {
        navigation.navigate("view-product", { item });
        dispatch(getProductDetail(item));
      }}>
      <Image
        source={{ uri: item.product_image.secure_url }}
        style={{ width: 90, height: 90, resizeMode: "contain" }}
      />
      <Text className="text-gray-700 absolute bottom-0" numberOfLines={1}>
        {item.product_name.toLowerCase()}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductItem;

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
      {item.product_quantity !== 0 ? (
        item.product_quantity > 9 ? (
          <View className="absolute bg-green-500 z-10 left-3/4 h-4 w-6 rounded-lg items-center justify-center">
            <Text className="text-gray-50 text-xs px-1">
              {item.product_quantity}
            </Text>
          </View>
        ) : (
          <View className="absolute bg-yellow-500 z-10 left-3/4 h-4 w-4 rounded-lg items-center justify-center">
            <Text className="text-gray-50 text-xs px-1">
              {item.product_quantity}
            </Text>
          </View>
        )
      ) : (
        <View className="absolute bg-red-600 z-10 h-4 top-1/3 items-center justify-center">
          <Text className="text-gray-50 text-xs px-1">OUT OF STOCK</Text>
        </View>
      )}

      <Image
        source={{ uri: item.product_image.secure_url }}
        style={
          item.product_quantity !== 0
            ? { width: 90, height: 90, resizeMode: "contain" }
            : { width: 90, height: 90, resizeMode: "contain", opacity: 0.4 }
        }
      />
      <Text className="text-gray-700 absolute bottom-0" numberOfLines={1}>
        {item.product_name.toLowerCase()}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductItem;

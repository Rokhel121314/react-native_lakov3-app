import { View, Text, Image } from "react-native";
import React from "react";

const CartItem = ({ item }) => {
  //   console.log("item", item);
  const qty = parseInt(item.item_quantity).toFixed();
  const amount = parseInt(item.item_quantity * item.selling_price).toFixed(2);
  //   console.log("qty", qty, "amount:", amount);
  return (
    <View className="w-full flex-row py-2">
      <Image
        source={{ uri: item.product_image.secure_url }}
        className="w-8 h-8 mr-4"
      />
      <Text className="text-lg w-4/12" numberOfLines={1}>
        {item.product_name.toLowerCase()}
      </Text>
      <Text className="text-lg w-1/12 text-center">x</Text>
      <Text className="text-lg w-2/12 text-center">{`${qty} pcs`}</Text>
      <Text className="text-lg w-3/12 text-right font-semibold">{`$ ${amount}`}</Text>
    </View>
  );
};

export default CartItem;

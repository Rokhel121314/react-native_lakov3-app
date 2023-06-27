import { View, Text } from "react-native";
import React from "react";

const SoldItem = ({ items }) => {
  return (
    <View key={items.product_name}>
      <View className="px-5 flex-row justify-between mt-2">
        <Text className="text-gray-950 text-lg font-semibold">
          {items.product_name}
        </Text>
        <Text className="text-gray-950 text-lg font-semibold">
          {`$ ${(items.item_quantity * items.selling_price).toFixed(2)}`}
        </Text>
      </View>
      <View className="px-5 flex-row justify-start ml-5">
        <Text className="text-base">{`${
          items.item_quantity
        } pcs x $ ${items.selling_price.toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

export default SoldItem;

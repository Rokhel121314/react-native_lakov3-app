import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const ViewProductScreen = () => {
  const route = useRoute();
  const { item } = route.params;

  const productName =
    item.product_name.charAt(0).toUpperCase() + item.product_name.slice(1);
  return (
    <View className="flex-1 px-8">
      {/* PRODUCT DETAILS */}
      <View className="flex-4">
        {/* HEADER */}
        <View className="flex-2 justify-center">
          <Text className="text-4xl font-bold">{productName}</Text>
          <Text className="text-sm text-gray-500">{`ID: ${item._id}`}</Text>
          <Text className="text-sm text-gray-500">{`STOCK: ${item.product_quantity}`}</Text>
        </View>

        {/* IMAGE */}
        <View className="flex-4 items-center justify-center">
          <Image
            source={{ uri: item.product_image.secure_url }}
            width={200}
            height={200}
            resizeMode="contain"
          />
        </View>

        {/* DETAILS */}
        <View className="flex-3 flex-row px-5">
          <View className="flex-1  justify-around items-start">
            <View>
              <Text className="text-sm text-gray-500 font-bold">
                ORIGINAL PRICE
              </Text>
              <Text className="text-xl text-gray-950 font-bold">{`$ ${item.original_price.toFixed(
                2
              )}`}</Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500 font-bold">QUANTITY</Text>
              <Text className="text-xl text-gray-950 font-bold">{`${item.product_quantity.toFixed(
                2
              )} pcs`}</Text>
            </View>
          </View>

          <View className="flex-1  justify-around items-end">
            <View className="w-9/12">
              <Text className="text-sm text-gray-500 font-bold">
                SELLING PRICE
              </Text>
              <Text className="text-xl text-gray-950 font-bold">{`$ ${item.selling_price.toFixed(
                2
              )}`}</Text>
            </View>
            <View className="w-9/12">
              <Text className="text-sm text-gray-500 font-bold">TYPE</Text>
              <Text
                className="text-xl text-gray-950 font-bold"
                numberOfLines={1}>
                {item.product_type}
              </Text>
            </View>
          </View>
        </View>
        {/* END OF PRODUCT DETAIL */}
      </View>

      {/* SALES DETAILS */}
      <View className="flex-2  flex-row mb-10 px-5">
        <View className="flex-1  justify-around items-start">
          <View>
            <Text className="text-sm text-gray-500 font-bold">GROSS SALES</Text>
            <Text className="text-xl text-gray-950 font-bold">{`$ ${item.original_price.toFixed(
              2
            )}`}</Text>
            <View className="items-start ">
              <Text className="bg-blue-dianne text-gray-50 px-2 py-1 rounded-3xl text-xs">
                1.56%
              </Text>
            </View>
          </View>
          <View>
            <Text className="text-sm text-gray-500 font-bold">NET SALES</Text>
            <Text className="text-xl text-gray-950 font-bold">{`$ ${item.selling_price.toFixed(
              2
            )}`}</Text>
            <View className="items-start ">
              <Text className="bg-blue-dianne text-gray-50 px-2 py-1 rounded-3xl text-xs">
                1.56%
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1  justify-around items-end">
          <View className="w-9/12">
            <Text className="text-sm text-gray-500 font-bold">SOLD</Text>
            <Text className="text-xl text-gray-950 font-bold">{`${item.product_quantity.toFixed(
              2
            )} pcs`}</Text>
            <View className="items-start ">
              <Text className="bg-blue-dianne text-gray-50 px-2 py-1 rounded-3xl text-xs">
                1.56%
              </Text>
            </View>
          </View>
          <View className="w-9/12">
            <Text className="text-sm text-gray-500 font-bold">TYPE</Text>
            <Text className="text-xl text-gray-950 font-bold">
              {item.product_type}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewProductScreen;

const styles = StyleSheet.create({});

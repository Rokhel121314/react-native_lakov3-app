import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { addProductToCounter, getCartItem } from "../redux/cartSlice";
import { useDispatch } from "react-redux";


const CounterItemList = ({ item, setModalVisible }) => {
  //
  const dispatch = useDispatch();

  return (
    <View className="w-full bg-gray-50 h-16 justify-between flex-row px-6">
      <View className="w-2/12  items-center justify-center">
        <Image
          source={{
            uri: item.product_image.secure_url,
          }}
          style={{ width: 36, height: 36 }}
        />
      </View>
      <View className="w-3/12  items-center justify-center">
        <Text>{item.product_name}</Text>
      </View>
      <View className="w-3/12  items-center justify-center">
        <Text>{`$ ${item.selling_price.toFixed(2)}`}</Text>
      </View>
      <View className="w-4/12  items-center justify-between flex-row">
        <TouchableOpacity
          className="bg-blue-dianne h-14 justify-center items-center w-5/12 rounded-md"
          onPress={async () => {
            await dispatch(getCartItem(item));
            setModalVisible(true);
          }}>
          <Text className="text-gray-50">ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-deep-amethyst h-14 justify-center items-center w-6/12 rounded-md"
          onPress={() => dispatch(addProductToCounter(item))}>
          <Text className="text-gray-50">+1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CounterItemList;

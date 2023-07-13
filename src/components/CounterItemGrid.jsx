import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { addProductToCounter, getCartItem } from "../redux/counterSlice";
import { useDispatch } from "react-redux";

const CounterItemGrid = ({ item, setModalVisible }) => {
  //
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      className="my-2 items-center w-3/12"
      onPress={async () => {
        await dispatch(getCartItem(item));
        setModalVisible(true);
      }}>
      <Image
        source={{ uri: item.product_image.secure_url }}
        style={{ width: 60, height: 60 }}
      />
      <Text numberOfLines={1} ellipsizeMode={"tail"}>
        {item.product_name}
      </Text>
    </TouchableOpacity>
  );
};

export default CounterItemGrid;

import { TouchableOpacity, Text, Image } from "react-native";
import React from "react";
import { getCartItem } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

const OrderItem = ({ item, modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  return (
    <>
      <TouchableOpacity
        className="flex-row items-center bg-deep-amethyst rounded-3xl mr-3 mb-3"
        onPress={async () => {
          await dispatch(getCartItem(item));
          setModalVisible(true);
        }}>
        <Image
          source={{
            uri: item.product_image.secure_url,
          }}
          style={{ width: 50, height: 50, marginLeft: 12 }}
        />
        <Text className="text-base pr-6 text-gray-50">{`x ${item.item_quantity}`}</Text>
      </TouchableOpacity>
    </>
  );
};

export default OrderItem;

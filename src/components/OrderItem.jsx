import { TouchableOpacity, Text, Image } from "react-native";
import React from "react";
import { getCartItem } from "../redux/counterSlice";
import { useDispatch } from "react-redux";

const OrderItem = ({ item, modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  return (
    <>
      <TouchableOpacity
        className="flex-row items-center rounded-3xl mr-3 mb-3 border border-blue-dianne w-20 justify-center"
        onPress={async () => {
          await dispatch(getCartItem(item));
          setModalVisible(true);
        }}>
        <Image
          source={{
            uri: item.product_image.secure_url,
          }}
          style={{ width: 30, height: 30 }}
        />
        <Text className="text-base text-blue-dianne">{`x ${item.item_quantity}`}</Text>
      </TouchableOpacity>
    </>
  );
};

export default OrderItem;

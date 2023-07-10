import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { inputCounterValue } from "../redux/cartSlice";

const CounterModal = (props) => {
  //
  const { modalVisible, setModalVisible, confirmBtnText, cancelBtnText, item } =
    props;

  const { counterItems } = useSelector((state) => state.cart);
  const [itemQuantity, setItemQuantity] = useState("1");

  const itemQty = counterItems
    .filter((cart) => cart._id === item._id)
    .map((item) => item.item_quantity);

  const counterIds = counterItems.map((item) => item._id);
  const onCounter = counterIds.includes(item._id);

  const dispatch = useDispatch();
  const payload = { item, quantity: itemQuantity };

  useEffect(() => {
    setItemQuantity(onCounter ? itemQty.toString() : "1");
  }, [item]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View className="flex-1 items-center justify-center z-10 relative bg-blue-dianne-blur">
        <>
          <View className="h-60 w-80 justify-center bg-gray-50 items-center z-0 absolute opacity-100 rounded-xl px-10">
            <Text>ENTER AMOUNT</Text>
            <Text>{item?.product_name?.toUpperCase()}</Text>
            <View className="w-full flex-row justify-around h-9 items-center mt-3">
              {/* DECREMENT BUTTON */}
              <TouchableOpacity
                onPress={() =>
                  setItemQuantity((parseInt(itemQuantity) - 1).toString())
                }>
                <AntDesign name="minussquareo" size={38} color="#9c8aa4" />
              </TouchableOpacity>

              {/* TEXT INPUT */}
              <TextInput
                value={itemQuantity}
                onChangeText={(text) => {
                  setItemQuantity(text);
                }}
                keyboardType="number-pad"
                className="text-2xl border border-blue-dianne h-8 w-24 text-center rounded-md text-blue-dianne"
              />

              {/* INCREMENT BUTTON */}
              <TouchableOpacity
                onPress={() =>
                  setItemQuantity((parseInt(itemQuantity) + 1).toString())
                }>
                <AntDesign name="plussquareo" size={38} color="#344c57" />
              </TouchableOpacity>
            </View>
            {/* BUTTONS */}
            <View className="flex-row justify-around w-full mt-10">
              <TouchableOpacity
                className="rounded-lg bg-deep-amethyst"
                onPress={() => setModalVisible(false)}>
                <Text className="px-4 py-1 text-gray-50 text-lg font-bold">
                  {cancelBtnText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-lg  bg-blue-dianne"
                onPress={async () => {
                  await dispatch(inputCounterValue(payload));
                  setModalVisible(false);
                }}>
                <Text className="px-4 py-1 text-gray-50 text-lg font-bold">
                  {confirmBtnText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </View>
    </Modal>
  );
};

export default CounterModal;

import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import {
  inputCounterValue,
  removeProductFromCounter,
} from "../redux/cartSlice";

const CounterModal = (props) => {
  //
  const { modalVisible, setModalVisible, confirmBtnText, cancelBtnText, item } =
    props;

  const { counterItems } = useSelector((state) => state.cart);
  const [itemQuantity, setItemQuantity] = useState("1");
  const [disableIncrement, setDisableIncrement] = useState(false);
  const [disableDecrement, setDisableDecrement] = useState(false);

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

  const incrementCounter = () => {
    if (item.product_quantity > itemQuantity) {
      setItemQuantity((parseInt(itemQuantity) + 1).toString());
      setDisableDecrement(false);
    } else {
      setDisableDecrement(false);
      setDisableIncrement(true);
      alert(`STOCK REMAINING: ${item.product_quantity} pcs`);
    }
  };

  const decrementCounter = () => {
    if (itemQuantity > 1) {
      setItemQuantity((parseInt(itemQuantity) - 1).toString());
      setDisableIncrement(false);
    } else {
      setDisableDecrement(true);
      setDisableIncrement(false);
      alert(`MINIMUM PURCHASE OF 1 pc`);
    }
  };

  const inputQty = (text) => {
    if (text > item.product_quantity) {
      alert(`STOCK REMAINING: ${item.product_quantity} pcs`);
      setItemQuantity(item.product_quantity.toString());
    } else if (text === "0") {
      alert(`MINIMUM PURCHASE OF 1 pc`);
      setItemQuantity("1");
    } else {
      setItemQuantity(text);
    }
  };

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
                disabled={disableDecrement}
                onPress={decrementCounter}>
                <AntDesign name="minussquareo" size={38} color="#9c8aa4" />
              </TouchableOpacity>

              {/* TEXT INPUT */}
              <TextInput
                value={itemQuantity}
                onChangeText={(text) => {
                  inputQty(text);
                }}
                keyboardType="number-pad"
                className="text-2xl border border-blue-dianne h-8 w-24 text-center rounded-md text-blue-dianne"
              />

              {/* INCREMENT BUTTON */}
              <TouchableOpacity
                onPress={incrementCounter}
                disabled={disableIncrement}>
                <AntDesign name="plussquareo" size={38} color="#344c57" />
              </TouchableOpacity>
            </View>
            {/* BUTTONS */}
            <View className="flex-row justify-around w-full mt-10">
              <TouchableOpacity
                className="rounded-lg bg-deep-amethyst"
                onPress={async () => {
                  await dispatch(removeProductFromCounter(item));
                  setModalVisible(false);
                }}>
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

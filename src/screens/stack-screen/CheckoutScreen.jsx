import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/CartItem";
import { getPayment, resetCounter } from "../../redux/counterSlice";
import { createTransaction } from "../../redux/transactionSlice";
import { updateProductQty } from "../../redux/productSlice";
import SubmitModal from "../../components/SubmitModal";

const CheckoutScreen = ({ navigation }) => {
  const {
    counterItems,
    paymentAmount,
    paymentChange,
    totalQuantity,
    totalSellingPrice,
    totalOriginalPrice,
    totalProfit,
  } = useSelector((state) => state.counter);

  const { userData } = useSelector((state) => state.user);

  const counterData = {
    transaction_sold_quantity: totalQuantity,
    transaction_sold_amount: totalSellingPrice,
    transaction_cost_amount: totalOriginalPrice,
    transaction_profit_amount: totalProfit,
    transaction_payment_amount: paymentAmount,
    transaction_payment_change: paymentChange,
    transaction_sold_items: counterItems,
  };

  const transactionData = {
    counterData,
    user_id: userData.user_id,
  };

  const updateProductData = {
    user_id: userData.user_id,
    counterItems: counterItems,
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [disableSubmit, setdisableSubmit] = useState(true);
  const { isLoading } = useSelector((state) => state.transaction);

  const handleSubmit = async () => {
    await dispatch(createTransaction(transactionData));
    await dispatch(updateProductQty(updateProductData));
    await dispatch(resetCounter());
    setIsSaved(true);
    setTimeout(() => {
      navigation.navigate("pos");
      setIsSaved(false);
    }, 2000);
  };

  const dispatch = useDispatch();
  return (
    <View className="flex-1">
      <SubmitModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleConfirmAction={handleSubmit}
        confirmationMessage={"SUBMIT TRANSACTION?"}
        confirmBtnText={"CONFIRM"}
        cancelBtnText={"CANCEL"}
        isSaved={isSaved}
        successMessage={"TRANSACTION SUCCESSFULL"}
      />
      <View className="flex-3 px-6">
        <FlatList
          data={counterItems}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <CartItem item={item} />}
        />
      </View>
      <View className="flex-1 flex-row">
        <View className="w-7/12 justify-around">
          <View className="flex-row justify-between px-6">
            <Text className="font-semibold text-base text-blue-dianne">
              ITEMS
            </Text>
            <Text className="font-medium text-base text-blue-dianne">{`${totalQuantity} pcs`}</Text>
          </View>
          <View className="flex-row justify-between px-6">
            <Text className="font-semibold text-base text-blue-dianne">
              TOTAL
            </Text>
            <Text className="font-medium text-base text-blue-dianne">
              {`- $ ${totalSellingPrice?.toFixed(2)}`}
            </Text>
          </View>
          <View className="flex-row justify-between px-6">
            <Text className="font-semibold text-base text-blue-dianne">
              PAYMENT
            </Text>
            <TextInput
              keyboardType="numeric"
              placeholder="0.00"
              onChangeText={(text) => {
                dispatch(getPayment(parseInt(text)));
              }}
              className="border border-blue-dianne w-5/12 text-right font-medium text-base pr-1 text-blue-dianne"
            />
          </View>
          <View className="flex-row justify-between px-6">
            <Text className="font-semibold text-base text-blue-dianne">
              CHANGE
            </Text>
            <Text className="font-medium text-base text-blue-dianne">
              {`$ ${paymentChange?.toFixed(2)}`}
            </Text>
          </View>
        </View>
        <View className="w-5/12 t p-3">
          <TouchableOpacity
            className="bg-blue-dianne h-full w-full items-center justify-center rounded-xl"
            onPress={() => {
              paymentAmount < totalSellingPrice
                ? alert("PLEASE CHECK PAYMENT AMOUNT!")
                : setModalVisible(true);
            }}>
            <Text className="text-gray-50 text-lg tracking-widest font-bold">
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CheckoutScreen;

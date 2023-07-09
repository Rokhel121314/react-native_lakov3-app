import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const ConfirmationModal = (props) => {
  //
  const {
    modalVisible,
    setModalVisible,
    handleConfirmAction,
    confirmationMessage,
    confirmBtnText,
    cancelBtnText,
    isSaved,
    productDetail,
    successMessage,
  } = props;

  const { isSavingProduct } = useSelector((state) => state.product);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View className="flex-1 items-center justify-center z-10 relative bg-blue-dianne-blur">
        {isSavingProduct ? (
          <View className="h-60 w-80 justify-center bg-gray-50 items-center z-0 absolute opacity-100 rounded-xl px-10">
            <ActivityIndicator size={"large"} color={"#344c57"} />
          </View>
        ) : (
          <>
            {!isSaved ? (
              <View className="h-60 w-80 justify-center bg-gray-50 items-center z-0 absolute opacity-100 rounded-xl px-10">
                <Text
                  className="text-blue-dianne text-lg font-bold text-center"
                  numberOfLines={2}>
                  {`${confirmationMessage} ${productDetail?.product_name?.toUpperCase()} ?`}
                </Text>
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
                    onPress={handleConfirmAction}>
                    <Text className="px-4 py-1 text-gray-50 text-lg font-bold">
                      {confirmBtnText}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View className="h-60 w-80 justify-center bg-gray-50 items-center z-0 absolute opacity-100 rounded-xl px-10">
                <Text
                  className="text-blue-dianne text-lg font-bold text-center mb-10"
                  numberOfLines={2}>
                  {` ${productDetail?.product_name.toUpperCase()} ${successMessage}`}
                </Text>
                <AntDesign name="checkcircleo" size={45} color="#344c57" />
              </View>
            )}
          </>
        )}
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

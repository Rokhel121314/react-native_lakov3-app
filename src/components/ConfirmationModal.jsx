import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const ConfirmationModal = (props) => {
  //
  const {
    modalVisible,
    setModalVisible,
    handleConfirmAction,
    confirmationMessage,
    confirmBtnText,
    cancelBtnText,
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
          <View className="h-60 w-80 justify-center bg-gray-50 items-center z-0 absolute opacity-100 rounded-xl px-10">
            <Text
              className="text-blue-dianne text-lg font-bold text-center"
              numberOfLines={2}>
              {confirmationMessage}
            </Text>
            <View className="flex-row justify-around w-full mt-10">
              <TouchableOpacity
                className="rounded-lg border border-blue-dianne"
                onPress={() => setModalVisible(false)}>
                <Text className="px-4 py-1 text-blue-dianne text-lg font-bold">
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
        )}
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

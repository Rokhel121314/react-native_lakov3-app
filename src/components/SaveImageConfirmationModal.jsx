import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const SaveImageConfirmationModal = (props) => {
  //
  const {
    modalVisible,
    setModalVisible,
    handleConfirmAction,
    confirmationMessage,
    confirmBtnText,
    cancelBtnText,
    isSaved,
    setIsSaved,
    successMessage,
  } = props;

  const [saving, setSaving] = useState(false);

  const saveLoading = async () => {
    await setSaving(true);
    setTimeout(async () => {
      await setSaving(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        setModalVisible(false);
      }, 1000);
    }, 1000);
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
        {saving ? (
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
                  {`${confirmationMessage}`}
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
                    onPress={() => {
                      saveLoading();
                      handleConfirmAction();
                    }}>
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
                  {`${successMessage}`}
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

export default SaveImageConfirmationModal;

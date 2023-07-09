import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import SoldItem from "../../components/SoldItem";
import ViewShot from "react-native-view-shot";
import SaveImageConfirmationModal from "../../components/SaveImageConfirmationModal";
import useReceipt from "../../hooks/useReceipt";

const ViewTransactionScreen = ({ navigation }) => {
  const route = useRoute();
  const [photo, setPhoto] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const viewRef = useRef();
  const { userData } = useSelector((state) => state.user);
  const { saveImage, shareImage, reqMediaLibrabryPermission } = useReceipt();

  const { item } = route.params;

  const soldItems = item.transaction_sold_items;

  const onCapture = useCallback((uri) => {
    setPhoto(uri);
  }, []);

  useEffect(() => {
    reqMediaLibrabryPermission();
  }, []);

  return (
    <>
      <SaveImageConfirmationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleConfirmAction={() => saveImage(photo)}
        confirmationMessage={"SAVE RECEIPT TO YOUR DEVICE?"}
        confirmBtnText={"CONFIRM"}
        cancelBtnText={"CANCEL"}
        isSaved={isSaved}
        setIsSaved={setIsSaved}
        productDetail={""}
        successMessage={"SAVED SUCCESSFULLY!"}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ViewShot
          className="bg-gray-100 px-5"
          onCapture={onCapture}
          captureMode="mount"
          ref={viewRef}
          options={{
            fileName: "lako-receipt",
            format: "png",
            quality: 0.9,
          }}>
          <View className="flex-auto items-center">
            <View className=" items-center justify-center">
              <Image
                source={{ uri: userData.store_logo }}
                resizeMode="contain"
                style={{ width: 75, height: 75 }}
              />
              <Text className="font-bold text-xl">{userData.store_name}</Text>
            </View>
            <Text>ADDRESS</Text>
            <Text>CONTACT NUMBER</Text>
            <Text>{`Transaction #: ${item._id}`}</Text>
            <Text>{`Date: ${item.createdAt}`}</Text>
          </View>
          <View className="flex-auto">
            <View className="flex-row justify-between border-b border-blue-dianne mt-10 px-5">
              <Text className="font-bold text-xl">Description</Text>
              <Text className="font-bold text-xl">Total</Text>
            </View>
            <View className="border-b border-blue-dianne">
              {soldItems.map((items) => {
                return <SoldItem items={items} key={items._id} />;
              })}
            </View>
          </View>
          <View className="flex-auto mb-5">
            <View className="justify-between items-center px-5 flex-row">
              <Text className="text-gray-950 text-lg font-semibold">Items</Text>
              <Text className="text-gray-950 text-lg font-semibold">
                {`${item.transaction_sold_quantity.toFixed(2)} pcs`}
              </Text>
            </View>
            <View className="justify-between items-center px-5 flex-row">
              <Text className="text-gray-950 text-lg font-semibold">Total</Text>
              <Text className="text-gray-950 text-lg font-semibold">
                {`-$ ${item.transaction_sold_amount.toFixed(2)}`}
              </Text>
            </View>
            <View className="justify-between items-center px-5 flex-row">
              <Text className="text-gray-950 text-lg font-semibold">
                Payment
              </Text>
              <Text className="text-gray-950 text-lg font-semibold">
                {`$ ${item.transaction_payment_amount.toFixed(2)}`}
              </Text>
            </View>
            <View className="justify-between items-center px-5 flex-row ">
              <Text className="text-gray-950 text-lg font-semibold">
                Payment Change
              </Text>
              <Text className="text-gray-950 text-lg font-semibold">
                {`$ ${item.transaction_payment_change.toFixed(2)}`}
              </Text>
            </View>
          </View>
        </ViewShot>
        <View className="flex-1 px-5 mt-5 mb-5 ">
          <TouchableOpacity
            className="bg-deep-amethyst items-center "
            onPress={() => setModalVisible(true)}>
            <Text className="py-3 text-gray-50 text-base font-bold tracking-widest">
              STORE RECEIPT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-dianne items-center mt-3"
            onPress={() => shareImage(photo)}>
            <Text className="py-3 text-gray-100 text-base font-bold tracking-widest">
              SHARE RECEIPT
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default ViewTransactionScreen;

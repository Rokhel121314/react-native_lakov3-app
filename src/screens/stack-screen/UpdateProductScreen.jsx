import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EditPropertyValueItem from "../../components/EditPropertyValueItem";
import useUpdateProduct from "../../hooks/useUpdateProduct";
import ConfirmationModal from "../../components/ConfirmationModal";

const UpdateProductScreen = ({ navigation }) => {
  const {
    handleUpdateProduct,
    focus,
    blur,
    editing,
    textInputStyle,
    newFormData,
    productDetail,
    isSavingProduct,
    productImageChange,
    handleInputChange,
  } = useUpdateProduct();

  const [modalVisible, setModalVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <>
      {/* CONFIRMATION MODAL BEFORE SAVING CHANGES */}
      <ConfirmationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleConfirmAction={() => handleUpdateProduct(setIsSaved)}
        confirmationMessage={"Do you want to save changes on"}
        confirmBtnText={"CONFIRM"}
        cancelBtnText={"CANCEL"}
        isSaved={isSaved}
        productDetail={productDetail}
        successMessage={"IS UPDATED SUCCESSFULLY!"}
      />

      {/* MAIN CONTAINER */}
      <KeyboardAvoidingView className="flex-1 px-8">
        {/* PRODUCT DETAILS */}
        <View className="flex-1">
          {/* PRODUCT NAME */}
          <View className="flex-2 justify-center">
            <View className="flex-row">
              <TextInput
                value={newFormData.product_name}
                className={textInputStyle}
                onBlur={blur}
                onFocus={focus}
                onChangeText={(text) => handleInputChange("product_name", text)}
              />
              {editing ? null : (
                <Pressable onPress={focus}>
                  <Feather name="edit" size={16} color="gray" />
                </Pressable>
              )}
            </View>

            <Text className="text-sm text-gray-500">{`ID: ${productDetail._id}`}</Text>
            <Text className="text-sm text-gray-500">{`STOCK: ${newFormData.product_quantity}`}</Text>
          </View>

          {/* PRODUCT IMAGE */}
          {!newFormData.product_image.secure_url ? (
            <View className="flex-3 items-center justify-center">
              <View className="h-[190px] w-[190px] relative">
                <Pressable
                  className="absolute z-10 right-2 top-2 p-1 bg-gray-500 rounded-md shadow-lg"
                  onPress={productImageChange}>
                  <MaterialCommunityIcons
                    name="image-edit-outline"
                    size={20}
                    color="#fff"
                  />
                </Pressable>
                <Image
                  source={{ uri: newFormData.product_image }}
                  width={190}
                  height={190}
                  resizeMode="contain"
                />
              </View>
            </View>
          ) : (
            <View className="flex-3 items-center justify-center">
              <View className="h-[190px] w-[190px] relative">
                <Pressable
                  className="absolute z-10 right-2 top-2 p-1 bg-gray-500 rounded-md shadow-lg"
                  onPress={productImageChange}>
                  <MaterialCommunityIcons
                    name="image-edit-outline"
                    size={20}
                    color="#fff"
                  />
                </Pressable>
                <Image
                  source={{ uri: productDetail.product_image.secure_url }}
                  width={190}
                  height={190}
                  resizeMode="contain"
                />
              </View>
            </View>
          )}

          {/* DETAILS */}
          <View className="flex-3 flex-row px-5">
            <View className="flex-1  justify-around items-start">
              <EditPropertyValueItem
                description={"ORIGINAL PRICE"}
                textStyle1={"text-sm text-gray-500 font-bold"}
                textStyle2={"text-xl text-gray-950 font-bold mr-2"}
                viewStyle={"w-9/12"}
                prefixUnit={"$ "}
                suffixUnit={null}
                numberOfLines={1}
                value={newFormData.original_price.toString()}
                property={"original_price"}
                handleInputChange={handleInputChange}
                formData={newFormData}
                inputMode={"numeric"}
              />

              <EditPropertyValueItem
                description={"QUANTITY"}
                textStyle1={"text-sm text-gray-500 font-bold"}
                textStyle2={"text-xl text-gray-950 font-bold mr-2"}
                viewStyle={"w-9/12"}
                prefixUnit={null}
                suffixUnit={" pcs"}
                numberOfLines={1}
                value={newFormData.product_quantity.toString()}
                property={"product_quantity"}
                handleInputChange={handleInputChange}
                formData={newFormData}
                inputMode={"numeric"}
              />
            </View>

            <View className="flex-1  justify-around items-end">
              <EditPropertyValueItem
                description={"SELLING PRICE"}
                textStyle1={"text-sm text-gray-500 font-bold"}
                textStyle2={"text-xl text-gray-950 font-bold mr-2"}
                viewStyle={"w-9/12"}
                prefixUnit={"$ "}
                suffixUnit={null}
                numberOfLines={1}
                value={newFormData.selling_price?.toString()}
                property={"selling_price"}
                handleInputChange={handleInputChange}
                formData={newFormData}
                inputMode={"numeric"}
              />
              <EditPropertyValueItem
                description={"TYPE"}
                textStyle1={"text-sm text-gray-500 font-bold"}
                textStyle2={"text-xl text-gray-950 font-bold mr-2"}
                viewStyle={"w-9/12"}
                prefixUnit={null}
                suffixUnit={null}
                numberOfLines={2}
                value={newFormData.product_type}
                handleInputChange={handleInputChange}
                property={"product_type"}
                formData={newFormData}
                inputMode={"text"}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          disabled={isSavingProduct ? true : false}
          onPress={() => setModalVisible(true)}
          className="mb-5 items-center bg-blue-dianne">
          <Text className="py-3 text-gray-50 font-bold text-md">
            SAVE CHANGES
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default UpdateProductScreen;

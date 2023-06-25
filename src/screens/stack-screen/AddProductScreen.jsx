import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAddProduct from "../../hooks/useAddProduct";
import AddPropertyValueItem from "../../components/AddPropertyValueItem";
import ConfirmationModal from "../../components/ConfirmationModal";
import { checkInputs } from "../../utils/checkInput";

const AddProductScreen = ({ navigation }) => {
  //
  const { handleInputChange, addProductImage, newFormData, handleAddProduct } =
    useAddProduct();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ConfirmationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleConfirmAction={handleAddProduct}
        confirmationMessage={"Do you want to add this product"}
        confirmBtnText={"CONFIRM"}
        cancelBtnText={"CANCEL"}
      />
      <KeyboardAvoidingView className="flex-1 px-8 relative">
        {/* PRODUCT DETAILS */}
        <View className="flex-1">
          {/* HEADER */}
          <View className="flex-2 justify-center">
            <View className="flex-row">
              <TextInput
                placeholder="Product name"
                className="text-4xl font-bold  w-full bg-gray-200 rounded-md border border-gray-400"
                onChangeText={(text) => handleInputChange("product_name", text)}
              />
            </View>

            <Text className="text-sm text-gray-500">{`ID: xxxxxxxxxxxxxxxx`}</Text>
            <Text className="text-sm text-gray-500">{`STOCK: ${newFormData.product_quantity}`}</Text>
          </View>

          {/* IMAGE */}
          {!newFormData.product_image ? (
            <TouchableOpacity
              className="flex-3 items-center justify-center"
              onPress={addProductImage}>
              <MaterialCommunityIcons
                name="image-edit-outline"
                size={20}
                color="gray"
                style={{
                  position: "absolute",
                  top: 30,
                  left: "70%",
                  zIndex: 1,
                }}
              />
              <Image
                source={{
                  uri: "https://res.cloudinary.com/jerickwebdev/image/upload/v1679018249/default_product_iq3rlk.png",
                }}
                width={200}
                height={200}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="flex-3 items-center justify-center relative"
              onPress={addProductImage}>
              <MaterialCommunityIcons
                name="image-edit-outline"
                size={20}
                color="gray"
                style={{
                  position: "absolute",
                  top: 30,
                  left: "70%",
                  zIndex: 1,
                }}
              />
              <Image
                source={{ uri: newFormData.product_image }}
                width={200}
                height={200}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}

          {/* DETAILS */}
          <View className="flex-3 flex-row px-5">
            <View className="flex-1  justify-around items-start">
              <AddPropertyValueItem
                description={"ORIGINAL PRICE"}
                textStyle1={"text-sm text-gray-500 font-bold"}
                textStyle2={"text-xl text-gray-950 font-bold mr-2"}
                viewStyle={"w-9/12"}
                prefixUnit={null}
                suffixUnit={null}
                numberOfLines={1}
                value={newFormData.original_price.toString()}
                property={"original_price"}
                handleInputChange={handleInputChange}
                formData={newFormData}
                inputMode={"numeric"}
                iconEnabled={false}
              />

              <AddPropertyValueItem
                description={"QUANTITY"}
                textStyle1={"text-sm text-gray-500 font-bold"}
                textStyle2={"text-xl text-gray-950 font-bold mr-2"}
                viewStyle={"w-9/12"}
                prefixUnit={null}
                suffixUnit={null}
                numberOfLines={1}
                value={newFormData.product_quantity.toString()}
                property={"product_quantity"}
                handleInputChange={handleInputChange}
                formData={newFormData}
                inputMode={"numeric"}
                iconEnabled={false}
              />
            </View>

            <View className="flex-1  justify-around items-end">
              <AddPropertyValueItem
                description={"SELLING PRICE"}
                textStyle1={"text-sm text-gray-500 font-bold"}
                textStyle2={"text-xl text-gray-950 font-bold mr-2"}
                viewStyle={"w-9/12"}
                prefixUnit={null}
                suffixUnit={null}
                numberOfLines={1}
                value={newFormData.selling_price?.toString()}
                property={"selling_price"}
                handleInputChange={handleInputChange}
                formData={newFormData}
                inputMode={"numeric"}
                iconEnabled={false}
              />
              <AddPropertyValueItem
                description={"TYPE"}
                textStyle1={"text-sm text-gray-500 font-bold"}
                textStyle2={"text-xl text-gray-950 font-bold mr-2"}
                viewStyle={"w-9/12"}
                prefixUnit={null}
                suffixUnit={null}
                numberOfLines={2}
                value={newFormData.product_type}
                property={"product_type"}
                handleInputChange={handleInputChange}
                formData={newFormData}
                inputMode={"text"}
                iconEnabled={false}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="mb-10 items-center bg-blue-dianne"
          onPress={() => checkInputs(newFormData, setModalVisible)}>
          <Text className="py-3 text-gray-50 font-bold text-md">
            ADD PRODUCT
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddProductScreen;

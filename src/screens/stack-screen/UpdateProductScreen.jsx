import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EditPropertyValueItem from "../../components/EditPropertyValueItem";
import useUpdateProduct from "../../hooks/useUpdateProduct";

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

  return (
    <KeyboardAvoidingView className="flex-1 px-8">
      {/* PRODUCT DETAILS */}
      <View className="flex-1">
        {/* HEADER */}
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

        {/* IMAGE */}
        {!newFormData.product_image.secure_url ? (
          <TouchableOpacity
            className="flex-3 items-center justify-center"
            onPress={productImageChange}>
            <MaterialCommunityIcons
              name="image-edit-outline"
              size={20}
              color="gray"
              style={{ position: "absolute", top: 30, left: "70%", zIndex: 1 }}
            />
            <Image
              source={{ uri: newFormData.product_image }}
              width={200}
              height={200}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="flex-3 items-center justify-center relative"
            onPress={productImageChange}>
            <MaterialCommunityIcons
              name="image-edit-outline"
              size={20}
              color="gray"
              style={{ position: "absolute", top: 30, left: "70%", zIndex: 1 }}
            />
            <Image
              source={{ uri: productDetail.product_image.secure_url }}
              width={200}
              height={200}
              resizeMode="contain"
            />
          </TouchableOpacity>
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
        className="mb-10 items-center bg-blue-dianne"
        onPress={handleUpdateProduct}>
        <Text className="py-3 text-gray-50 font-bold text-md">
          {isSavingProduct ? "UPDATING..." : "SAVE CHANGES"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default UpdateProductScreen;

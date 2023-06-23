import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import EditPropertyValueItem from "../../components/EditPropertyValueItem";
import useUpdateProduct from "../../hooks/useUpdateProduct";

const UpdateProductScreen = ({ navigation }) => {
  const {
    handleUpdateProduct,
    productTypeChange,
    productQuantityChange,
    sellingPriceChange,
    originalPriceChange,
    productNameChange,
    focus,
    blur,
    editing,
    textInputStyle,
    newFormData,
    productDetail,
    isSavingProduct,
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
              onChangeText={productNameChange}
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
        <View className="flex-3 items-center justify-center">
          <Image
            source={{ uri: productDetail.product_image.secure_url }}
            width={200}
            height={200}
            resizeMode="contain"
          />
        </View>

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
              setNewFormData={originalPriceChange}
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
              setNewFormData={productQuantityChange}
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
              setNewFormData={sellingPriceChange}
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
              setNewFormData={productTypeChange}
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

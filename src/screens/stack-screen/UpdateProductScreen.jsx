import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import PropertyValueItem from "../../components/PropertyValueItem";
import { Feather } from "@expo/vector-icons";
import EditPropertyValueItem from "../../components/EditPropertyValueItem";

const UpdateProductScreen = () => {
  const route = useRoute();
  const { item } = route.params;

  const productName =
    item.product_name.charAt(0).toUpperCase() + item.product_name.slice(1);
  const [newFormData, setNewFormData] = useState({
    product_name: productName,
    product_image: item.product_image.secure_url,
    original_price: item.original_price,
    selling_price: item.selling_price,
    product_quantity: item.product_quantity,
    product_type: item.product_type,
  });

  const onFocusStyle =
    "text-4xl font-bold  w-full bg-gray-200 rounded-md border border-gray-400";
  const onBlurStyle = "text-4xl font-bold bg-gray-100 mr-2";
  const [editing, setEditing] = useState(false);
  const [textInputStyle, setTextInputStyle] = useState(onBlurStyle);

  const blur = () => {
    setTextInputStyle(onBlurStyle);
    setEditing(false);
  };

  const focus = () => {
    setTextInputStyle(onFocusStyle);
    setEditing(true);
  };

  const productNameChange = (text) => {
    setNewFormData({ ...newFormData, product_name: text });
  };

  const originalPriceChange = (text) => {
    setNewFormData({ ...newFormData, original_price: text });
  };

  const sellingPriceChange = (text) => {
    setNewFormData({ ...newFormData, selling_price: text });
  };

  const productQuantityChange = (text) => {
    setNewFormData({ ...newFormData, product_quantity: text });
  };

  const productTypeChange = (text) => {
    setNewFormData({ ...newFormData, product_type: text });
  };

  console.log("newFormData", newFormData);
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

          <Text className="text-sm text-gray-500">{`ID: ${item._id}`}</Text>
          <Text className="text-sm text-gray-500">{`STOCK: ${newFormData.product_quantity}`}</Text>
        </View>

        {/* IMAGE */}
        <View className="flex-3 items-center justify-center">
          <Image
            source={{ uri: item.product_image.secure_url }}
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
      <TouchableOpacity className="mb-10 items-center bg-blue-dianne">
        <Text className="py-3 text-gray-50 font-bold text-md">
          SAVE CHANGES
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default UpdateProductScreen;

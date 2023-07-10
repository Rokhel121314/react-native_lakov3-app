import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import PropertyValueItem from "../../components/PropertyValueItem";
import PropertyValuePercentItem from "../../components/PropertyValuePercentItem";
import { useSelector } from "react-redux";

const ViewProductScreen = () => {
  const { productDetail } = useSelector((state) => state.product);

  const productName =
    productDetail.product_name.charAt(0).toUpperCase() +
    productDetail.product_name.slice(1);
  return (
    <View className="flex-1 px-8">
      {/* PRODUCT DETAILS */}
      <View className="flex-4">
        {/* HEADER */}
        <View className="flex-2 justify-center">
          <Text className="text-4xl font-bold">{productName}</Text>
          <Text className="text-sm text-gray-500">{`ID: ${productDetail._id}`}</Text>
          <Text className="text-sm text-gray-500">{`STOCK: ${productDetail.product_quantity}`}</Text>
        </View>

        {/* IMAGE */}
        <View className="flex-4 items-center justify-center">
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
            <PropertyValueItem
              description={"ORIGINAL PRICE"}
              textStyle1={"text-sm text-gray-500 font-bold"}
              textStyle2={"text-xl text-gray-950 font-bold"}
              viewStyle={null}
              value={productDetail.original_price.toFixed(2)}
              prefixUnit={"$"}
              suffixUnit={null}
              numberOfLines={1}
            />
            <PropertyValueItem
              description={"QUANTITY"}
              textStyle1={"text-sm text-gray-500 font-bold"}
              textStyle2={"text-xl text-gray-950 font-bold"}
              viewStyle={null}
              value={productDetail.product_quantity.toFixed(2)}
              prefixUnit={null}
              suffixUnit={"pcs"}
              numberOfLines={1}
            />
          </View>

          <View className="flex-1  justify-around items-end">
            <PropertyValueItem
              description={"SELLING PRICE"}
              viewStyle={"w-9/12"}
              textStyle1={"text-sm text-gray-500 font-bold"}
              textStyle2={"text-xl text-gray-950 font-bold"}
              value={productDetail.selling_price.toFixed(2)}
              prefixUnit={"$"}
              suffixUnit={null}
              numberOfLines={1}
            />
            <PropertyValueItem
              description={"TYPE"}
              viewStyle={"w-9/12"}
              textStyle1={"text-sm text-gray-500 font-bold"}
              textStyle2={"text-xl text-gray-950 font-bold"}
              value={productDetail.product_type}
              prefixUnit={null}
              suffixUnit={null}
              numberOfLines={1}
            />
          </View>
        </View>
        {/* END OF PRODUCT DETAIL */}
      </View>

      {/* SALES DETAILS */}
      <View className="flex-2  flex-row mb-10 px-5">
        <View className="flex-1  justify-around items-start">
          <PropertyValuePercentItem
            viewStyle1={null}
            viewStyle2={"items-start"}
            textStyle1={"text-sm text-gray-500 font-bold"}
            textStyle2={"text-xl text-gray-950 font-bold"}
            textStyle3={
              "bg-blue-dianne text-gray-50 px-2 py-1 rounded-3xl text-xs"
            }
            description={"GROSS SALES"}
            prefixUnit={"$"}
            suffixUnit={null}
            value={productDetail.original_price.toFixed(2)}
            percentValue={`${1.56} %`}
          />

          <PropertyValuePercentItem
            viewStyle1={null}
            viewStyle2={"items-start"}
            textStyle1={"text-sm text-gray-500 font-bold"}
            textStyle2={"text-xl text-gray-950 font-bold"}
            textStyle3={
              "bg-blue-dianne text-gray-50 px-2 py-1 rounded-3xl text-xs"
            }
            description={"NET SALES"}
            prefixUnit={"$"}
            suffixUnit={null}
            value={productDetail.selling_price.toFixed(2)}
            percentValue={`${1.56} %`}
          />
        </View>

        <View className="flex-1  justify-around items-end">
          <PropertyValuePercentItem
            viewStyle1={"w-9/12"}
            viewStyle2={"items-start"}
            textStyle1={"text-sm text-gray-500 font-bold"}
            textStyle2={"text-xl text-gray-950 font-bold"}
            textStyle3={
              "bg-blue-dianne text-gray-50 px-2 py-1 rounded-3xl text-xs"
            }
            description={"SOLD"}
            prefixUnit={null}
            suffixUnit={"pcs"}
            value={productDetail.selling_price.toFixed(2)}
            percentValue={`${1.56} %`}
          />

          <PropertyValuePercentItem
            viewStyle1={"w-9/12"}
            viewStyle2={"items-start"}
            textStyle1={"text-sm text-gray-500 font-bold"}
            textStyle2={"text-xl text-gray-950 font-bold"}
            textStyle3={
              "bg-blue-dianne text-gray-50 px-2 py-1 rounded-3xl text-xs"
            }
            description={"SOLD"}
            prefixUnit={null}
            suffixUnit={"pcs"}
            value={productDetail.selling_price.toFixed(2)}
            percentValue={`${1.56} %`}
          />
        </View>
      </View>
    </View>
  );
};

export default ViewProductScreen;

const styles = StyleSheet.create({});

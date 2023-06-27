import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import SoldItem from "../../components/SoldItem";

const ViewTransactionScreen = ({ navigation }) => {
  const route = useRoute();
  const { userData } = useSelector((state) => state.user);

  const { item } = route.params;

  const soldItems = item.transaction_sold_items;
  console.log("soldItems", item);

  return (
    <ScrollView
      className="bg-gray-100 px-5"
      showsVerticalScrollIndicator={false}>
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
            return <SoldItem items={items} />;
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
          <Text className="text-gray-950 text-lg font-semibold">Payment</Text>
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
      <View className="flex-1 px-5 mt-5 mb-5">
        <TouchableOpacity className="bg-blue-dianne items-center">
          <Text className="py-3 text-gray-100 text-base font-bold tracking-widest">
            PRINT
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ViewTransactionScreen;

const styles = StyleSheet.create({});

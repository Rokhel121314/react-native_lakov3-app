import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import React from "react";

const TransactionItem = ({ index, item, length, navigation }) => {
  const transactionDate = moment(item.createdAt).format("MM/DD/yyyy");

  const listNumber = 1 + index++;

  const even = index % 2 === 0;

  const oddStyle = "flex-row justify-around w-full px-2 py-5";

  const evenStyle = "flex-row justify-around w-full  px-2 py-5 bg-gray-300";
  return (
    <TouchableOpacity
      className={!even ? evenStyle : oddStyle}
      onPress={() => navigation.navigate("view-transaction", { item: item })}>
      <View className="w-1/12 justify-center items-center">
        <Text className="text-md text-blue-dianne font-semibold">
          {listNumber}
        </Text>
      </View>
      <View className="w-4/12 justify-center items-center px-4">
        <Text
          className="text-md text-blue-dianne font-semibold"
          numberOfLines={1}>
          {item._id}.
        </Text>
      </View>
      <View className="w-1/12 justify-center items-center">
        <Text className="text-md text-blue-dianne font-semibold">
          {item.transaction_sold_quantity}
        </Text>
      </View>
      <View className="w-3/12 justify-center items-center">
        <Text className="text-md text-blue-dianne font-semibold">{`$ ${item.transaction_sold_amount.toFixed(
          2
        )}`}</Text>
      </View>
      <View className="w-3/12 justify-center items-center">
        <Text className="text-md text-blue-dianne font-semibold">
          {transactionDate}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

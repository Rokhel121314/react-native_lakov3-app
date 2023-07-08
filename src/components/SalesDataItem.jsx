import { View, Text } from "react-native";
import React from "react";

const SalesDataItem = ({
  containerStyle,
  textStyle1,
  textStyle2,
  salesValue,
  salesProperty,
  prefix,
  suffix,
}) => {
  return (
    <View className={containerStyle}>
      <Text className={textStyle2}>{salesProperty}</Text>
      <Text className={textStyle1}>{`${prefix ? prefix : ""}${salesValue} ${
        suffix ? suffix : ""
      }`}</Text>
    </View>
  );
};

export default SalesDataItem;

import { View, Text } from "react-native";
import React from "react";

const PropertyValuePercentItem = ({
  viewStyle1,
  viewStyle2,
  textStyle1,
  textStyle2,
  textStyle3,
  description,
  prefixUnit,
  suffixUnit,
  value,
  percentValue,
}) => {
  return (
    <View className={viewStyle1}>
      <Text className={textStyle1}>{description}</Text>
      <Text className={textStyle2}>{`${
        !prefixUnit ? "" : prefixUnit
      } ${value} ${!suffixUnit ? "" : suffixUnit}`}</Text>
      <View className={viewStyle2}>
        <Text className={textStyle3}>{percentValue}</Text>
      </View>
    </View>
  );
};

export default PropertyValuePercentItem;

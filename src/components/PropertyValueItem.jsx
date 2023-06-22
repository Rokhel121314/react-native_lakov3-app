import { View, Text } from "react-native";
import React from "react";

const PropertyValueItem = ({
  description,
  textStyle1,
  textStyle2,
  viewStyle,
  value,
  prefixUnit,
  suffixUnit,
  numberOfLines,
}) => {
  return (
    <View className={viewStyle}>
      <Text className={textStyle1}>{description}</Text>
      <Text className={textStyle2} numberOfLines={numberOfLines}>{`${
        !prefixUnit ? "" : prefixUnit
      } ${value} ${!suffixUnit ? "" : suffixUnit}`}</Text>
    </View>
  );
};

export default PropertyValueItem;

import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";

const AddPropertyValueItem = ({
  description,
  textStyle1,
  textStyle2,
  viewStyle,
  inputMode,
  prefixUnit,
  suffixUnit,
  property,
  handleInputChange,
  formData,
}) => {
  const [editing, setEditing] = useState(false);
  const focusStyle =
    "text-xl text-gray-950 font-bold mr-2 bg-gray-200 rounded-md border border-gray-400 w-full text-center";
  const blurStyle =
    "text-xl text-gray-950 font-bold mr-2 bg-gray-200 rounded-md border border-gray-400 w-full text-center";
  return (
    <View className={viewStyle}>
      <Text className={textStyle1}>{description}</Text>
      <View className="flex-row">
        {prefixUnit && !editing ? (
          <Text className={textStyle2}>{prefixUnit}</Text>
        ) : null}
        <TextInput
          value={formData[property]}
          className={editing ? focusStyle : blurStyle}
          onChangeText={(text) => handleInputChange(property, text)}
          onFocus={() => setEditing(true)}
          onBlur={() => setEditing(false)}
          cursorColor={"#344c57"}
          inputMode={inputMode}
        />
        {suffixUnit && !editing ? (
          <Text className={textStyle2}>{suffixUnit}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default AddPropertyValueItem;

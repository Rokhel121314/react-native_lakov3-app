import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

const EditPropertyValueItem = ({
  description,
  textStyle1,
  textStyle2,
  viewStyle,
  value,
  inputMode,
  setNewFormData,
  prefixUnit,
  suffixUnit,
}) => {
  const [editing, setEditing] = useState(false);
  const focusStyle =
    "text-xl text-gray-950 font-bold mr-2 bg-gray-200 rounded-md border border-gray-400 w-full text-center";
  const blurStyle = "text-xl text-gray-950 font-bold mr-2";
  return (
    <View className={viewStyle}>
      <Text className={textStyle1}>{description}</Text>
      <View className="flex-row">
        {prefixUnit && !editing ? (
          <Text className={textStyle2}>{prefixUnit}</Text>
        ) : null}
        <TextInput
          value={value}
          className={editing ? focusStyle : blurStyle}
          onChangeText={setNewFormData}
          onFocus={() => setEditing(true)}
          onBlur={() => setEditing(false)}
          cursorColor={"#344c57"}
          inputMode={inputMode}
        />
        {suffixUnit && !editing ? (
          <Text className={textStyle2}>{suffixUnit}</Text>
        ) : null}
        {editing ? null : (
          <Pressable onPress={() => setEditing(true)}>
            <Feather name="edit" size={16} color="gray" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default EditPropertyValueItem;

import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const SearchFilter = ({
  placeHolder,
  addButton,
  searchFilter,
  iconName,
  buttonFunction,
  containerStyle,
  textStyle,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View className={containerStyle}>
      <TextInput
        placeholder={placeHolder}
        className={textStyle}
        onChangeText={(text) => {
          dispatch(searchFilter(text));
        }}
      />
      {!addButton ? null : (
        <TouchableOpacity
          className="bg-blue-dianne rounded-3xl p-2"
          onPress={buttonFunction}>
          <Entypo name={iconName} size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchFilter;

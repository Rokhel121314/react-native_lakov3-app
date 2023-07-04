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
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View className="bg-gray-50 h-16 flex-row items-center justify-between px-5">
      <TextInput
        placeholder={placeHolder}
        className=" bg-gray-50 text-gray-800 py-1  pl-3 border border-blue-dianne rounded-3xl w-10/12 text-md"
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

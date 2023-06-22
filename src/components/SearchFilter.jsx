import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React from "react";
import { searchFilter } from "../redux/productSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const SearchFilter = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View className="bg-gray-50 h-16 flex-row items-center justify-between px-5">
      <TextInput
        placeholder="SEARCH PRODUCT HERE..."
        className=" bg-gray-50 text-gray-800 py-1  pl-3 border border-blue-dianne rounded-3xl w-10/12 text-md"
        onChangeText={(text) => {
          dispatch(searchFilter(text));
        }}
      />
      <TouchableOpacity
        className="bg-blue-dianne rounded-3xl"
        onPress={() => navigation.navigate("add-product")}>
        <Text className="text-gray-100 px-3 py-2">ADD</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchFilter;

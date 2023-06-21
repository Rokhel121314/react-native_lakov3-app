import { View, TextInput } from "react-native";
import React from "react";
import { searchFilter } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const SearchFilter = () => {
  const dispatch = useDispatch();
  return (
    <View className="bg-gray-50 h-16 flex-row items-center justify-between px-5">
      <TextInput
        placeholder="SEARCH PRODUCT HERE..."
        className=" bg-gray-50 text-gray-800 py-1  pl-3 border border-blue-dianne rounded-3xl w-full text-md"
        onChangeText={(text) => {
          dispatch(searchFilter(text));
        }}
      />
    </View>
  );
};

export default SearchFilter;

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { typeFilter } from "../redux/productSlice";

const FilterButton = ({ navigation }) => {
  const { allProductData } = useSelector((state) => state.product);
  //
  const productTypes = allProductData?.map((product) => product.product_type);
  const filterOptions = ["all", ...new Set(productTypes)];
  const [type, setType] = useState("all");

  return (
    <View className="bg-gray-50 h-10 flex-row items-center justify-between px-3 border-b border-gray-300">
      <FlatList
        data={filterOptions}
        renderItem={({ item }) => (
          <Filters item={item} type={type} setType={setType} />
        )}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Filters = ({ item, type, setType }) => {
  //
  const dispatch = useDispatch();
  const activeFilter =
    "border border-blue-dianne mx-2 rounded-3xl  bg-blue-dianne";
  const inactiveFilter = "border border-blue-dianne mx-2 rounded-3xl";

  return (
    <TouchableOpacity
      className={item === type ? activeFilter : inactiveFilter}
      onPress={() => {
        dispatch(typeFilter(item));
        setType(item);
      }}>
      <Text
        className={
          item !== type
            ? "text-blue-dianne px-4 py-1"
            : "text-gray-50 px-4 py-1"
        }>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterButton;

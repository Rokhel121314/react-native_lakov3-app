import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FilterButton = ({ navigation, containerStyle, filterFunction }) => {
  const { allProductData } = useSelector((state) => state.product);
  //
  const productTypes = allProductData?.map((product) => product.product_type);
  const filterOptions = ["all", ...new Set(productTypes)];
  const [type, setType] = useState("all");

  return (
    <View className={containerStyle}>
      <FlatList
        data={filterOptions}
        renderItem={({ item }) => (
          <Filters
            item={item}
            type={type}
            setType={setType}
            filterFunction={filterFunction}
          />
        )}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Filters = ({ item, type, setType, filterFunction }) => {
  //
  const dispatch = useDispatch();
  const activeFilter =
    "border border-blue-dianne mx-2 rounded-3xl  bg-blue-dianne";
  const inactiveFilter = "border border-blue-dianne mx-2 rounded-3xl";

  return (
    <TouchableOpacity
      className={item === type ? activeFilter : inactiveFilter}
      onPress={() => {
        dispatch(filterFunction(item));
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

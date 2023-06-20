import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const Filters = ({ item }) => {
  return (
    <TouchableOpacity className="border border-blue-dianne mx-2 rounded-3xl">
      <Text className="text-blue-dianne px-4 py-1">{item}</Text>
    </TouchableOpacity>
  );
};

const FilterButton = () => {
  const { filteredProductData } = useSelector((state) => state.product);
  //
  const productTypes = filteredProductData.map(
    (product) => product.product_type
  );

  const filterOptions = ["all", "milktea", "eggdrop", ...new Set(productTypes)];
  console.log("filterOptions", filterOptions);

  return (
    <View className="bg-gray-50 h-10 flex-row items-center justify-between px-3">
      <FlatList
        data={filterOptions}
        renderItem={({ item }) => <Filters item={item} />}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default FilterButton;

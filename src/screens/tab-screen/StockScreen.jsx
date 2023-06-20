import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { searchFilter } from "../../redux/productSlice";
import FilterButton from "../../components/FilterButton";

const StockScreen = ({ navigation }) => {
  const { filteredProductData } = useSelector((state) => state.product);
  const [searchInput, setSearchInput] = useState("");

  console.log(
    "filteredProductData",
    filteredProductData.map((product) => product.product_name)
  );
  console.log("searchInput", searchInput);
  const dispatch = useDispatch();
  return (
    <>
      <StatusBar />
      <SafeAreaView className="w-full bg-gray-50 flex-1 mb-[70]">
        <View className="bg-gray-50 h-16 flex-row items-center justify-between px-5">
          <TextInput
            placeholder="SEARCH PRODUCT HERE..."
            className=" bg-gray-50 text-gray-800 py-1 pl-3 border border-blue-dianne rounded-3xl w-full text-lg"
            onChangeText={(text) => {
              dispatch(searchFilter(text));
            }}
          />
        </View>
        <FilterButton />
        <View className=" flex-1 items-center justify-center">
          <FlatList
            data={filteredProductData}
            renderItem={({ item }) => (
              <ProductItem item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item._id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default StockScreen;

const styles = StyleSheet.create({});

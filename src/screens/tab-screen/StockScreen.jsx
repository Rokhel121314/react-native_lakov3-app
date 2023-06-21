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
import FilterButton from "../../components/FilterButton";
import SearchFilter from "../../components/SearchFilter";

const StockScreen = ({ navigation }) => {
  //
  const { filteredProductData } = useSelector((state) => state.product);

  return (
    <>
      <StatusBar />
      <SafeAreaView className="w-full bg-gray-50 flex-1 mb-[70]">
        <SearchFilter />

        <FilterButton navigation={navigation} />

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

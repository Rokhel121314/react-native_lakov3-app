import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import FilterButton from "../../components/FilterButton";
import SearchFilter from "../../components/SearchFilter";
import { searchFilter } from "../../redux/productSlice";

const StockScreen = ({ navigation }) => {
  //
  const { filteredProductData } = useSelector((state) => state.product);

  return (
    <>
      <StatusBar />
      <SafeAreaView className="w-full bg-gray-50 flex-1 mb-[70]">
        <SearchFilter
          placeHolder={"SEARCH PRODUCT..."}
          addButton={true}
          searchFilter={searchFilter}
        />

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

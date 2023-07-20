import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
import FilterButton from "../../components/FilterButton";
import SearchFilter from "../../components/SearchFilter";
import { searchFilter, typeFilter } from "../../redux/productSlice";
import {
  getSalesData,
  getTransactionTotals,
} from "../../redux/transactionSlice";

const StockScreen = ({ navigation }) => {
  //
  const { filteredProductData, allProductData } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionTotals());
    dispatch(getSalesData(allProductData));
  }, [allProductData]);

  return (
    <>
      <StatusBar />
      <SafeAreaView className="w-full bg-gray-50 flex-1 mb-[70]">
        <SearchFilter
          containerStyle={
            "bg-gray-50 h-16 flex-row items-center justify-between px-5"
          }
          textStyle={
            " bg-gray-50 text-gray-800 py-1  pl-3 border border-blue-dianne rounded-3xl w-10/12 text-md"
          }
          placeHolder={"SEARCH PRODUCT..."}
          addButton={true}
          searchFilter={searchFilter}
          iconName={"plus"}
          buttonFunction={() => navigation.navigate("add-product")}
        />

        <FilterButton
          filterFunction={typeFilter}
          navigation={navigation}
          containerStyle={
            "bg-gray-50 h-10 flex-row items-center justify-between px-3 border-b border-gray-300"
          }
        />

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

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";

const StockScreen = ({ navigation }) => {
  const { filteredProductData } = useSelector((state) => state.product);

  // console.log("filteredProductData", filteredProductData);
  return (
    <>
      <StatusBar />
      <SafeAreaView className="w-full bg-gray-50 flex-1 mb-[70]">
        <View className="bg-green-200 h-16">
          <Text>SEARCH</Text>
        </View>
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

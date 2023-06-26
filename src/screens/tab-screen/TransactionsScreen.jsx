import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Text,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import TransactionItem from "../../components/TransactionItem";
import SearchFilter from "../../components/SearchFilter";
import { searchFilter } from "../../redux/transactionSlice";

const TransactionsScreen = ({ navigation }) => {
  const { filteredTransactionList } = useSelector((state) => state.transaction);

  return (
    <>
      <StatusBar />
      <SafeAreaView className="w-full bg-gray-50 flex-1 mb-[70]">
        <SearchFilter
          placeHolder={"SEARCH TRANSACTION ID.."}
          addButton={null}
          searchFilter={searchFilter}
        />
        <View className="flex-row justify-around w-full border-b border-blue-dianne px-2 pb-2">
          <View className="w-1/12 justify-center items-center">
            <Text className="text-lg text-blue-dianne font-bold">#</Text>
          </View>
          <View className="w-4/12 justify-center items-center">
            <Text className="text-md text-blue-dianne font-semibold">ID</Text>
          </View>
          <View className="w-1/12 justify-center items-center">
            <Text className="text-md text-blue-dianne font-semibold">QTY</Text>
          </View>
          <View className="w-3/12 justify-center items-center">
            <Text className="text-md text-blue-dianne font-semibold">
              AMOUNT
            </Text>
          </View>
          <View className="w-3/12 justify-center items-center">
            <Text className="text-md text-blue-dianne font-semibold">DATE</Text>
          </View>
        </View>

        <View className=" flex-1 items-center justify-center">
          <FlatList
            data={filteredTransactionList}
            initialNumToRender={11}
            inverted={true}
            renderItem={({ index, item }) => (
              <TransactionItem
                item={item}
                navigation={navigation}
                index={index}
                length={filteredTransactionList.length}
              />
            )}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({});

import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import SearchFilter from "../../components/SearchFilter";
import FilterButton from "../../components/FilterButton";
import { useDispatch, useSelector } from "react-redux";
import CounterItem from "../../components/CounterItem";
import {
  searchFilter,
  searchFilterPos,
  typeFilterPos,
} from "../../redux/productSlice";
import OrderItem from "../../components/OrderItem";
import { resetCounter } from "../../redux/cartSlice";
import CounterModal from "../../components/CounterModal";

const PosScreen = () => {
  //
  const { filteredProductDataPos } = useSelector((state) => state.product);
  const { counterItems, cartItem } = useSelector((state) => state.cart);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView className="flex-1 mb-[70px] bg-gray-50">
      <CounterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleConfirmAction={{}}
        confirmationMessage={"ENTER AMOUNT"}
        confirmBtnText={"CONFIRM"}
        cancelBtnText={"CANCEL"}
        item={cartItem}
      />
      {/* CART */}
      <View className="flex-2 px-6 border-b border-blue-dianne overflow-scroll">
        {/* HEADER */}
        <View className="w-full flex-row justify-between h-16 items-center">
          <Text className="text-2xl font-bold tracking-widest text-blue-dianne">
            ORDERS
          </Text>
          <TouchableOpacity className="bg-blue-dianne rounded-3xl">
            <Text className="px-4 py-3 text-gray-50 tracking-wider">
              CHECK OUT
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full h-6">
          <TouchableOpacity onPress={() => dispatch(resetCounter())}>
            <Text>CLEAR ORDER</Text>
          </TouchableOpacity>
        </View>

        {/* ORDER DISPLAY */}
        <View className="w-full flex-row justify-center items-start mt-3 flex-1">
          <FlatList
            data={counterItems}
            renderItem={({ item }) => (
              <OrderItem
                item={item}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            )}
            keyExtractor={(item) => item._id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      {/* COUNTER */}
      <View className="flex-4">
        {/* UTILITIES */}
        <View className="w-full px-6">
          <SearchFilter
            containerStyle={"h-16 flex-row items-center justify-between"}
            textStyle={
              " bg-gray-50 text-gray-800 py-1  pl-3 border border-blue-dianne rounded-3xl w-full text-md"
            }
            placeHolder={"SEARCH PRODUCT..."}
            addButton={false}
            searchFilter={searchFilter}
          />
          <FilterButton
            filterFunction={typeFilterPos}
            containerStyle={"h-8 flex-row items-center justify-between"}
          />
        </View>
        {/* PRODUCT LIST */}
        <View className="w-full mt-3 flex-1">
          {/* PRODUCT ITEM */}
          <FlatList
            data={filteredProductDataPos}
            renderItem={({ item, index }) => (
              <CounterItem
                item={item}
                index={index}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PosScreen;

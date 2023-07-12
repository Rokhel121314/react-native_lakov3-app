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
import CounterItemList from "../../components/CounterItemList";
import {
  searchFilter,
  searchFilterPos,
  typeFilterPos,
} from "../../redux/productSlice";
import OrderItem from "../../components/OrderItem";
import { resetCounter } from "../../redux/cartSlice";
import CounterModal from "../../components/CounterModal";
import CounterItemGrid from "../../components/CounterItemGrid";

const PosScreen = () => {
  //
  const { filteredProductDataPos } = useSelector((state) => state.product);
  const { counterItems, cartItem, totalQuantity, totalSellingPrice } =
    useSelector((state) => state.cart);
  const [modalVisible, setModalVisible] = useState(false);
  const [isGrid, setIsGrid] = useState(true);

  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView className="flex-1 mb-[70px] bg-gray-50">
      <CounterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleConfirmAction={{}}
        confirmationMessage={"ENTER AMOUNT"}
        confirmBtnText={"CONFIRM"}
        cancelBtnText={"REMOVE"}
        item={cartItem}
      />
      {/* CART */}
      <View className="flex-2 px-4 border-b border-blue-dianne overflow-scroll">
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
        <View className="w-full h-6 flex-row justify-between">
          <TouchableOpacity
            onPress={() => dispatch(resetCounter())}
            className="bg-deep-amethyst items-center justify-center rounded-md">
            <Text className="text-gray-50 px-1 font-bold">CLEAR</Text>
          </TouchableOpacity>
          <Text className="font-semibold">{`QTY: ${totalQuantity}`}</Text>
          <Text className="font-semibold">{`TOTAL: $ ${totalSellingPrice}`}</Text>
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
            numColumns={4}
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
              " bg-gray-50 text-gray-800 py-1  pl-3 border border-blue-dianne rounded-3xl w-10/12 text-md"
            }
            placeHolder={"SEARCH PRODUCT..."}
            addButton={true}
            searchFilter={searchFilterPos}
            iconName={isGrid ? "list" : "grid"}
            buttonFunction={() => setIsGrid(!isGrid)}
          />
          <FilterButton
            filterFunction={typeFilterPos}
            containerStyle={"h-8 flex-row items-center justify-between"}
          />
        </View>
        {/* PRODUCT LIST */}
        {isGrid ? (
          <View className="w-full mt-3 flex-1">
            {/* LIST VIEW */}
            <FlatList
              data={filteredProductDataPos}
              renderItem={({ item, index }) => (
                <CounterItemList
                  item={item}
                  index={index}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
              )}
              key={"_"}
              keyExtractor={(item) => "_" + item._id}
            />
          </View>
        ) : (
          <View className="w-full mt-3 flex-1">
            {/* GRID VIEW */}
            <FlatList
              data={filteredProductDataPos}
              renderItem={({ item, index }) => (
                <CounterItemGrid
                  item={item}
                  index={index}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
              )}
              key={"#"}
              keyExtractor={(item) => "#" + item._id}
              numColumns={4}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default PosScreen;

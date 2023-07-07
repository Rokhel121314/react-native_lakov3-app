import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import DateFilter from "../../components/DateFilter";
import React, { useEffect } from "react";
import useDateRangePicker from "../../hooks/useDateRangePicker";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByDate,
  getTransactionTotals,
} from "../../redux/transactionSlice";
registerTranslation("enGB", enGB);

const SalesScreen = () => {
  const {
    range,
    open,
    onDismiss,
    onConfirm,
    setOpen,
    startDate,
    endDate,
    defaultEndDate,
    defaultStartDate,
  } = useDateRangePicker();

  const { userData } = useSelector((state) => state.user);
  const {
    totalTransactionQuantity,
    totalTransactionAmount,
    totalTransactionCost,
    totalTransactions,
    totalTransactionProfit,
    filteredTransactionList,
  } = useSelector((state) => state.transaction);

  const dispatch = useDispatch();

  useEffect(() => {
    if (range.startDate !== null) {
      dispatch(filterByDate(range));
      dispatch(getTransactionTotals());
    } else return;
  }, [range]);

  //
  return (
    <View className="flex-1 mb-[70]">
      <View className="flex-1">
        <DatePickerModal
          locale="enGB"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
        />
        {/* HEADER */}
        <View className="mt-8 px-6 w-full">
          <Text className="text-blue-dianne text-3xl font-bold">
            {userData.store_name}
          </Text>
        </View>

        {/* DATE FILTER */}
        <View className="w-full mt-6 px-1">
          <DateFilter
            setOpen={setOpen}
            range={range}
            open={open}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            startDate={startDate}
            endDate={endDate}
            defaultEndDate={defaultEndDate}
            defaultStartDate={defaultStartDate}
          />
        </View>
      </View>

      {/* SALES DATA */}
      <ScrollView className="flex-4">
        <View className="w-full px-6 my-2">
          <View className="w-full h-[90px] bg-blue-dianne rounded-xl px-5 flex-row items-center">
            <Text className="text-gray-50 text-5xl font-medium mr-5">{`${totalTransactions}`}</Text>
            <Text className="text-gray-50 text-2xl font-semibold tracking-widest">
              TRANSACTIONS
            </Text>
          </View>
        </View>
        <View className="flex-row w-full px-6 justify-between my-2">
          <View className="w-[47%] h-[90px] bg-blue-dianne rounded-xl px-5 justify-evenly">
            <Text className="text-gray-50 text-base font-light">SALES</Text>
            <Text className="text-gray-50 text-lg font-medium">{`${totalTransactionQuantity.toFixed(
              2
            )} pcs`}</Text>
          </View>
          <View className="w-[47%] h-[90px] bg-blue-dianne rounded-xl px-5 justify-evenly">
            <Text className="text-gray-50 text-base font-light">REVENUE</Text>
            <Text className="text-gray-50 text-lg font-medium">
              {`$ ${totalTransactionAmount?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}`}
            </Text>
          </View>
        </View>
        <View className="flex-row w-full px-6 justify-between my-2">
          <View className="w-[47%] h-[90px] bg-blue-dianne rounded-xl px-5 justify-evenly">
            <Text className="text-gray-50 text-base font-light">CAPITAL</Text>
            <Text className="text-gray-50 text-lg font-medium">
              {`$ ${totalTransactionCost?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}`}
            </Text>
          </View>
          <View className="w-[47%] h-[90px] bg-blue-dianne rounded-xl px-5 justify-evenly">
            <Text className="text-gray-50 text-base font-light">PROFIT</Text>
            <Text className="text-gray-50 text-lg font-medium">
              {`$ ${totalTransactionProfit?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}`}
            </Text>
          </View>
        </View>

        {/* SALES GRAPH */}
        <View className="px-6">
          <Image
            source={require("../../../assets/images/chart_img.png")}
            style={{ width: "100%", height: 200, resizeMode: "contain" }}
          />
        </View>

        {/* TOP SELLERS */}
        <View className="w-full px-6 mb-5">
          <View className="w-full p-6 bg-blue-dianne rounded-lg">
            <Text className="text-gray-50 font-medium text-lg">
              TOP SELLERS
            </Text>
            <View className="flex-row justify-between">
              <Text className="text-gray-50 font-extralight text-base">
                Americano
              </Text>
              <Text className="text-gray-50 font-md text-base">11.11%</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-50 font-extralight text-base">
                Baggels
              </Text>
              <Text className="text-gray-50 font-md text-base">11.11%</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-50 font-extralight text-base">
                Bread Sticks
              </Text>
              <Text className="text-gray-50 font-md text-base">11.11%</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-50 font-extralight text-base">
                Cinnamon Roll
              </Text>
              <Text className="text-gray-50 font-md text-base">11.11%</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-50 font-extralight text-base">
                Glace
              </Text>
              <Text className="text-gray-50 font-md text-base">11.11%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SalesScreen;

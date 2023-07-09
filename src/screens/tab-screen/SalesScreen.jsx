import { Image, ScrollView, TouchableOpacity, Text, View } from "react-native";
import DateFilter from "../../components/DateFilter";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import useDateRangePicker from "../../hooks/useDateRangePicker";
import SalesDataItem from "../../components/SalesDataItem";
import TopSellers from "../../components/TopSellers";
import { useDispatch, useSelector } from "react-redux";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import {
  filterByDate,
  getSalesData,
  getSalesDataByDate,
  getTransactionTotals,
} from "../../redux/transactionSlice";
import BezierLineChart from "../../components/BezierLineChart";
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

  const {
    totalTransactionQuantity,
    totalTransactionAmount,
    totalTransactionCost,
    totalTransactions,
    totalTransactionProfit,
    salesData,
    salesDataByDate,
  } = useSelector((state) => state.transaction);

  const { userData } = useSelector((state) => state.user);

  const { allProductData } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    if (range.startDate !== null) {
      dispatch(filterByDate(range));
      dispatch(getTransactionTotals());
      dispatch(getSalesData(allProductData));
      dispatch(getSalesDataByDate());
    } else return;
  }, [range, userData]);

  useEffect(() => {
    dispatch(getSalesData(allProductData));
    dispatch(getSalesDataByDate());
  }, [range]);

  const salesDataSortedByQty = salesData
    .slice()
    .sort((a, b) =>
      a.sold_quantity_percentage > b.sold_quantity_percentage ? -1 : 1
    );

  const salesDataSortedBySales = salesData
    .slice()
    .sort((a, b) =>
      a.sold_amount_percentage > b.sold_amount_percentage ? -1 : 1
    );

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
        <View className="w-full my-2 px-6">
          <SalesDataItem
            containerStyle={
              "w-full h-[90px] rounded-xl px-5 flex-row-reverse items-center justify-center bg-blue-dianne"
            }
            textStyle1={"text-gray-50 text-5xl font-medium mr-5"}
            textStyle2={"text-gray-50 text-2xl font-semibold tracking-widest"}
            salesProperty={"TRANSACTIONS"}
            salesValue={totalTransactions}
          />
        </View>

        <View className="flex-row w-full px-6 justify-between my-2">
          <SalesDataItem
            containerStyle={
              "w-[47%] h-[90px] bg-blue-dianne rounded-xl px-5 justify-evenly"
            }
            textStyle1={(className = "text-gray-50 text-lg font-medium ")}
            textStyle2={"text-gray-50 text-base font-light"}
            salesProperty={"SALES"}
            salesValue={totalTransactionQuantity.toFixed(2)}
            prefix={null}
            suffix={"pcs"}
          />

          <SalesDataItem
            containerStyle={
              "w-[47%] h-[90px] bg-blue-dianne rounded-xl px-5 justify-evenly"
            }
            textStyle1={(className = "text-gray-50 text-lg font-medium")}
            textStyle2={"text-gray-50 text-base font-light"}
            salesProperty={"REVENUE"}
            salesValue={totalTransactionAmount?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
            prefix={"$ "}
            suffix={null}
          />
        </View>

        <View className="flex-row w-full px-6 justify-between my-2">
          <SalesDataItem
            containerStyle={
              "w-[47%] h-[90px] bg-blue-dianne rounded-xl px-5 justify-evenly"
            }
            textStyle1={(className = "text-gray-50 text-lg font-medium")}
            textStyle2={"text-gray-50 text-base font-light"}
            salesProperty={"CAPITAL"}
            salesValue={totalTransactionCost?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
            prefix={"$ "}
            suffix={null}
          />

          <SalesDataItem
            containerStyle={
              "w-[47%] h-[90px] bg-blue-dianne rounded-xl px-5 justify-evenly"
            }
            textStyle1={(className = "text-gray-50 text-lg font-medium")}
            textStyle2={"text-gray-50 text-base font-light"}
            salesProperty={"CAPITAL"}
            salesValue={totalTransactionProfit?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
            prefix={"$ "}
            suffix={null}
          />
        </View>

        {/* SALES GRAPH */}
        <View className="px-6">
          <BezierLineChart salesDataByDate={salesDataByDate} />
        </View>

        {/* TOP SELLERS BY QTY */}
        <View className="w-full px-6 mb-5">
          <TopSellers
            title={"TOP SELLERS / QUANTITY"}
            sortedSalesData={salesDataSortedByQty}
            salesProperty={"sold_quantity_percentage"}
          />
        </View>

        {/* TOP SELLERS BY SALES */}
        <View className="w-full px-6 mb-5">
          <TopSellers
            title={"TOP SELLERS / SALES"}
            sortedSalesData={salesDataSortedBySales}
            salesProperty={"sold_amount_percentage"}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SalesScreen;

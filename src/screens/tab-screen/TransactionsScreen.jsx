import { View, SafeAreaView, StatusBar, FlatList, Text } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionItem from "../../components/TransactionItem";
import SearchFilter from "../../components/SearchFilter";
import SortButton from "../../components/SortButton";
import useView1 from "../../hooks/useView1";
import useView2 from "../../hooks/useView2";
import useView3 from "../../hooks/useView3";
import useDateRangePicker from "../../hooks/useDateRangePicker";
import {
  searchFilter,
  sortBySoldQtyAsc,
  sortBySoldQtyDsc,
  sortBySoldAmountAsc,
  sortBySoldAmountDsc,
  sortBySoldDateAsc,
  sortBySoldDateDsc,
  filterByDate,
  resetFilter,
} from "../../redux/transactionSlice";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import DateFilter from "../../components/DateFilter";
registerTranslation("enGB", enGB);

const TransactionsScreen = ({ navigation }) => {
  const { filteredTransactionList, isLoading } = useSelector(
    (state) => state.transaction
  );

  const { view1, toggleViewFalseOnly1, toggleViewTrueOnly1 } = useView1();
  const { view2, toggleViewFalseOnly2, toggleViewTrueOnly2 } = useView2();
  const { view3, toggleViewFalseOnly3, toggleViewTrueOnly3 } = useView3();
  const {
    range,
    open,
    onDismiss,
    onConfirm,
    setOpen,
    startDate,
    endDate,
    defaultDate,
  } = useDateRangePicker();

  const dispatch = useDispatch();

  useEffect(() => {
    if (range.startDate !== null) {
      dispatch(filterByDate(range));
    } else return;
  }, [range]);

  return (
    <>
      <StatusBar />
      <DatePickerModal
        locale="enGB"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
      />
      <SafeAreaView className="w-full bg-gray-50 flex-1 mb-[70]">
        {/* SEARCH FILTER */}
        <SearchFilter
          placeHolder={"SEARCH TRANSACTION ID.."}
          addButton={true}
          searchFilter={searchFilter}
          iconName={"back-in-time"}
          buttonFunction={() => dispatch(resetFilter())}
        />

        {/* DATE FILTER */}
        <DateFilter
          setOpen={setOpen}
          range={range}
          open={open}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          startDate={startDate}
          endDate={endDate}
          defaultDate={defaultDate}
        />

        {/* TABLE HEADER */}
        <View className="flex-row justify-around w-full items-center border-b border-t border-blue-dianne px-2 bg-blue-dianne">
          <View className="w-1/12 justify-center items-center">
            <Text className="text-lg text-gray-50 font-bold">#</Text>
          </View>
          <View className="w-4/12 justify-center items-center">
            <Text className="text-md text-gray-50 font-semibold">ID</Text>
          </View>
          <SortButton
            style={"w-1/12 justify-center items-center flex-row"}
            sortName={"QTY"}
            sortAscending={sortBySoldQtyAsc}
            sortDescending={sortBySoldQtyDsc}
            view={view1}
            toggleView1={toggleViewTrueOnly1}
            toggleView2={toggleViewFalseOnly2}
            toggleView3={toggleViewFalseOnly3}
          />
          <SortButton
            style={"w-3/12 justify-center items-center flex-row"}
            sortName={"SOLD"}
            sortAscending={sortBySoldAmountAsc}
            sortDescending={sortBySoldAmountDsc}
            view={view2}
            toggleView1={toggleViewTrueOnly2}
            toggleView2={toggleViewFalseOnly1}
            toggleView3={toggleViewFalseOnly3}
          />
          <SortButton
            style={"w-3/12 justify-center items-center flex-row"}
            sortName={"DATE"}
            sortAscending={sortBySoldDateAsc}
            sortDescending={sortBySoldDateDsc}
            view={view3}
            toggleView1={toggleViewTrueOnly3}
            toggleView2={toggleViewFalseOnly2}
            toggleView3={toggleViewFalseOnly1}
          />
        </View>

        <View className=" flex-1 items-center justify-center">
          <FlatList
            data={filteredTransactionList}
            initialNumToRender={11}
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

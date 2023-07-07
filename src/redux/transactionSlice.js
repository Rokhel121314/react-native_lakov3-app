import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import moment from "moment";

import { BASE_URL } from "@env";

// EXTRA REDUCERS, ASYNCTHUNKS

// GET ALL TRANSACTIONS

export const getAllTransactions = createAsyncThunk(
  "transaction/getAllTransaction",
  async (user_id) => {
    try {
      const response = await Axios.get(`${BASE_URL}/transactions/${user_id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("error", error.msg);
    }
  }
);

// TRANSACTION SLICE
export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    addedTransaction: [],
    transactionList: [],
    filteredTransactionList: [],
    transactionDetail: [],
    sortedTransaction: [],
    totalTransactionQuantity: [],
    totalTransactionAmount: [],
    totalTransactionCost: [],
    totalTransactions: 0,
    totalTransactionProfit: 0,
    soldItemsList: [],
    isLoading: false,
  },
  reducers: {
    removeTransactionList: (state, { payload }) => {
      state.transactionList = [];
      state.filteredTransactionList = [];
    },
    searchFilter: (state, { payload }) => {
      state.filteredTransactionList = state.transactionList.filter(
        (transaction) => {
          return transaction._id.toLowerCase().includes(payload.toLowerCase());
        }
      );
      state.transactionDetail = state.filteredTransactionList[0];
    },
    sortBySoldQtyAsc: (state, { payload }) => {
      state.sortedTransaction = state.filteredTransactionList.sort((a, b) =>
        a.transaction_sold_quantity > b.transaction_sold_quantity ? -1 : 1
      );
    },

    sortBySoldQtyDsc: (state, { payload }) => {
      state.sortedTransaction = state.filteredTransactionList.sort((a, b) =>
        a.transaction_sold_quantity > b.transaction_sold_quantity ? 1 : -1
      );
    },

    sortBySoldAmountAsc: (state, { payload }) => {
      state.sortedTransaction = state.filteredTransactionList.sort((a, b) =>
        a.transaction_sold_amount > b.transaction_sold_amount ? -1 : 1
      );
    },

    sortBySoldAmountDsc: (state, { payload }) => {
      state.sortedTransaction = state.filteredTransactionList.sort((a, b) =>
        a.transaction_sold_amount > b.transaction_sold_amount ? 1 : -1
      );
    },

    sortBySoldDateAsc: (state, { payload }) => {
      state.sortedTransaction = state.filteredTransactionList.sort((a, b) =>
        a.createdAt > b.createdAt ? -1 : 1
      );
    },

    sortBySoldDateDsc: (state, { payload }) => {
      state.sortedTransaction = state.filteredTransactionList.sort((a, b) =>
        a.createdAt > b.createdAt ? 1 : -1
      );
    },

    filterByDate: (state, { payload }) => {
      state.filteredTransactionList = state.transactionList?.filter(
        (transaction) => {
          const transactionDate = moment(transaction.createdAt).format(
            "MM/DD/YYYY"
          );
          return (
            transactionDate >= moment(payload.startDate).format("MM/DD/YYYY") &&
            transactionDate <= moment(payload.endDate).format("MM/DD/YYYY")
          );
        }
      );
      state.transactionDetail = state.filteredTransactionList[0];
    },

    resetFilter: (state, { payload }) => {
      state.filteredTransactionList = state.transactionList;
    },

    getTransactionTotals: (state, { payload }) => {
      state.totalTransactionQuantity = state.filteredTransactionList
        .map((product) => product.transaction_sold_quantity)
        .reduce((a, b) => a + b, 0);

      state.totalTransactionAmount = state.filteredTransactionList
        .map((product) => product.transaction_sold_amount)
        .reduce((a, b) => a + b, 0);

      state.totalTransactionProfit = state.filteredTransactionList
        .map((product) => product.transaction_profit_amount)
        .reduce((a, b) => a + b, 0);

      state.totalTransactionCost = state.filteredTransactionList
        .map((product) => product.transaction_cost_amount)
        .reduce((a, b) => a + b, 0);

      state.soldItemsList = state.filteredTransactionList
        .map((transaction) => transaction.transaction_sold_items)
        .flat();

      state.totalTransactions = state.filteredTransactionList.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactions.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllTransactions.fulfilled, (state, { payload }) => {
        state.transactionList = payload;
        state.filteredTransactionList = payload;
        state.isLoading = false;
      })
      .addCase(getAllTransactions.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});
export const {
  removeTransactionList,
  searchFilter,
  sortBySoldQtyAsc,
  sortBySoldQtyDsc,
  sortBySoldAmountAsc,
  sortBySoldAmountDsc,
  sortBySoldDateAsc,
  sortBySoldDateDsc,
  filterByDate,
  resetFilter,
  getTransactionTotals,
} = transactionSlice.actions;
export default transactionSlice.reducer;

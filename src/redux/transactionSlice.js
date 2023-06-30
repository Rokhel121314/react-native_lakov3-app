import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

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
} = transactionSlice.actions;
export default transactionSlice.reducer;

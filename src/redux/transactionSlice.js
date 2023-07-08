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
    salesData: [],
    salesDataByDate: [],
    perProductSalesDataByDate: [],
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

    getSalesData: (state, { payload }) => {
      state.salesData = [];
      const filteredSoldProductByQty = payload.map((product) =>
        state.soldItemsList
          .filter((sold) => {
            return sold._id === product._id;
          })
          .map((prod) => prod.item_quantity)
          .reduce((a, b) => a + b, 0)
      );

      const soldProductQtyPercentage = filteredSoldProductByQty.map(
        (product) => (product / state.totalTransactionQuantity) * 100
      );

      const filteredSoldProductByAmount = payload.map((product) =>
        state.soldItemsList
          .filter((sold) => {
            return sold._id === product._id;
          })
          .map((prod) => prod.item_quantity * prod.selling_price)
          .reduce((a, b) => a + b, 0)
      );

      const soldProductAmountPercentage = filteredSoldProductByAmount.map(
        (product) => (product / state.totalTransactionAmount) * 100
      );

      const filteredSoldProductByProfit = payload.map((product) =>
        state.soldItemsList
          .filter((sold) => {
            return sold._id === product._id;
          })
          .map(
            (prod) =>
              prod.item_quantity * (prod.selling_price - prod.original_price)
          )
          .reduce((a, b) => a + b, 0)
      );

      const soldProductProfitPercentage = filteredSoldProductByProfit.map(
        (product) => (product / state.totalTransactionProfit) * 100
      );

      for (let i = 0; i < payload.length; i++) {
        state.salesData.push({
          product_name: payload[i].product_name,
          product_id: payload[i]._id,
          sold_quantity_total: parseFloat(filteredSoldProductByQty[i]),
          sold_quantity_percentage: parseFloat(soldProductQtyPercentage[i]),
          sold_amount_total: parseFloat(filteredSoldProductByAmount[i]),
          sold_amount_percentage: parseFloat(soldProductAmountPercentage[i]),
          sold_profit_total: parseFloat(filteredSoldProductByProfit[i]),
          sold_profit_percentage: parseFloat(soldProductProfitPercentage[i]),
        });
      }

      state.salesData.sort((a, b) =>
        a.sold_quantity_percentage > b.sold_quantity_percentage ? -1 : 1
      );
    },

    getSalesDataByDate: (state, { payload }) => {
      state.salesDataByDate = [];

      const salesDate = state.filteredTransactionList.map(
        (date) => moment(date.createdAt).format("MM/DD/YYYY")
        // format(new Date(date.createdAt), "MM/dd/yyyy")
      );

      const dateFilter = [...new Set(salesDate)];

      const salesDataByQuantity = dateFilter.map((date) => {
        return state.filteredTransactionList
          .filter(
            (transaction) =>
              moment(transaction.createdAt).format("MM/DD/YYYY") === date
            // format(new Date(transaction.createdAt), "MM/dd/yyy") === date
          )
          .map((quantity) => quantity.transaction_sold_quantity)
          .reduce((a, b) => a + b, 0);
      });

      const salesDataBySoldAmount = dateFilter.map((date) => {
        return state.filteredTransactionList
          .filter(
            (transaction) =>
              moment(transaction.createdAt).format("MM/DD/YYYY") === date
            // format(new Date(transaction.createdAt), "MM/dd/yyy") === date
          )
          .map((amount) => amount.transaction_sold_amount)
          .reduce((a, b) => a + b, 0);
      });

      const salesDataByProfit = dateFilter.map((date) => {
        return state.filteredTransactionList
          .filter(
            (transaction) =>
              moment(transaction.createdAt).format("MM/DD/YYYY") === date
            // format(new Date(transaction.createdAt), "MM/dd/yyy") === date
          )
          .map((profit) => profit.transaction_profit_amount)
          .reduce((a, b) => a + b, 0);
      });

      for (let i = 0; i < dateFilter.length; i++) {
        state.salesDataByDate.push({
          transaction_date: dateFilter[i],
          sales_total_quantity: parseFloat(salesDataByQuantity[i]),
          sales_total_amount: parseFloat(salesDataBySoldAmount[i]),
          sales_total_profit: parseFloat(salesDataByProfit[i]),
        });
      }

      state.salesDataByDate.sort((a, b) =>
        a.transaction_date > b.transaction_date ? 1 : -1
      );
    },

    getSalesDataByDateOfProduct: (state, { payload }) => {
      state.perProductSalesDataByDate = [];

      const salesDate = state.filteredTransactionList.map((date) =>
        moment(date.createdAt).format("MM/DD/YYYY")
      );

      const dateFilter = [...new Set(salesDate)];

      const data = dateFilter.map((date) => {
        return state.filteredTransactionList.filter(
          (transaction) =>
            moment(transaction.createdAt).format("MM/DD/YYYY") === date
        );
      });

      const perProductSalesData = data.map((transaction) =>
        transaction
          .map((product) =>
            product.transaction_sold_items.filter((x) => x._id === payload._id)
          )
          .map((p) => p.map((q) => q.item_quantity).reduce((a, b) => a + b, 0))
          .reduce((a, b) => a + b, 0)
      );

      for (let i = 0; i < dateFilter.length; i++) {
        state.perProductSalesDataByDate.push({
          transaction_date: dateFilter[i],
          sales_total_quantity: parseFloat(perProductSalesData[i]),
        });
      }

      state.perProductSalesDataByDate.sort((a, b) =>
        a.transaction_date > b.transaction_date ? 1 : -1
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
  filterByDate,
  resetFilter,
  getTransactionTotals,
  getSalesData,
  getSalesDataByDate,
  getSalesDataByDateOfProduct,
} = transactionSlice.actions;
export default transactionSlice.reducer;

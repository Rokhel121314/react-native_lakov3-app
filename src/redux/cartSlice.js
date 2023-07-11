import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counterItems: [],
    onCounter: [],
    cartItem: [],
    totalQuantity: 0,
    totalSellingPrice: 0,
    totalOriginalPrice: 0,
    totalProfit: 0,
    paymentAmount: "",
    paymentChange: 0,
  },
  reducers: {
    getCartItem: (state, { payload }) => {
      state.cartItem = payload;
    },
    addProductToCounter: (state, { payload }) => {
      state.onCounter = state.counterItems.find(
        (product) => payload._id === product._id
      );
      if (payload.product_quantity !== 0) {
        if (state.onCounter) {
          state.counterItems = state.counterItems.map((product) =>
            product._id === payload._id
              ? {
                  ...state.onCounter,
                  item_quantity:
                    state.onCounter.product_quantity >
                    state.onCounter.item_quantity
                      ? parseInt(state.onCounter.item_quantity) + 1
                      : state.onCounter.item_quantity + 0,
                }
              : product
          );
        } else {
          state.counterItems = [
            ...state.counterItems,
            { ...payload, item_quantity: 1 },
          ];
        }
        state.totalQuantity = state.counterItems
          .map((product) => product.item_quantity)
          .reduce((a, b) => parseInt(a) + parseInt(b), 0);

        state.totalSellingPrice = state.counterItems
          .map((product) => product.item_quantity * product.selling_price)
          .reduce((a, b) => a + b, 0);

        state.totalOriginalPrice = state.counterItems
          .map((product) => product.item_quantity * product.original_price)
          .reduce((a, b) => a + b, 0);

        state.totalProfit = state.totalSellingPrice - state.totalOriginalPrice;
      } else {
        alert(`REMAINING STOCKS: ${payload.product_quantity} pcs`);
      }
    },

    inputCounterValue: (state, { payload }) => {
      const { item, quantity } = payload;
      state.onCounter = state.counterItems.find(
        (product) => item._id === product._id
      );
      if (item.product_quantity !== 0) {
        if (state.onCounter) {
          state.counterItems = state.counterItems.map((product) =>
            product._id === item._id
              ? {
                  ...state.onCounter,
                  item_quantity:
                    state.onCounter.product_quantity > quantity
                      ? (state.onCounter.item_quantity = quantity)
                      : (state.onCounter.item_quantity =
                          state.onCounter.product_quantity),
                }
              : product
          );
        } else {
          state.counterItems = [
            ...state.counterItems,
            item.product_quantity > quantity
              ? { ...item, item_quantity: quantity }
              : { ...item, item_quantity: item.product_quantity },
          ];
        }
        state.totalQuantity = state.counterItems
          .map((product) => product.item_quantity)
          .reduce((a, b) => parseInt(a) + parseInt(b), 0);

        state.totalSellingPrice = state.counterItems
          .map((product) => product.item_quantity * product.selling_price)
          .reduce((a, b) => a + b, 0);

        state.totalOriginalPrice = state.counterItems
          .map((product) => product.item_quantity * product.original_price)
          .reduce((a, b) => a + b, 0);

        state.totalProfit = state.totalSellingPrice - state.totalOriginalPrice;
      } else return;
    },

    lessProductFromCounter: (state, { payload }) => {
      state.onCounter = state.counterItems.find(
        (product) => product._id === payload._id
      );

      if (state.onCounter.item_quantity === 1) {
        state.counterItems = state.counterItems.filter(
          (product) => payload._id !== product._id
        );
      } else {
        state.counterItems = state.counterItems.map((product) =>
          product._id === payload._id
            ? {
                ...state.onCounter,
                item_quantity: state.onCounter.item_quantity - 1,
              }
            : product
        );
      }
      state.totalQuantity = state.counterItems
        .map((product) => product.item_quantity)
        .reduce((a, b) => parseInt(a) + parseInt(b), 0);

      state.totalSellingPrice = state.counterItems
        .map((product) => product.item_quantity * product.selling_price)
        .reduce((a, b) => a + b, 0);

      state.totalOriginalPrice = state.counterItems
        .map((product) => product.item_quantity * product.original_price)
        .reduce((a, b) => a + b, 0);

      state.totalProfit = state.totalSellingPrice - state.totalOriginalPrice;
    },

    removeProductFromCounter: (state, { payload }) => {
      state.counterItems = state.counterItems.filter(
        (product) => payload._id !== product._id
      );
      state.totalQuantity = state.counterItems
        .map((product) => product.item_quantity)
        .reduce((a, b) => parseInt(a) + parseInt(b), 0);

      state.totalSellingPrice = state.counterItems
        .map((product) => product.item_quantity * product.selling_price)
        .reduce((a, b) => a + b, 0);

      state.totalOriginalPrice = state.counterItems
        .map((product) => product.item_quantity * product.original_price)
        .reduce((a, b) => a + b, 0);

      state.totalProfit = state.totalSellingPrice - state.totalOriginalPrice;
    },

    getPayment: (state, { payload }) => {
      state.paymentAmount = payload;
      state.paymentChange = state.paymentAmount - state.totalSellingPrice;
    },
    resetCounter: (state, { payload }) => {
      state.onCounter = [];
      state.counterItems = [];
      state.totalQuantity = 0;
      state.totalSellingPrice = 0;
      state.totalOriginalPrice = 0;
      state.totalProfit = 0;
      state.paymentAmount = "";
      state.paymentChange = 0;
    },
  },
});

export const {
  addProductToCounter,
  lessProductFromCounter,
  removeProductFromCounter,
  resetCounter,
  getPayment,
  inputCounterValue,
  getCartItem,
} = counterSlice.actions;

export default counterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { BASE_URL } from "@env";

// EXTRA REDUCERS, ASYNCTHUNKS

// READ ALL PRODUCTS
export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async (user_id) => {
    try {
      if (user_id === undefined) {
        console.log("fetching user_id");
      } else {
        const response = await Axios.get(`${BASE_URL}/products/${user_id}`, {
          withCredentials: true,
        });
        return response.data;
      }
    } catch (error) {
      console.log("error", error);
      console.log("userid", user_id);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    productData: [],
    allProductData: [],
    productDetail: [],
    filteredProductData: [],
    productIndex: [],
    isLoadingProduct: false,
    isSavingProduct: false,
  },
  reducers: {
    unGetAllProduct: (state) => {
      state.allProductData = [];
    },
    searchFilter: (state, { payload }) => {
      if (payload === "") {
        state.filteredProductData = state.allProductData;
      } else {
        state.filteredProductData = state.allProductData.filter((product) => {
          return product.product_name
            .toLowerCase()
            .includes(payload.toLowerCase());
        });
      }
    },
    typeFilter: (state, { payload }) => {
      if (payload === "all") {
        state.filteredProductData = state.allProductData;
      } else {
        state.filteredProductData = state.allProductData.filter(
          (product) => product.product_type === payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state, { payload }) => {
        state.isLoadingProduct = true;
      })
      .addCase(getAllProduct.fulfilled, (state, { payload }) => {
        state.allProductData = payload;
        state.filteredProductData = payload;
        state.isLoadingProduct = false;
      });
  },
});

export const { unGetAllProduct, searchFilter, typeFilter } =
  productSlice.actions;
export default productSlice.reducer;

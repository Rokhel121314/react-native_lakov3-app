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
      if (!user_id) {
        console.log("user_id undefine");
      }
      const response = await Axios.get(`${BASE_URL}/products/${user_id}`, {
        withCredentials: true,
      });
      return response.data;
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

export const { unGetAllProduct } = productSlice.actions;
export default productSlice.reducer;

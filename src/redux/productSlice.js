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
      console.log("getAllProduct", error);
      console.log("getAllproductError", user_id);
    }
  }
);

// UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (updatedData) => {
    const { user_id, product_id, formData } = updatedData;
    try {
      const response = await Axios.put(
        `${BASE_URL}/products/${user_id}/${product_id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateProductError", error);
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
    getProductDetail: (state, { payload }) => {
      state.productDetail = payload;
    },
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
      })
      .addCase(updateProduct.pending, (state, { payload }) => {
        state.isSavingProduct = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.productDetail = payload;
        state.productData = payload;
        state.isSavingProduct = false;
      });
  },
});

export const { unGetAllProduct, searchFilter, typeFilter, getProductDetail } =
  productSlice.actions;
export default productSlice.reducer;

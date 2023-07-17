import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { BASE_URL } from "@env";

// EXTRA REDUCERS, ASYNCTHUNKS
// ADD PRODUCT
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (dispatchData) => {
    const { formData, user_id } = dispatchData;
    try {
      const response = await Axios.post(
        `${BASE_URL}/products/${user_id}`,
        formData,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.log("error", error);
      console.log("error", error.msg);
    }
  }
);

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

// DELETE PRODUCT

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productUserId) => {
    const { user_id, product_id } = productUserId;
    try {
      const response = await Axios.delete(
        `${BASE_URL}/products/${user_id}/${product_id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

// UPDATE PRODUCT QTY AFTER TRANSACTION
export const updateProductQty = createAsyncThunk(
  "product/updateProductQty",
  async (updateProductData) => {
    const { counterItems, user_id } = updateProductData;
    try {
      const response = await Axios.put(
        `${BASE_URL}/products/${user_id}`,
        counterItems,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
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
    filteredProductDataPos: [],
    productIndex: [],
    isLoadingProduct: false,
    isSavingProduct: false,
  },
  reducers: {
    getProductDetail: (state, { payload }) => {
      state.productDetail = payload;
    },
    unGetAllProduct: (state) => {
      state.productData = [];
      state.allProductData = [];
      state.productDetail = [];
      state.filteredProductData = [];
      state.productIndex = [];
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

    searchFilterPos: (state, { payload }) => {
      if (payload === "") {
        state.filteredProductDataPos = state.allProductData;
      } else {
        state.filteredProductDataPos = state.allProductData.filter(
          (product) => {
            return product.product_name
              .toLowerCase()
              .includes(payload.toLowerCase());
          }
        );
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

    typeFilterPos: (state, { payload }) => {
      if (payload === "all") {
        state.filteredProductDataPos = state.allProductData.filter(
          (product) => product.product_quantity !== 0
        );
      } else {
        state.filteredProductDataPos = state.allProductData
          .filter((product) => product.product_type === payload)
          .filter((product) => product.product_quantity !== 0);
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
        state.filteredProductDataPos = payload.filter(
          (product) => product.product_quantity !== 0
        );
        state.isLoadingProduct = false;
      })
      .addCase(updateProduct.pending, (state, { payload }) => {
        state.isSavingProduct = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.productDetail = payload;
        state.productData = payload;
        state.isSavingProduct = false;
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.isSavingProduct = false;
      })
      .addCase(addProduct.pending, (state, { payload }) => {
        state.isSavingProduct = true;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.productData = payload;
        state.productDetail = payload;
        state.isSavingProduct = false;
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.isSavingProduct = false;
      })
      .addCase(deleteProduct.pending, (state, { payload }) => {
        state.isSavingProduct = true;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.productData = payload;
        state.isSavingProduct = false;
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.isSavingProduct = false;
      })
      .addCase(updateProductQty.pending, (state, { payload }) => {
        state.isLoadingProduct = true;
      })
      .addCase(updateProductQty.fulfilled, (state, { payload }) => {
        state.isLoadingProduct = false;
        state.productData = [];
      })
      .addCase(updateProductQty.rejected, (state, { payload }) => {
        state.isLoadingProduct = false;
      });
  },
});

export const {
  unGetAllProduct,
  searchFilter,
  typeFilter,
  getProductDetail,
  typeFilterPos,
  searchFilterPos,
} = productSlice.actions;
export default productSlice.reducer;

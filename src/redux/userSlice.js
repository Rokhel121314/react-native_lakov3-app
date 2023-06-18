import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { BASE_URL } from "@env";

// HTTP REQUEST
export const login = createAsyncThunk("user/login", async (loginData) => {
  try {
    const response = await Axios.post(`${BASE_URL}/users/login`, loginData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    const { status } = error.response.data;
    return status;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.userData = payload;
        state.isLoading = false;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

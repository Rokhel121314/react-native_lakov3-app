import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { BASE_URL } from "@env";

// EXTRA REDUCERS, ASYNTHUNKS

// LOGIN FUNCTION
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

// LOG OUT FUNCTION
export const logout = createAsyncThunk("user/logout", async () => {
  try {
    await Axios.get(`${BASE_URL}/users/logout`, {
      withCredentials: true,
    });
    console.log("logout");
  } catch (error) {
    console.log("error", error);
  }
});

// USE SLICE
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
      })
      .addCase(logout.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.userData = [];
        state.isLoading = false;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

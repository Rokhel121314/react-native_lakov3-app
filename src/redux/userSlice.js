import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "@env";

// EXTRA REDUCERS, ASYNTHUNKS

// REGISTER USER
export const register = createAsyncThunk("user/register", async (formData) => {
  try {
    const response = await Axios.post(`${BASE_URL}/users`, formData);
    return response.data;
  } catch (error) {
    console.log("error", error.message);
  }
});

// LOGIN FUNCTION
export const login = createAsyncThunk("user/login", async (loginData) => {
  try {
    const response = await Axios.post(`${BASE_URL}/users/login`, loginData, {
      withCredentials: true,
    });
    await AsyncStorage.setItem("user", JSON.stringify(response.data));
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
    await AsyncStorage.clear();
    return true;
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
      .addCase(register.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.userData = payload;
        state.isLoading = false;
      })
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

export const { setLoadingFalse, setLoadingTrue } = userSlice.actions;

export default userSlice.reducer;

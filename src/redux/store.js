import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import transactionSlice from "./transactionSlice";

const rootReducer = combineReducers({
  user: userSlice,
  product: productSlice,
  transaction: transactionSlice,
});

const persistConfig = {
  key: "user",
  version: 1,
  storage: AsyncStorage,
  blacklist: [productSlice, transactionSlice],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 1000 },
      serializableCheck: {
        warnAfter: 1000,
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

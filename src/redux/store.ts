import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import { apiSlice } from "./services/apiSlice";
import { useAppSelector } from "./hooks";
import Reducer from "./features/authSlice";
import reducer, { decrement, incrementByAmount } from "./features/counterSlice";
import forecastReducer, {
  setJsonData as setJsonForecasts,
  clearForecasts,
} from "./features/forecastsSlice";
import storesReducer, {
  setJsonData as setJsonStores,
  clearStores,
} from "./features/storesSlice";
import skuReducer, {
  setJsonData,
  clearSku,
  calculateTotals,
} from "./features/skuSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: Reducer,
      counter: reducer,
      forecasts: forecastReducer,
      stores: storesReducer,
      skus: skuReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV != "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

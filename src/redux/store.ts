import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import { apiSlice } from "./services/apiSlice";
import { useAppSelector } from "./hooks";
import Reducer from "./features/authSlice";
import reducer, { decrement, incrementByAmount } from "./features/counterSlice";
import statisticsReducer from "./features/statisticSlice";
import forecastReducer from "./features/forecastsSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: Reducer,
      counter: reducer,
      forecasts: forecastReducer,
      statistics: statisticsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV != "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

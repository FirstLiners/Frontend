"use client";
import { createSlice } from "@reduxjs/toolkit";

interface ForecastsItem {
  store: string;
  group: string;
  category: string;
  subcategory: string;
  sku: string;
  date: string;
  forecast_data: number;
  uom: string;
  [key: string]: any;
}

interface paramsApplyed {
  applyed: boolean;
  store: string[];
  group: string[];
  category: string[];
  subcategory: string[];
  sku: string[];
  uom: string[];
}

interface ForecastsState {
  forecastsItems: ForecastsItem[];
  paramsApplyed: paramsApplyed;
}

const initialState: ForecastsState = {
  forecastsItems: [],
  paramsApplyed: {
    applyed: false,
    store: [],
    group: [],
    category: [],
    subcategory: [],
    sku: [],
    uom: [],
  },
};

// function convertData(state: ForecastsState) {
//     state.forecastsItems.forEach((item) => {
//       item.date = new Date(item.date);
//     });
//   }

const forecastsSlice = createSlice({
  name: "forecasts",
  initialState,
  reducers: {
    clearForecasts: (state) => {
      state.forecastsItems = [];
    },
    setJsonData: (state, action) => {
      if (action) {
        state.forecastsItems = action.payload;
      }
    },
    setParamsApplyed: (state, action) => {
      if (action) {
        state.paramsApplyed = action.payload;
        state.paramsApplyed.applyed = true;
      }
    },
    unsetParamsApplyed: (state) => {
      state.paramsApplyed = initialState.paramsApplyed;
    },
  },
});

export const {
  clearForecasts,
  setJsonData,
  setParamsApplyed,
  unsetParamsApplyed,
} = forecastsSlice.actions;
// Извлекаем объект с создателями и редуктор
const { reducer: forecastReducer } = forecastsSlice;

export default forecastReducer;

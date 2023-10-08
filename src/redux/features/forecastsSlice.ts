"use client";
import { createSlice } from "@reduxjs/toolkit";

interface ForecastsItem {
  st_id: string;
  pr_sku_id: string;
  date: string;
  target: number;
}

interface ForecastsState {
  forecastsItems: ForecastsItem[];
}

const initialState: ForecastsState = {
  forecastsItems: [],
  // convert date from string to Date object
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
      return action.payload;
    },
  },
});

export const { clearForecasts, setJsonData } = forecastsSlice.actions;
// Извлекаем объект с создателями и редуктор
const { actions, reducer: forecastReducer } = forecastsSlice;

export default forecastReducer;

"use client";
import { createSlice } from "@reduxjs/toolkit";

interface StatisticsItem {
  store: string;
  group: string;
  category: string;
  subcategory: string;
  sku: string;
  uom: string;
  real_sale: number;
  forecast: number;
  difference: number;
  period: number;
  wape: number;
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

interface StatisticsState {
  StatisticsItems: StatisticsItem[];
  paramsApplyed: paramsApplyed;
}

const initialState: StatisticsState = {
  StatisticsItems: [],
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

const StatisticsSlice = createSlice({
  name: "Statistics",
  initialState,
  reducers: {
    clearStatistics: (state) => {
      state.StatisticsItems = [];
    },
    setStatisticData: (state, action) => {
      if (action) {
        state.StatisticsItems = action.payload;
      }
    },
    setParamsStatistics: (state, action) => {
      if (action) {
        state.paramsApplyed = action.payload;
        state.paramsApplyed.applyed = true;
      }
    },
    unsetParamsStatistics: (state) => {
      state.paramsApplyed = initialState.paramsApplyed;
    },
  },
});

export const { clearStatistics, setStatisticData, setParamsStatistics, unsetParamsStatistics } =
  StatisticsSlice.actions;
// Извлекаем объект с создателями и редуктор
const { reducer: statisticsReducer } = StatisticsSlice;

export default statisticsReducer;

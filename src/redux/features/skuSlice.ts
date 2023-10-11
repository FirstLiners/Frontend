import { createSlice } from "@reduxjs/toolkit";

interface SkuItem {
  id: number;
  sku_id: string;
  uom: string;
  group_id: string;
  cat_id: string;
  subcat_id: string;
}

interface SkuState {
  skuItems: SkuItem[];
  total?: number;
}

const initialState: SkuState = {
  skuItems: [],
};

const skuSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    clearsku: (state) => {
      state.skuItems = [];
    },
    setJsonData: (state, action) => {
      return action.payload;
    },
    calculateTotals: (state, action) => {
      const skuId = action.payload;
      const filteredItems = state.skuItems.filter(
        (item) => item.sku_id === skuId,
      );
      const total = filteredItems.length;
      state.total = total;
    },
    clearSku: (state) => {
      state.skuItems = [];
    },
  },
});

// console.log(skuSlice);
export const { clearSku, setJsonData, calculateTotals } = skuSlice.actions;

// Извлекаем объект с создателями и редуктор
const { actions, reducer: skuReducer } = skuSlice;
export default skuReducer;

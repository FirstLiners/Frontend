import { createSlice } from "@reduxjs/toolkit";

interface StoresItem {
  store_id: string;
  city_id: string;
  division_code: string;
  type_format_id: number;
  type_loc_id: number;
  type_size_id: number;
  is_active: number;
}

interface StoreState {
  storeItems: StoresItem[];
}

const initialState: StoreState = {
  storeItems: [],
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    clearStores: (state) => {
      state.storeItems = [];
    },
    setJsonData: (state, action) => {
      return action.payload;
    },
  },
});

// console.log(skuSlice);
export const { clearStores, setJsonData } = storeSlice.actions;

// Извлекаем объект с создателями и редуктор
const { actions, reducer: storesReducer } = storeSlice;
export default storesReducer;

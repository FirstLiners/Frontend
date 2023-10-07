import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const url = `${process.env.BACKEND_URL}/api/v1/skus`;

const initialState = {
  skuItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getskuItems = createAsyncThunk(
  'sku/getskuItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const skuSlice = createSlice({
  name: 'sku',
  initialState,
  reducers: {
    clearsku: (state) => {
      state.skuItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.skuItems = state.skuItems.filter((item) => item.sku_id !== itemId);
    },
    increase: (state, { payload }) => {
      const skuItem = state.skuItems.find((item) => item.id === payload.id);
      skuItem.amount = skuItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const skuItem = state.skuItems.find((item) => item.id === payload.id);
      skuItem.amount = skuItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.skuItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getskuItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getskuItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.skuItems = action.payload;
      })
      .addCase(getskuItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

// console.log(skuSlice);
export const { clearsku, removeItem, increase, decrease, calculateTotals } =
  skuSlice.actions;

export default skuSlice.reducer;

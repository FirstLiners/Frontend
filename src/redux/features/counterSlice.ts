"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// export const {  } = counterSlice.actions; //incrementByAmount

// Извлекаем объект с создателями и редуктор
const { actions, reducer } = counterSlice;
// Извлекаем и экспортируем каждого создателя по названию
export const { increment, decrement, incrementByAmount } = actions;
// Экпортируем редуктор по умолчанию или по названию
export default reducer;

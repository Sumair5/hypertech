import { createSlice } from "@reduxjs/toolkit";

const RandomSlice = createSlice({
  name: "random",
  initialState: { number: 0 }, // 🎯 ابتدائی نمبر 0 رکھا گیا ہے
  reducers: {
    generateRandom: (state) => {
      state.number = Math.floor(Math.random() * 1000) + 1; // 🔢 1 سے 100 کے درمیان نمبر بنائیں
    },
    resetNumber: (state) => {
      state.number = 0; // 🔄 نمبر کو ری سیٹ کریں
    },
  },
});

export const { generateRandom, resetNumber } = RandomSlice.actions;
export default RandomSlice.reducer;

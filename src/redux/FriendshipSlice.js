import { createSlice } from "@reduxjs/toolkit";

const FriendshipSlice = createSlice({
  name: "friendship",
  initialState: { score: 0 }, // ✅ Default state ensure کریں
  reducers: {
    calculateScore: (state) => {
      state.score = Math.floor(Math.random() * 101); // ✅ 0-100 کا score generate ہوگا
    },
  },
});

export const { calculateScore } = FriendshipSlice.actions;
export default FriendshipSlice.reducer;

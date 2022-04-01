import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountBalance: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    withdraw: (state, action) => {
      state.accountBalance -= action.payload.amountChange;
    },
    deposit: (state, action) => {
      state.accountBalance += action.payload.amountChange;
    },
  },
});

export const { withdraw, deposit } = userSlice.actions;

export default userSlice.reducer;

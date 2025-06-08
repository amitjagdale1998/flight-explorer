import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
};

export const selectflightSlice = createSlice({
  name: "selectedflight",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.flights = [action.payload];
    },

    addflight: (state, action) => {
      state.flights.push(action.payload);
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { addflight, clearUsers } = selectflightSlice.actions;
export const selectflights = (state) => state.user.flights;

// export const { increment, decrement, incrementByAmount } = selectflightSlice.actions;

export default selectflightSlice.reducer;

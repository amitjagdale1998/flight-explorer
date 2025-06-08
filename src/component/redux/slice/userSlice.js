import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userCredentials: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state, action) => {
      const exists = state?.userCredentials?.find(
        (user) =>
          user.email === action.payload.email &&
          user.role === action.payload.role &&
          user.password === action.payload.password
      );
      if (!exists) {
        state.userCredentials.push(action.payload);
      }
    },

    clearUsers: (state) => {
      state.userCredentials = [];
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
export const { increment, clearUsers } = userSlice.actions;
export const selectUserCredentials = (state) => state.user.userCredentials;

// export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;

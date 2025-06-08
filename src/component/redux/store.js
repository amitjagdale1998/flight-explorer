import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import counterSlice from "./slice/CounterSlice";
import userSlice from "./slice/userSlice";
import selectflightSlice from "./slice/sectedFlightSlice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production", //
  reducer: {
    counter: counterSlice,
    user: userSlice,
    selectedflight: selectflightSlice,
  },
});

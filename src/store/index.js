import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import trailSlice from "./trail-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, trails: trailSlice.reducer },
});

export default store;

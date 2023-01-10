import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  currentUser: "",
  isAuth: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const userName = action.payload;
      state.currentUser = userName;
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
      state.isAdmin = false;
    },
    adminLogin(state) {
      state.isAdmin = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

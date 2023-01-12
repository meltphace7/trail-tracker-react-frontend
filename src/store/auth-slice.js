import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  currentUser: "",
  isAuth: false,
  isAdmin: false,
  favorites: [],
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
    loadFavorites(state, action) {
      const favorites = action.payload;
      state.favorites = favorites;
    },
    toggleFavorites(state, action) {
      const favoritedItem = action.payload;
      const transformedFave = { trailId: action.payload._id, ...favoritedItem };
      // Check if trail is already in favorite
      const existingFavorite = state.favorites.find(
        (item) => item._id === favoritedItem._id
      );

      if (existingFavorite) {
        console.log("trail removed from favorites");
        const updatedFavorites = state.favorites.filter(
          (fave) => fave._id !== favoritedItem._id
        );
        state.favorites = updatedFavorites;
      } else {
        console.log("trail added to favorites");
        state.favorites.push(transformedFave);
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

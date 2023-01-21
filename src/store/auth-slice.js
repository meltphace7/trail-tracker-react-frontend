import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  userName: "",
  isAuth: false,
  isAdmin: false,
  favorites: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const userName = action.payload.userName;
      const favorites = action.payload.favorites;
      state.userName = userName;
      state.isAuth = true;
      state.favorites = favorites;
       localStorage.setItem("favorite-trails", JSON.stringify(favorites));
    },
    logout(state) {
      state.isAuth = false;
      state.isAdmin = false;
      state.favorites = [];
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
      // Adds trailId field to trail
      const transformedFave = { trailId: action.payload._id, ...favoritedItem };
      // Check if trail is already in favorite
      const existingFavorite = state.favorites.find(
        (item) => item.trailId === favoritedItem._id
      );

      if (existingFavorite) {
        const updatedFavorites = state.favorites.filter(
          (fave) => fave._id !== favoritedItem._id
        );
        state.favorites = updatedFavorites;
         localStorage.setItem(
           "favorite-trails",
           JSON.stringify(updatedFavorites)
         );
      } else {
        const transformedFavorites = state.favorites.concat(transformedFave);
        state.favorites = transformedFavorites;

        localStorage.setItem(
          "favorite-trails",
          JSON.stringify(transformedFavorites)
        );
      }
    },
    setFavoritesFromLocalStorage(state) {
      const favoritesArray = localStorage.getItem("favorite-trails")
        ? JSON.parse(localStorage.getItem("favorite-trails"))
        : [];
      state.favorites = favoritesArray;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;

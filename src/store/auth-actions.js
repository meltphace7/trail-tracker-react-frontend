import { authActions } from "./auth-slice";
import hostURL from "../hosturl";

// GETS CART AND LOGS IN USER IF TOKEN IS DETECTED
export const fetchAuthData = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token === "null") {
        return;
      }
      const response = await fetch(`${hostURL}/auth/fetch-auth`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        throw new Error("Could find User!");
      }
        const responseData = await response.json();
      if (responseData.isAdmin) {
        dispatch(authActions.adminLogin());
      }
      
      dispatch(authActions.loadFavorites(responseData.favorites));
      dispatch(authActions.login(responseData.userName));
    } catch (err) {
      console.log(err);
    }
  };
};

// UPDATES THE USERS FAVORITES WHEN THEY CHANGE
export const sendAuthData = (favorites) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === "null") {
      return;
    }

    const favoritesData = {
      favorites: favorites,
    };

    const response = await fetch(`${hostURL}/auth/update-auth`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favoritesData),
    });

    if (!response.ok) {
      throw new Error("Sending cart data failed!");
    }

    const responseData = await response.json();
  };
};

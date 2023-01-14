import React from "react";
import classes from "./Navigation.module.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import Logo from './Logo'

const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const isLoggedIn = isAuth;

    const logoutHandler = () => {
      dispatch(authActions.logout());
      localStorage.setItem("token", null);
      localStorage.setItem("userId", null);
      localStorage.setItem("expiryDate", null);
      history.replace("/home");
    };
 
  return (
    <nav className={classes.nav}>
      <div className={classes["logo-container"]}>
        <Link className={classes["nav-link"]} to="/home">
          <Logo />
        </Link>
      </div>
      <ul className={classes["nav-menu"]}>
        <li>
          <Link className={classes["nav-link"]} to="/home">
            HOME
          </Link>
        </li>
        <li>
          {isLoggedIn && (
            <Link className={classes["nav-link"]} to="/favorites">
              FAVORITES
            </Link>
          )}
          {!isLoggedIn && (
            <Link className={classes["nav-link"]} to="/signup">
              SIGN UP
            </Link>
          )}
        </li>
        <li>
          {isLoggedIn && (
            <Link className={classes["nav-link"]} to="/addtrail">
              ADD TRAIL
            </Link>
          )}
          {!isLoggedIn && (
            <Link className={classes["nav-link"]} to="/login">
              LOG IN
            </Link>
          )}
        </li>
        {isLoggedIn && (
          <li>
            <Link className={classes["nav-link"]} to="/account">
              ACCOUNT
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button
              onClick={logoutHandler}
              className={classes["logout-button"]}
            >
              LOG OUT
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

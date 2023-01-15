import React from "react";
import classes from "./Navigation.module.css";
import { Link, NavLink, useHistory } from "react-router-dom";
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
      <ul className={classes['nav-menu']}>
        <li>
          <NavLink
            className={classes["nav-link"]}
            activeClassName={classes.active}
            to="/home"
          >
            HOME
          </NavLink>
        </li>
        <li>
          {isLoggedIn && (
            <NavLink
              className={classes["nav-link"]}
              activeClassName={classes.active}
              to="/favorites"
            >
              FAVORITES
            </NavLink>
          )}
          {!isLoggedIn && (
            <NavLink
              activeClassName={classes.active}
              className={classes["nav-link"]}
              to="/signup"
            >
              SIGN UP
            </NavLink>
          )}
        </li>
        <li>
          {isLoggedIn && (
            <NavLink
              activeClassName={classes.active}
              className={classes["nav-link"]}
              to="/addtrail"
            >
              ADD TRAIL
            </NavLink>
          )}
          {!isLoggedIn && (
            <NavLink
              activeClassName={classes.active}
              className={classes["nav-link"]}
              to="/login"
            >
              LOG IN
            </NavLink>
          )}
        </li>
        {isLoggedIn && (
          <li>
            <NavLink
              activeClassName={classes.active}
              className={classes["nav-link"]}
              to="/account"
            >
              ACCOUNT
            </NavLink>
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

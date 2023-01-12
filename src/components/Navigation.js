import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../store/auth-context';
import classes from "./Navigation.module.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import Logo from './Logo'

const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const currentUser = useSelector((state) => state.auth.currentUser);


  const isLoggedIn = isAuth;

    const logoutHandler = () => {
      dispatch(authActions.logout());
      localStorage.setItem("token", null);
      localStorage.setItem("userId", null);
      localStorage.setItem("expiryDate", null);
      history.replace("/home");
    };
 
  return (
    <nav>
      <div className={classes["logo-container"]}>
        <Link to="/home">
          <Logo />
        </Link>
      </div>
      <ul className={classes["nav-menu"]}>
        <li>
          <Link to="/home">HOME</Link>
        </li>
        <li>
          {isLoggedIn && <Link to="/favorites">FAVORITES</Link>}
          {!isLoggedIn && <Link to="/signup">SIGN UP</Link>}
        </li>
        <li>
          {isLoggedIn && <Link to="/addtrail">ADD TRAIL</Link>}
          {!isLoggedIn && <Link to="/login">LOG IN</Link>}
        </li>
        {isLoggedIn && <li><button onClick={logoutHandler} className={classes['logout-button']}>LOG OUT</button></li>}
      </ul>
    </nav>
  );
};

export default Navigation;

import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../store/auth-context';
import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";
import Logo from './Logo'

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
 
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
        {isLoggedIn && <li><button onClick={authCtx.logout} className={classes['logout-button']}>LOG OUT</button></li>}
      </ul>
    </nav>
  );
};

export default Navigation;

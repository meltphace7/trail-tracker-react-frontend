import React, { useState, useEffect } from "react";
import classes from "./Navigations.module.css";
import { Link } from "react-router-dom";
import Logo from './Logo'

const Navigation = () => {
 
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
          <Link to="/favorites">FAVORITES</Link>
        </li>
        <li>
          <Link to="/addtrail">ADD TRAIL</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

import React from 'react'
import classes from "./Navigations.module.css";
import {NavLink} from 'react-router-dom'

const Navigation = () => {
    return (
      <nav>
        <div className={classes["logo-container"]}>
          <NavLink to="/MainPage">
            <h1>TRAIL TRACKER</h1>
          </NavLink>
        </div>
        <form className={classes["trail-search"]}>
          <input placeholder="enter trail name" />
          <button type="submit">Find A Trail!</button>
        </form>
        <ul className={classes["nav-menu"]}>
          <li>
            <NavLink to="./AddTrail">ADD TRAIL</NavLink>
          </li>
          <li>
            <NavLink to="./AllTrails">ALL TRAILS</NavLink>
          </li>
        </ul>
      </nav>
    );
}

export default Navigation

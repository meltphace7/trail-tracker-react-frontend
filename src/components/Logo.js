import React from 'react'
import classes from './Logo.module.css'
import trailLogo from "../assets/trail-tracker-icon.png";

const Logo = () => {
    return (
      <div className={classes["logo"]}>
        <img src={trailLogo} alt="trail tracker logo" />
        <p>Trail Tracker</p>
      </div>
    );
}

export default Logo

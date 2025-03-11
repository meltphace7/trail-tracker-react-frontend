import React from 'react'
import classes from './Footer.module.css';
import trailLogo from "../../../src/assets/trail-tracker-icon.png";


const Footer = () => {
  const currentYear = new Date().getFullYear();

    return (
      <footer className={classes.footer}>
        <div className={classes.logo}>
          <img src={trailLogo} alt="Trail Tracker Logo" />
          <p>Trail Tracker {currentYear}</p>
          <p className={classes.legal}>All rights reserved</p>
        </div>
        <a href="https://www.brockdallman.com/">Site By Brock Dallman</a>
      </footer>
    );
}

export default Footer

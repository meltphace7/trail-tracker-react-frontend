import React from 'react'
import classes from './Footer.module.css';
import trailLogo from "../../src/assets/trail-tracker-icon.png";


const Footer = () => {
    return (
      <footer className={classes.footer}>
        <div className={classes.logo}>
          <img src={trailLogo} alt="Trail Tracker Logo"/>
          <p>Trail Tracker 2023</p>
          <p className={classes.legal}>All rights reserved</p>
        </div>
      </footer>
    );
}

export default Footer

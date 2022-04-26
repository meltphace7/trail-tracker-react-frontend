import React from 'react'
import classes from './Logo.module.css'

const Logo = () => {
    return (
      <div className={classes["logo-container"]}>
        <h1 className={classes["logo-first"]}>TRAIL</h1>
        <h1 className={classes["logo-second"]}>TRACKER</h1>
      </div>
    );
}

export default Logo

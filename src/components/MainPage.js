import React from 'react'
import classes from './MainPage.module.css'
import TrailList from './TrailList'
import TrailDetail from "./TrailDetail";

const MainPage = (props) => {
    return (
      <div className={classes["main-page"]}>
        <TrailList trails={props.trails} />
        <TrailDetail trail={props.trail} />
      </div>
    );
}

export default MainPage

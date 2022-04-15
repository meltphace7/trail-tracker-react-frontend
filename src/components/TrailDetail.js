import React from 'react'
import classes from "./TrailDetail.module.css";

const TrailDetail = () => {
    return (
      <div className={classes["trail-detail"]}>
        <div class={classes["info-header"]}>
                <h1>THOUSAND ISLAND LAKE LOOP</h1>
          <h3>Ansel Adams Wilderness, California</h3>
        </div>
        <div class={classes["info-sub-header"]}>
          <h3>Miles: 21</h3>
          <h3>Scenery: 7/10</h3>
          <h3>Solitude: 7/10</h3>
          <h3>Difficulty: 7/10</h3>
        </div>
        <p class={classes["description"]}>
          A popular and incredibly scenic trail that passes through one of the
          most beautiful areas in the High Sierra. Part of this loop follows the
          famous John Muir Trail.
        </p>
      </div>
    );
}

export default TrailDetail

import React, { useState } from "react";
import classes from "./TrailList.module.css";
import TrailListItem from "./TrailListItem";

const TrailList = (props) => {

  const renderFilteredTrails = props.trails.map((trail) => {
    return (
      <TrailListItem
        getTrail={props.onTrailSelect}
        key={trail.id}
        id={trail.id}
        name={trail.trailName}
        state={trail.state}
        wildernessArea={trail.wildernessArea}
      />
    );
  });
  return (
    <div className={classes["trail-list-container"]}>
      <ul className={classes["trail-list"]}>
        {props.trails.length === 0 ? <p>No Matching Trails</p> : renderFilteredTrails}
      </ul>
    </div>
  );
};

export default TrailList;

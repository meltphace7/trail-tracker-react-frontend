import React from "react";
import classes from "./TrailList.module.css";
import TrailListItem from "./TrailListItem";

const TrailList = (props) => {
  return (
    <div className={classes["trail-list-container"]}>
      <ul className={classes["trail-list"]}>
        {props.trails.map((trail) => {
          return (
            <TrailListItem
              name={trail.trailName}
              state={trail.state}
              wildernessArea={trail.wildernessArea}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TrailList;

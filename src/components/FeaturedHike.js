import React from "react";
import classes from "./FeaturedHike.module.css";
import { Link } from "react-router-dom";

const FeaturedHike = (props) => {
  const getTrailHandler = function () {
    props.getTrail(props.trailData.id);
  };

  return (
    <Link to={`trail-detail/${props.trailData.id}`}>
      <div className={classes["featured-hike"]} onClick={getTrailHandler}>
        <div className={classes["featured-hike-image"]}>
          <img src={props.trailData.imageURL[0]} />
        </div>
        <div className={classes["featured-hike-text"]}>
          <h1 className={classes["featured-hike-title"]}>
            <strong>{props.trailData.trailName}</strong>
          </h1>
          <div className={classes["featured-hike-area"]}>
            {props.trailData.wildernessArea}
          </div>
          <div className={classes["featured-hike-length"]}>
            {`Length: ${props.trailData.miles}`}
          </div>
          <div className={classes["featured-hike-stats"]}>
            {`Difficulty: ${props.trailData.difficulty}/10 - Scenery: ${props.trailData.scenery}/10`}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedHike;

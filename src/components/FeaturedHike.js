import React from 'react'
import classes from './FeaturedHike.module.css'

const FeaturedHike = (props) => {
    return (
      <div className={classes["featured-hike"]}>
        <div className={classes["featured-hike-image"]}>
          <img src={props.trailData.imageURL} />
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
    );
}

export default FeaturedHike

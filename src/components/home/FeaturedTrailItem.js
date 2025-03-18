import React from 'react'
import classes from './FeaturedTrailItem.module.css'
import { Link } from "react-router-dom";

const FeaturedTrailItem = (props) => {
    
    return (
      <div className={classes["featured-trail-item"]}>
        <Link to={props.link}>
          <div className={classes["image-container"]}>
            <img src={props.img} alt={props.trailName} />
          </div>
          <div className={classes["trail-info"]}>
            <h3>{props.trailName}</h3>
            <p>{props.wildernessArea}</p>
            <p>{props.state}</p>
            <div className={classes["trail-stats"]}>
              <p>{props.difficulty}</p>
              <p>&#x2022;</p>
              <p>{props.miles} mi.</p>
            </div>
          </div>
        </Link>
      </div>
    );
}

export default FeaturedTrailItem
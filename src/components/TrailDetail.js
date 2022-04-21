import React, {useState, useEffect} from 'react'
import classes from "./TrailDetail.module.css";
import Map from './Map'


const TrailDetail = (props) => {
  const [trailIsLoaded, setTrailIsLoaded] = useState(false);
  
  
  useEffect(() => {
   if (props.trail.id === undefined) {
     setTrailIsLoaded(false);
   } else {
     setTrailIsLoaded(true);
   }
  }, [props.trail.id])

  const coords = [props.trail.latitude, props.trail.longitude];

  return (
    <div className={classes["trail-detail"]}>
      {trailIsLoaded ? (
        <div className={classes["trail-detail-info"]}>
          <div className={classes["info-header"]}>
            <h1>{props.trail.trailName}</h1>
            <h3>{`${props.trail.wildernessArea},  ${props.trail.state}`}</h3>
            <img
              className={classes["trail-image"]}
              src={props.trail.imageURL ? props.trail.imageURL : ""}
            />
          </div>
          <div className={classes["info-sub-header"]}>
            <h3>{`Miles: ${props.trail.miles}`}</h3>
            <h3>{`Scenery: ${props.trail.scenery}`}</h3>
            <h3>{`Solitude: ${props.trail.solitude}`}</h3>
            <h3>{`Difficulty: ${props.trail.difficulty}`}</h3>
            <h3>{`Best Season: ${props.trail.bestSeason[0]} - ${props.trail.bestSeason[1]}`}</h3>
          </div>
          <p className={classes["description"]}>{props.trail.description}</p>
           <Map coords={coords} />
        </div>
      ) : (
        <p className={classes["select-trail-message"]}>
          Please Select A Trail!
        </p>
      )}
    </div>
  );
}


export default TrailDetail


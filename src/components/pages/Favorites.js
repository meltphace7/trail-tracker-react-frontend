import React, {useState, useEffect, useCallback} from 'react'
import classes from './Favorites.module.css'
import TrailListItem from '../TrailListItem';
import { useSelector } from "react-redux";
import hostURL from '../../hosturl';

const Favorites = (props) => {
  const userFavorites = useSelector((state) => state.auth.favorites);

  const renderFavorites = userFavorites.map((trail) => {
    return (
      <TrailListItem
     getTrail={props.onTrailSelect}
     key={trail.trailId}
     id={trail.trailId}
     name={trail.trailName}
     state={trail.state}
     wildernessArea={trail.wildernessArea}
     bestSeason={trail.bestSeason}
     longitude={trail.longitude}
     latitude={trail.latitude}
     miles={trail.miles}
     scenery={trail.scenery}
     solitude={trail.solitude}
     difficulty={trail.difficulty}
     description={trail.description}
     images={trail.images}
     onFavoriteToggle={props.onFavoriteToggle}
     trail={trail}
     favorites={props.favorites}
   />
    );
  });

  return (
    <div className={classes["favorites-container"]}>
      <h1>FAVORITES</h1>
      <p>
        {userFavorites.length !== 0 ? `${props.favorites.length} results` : ""}
      </p>
      {userFavorites.length !== 0 ? renderFavorites : "NO FAVORITES YET"}
    </div>
  );
}

export default Favorites

import React from 'react'
import classes from './Favorites.module.css'
import TrailListItem from '../TrailListItem';
import { useSelector } from "react-redux";

const Favorites = (props) => {
  const userFavorites = useSelector(state => state.auth.favorites)

  const renderFavorites = userFavorites.map((trail) => {
    return (
      <TrailListItem
        getTrail={props.onTrailSelect}
        key={trail._id}
        id={trail._id}
        image={trail.images[0]}
        name={trail.trailName}
        state={trail.state}
        miles={trail.miles}
        description={trail.description}
        difficulty={trail.difficulty}
        wildernessArea={trail.wildernessArea}
        // onFavoriteToggle={props.onFavoriteToggle}
        // trail={trail}
        // favorites={props.favorites}
      />
    );
  });

    return (
      <div className={classes["favorites-container"]}>
        <h1>FAVORITES</h1>
        <p>
          {userFavorites.length !== 0
            ? `${props.favorites.length} results`
            : ""}
        </p>
        {userFavorites.length !== 0 ? renderFavorites : "NO FAVORITES YET"}
      </div>
    );
}

export default Favorites

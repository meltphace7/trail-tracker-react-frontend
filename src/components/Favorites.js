import React from 'react'
import classes from './Favorites.module.css'
import TrailListItem from './TrailListItem';

const Favorites = (props) => {

  const renderFavorites = props.favorites.map((trail) => {
        
      return (
        <TrailListItem
          getTrail={props.onTrailSelect}
          key={trail.id}
          id={trail.id}
          image={trail.imageURL[0]}
          name={trail.trailName}
          state={trail.state}
          miles={trail.miles}
          description={trail.description}
          difficulty={trail.difficulty}
          wildernessArea={trail.wildernessArea}
          onFavoriteToggle={props.onFavoriteToggle}
          trail={trail}
          favorites={props.favorites}
        />
      );
    });
    return (
      <div className={classes["favorites-container"]}>
        <h1>FAVORITES</h1>
        <p>{props.favorites.length !== 0 ? `${props.favorites.length} results` : ''}</p>
        {props.favorites.length !== 0 ? renderFavorites : "NO FAVORITES YET"}
      </div>
    );
}

export default Favorites

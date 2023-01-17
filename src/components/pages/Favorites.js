import React from "react";
import classes from "./Favorites.module.css";
import TrailListItem from "../TrailListItem";
import { useSelector } from "react-redux";

const Favorites = (props) => {
  const userFavorites = useSelector((state) => state.auth.favorites);

 

  // const renderFavorites = userFavorites.map((trail) => {
  //   return (
  //     <TrailListItem
  //       getTrail={props.onTrailSelect}
  //       key={trail.trailId}
  //       id={trail.trailId}
  //       name={trail.trailName}
  //       state={trail.state}
  //       wildernessArea={trail.wildernessArea}
  //       bestSeason={trail.bestSeason}
  //       longitude={trail.longitude}
  //       latitude={trail.latitude}
  //       miles={trail.miles}
  //       scenery={trail.scenery}
  //       solitude={trail.solitude}
  //       difficulty={trail.difficulty}
  //       description={trail.description}
  //       author={trail.author}
  //       authorId={trail.authorId}
  //       images={trail.images}
  //       onFavoriteToggle={props.onFavoriteToggle}
  //       trail={trail}
  //       favorites={props.favorites}
  //     />
  //   );
  // });

  return (
    <div className={classes["favorites"]}>
      <h1 className={classes["title"]}>FAVORITES</h1>
      <p>
        {userFavorites.length !== 0 ? `${userFavorites.length} results` : ""}
      </p>
      {/* {userFavorites.length !== 0 && <ul className={classes["favorites-list"]}>{renderFavorites}</ul>} */}
      {userFavorites && (
        <ul className={classes["favorites-list"]}>
          {userFavorites.map((trail) => {
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
        author={trail.author}
        authorId={trail.authorId}
        images={trail.images}
        onFavoriteToggle={props.onFavoriteToggle}
        trail={trail}
        favorites={props.favorites}
      />
    );
  })}
        </ul>
      )}
      {userFavorites.length === 0 && <h3>No Favorites Yet</h3>}
    </div>
  );
};

export default Favorites;

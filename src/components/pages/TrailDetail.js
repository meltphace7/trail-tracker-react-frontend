import React, { useState, useEffect } from "react";
import classes from "./TrailDetail.module.css";
import TrailMap from "../TrailMap";
import ImageSlider from "../ImageSlider";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import WeatherReport from "../WeatherReport";

const TrailDetail = (props) => {
  const [favorites, setFavorites] = useState(
    localStorage.getItem("favorite-trails")
      ? JSON.parse(localStorage.getItem("favorite-trails"))
      : []
  );

  const [isFavorited, setIsFavorited] = useState(false);

  const faveIDs = favorites.map((trail) => trail.id);

  useEffect(() => {
    if (faveIDs.includes(props.trail.id)) {
      setIsFavorited(true);
    } else {
    }
  }, [favorites, props.trail]);

  if (Object.keys(props.trail).length === 0) {
    const trailID = localStorage.getItem("selectedTrail");
    const trail = props.trails((trail) => trail.id === +trailID);
  }

  const [season, setSeason] = useState("");
  const coords = [props.trail.latitude, props.trail.longitude];
  // const [trailIsLoaded, setTrailIsLoaded] = useState(false);
  // Mom-  46.64463, -120.77671
  const monthArray = [
    [1, "January"],
    [2, "Febuary"],
    [3, "March"],
    [4, "April"],
    [5, "May"],
    [6, "June"],
    [7, "July"],
    [8, "August"],
    [9, "September"],
    [10, "October"],
    [11, "November"],
    [12, "December"],
  ];

  // Gets MONTH NAME from props.trail
  useEffect(() => {
    if (props.trail.bestSeason === undefined) return;
    const [monthStart] = monthArray.filter(
      (month) => month[0] === +props.trail.bestSeason[0]
    );
    const [monthEnd] = monthArray.filter(
      (month) => month[0] === +props.trail.bestSeason[1]
    );
    setSeason(`${monthStart[1]} - ${monthEnd[1]}`);
  }, [props.trail]);

  const isFavoritedHandler = function () {
    if (isFavorited) {
      setIsFavorited(false);
      const newFavorites = favorites
        .filter((trail) => trail.id !== props.trail.id)
        .sort((a, b) => a.trailName.localeCompare(b.trailName));
      setFavorites(newFavorites);
      localStorage.setItem("favorite-trails", JSON.stringify(newFavorites));
      props.onFavoriteToggle();
    } else {
      setIsFavorited(true);
      const newFavorites = favorites
        .concat(props.trail)
        .sort((a, b) => a.trailName.localeCompare(b.trailName));
      setFavorites(newFavorites);
      localStorage.setItem("favorite-trails", JSON.stringify(newFavorites));
      props.onFavoriteToggle();
    }
  };

   let difficulty;
   const calcDifficulty = function (diff) {
     if (+diff <= 3) difficulty = "easy";
     if (+diff > 3 && +diff < 7) difficulty = "moderate";
     if (+diff >= 7 && +diff <= 8) difficulty = "hard";
     if (+diff > 8) difficulty = "very-hard";
   };

   calcDifficulty(props.trail.difficulty);

  return (
    <div className={classes["trail-detail"]}>
      <div className={classes["trail-detail-info"]}>
        <div className={classes["info-header"]}>
          <button
            onClick={isFavoritedHandler}
            className={classes["favorites-button"]}
          >
            {isFavorited ? (
              <AiFillStar size={50} className={classes["star"]} />
            ) : (
              <AiOutlineStar size={50} className={classes["star"]} />
            )}
          </button>
          <h1>{props.trail.trailName}</h1>
          <h3>{`${props.trail.wildernessArea},  ${props.trail.state}`}</h3>
          <img
            className={classes["trail-image"]}
            src={props.trail.imageURL[0] ? props.trail.imageURL[0] : ""}
          />
        </div>
        <div className={classes["info-sub-header"]}>
          <h3>{`Length: ${props.trail.miles} miles roundtrip`}</h3>
          <h3 className={classes[difficulty]}>
            {`Difficulty: ${props.trail.difficulty}/10`}
          </h3>
          <h3>{`Scenery: ${props.trail.scenery}/10`}</h3>
          <h3>{`Solitude: ${props.trail.solitude}/10`}</h3>
          {/* <h3>{`Best Season: ${season}`}</h3> */}
          <h3>{`Season: ${season}`}</h3>
        </div>
        <p className={classes["description"]}>{props.trail.description}</p>
        <ImageSlider images={props.trail.imageURL} />
        {/* <WeatherReport coords={coords} /> */}
        <div className={classes["map-container"]}>
          <h1>Map</h1>
          <div className={classes["map-text-container"]}>
            <p>{`Trailhead coordinates: ${coords[0]}, ${coords[1]}`}</p>
            <a
              href={`https://earth.google.com/web/search/${coords[0]},${coords[1]}/`}
              target="_blank"
            >
              View with Google Earth
            </a>
          </div>
          <TrailMap trails={props.trails} coords={coords} />
        </div>
      </div>
    </div>
  );
};

export default TrailDetail;

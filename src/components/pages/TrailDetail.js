import React, { useState, useEffect, useCallback } from "react";
import classes from "./TrailDetail.module.css";
import TrailMap from "../TrailMap";
import ImageSlider from "../ImageSlider";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import WeatherReport from "../WeatherReport";
import hostURL from '../../hosturl';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../../store/auth-slice';
import LoadingSpinner from '../UI/LoadingSpinner'

const TrailDetail = (props) => {
  let { trailId } = useParams();
  const dispatch = useDispatch();
  const userFavorites = useSelector((state) => state.auth.favorites);

  const [trail, setTrail] = useState({});
  const [trailIsLoaded, setTrailIsLoaded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  /// FETCHES TRAIL DETAIL FROM BACKEND
   const fetchTrailHandler = useCallback(async () => {
     try {
       const response = await fetch(
         `${hostURL}/trails/trail-detail/${trailId}`
       );
       if (!response.ok) {
         throw new Error("Could not find trail!");
       }
       const resData = await response.json();
       setTrail(resData.trail);
       setTrailIsLoaded(true);
     } catch (err) {
       console.log(err);
     }
   }, [trailId]);

   useEffect(() => {
     fetchTrailHandler();
   }, [fetchTrailHandler]);
  

  const [season, setSeason] = useState("");
  const coords = [trail.latitude, trail.longitude];
  // M-  46.64463, -120.77671

  // Gets MONTH NAME from props.trail
  useEffect(() => {
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
    if (trail.bestSeason === undefined) return;

    const [monthStart] = monthArray.filter(
      (month) => month[0] === +trail.bestSeason[0]
    );
   
    const [monthEnd] = monthArray.filter(
      (month) => month[0] === +trail.bestSeason[1]
    );
    setSeason(`${monthStart[1]} - ${monthEnd[1]}`);
  }, [trail]);

   let difficulty;
   const calcDifficulty = function (diff) {
     if (+diff <= 3) difficulty = "easy";
     if (+diff > 3 && +diff < 7) difficulty = "moderate";
     if (+diff >= 7 && +diff <= 8) difficulty = "hard";
     if (+diff > 8) difficulty = "very-hard";
   };

  calcDifficulty(trail.difficulty);

  // TOGGLES FAVORITE STATUS OF TRAIL
  const isFavoritedHandler = function () {
      console.log('trail to favorite', trail)
      dispatch(authActions.toggleFavorites(trail));
      setIsFavorited((prevstate) => !prevstate);
    };

  // DETERMINES IF TRAIL IS FAVORITED BASED ON USERS FAVORITE TRAILS ARRAY
  useEffect(() => {
    if (!userFavorites) {
      return
    }
    const existingFavorite = userFavorites.find(fave => fave.trailId === trail._id);
      if (existingFavorite) {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    }, [trail, userFavorites]);
  
  const favoriteIcon = isFavorited ? (
    <AiFillStar size={50} className={classes["star"]} />
  ) : (
    <AiOutlineStar size={50} className={classes["star"]} />
    );
  
  return (
    <div className={classes["trail-detail-container"]}>
      <div className={classes["trail-detail"]}>
        {trailIsLoaded && (
          <div className={classes["trail-detail-info"]}>
            <div className={classes["info-header"]}>
              <button
                onClick={isFavoritedHandler}
                className={classes["favorites-button"]}
              >
                {favoriteIcon}
              </button>
              <h1>{trail.trailName}</h1>
              <h3>{`${trail.wildernessArea},  ${trail.state}`}</h3>
              <img
                className={classes["trail-image"]}
                src={trail.images[0] ? trail.images[0] : ""}
                alt={trail.trailName}
              />
            </div>
            <div className={classes["info-sub-header"]}>
              <h3>{`Length: ${trail.miles} miles roundtrip`}</h3>
              <h3 className={classes[difficulty]}>
                {`Difficulty: ${trail.difficulty}/10`}
              </h3>
              <h3>{`Scenery: ${trail.scenery}/10`}</h3>
              <h3>{`Solitude: ${trail.solitude}/10`}</h3>
              <h3>{`Season: ${season}`}</h3>
            </div>
            <p className={classes["description"]}>{trail.description}</p>
            <ImageSlider images={trail.images} />
            {/* <WeatherReport coords={coords} /> */}
            <div className={classes["map-container"]}>
              <h1>Map</h1>
              <div className={classes["map-text-container"]}>
                <p>{`Trailhead coordinates: ${coords[0]}, ${coords[1]}`}</p>
                <a
                  href={`https://earth.google.com/web/search/${coords[0]},${coords[1]}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View with Google Earth
                </a>
              </div>
              <TrailMap trails={props.trails} coords={coords} />
              <p
                className={classes["submitted-by"]}
              >{`Submitted by ${trail.author}`}</p>
            </div>
          </div>
        )}
        {!trailIsLoaded && (
          <div className={classes["loading-spinner"]}>
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailDetail;

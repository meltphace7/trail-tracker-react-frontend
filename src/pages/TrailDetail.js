import React, { useState, useEffect, useCallback, useRef } from "react";
import classes from "./TrailDetail.module.css";
import TrailMap from "../components/trail-detail/TrailMap";
import ImageSlider from "../components/trail-detail/ImageSlider";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import WeatherReport from "../components/trail-detail/WeatherReport";
import hostURL from "../hosturl";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import difficultyIcon from "../assets/difficulty-icon.png";
import solitudeIcon from "../assets/solitude-icon.png";
import sceneryIcon from "../assets/scenery-icon-white.png";
import mileageIcon from "../assets/mileage-icon.png";
import seasonIcon from "../assets/calender-icon.png";
import { Link } from "react-router-dom";

const TrailDetail = (props) => {
  const didFetchTrailData = useRef(false);
  let { trailId } = useParams();
  const dispatch = useDispatch();
  const userFavorites = useSelector((state) => state.auth.favorites);
  const [season, setSeason] = useState("");
  const [trail, setTrail] = useState({});
  const [trailIsLoaded, setTrailIsLoaded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(
    userFavorites.some((trail) => trail._id === trailId)
  );

  const [difficulty, setDifficulty] = useState("");
  // M-  46.64463, -120.77671

  // Parallax effect for Header
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  ////////////
  const calcMonth = useCallback((seasonArray) => {
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
    const [monthStart] = monthArray.filter(
      (month) => month[0] === seasonArray[0]
    );

    const [monthEnd] = monthArray.filter(
      (month) => month[0] === seasonArray[1]
    );
    setSeason(`${monthStart[1]} - ${monthEnd[1]}`);
  }, []);

  /////// FETCHES TRAIL DETAIL FROM BACKEND
  const fetchTrailHandler = useCallback(async () => {
    try {
      const response = await fetch(`${hostURL}/trails/trail-detail/${trailId}`);
      if (!response.ok) {
        throw new Error("Could not find trail!");
      }
      const resData = await response.json();
      calcMonth(resData.trail.bestSeason);
      setTrail(resData.trail);
      setTrailIsLoaded(true);

      // CONVERT DIFFICULTY INTO CLASSNAME
      if (+resData.trail.difficulty <= 3) setDifficulty("easy");
      if (+resData.trail.difficulty > 3 && +resData.trail.difficulty < 7)
        setDifficulty("moderate");
      if (+resData.trail.difficulty >= 7 && +resData.trail.difficulty <= 8)
        setDifficulty("hard");
      if (+resData.trail.difficulty > 8) setDifficulty("very-hard");
    } catch (err) {
      console.log(err);
    }
  }, [trailId, calcMonth]);

  useEffect(() => {
    if (!didFetchTrailData.current) {
      fetchTrailHandler();
      didFetchTrailData.current = true;
    }
  }, []);

  // TOGGLES FAVORITE STATUS OF TRAIL
  const isFavoritedHandler = function () {
    console.log("trail to favorite", trail);
    dispatch(authActions.toggleFavorites(trail));
    setIsFavorited((prevstate) => !prevstate);
  };

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
              <div className={classes["trail-name-container"]}>
                <div className={classes["trail-name-container-overlay"]}>
                  <h1 className={classes["trail-name"]}>{trail.trailName}</h1>
                  <h3
                    className={classes["trail-wilderness"]}
                  >{`${trail.wildernessArea},  ${trail.state}`}</h3>
                </div>
              </div>
              <img
                className={classes["trail-image"]}
                src={trail.images[0] ? trail.images[0] : ""}
                alt={trail.trailName}
                style={{ transform: `translateY(${offsetY * 0.1}px)` }}
              />
            </div>

            <div className={classes["info-sub-header"]}>
              <div className={classes["info-sub-header-overlay"]}>
                <div className={classes["trail-stat"]}>
                  <img
                    className={classes["trail-stat-icon"]}
                    src={mileageIcon}
                    alt="mileage-icon"
                  />
                  <h3>{`Length: `}</h3>
                  <h3>{`${trail.miles} miles`}</h3>
                </div>
                <div className={classes["trail-stat"]}>
                  <img
                    className={classes["trail-stat-icon"]}
                    src={difficultyIcon}
                    alt="difficulty-icon"
                  />
                  <h3>{`Difficulty:`}</h3>
                  <h3
                    className={classes[difficulty]}
                  >{`${trail.difficulty}/10`}</h3>
                </div>
                <div className={classes["trail-stat"]}>
                  <img
                    className={classes["trail-stat-icon"]}
                    src={sceneryIcon}
                    alt="scenery-icon"
                  />
                  <h3>{`Scenery:`}</h3>
                  <h3>{`${trail.scenery}/10`}</h3>
                </div>
                <div className={classes["trail-stat"]}>
                  <img
                    className={classes["trail-stat-icon"]}
                    src={solitudeIcon}
                    alt="solitude-icon"
                  />
                  <h3>{`Solitude:`}</h3>
                  <h3>{`${trail.solitude}/10`}</h3>
                </div>
                <div className={classes["trail-stat"]}>
                  <img
                    className={classes["trail-stat-icon"]}
                    src={seasonIcon}
                    alt="season-icon"
                  />
                  <h3>{`Best Season:`}</h3>
                  <h3>{season}</h3>
                </div>
              </div>
            </div>
            <p className={classes["description"]}>{trail.description}</p>
            <ImageSlider images={trail.images} />
            <WeatherReport coords={[trail.latitude, trail.longitude]} />
            <div className={classes["map-container"]}>
              <h1>Map</h1>
              {trail.trailheadName && (
                <h3 className={classes["trailhead"]}>
                  Trailhead:&nbsp;
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${trail.trailheadName}`}
                    target="_blank"
                    rel="noreferrer"
                    className={classes["trailhead-name"]}
                  >{`${trail.trailheadName}`}</a>
                </h3>
              )}
              <div className={classes["map-text-container"]}>
                <p>{`Trailhead coordinates: ${trail.latitude}, ${trail.longitude}`}</p>
                <a
                  className={classes["google-earth-link"]}
                  href={`https://earth.google.com/web/search/${trail.latitude},${trail.longitude}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View with Google Earth
                </a>
              </div>
              <TrailMap
                trails={props.trails}
                coords={[trail.latitude, trail.longitude]}
              />
              <p
                className={classes["submitted-by"]}
              >{`Submitted by ${trail.author}`}</p>
            </div>
            <Link className="link-btn" to="/trails">
              FIND MORE TRAILS
            </Link>
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

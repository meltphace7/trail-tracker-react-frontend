import React, { useState, useEffect } from "react";
import classes from "./TrailListItem.module.css";
import { Link } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const TrailListItem = (props) => {
  const trailId = props.id;
  const [isFavorited, setIsFavorited] = useState(false);
  const dispatch = useDispatch();
  const userFavorites = useSelector((state) => state.auth.favorites);

  const trail = {
    _id: props.id,
    trailName: props.name,
    state: props.state,
    wildernessArea: props.wildernessArea,
    bestSeason: props.bestSeason,
    longitude: props.longitude,
    latitude: props.latitude,
    miles: props.miles,
    scenery: props.scenery,
    solitude: props.solitude,
    difficulty: props.difficulty,
    description: props.description,
    author: props.author,
    authorId: props.authorId,
    images: props.images,
  };

  const svgClickHandler = function (e) {
    e.preventDefault();
  };

  let difficulty;
  const calcDifficulty = function (diff) {
    if (+diff <= 3) difficulty = "easy";
    if (+diff > 3 && +diff < 7) difficulty = "moderate";
    if (+diff >= 7 && +diff <= 8) difficulty = "hard";
    if (+diff > 8) difficulty = "very-hard";
  };

  calcDifficulty(props.difficulty);

  // TOGGLES FAVORITE STATUS OF TRAIL
  const isFavoritedHandler = function () {
    dispatch(authActions.toggleFavorites(trail));
    setIsFavorited((prevstate) => !prevstate);
  };

  // DETERMINES IF TRAIL IS FAVORITED BASED ON USERS FAVORITE TRAILS ARRAY
  useEffect(() => {
    if (!userFavorites) {
      return
    }
    const existingFavorite = userFavorites.find(
      (fave) => fave.trailId === trail._id
    );
    if (existingFavorite) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  }, [trailId, userFavorites, trail._id]);

  const favoriteIcon = isFavorited ? (
    <AiFillStar
      onClick={svgClickHandler}
      size={30}
      className={classes["star"]}
    />
  ) : (
    <AiOutlineStar
      onClick={svgClickHandler}
      size={30}
      className={classes["star"]}
    />
  );

  return (
    <li key={trail._id} className={classes["trail-item"]}>
      <Link
        className={classes["trail-link"]}
        to={`/trail-detail/${trail._id}`}
      ></Link>
      <div className={classes["image-container"]}>
        {trail.images && <img src={trail.images[0]} alt={trail.trailName} />}
        <div className={classes["loading-spinner"]}>
          <LoadingSpinner />
        </div>
      </div>
      <div className={classes["info-container"]}>
        <h2 className={classes["trail-title"]}>{trail.trailName}</h2>
        <h3>{`${trail.state} - ${trail.wildernessArea} `}</h3>
        <div className={classes["miles-difficulty-container"]}>
          <h3>{`${trail.miles} miles roundtrip -`}&nbsp;</h3>
          <p className={classes[difficulty]}>
            {`Difficulty: ${trail.difficulty}/10`}
          </p>
        </div>
        <div className={classes["description-container"]}>
          <p className={classes["description"]}>{trail.description}</p>
        </div>
      </div>
      <button
        onClick={isFavoritedHandler}
        className={classes["favorites-button"]}
      >
        {favoriteIcon}
      </button>
    </li>
  );
};

export default TrailListItem;

import React, { useState, useEffect } from 'react'
import classes from './TrailListItem.module.css'
import { Link } from 'react-router-dom'
import { AiOutlineStar } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";


const TrailListItem = (props) => {
  const trailId = props.id;

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
    images: props.images
  }

 
  // const storageFaves = localStorage.getItem("favorite-trails")
  //   ? JSON.parse(localStorage.getItem("favorite-trails"))
  //   : [];

  // const [favorites, setFavorites] = useState([]);
   const [isFavorited, setIsFavorited] = useState(false);

  const dispatch = useDispatch();
  const userFavorites = useSelector((state) => state.auth.favorites);

  // useEffect(() => {
  //   if (localStorage.getItem("favorite-trails")) {
  //     setFavorites(
  //       localStorage.getItem("favorite-trails")
  //         ? JSON.parse(localStorage.getItem("favorite-trails"))
  //         : []
  //     );
  //   }
  // }, []);

  // const [favorites, setFavorites] = useState(
  //   localStorage.getItem("favorite-trails")
  //     ? JSON.parse(localStorage.getItem("favorite-trails"))
  //     : []
  // );

 

  // const faveIDs = favorites.map((trail) => trail._id);

  // useEffect(() => {
  //   if (faveIDs.includes(props.trail._id)) {
  //     setIsFavorited(true);
  //   }
  //   props.onFavoriteToggle();
  // }, [favorites, props.trail._id]);

  // const getIdHandler = (e) => {
  //   props.getTrail(props.id);
  // };

  // Disables Link when Favorites Button is clicked so favorite state can be toggled without leaving the page
  // const linkClickHandler = function (e) {
  //   if (e.target.className === "TrailListItem_favorites-button__FJ7Ki") {
  //     e.preventDefault();
  //   }
  //   if (e.target.className === "TrailListItem_star__Bs8Q+") {
  //     e.preventDefault();
  //   }
  // };

  const svgClickHandler = function (e) {
    e.preventDefault();
  };

  // const faveHandler = function () {
  //   let newFavorites;
  //   if (isFavorited) {
  //     setIsFavorited(false);
  //     console.log("UN-FAVORITED");
  //     newFavorites = storageFaves
  //       .filter((trail) => trail.id !== props.trail.id)
  //       .sort((a, b) => a.trailName.localeCompare(b.trailName));
  //   } else {
  //     setIsFavorited(true);
  //     console.log("FAVORITED");
  //     newFavorites = storageFaves
  //       .concat(props.trail)
  //       .sort((a, b) => a.trailName.localeCompare(b.trailName));
  //   }
  //   console.log(newFavorites);
  //   setFavorites(newFavorites);
  //   localStorage.setItem("favorite-trails", JSON.stringify(newFavorites));
  //   props.onFavoriteToggle();
  // };

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
    const existingFavorite = userFavorites.find(
      (fave) => fave.trailId === trail._id
    );
    if (existingFavorite) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  }, [trailId, userFavorites]);

  const favoriteIcon = isFavorited ? (
    <AiFillStar
      onClick={svgClickHandler}
      size={50}
      className={classes["star"]}
    />
  ) : (
    <AiOutlineStar
      onClick={svgClickHandler}
      size={50}
      className={classes["star"]}
    />
  );

  return (
    <Link to={`trail-detail/${trail._id}`}
      // onClick={linkClickHandler}
    >
      <li
        key={trail._id}
        // onClick={getIdHandler}
        className={classes["trail-item"]}
      >
        <div className={classes["image-container"]}>
          {trail.images && <img src={trail.images[0]} />}
        </div>
        <div className={classes["info-container"]}>
          <h2>{trail.trailName}</h2>
          {/* <div className={classes["secondary-info"]}> */}
          <h3>{`${trail.state} - ${trail.wildernessArea} `}</h3>
          {/* <h3>{`${props.miles} miles roundtrip - Difficulty:${props.difficulty}/10`}</h3> */}
          <div className={classes["miles-difficulty-container"]}>
            <h3>{`${trail.miles} miles roundtrip -`}&nbsp;</h3>
            <h3 className={classes[difficulty]}>
              {`Difficulty: ${trail.difficulty}/10`}
            </h3>
          </div>
          <div className={classes["description"]}>
            <p>{trail.description}</p>
          </div>
        </div>
        <button
          onClick={isFavoritedHandler}
          className={classes["favorites-button"]}
        >
          {favoriteIcon}
        </button>
      </li>
    </Link>
  );
}

export default TrailListItem





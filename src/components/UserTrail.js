import React from "react";
import classes from "./UserTrail.module.css";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { authActions } from "../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import hostURL from "../hosturl";

const UserTrail = (props) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.auth.favorites);
  const trailId = props.id;
  const trail = {
    _id: props.id,
    trailName: props.trailName,
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

  let difficulty;
  const calcDifficulty = function (diff) {
    if (+diff <= 3) difficulty = "easy";
    if (+diff > 3 && +diff < 7) difficulty = "moderate";
    if (+diff >= 7 && +diff <= 8) difficulty = "hard";
    if (+diff > 8) difficulty = "very-hard";
  };
  calcDifficulty(props.difficulty);

  const getTrails = () => {
    setTimeout(() => {
      props.onDeleteTrail();
    }, 1500);
  };

  // DELETES TRAIL FROM MONGODB AND TRAIL IMAGES FROM S3 BUCKETS
  const deleteTrailHandler = async (e) => {
    e.preventDefault();
    // Checks if item to be deleted is a favorite, and if it is, trail is removed from user's favorites array
    const existingFavorite = favorites.find((item) => item.trailId === trailId);
    if (existingFavorite) {
      console.log("trail was a favorite and is now being deleted");
      dispatch(authActions.toggleFavorites(trailId));
    }
    const token = localStorage.getItem("token");
    const trailData = {
      trailId: trailId,
      trailImages: trail.images,
    };

    try {
      const response = await fetch(`${hostURL}/trails/delete-trail`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trailData),
      });
      if (!response.ok) {
        throw new Error("Could not delete trail!");
      }
      const responseData = await response.json();
      console.log(responseData);
      props.onDelete();
      getTrails();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li key={trail._id} className={classes["trail-item"]}>
      <Link
        className={classes["trail-link"]}
        to={`trail-detail/${trail._id}`}
      ></Link>
      <div className={classes["image-container"]}>
        {trail.images && <img src={trail.images[0]} alt={trail.trailName} />}
        <div className={classes["loading-spinner"]}>
          <LoadingSpinner />
        </div>
      </div>
      <div className={classes["info-container"]}>
        <h2 className={classes['trail-title']}>{trail.trailName}</h2>

        <h3>{`${trail.state} - ${trail.wildernessArea} `}</h3>

        <div className={classes["miles-difficulty-container"]}>
          <p>{`${trail.miles} miles roundtrip -`}&nbsp;</p>
          <p className={classes[difficulty]}>
            {`Difficulty: ${trail.difficulty}/10`}
          </p>
        </div>
        <div className={classes["description"]}>
          <p>{trail.description}</p>
        </div>
      </div>
      <div className={classes["trail-controls"]}>
        <Link className={classes["edit-btn"]} to={`/edit-trail/${trailId}`}>
          Edit
        </Link>
        <button onClick={deleteTrailHandler} className={classes["delete-btn"]}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default UserTrail;

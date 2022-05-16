import React, { useState, useEffect } from 'react'
import classes from './TrailListItem.module.css'
import { Link } from 'react-router-dom'

const TrailListItem = (props) => {
    
     const storageFaves = localStorage.getItem("favorite-trails")
        ? JSON.parse(localStorage.getItem("favorite-trails"))
        : []
 
  

  console.log(storageFaves);
  
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("favorite-trails")) {
      setFavorites(
        localStorage.getItem("favorite-trails")
          ? JSON.parse(localStorage.getItem("favorite-trails"))
          : []
      );
    }
  }, [])
  
    // const [favorites, setFavorites] = useState(
    //   localStorage.getItem("favorite-trails")
    //     ? JSON.parse(localStorage.getItem("favorite-trails"))
    //     : []
    // );

    const [isFavorited, setIsFavorited] = useState(false);

    const faveIDs = favorites.map((trail) => trail.id);

    useEffect(() => {
      if (faveIDs.includes(props.trail.id)) {
        setIsFavorited(true);
        console.log("YEEEES");
      } 
      props.onFavoriteToggle();
    }, [favorites, props.trail.id]);


  const getIdHandler = (e) => {
    props.getTrail(props.id);
  }

  // Disables Link when Favorites Button is clicked so favorite state can be toggled without leaving the page
  const linkClickHandler = function (e) {
    if (e.target.className === "TrailListItem_favorites-button__FJ7Ki") {
      e.preventDefault();
    }
  }

  const faveHandler = function () {
    console.log(favorites);
    console.log(faveIDs);
    console.log(props.trail);

    let newFavorites;
    if (isFavorited) {
      setIsFavorited(false);
      console.log('UN-FAVORITED');
      newFavorites = storageFaves.filter(trail => trail.id !== props.trail.id);
    } else {
      setIsFavorited(true);
      console.log('FAVORITED');
      newFavorites = storageFaves.concat(props.trail);
    }
    console.log(newFavorites);
    setFavorites(newFavorites);
    localStorage.setItem("favorite-trails", JSON.stringify(newFavorites));
    props.onFavoriteToggle();
  };
  console.log(favorites);
   
  return (
    <Link
      to={`trail-detail/${props.id}`}
      onClick={linkClickHandler}
    >
      <li
        key={props.id}
        onClick={getIdHandler}
        className={classes["trail-item"]}
      >
        <div className={classes["image-container"]}>
          {props.image && <img src={props.image} />}
        </div>
        <div className={classes["info-container"]}>
          <button onClick={faveHandler} className={classes["favorites-button"]}>
            {isFavorited ? "REMOVE FROM FAVORITED" : "ADD TO FAVORITED"}
          </button>
          <h2>{props.name}</h2>
          <div className={classes["secondary-info"]}>
            <h3>{`${props.state} - ${props.wildernessArea} `}</h3>
            <h3>{`${props.miles} miles roundtrip - Difficulty: ${props.difficulty}/10`}</h3>
          </div>
          <div className={classes["description"]}>
            <p>{props.description}</p>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default TrailListItem

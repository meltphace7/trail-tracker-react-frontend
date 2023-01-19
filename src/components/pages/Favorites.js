import React, {useState, useEffect} from "react";
import classes from "./Favorites.module.css";
import TrailListItem from "../TrailListItem";
import { useSelector } from "react-redux";

const Favorites = (props) => {
  /////Pagination
  const resultsPerPage = 6;
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  /////

  const userFavorites = useSelector((state) => state.auth.favorites);

  useEffect(() => {
    setResults(userFavorites.slice(0, resultsPerPage));
  }, [userFavorites]);

  ////// PAGINATION //////////////////////
  useEffect(() => {
    setPage(1);
  }, [userFavorites]);

  const pages = Math.ceil(userFavorites.length / resultsPerPage);

  useEffect(() => {
    const calcResults = (page) => {
      let startIndex = (page - 1) * resultsPerPage;
      let endIndex = startIndex + resultsPerPage;
      let results = userFavorites.slice(startIndex, endIndex);
      setResults(results);
    };

    calcResults(page);
  }, [page, userFavorites]);

  const prevPageHandler = () => {
    if (page === 1) return;
    setPage((prevState) => prevState - 1);
    window.scrollTo(0, 0);
  };

  const nextPageHandler = () => {
    if (page === pages) return;
    setPage((prevState) => prevState + 1);
    window.scrollTo(0, 0);
  };
  /////////////
  return (
    <div className={classes["favorites"]}>
      <h1 className={classes["title"]}>FAVORITES</h1>
      {userFavorites.length === 0 && (
        <h3 className={classes["no-favorites"]}>No Favorites Yet</h3>
      )}
      <p>
        {userFavorites.length !== 0 ? `${userFavorites.length} results` : ""}
      </p>
      {/* {userFavorites.length !== 0 && <ul className={classes["favorites-list"]}>{renderFavorites}</ul>} */}
      {userFavorites && (
        <ul className={classes["favorites-list"]}>
          {results.map((trail) => {
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
      {userFavorites.length !== 0 && (
        <div className={classes["pagination-container"]}>
          <div className={classes["button-container"]}>
            {page > 1 && (
              <button
                onClick={prevPageHandler}
                className={classes["pagination-button"]}
              >
                Prev
              </button>
            )}
          </div>
          <p className={classes["pagination-num"]}>{`${page} of ${pages}`}</p>
          <div className={classes["button-container"]}>
            {page < pages && (
              <button
                onClick={nextPageHandler}
                className={classes["pagination-button"]}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;

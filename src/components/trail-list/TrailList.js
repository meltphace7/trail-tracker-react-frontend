import React, { useState, useEffect } from "react";
import classes from "./TrailList.module.css";
import TrailListItem from "./TrailListItem";
import { useSelector } from "react-redux";

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

const TrailList = (props) => {
      const reduxType = useSelector(
        (state) => state.trails.currentQueryType
      );
      const reduxQuery = useSelector(
        (state) => state.trails.currentSearchQuery
      );
  
  // const searchQuery = useSelector((state) => state.trails.currentSearchQuery);
  // Converts filter Query to Month Name if filterQuery is month Number
  const [month, setMonth] = useState("");

  useEffect(() => {
    if (isNaN(+reduxQuery)) return;
    if (reduxQuery === undefined || reduxQuery === '') return;
    const seasonNum = parseInt(reduxQuery, 10);
    const [season] = monthArray.filter((month) => month[0] === seasonNum);
    setMonth(season[1]);
  }, [reduxQuery]);

  //Pagination ////////////////
  const resultsPerPage = 10;
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(props.trails.slice(0, resultsPerPage));

  useEffect(() => {
    setPage(1);
  }, [props.trails]);

  const pages = Math.ceil(props.trails.length / resultsPerPage);

  useEffect(() => {
    const calcResults = (page) => {
      let startIndex = (page - 1) * resultsPerPage;
      let endIndex = startIndex + resultsPerPage;
      let results = props.trails.slice(startIndex, endIndex);
      setResults(results);
    };

    calcResults(page);
  }, [page, props.trails]);

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
  ///////////////

  const renderFilteredTrails = results.map((trail) => {
    return (
      <TrailListItem
        getTrail={props.onTrailSelect}
        key={trail._id}
        id={trail._id}
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
  });

  let title;

  if (reduxType === 'ALL') {
    title = "All Trails"
  } else if ((reduxType === "by-state") & (reduxQuery === "select")) {
    title = "Select A State"
  }
  else if ((reduxType === "by-season") & (reduxQuery === "select")) {
    title = "Select A Month";
  } else if (reduxType === "by-season") {
    title = `${month} Trails`;
  } else if ((reduxType === "by-wilderness") & (reduxQuery === "select")) {
    title = "Select Wilderness Area";
  } else if ((reduxType === "search") & (reduxQuery === "select")) {
    title = `Search Trail`;
  } else if (reduxType === "search") {
    title = `"${reduxQuery}" Trails`
  } else {
    title = `${reduxQuery} Trails`;
  }

  let paginationResults;
  if (reduxType === 'by-season' && reduxQuery !== 'select') {
    paginationResults = `${props.trails.length} results for ${month} - page ${page} of ${pages}`;
  } else if (reduxQuery !== 'select') {
    paginationResults = `${props.trails.length} results for ${reduxQuery} - page ${page} of ${pages}`;
  } else {
    paginationResults = '';
  }


  return (
    <div className={classes["trail-list-container"]}>
      <div className={classes["results-container"]}>
        <h1 className={classes["results-title"]}>
          {title}
        </h1>
        <p>{paginationResults}</p>
      </div>
      <ul className={classes["trail-list"]}>
        {props.trails.length === 0 ? (
          <p>No Matching Trails</p>
        ) : (
          renderFilteredTrails
        )}
      </ul>
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
    </div>
  );
};

export default TrailList;

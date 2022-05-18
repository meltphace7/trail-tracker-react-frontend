import React, { useState, useEffect} from "react";
import classes from "./TrailList.module.css";
import TrailListItem from "./TrailListItem";

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
  // Converts filter Query to Month Name if filterQuery is month Number
  const [month, setMonth] = useState("");




  useEffect(() => {
     if (isNaN(+props.filter.filterQuery)) return;
     const seasonNum = parseInt(props.filter.filterQuery, 10);
     const [season] = monthArray.filter((month) => month[0] === seasonNum);
     setMonth(season[1]);
   }, [props.trailFilter, props.filter]);

  //Pagination
  const resultsPerPage = 5;
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
  };

  const nextPageHandler = () => {
    if (page === pages) return;
    setPage((prevState) => prevState + 1);
  };

  // const getTrailHandler = function (e) {
  //   console.log(e);
  //   props.onTrailSelect();
  // }

  const renderFilteredTrails = results.map((trail) => {
    return (
     
      <TrailListItem
        getTrail={props.onTrailSelect}
        key={trail.id}
        id={trail.id}
        image={trail.imageURL[0]}
        name={trail.trailName}
        state={trail.state}
        miles={trail.miles}
        description={trail.description}
        difficulty={trail.difficulty}
        wildernessArea={trail.wildernessArea}
        onFavoriteToggle={props.onFavoriteToggle}
        trail={trail}
        favorites={props.favorites}
      />
    );
  });


  return (
    <div className={classes["trail-list-container"]}>
      <div className={classes["results-container"]}>
        <h1 className={classes["results-title"]}>
          {`${
            props.filter.filterType === "by-season"
              ? month
              : props.filter.filterQuery
          } Trails`}
        </h1>
        <p>{`${props.trails.length} results for "${
          props.filter.filterType === "by-season"
            ? month
            : props.filter.filterQuery
        }"  - page ${page} of ${pages}`}</p>
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
        <h3 className={classes["pagination-num"]}>{`${page} of ${pages}`}</h3>
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

import React, { useState, useEffect} from "react";
import classes from "./TrailList.module.css";
import TrailListItem from "./TrailListItem";


const TrailList = (props) => {
  const resultsPerPage = 8;
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(
    props.trails.slice(0, resultsPerPage)
  );

  useEffect(() => {
    setPage(1)
  }, [props.trails])
  
  const pages = Math.ceil(props.trails.length / resultsPerPage);

  useEffect(() => {
   const calcResults = (page) => {
     let startIndex = (page - 1) * resultsPerPage;
     let endIndex = startIndex + resultsPerPage;
     let results = props.trails.slice(startIndex, endIndex);
     setResults(results);
   };

   calcResults(page);
 }, [page, props.trails])
  
  const prevPageHandler = () => {
    console.log('click');
    if (page === 1) return;
    setPage((prevState) => prevState - 1)
  };

  const nextPageHandler = () => {
    if (page === pages) return;
     console.log("click");
     setPage((prevState) => prevState + 1)
  };

  const renderFilteredTrails = results.map((trail) => {
    return (
      <TrailListItem
        getTrail={props.onTrailSelect}
        key={trail.id}
        id={trail.id}
        name={trail.trailName}
        state={trail.state}
        wildernessArea={trail.wildernessArea}
      />
    );
  });
  return (
    <div className={classes["trail-list-container"]}>
      <div className={classes["results-container"]}>
        <p>{`${props.trails.length} results - page ${page} of ${pages}`}</p>
      </div>
      <ul className={classes["trail-list"]}>
        {props.trails.length === 0 ? (
          <p>No Matching Trails</p>
        ) : (
          renderFilteredTrails
        )}
      </ul>
      <div className={classes["pagination-container"]}>
        <div>
          {page > 1 && (
            <button
              onClick={prevPageHandler}
              className={classes["pagination-button"]}
            >
              Prev
            </button>
          )}
        </div>
        <h3 className={classes["pagination-num"]}>{page}</h3>
        <div>
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

import React from "react";
import classes from "./TrailSearchResults.module.css";
import TrailList from "../TrailList";
import TrailSearchForm from "../TrailSearchForm";

const TrailSearchResults = (props) => {

  const getFilterSelection = function (filter) {
    props.onFilterSelect(filter);
  };
  return (
    <div className={classes["trail-search-results"]}>
      <div className={classes["trail-search-form-container"]}>
        <TrailSearchForm
          trails={props.trails}
          onFilterSelection={getFilterSelection}
          filter={props.trailFilter}
        />
      </div>

      <TrailList
        onTrailSelect={props.onTrailSelect}
        trails={props.filteredTrails}
        filter={props.trailFilter}
        onFavoriteToggle={props.onFavoriteToggle}
        favoriteTrails={props.favorites}
      />
    </div>
  );
};

export default TrailSearchResults;

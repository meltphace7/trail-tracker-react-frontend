import React, { useState, useEffect } from "react";
import classes from "./TrailSearchForm.module.css";
import { useHistory } from "react-router-dom";

const TrailSearchForm = (props) => {
  const history = useHistory();
  // FINDS UNIQUE VALUES OF props.trails ARRAY
  const getUniqueValues = function (property) {
    const uniqueValues = [
      ...new Set(props.trails.map((trail) => trail[property])),
    ];
    return uniqueValues;
  };

  // UNIQUE PROPERTY VALUES AS VARIABLES
  const states = getUniqueValues("state");
  const wilderness = getUniqueValues("wildernessArea");

  const [filterType, setFilterType] = useState("all-trails");
  const [filterQuery, setFilterQuery] = useState("all-trails");
  const [filter, setFilter] = useState({
    filterType: filterType,
    filterQuery: filterQuery,
  });

  const handleFilterSelect = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterQuerySelect = (e) => {
    setFilterQuery(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(filterQuery === 'select') return
    setFilter({
      filterType: filterType,
      filterQuery: filterQuery,
    });

    console.log("SUBMIT");
    
    setTimeout(() => {
      history.push('/trails')
    }, 500);
  };;

  useEffect(() => {
    props.onFilterSelection(filter);
  }, [filter]);

  // JSX TO BE DYNAMICALLY RENDERED DEPENDING ON FILTER SELECTION

  // RENDERS STATE OPTIONS FOR filter by state OPTION
  const chooseState = (
    <div className="search-container">
      <label htmlFor="choose-state">Choose State</label>
      <select
        id="choose-state"
        name="choose-state"
        value={filterQuery}
        onChange={handleFilterQuerySelect}
      >
        <optgroup label="Choose State">
          <option key={Math.random()} value="select">
            Select a State
          </option>
          {states.map((trail) => {
            return (
              <option key={Math.random()} value={trail}>
                {trail}
              </option>
            );
          })}
        </optgroup>
      </select>
    </div>
  );

  // RENDERS WILDERNESS OPTIONS FOR filter by wilderness OPTION
  const chooseWilderness = (
    <div className="search-container">
      <label htmlFor="choose-wilderness">Choose Wilderness</label>
      <select
        id="choose-wilderness"
        name="choose-wilderness"
        value={filterQuery}
        onChange={handleFilterQuerySelect}
      >
        <optgroup label="Choose Wilderness">
          <option key={Math.random()} value="select">
            Select Wilderness
          </option>
          {wilderness.map((trail) => {
            return <option key={Math.random()}>{trail}</option>;
          })}
        </optgroup>
      </select>
    </div>
  );

  // RENDERS MONTH OPTIONS FOR filter by season OPTION

  const chooseMonth = (
    <div className="search-container">
      <label htmlFor="choose-month">Choose Month</label>
      <select
        id="choose-month"
        name="choose-month"
        value={filterQuery}
        onChange={handleFilterQuerySelect}
      >
        <optgroup label="Month">
          <option value="0">Choose Month</option>
          <option value="1">January</option>
          <option value="2">Febuary</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </optgroup>
      </select>
    </div>
  );

  return (
    <form onSubmit={formSubmitHandler} className={classes["trail-search"]}>
      <div className={classes["search-group"]}>
        <div className="search-container">
          <label htmlFor="filter-trails">Filter Trails</label>
          <select
            id="filter-trails"
            name="filter-trails"
            value={filterType}
            onChange={handleFilterSelect}
          >
            <optgroup label="Filter By">
              <option value="all-trails">All Trails</option>
              <option value="by-state">By State</option>
              <option value="by-wilderness">By Wilderness Area</option>
              <option value="by-season">By Season</option>
            </optgroup>
          </select>
        </div>
        {filterType === "by-state" && chooseState}
        {filterType === "by-wilderness" && chooseWilderness}
        {filterType === "by-season" && chooseMonth}
      </div>
        <button type="submit">Find A Trail!</button>
    </form>
  );
};

export default TrailSearchForm;

import React, { useState, useEffect } from "react";
import classes from "./TrailSearchForm.module.css";
import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { trailActions } from "../../store/trail-slice";
import ModalMessage from '../notifications/ModalMessage';

const TrailSearchForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentQueryType = useSelector(
    (state) => state.trails.currentQueryType
  );
  const currentTrailQuery = useSelector(
    (state) => state.trails.currentSearchQuery
  );
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
  // Alpha-Sort
  const alphaSortedStates = states.sort((a, b) => a.localeCompare(b));
  const alphaSortedWilderness = wilderness.sort((a, b) => a.localeCompare(b));

  const [filterType, setFilterType] = useState(currentQueryType);
  const [filterQuery, setFilterQuery] = useState(currentTrailQuery);

  const [filter, setFilter] = useState({
    filterType: filterType,
    filterQuery: filterQuery,
  });
  // Error Message
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleFilterSelect = (e) => {
    setFilterType(e.target.value);
  };

  useEffect(() => {
    if (filterType === "All") setFilterQuery("All");
  }, [filterType]);

  const handleFilterQuerySelect = (e) => {
    setFilterQuery(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (filterQuery === "All" && filterType === 'by-state') {
      setIsMessage(true);
      setMessage('Please select a state')
      return
    }
     if (filterQuery === "All" && filterType === "by-season") {
        setIsMessage(true);
        setMessage("Please select a month");
        return;
     }
      if (filterQuery === "All" && filterType === "by-wilderness") {
         setIsMessage(true);
         setMessage("Please select a wilderness area");
         return;
      }
    if (filterQuery === "select") return;
    setFilter({
      filterType: filterType,
      filterQuery: filterQuery,
    });
    const searchQuery = {
      filterType: filterType,
      filterQuery: filterQuery,
    };
    dispatch(trailActions.setQuery(searchQuery));

    setTimeout(() => {
      // history.push("/trails");
       navigate("/trails");
    }, 500);
  };

  useEffect(() => {
    props.onFilterSelection(filter);
  }, [filter, props]);

  const closeModalHandler = () => {
    setIsMessage(false);
    setMessage('');
  }


  // RENDERS STATE OPTIONS FOR filter by state OPTION
  const chooseState = (
    <div className="search-container">
      {/* <label htmlFor="choose-state">Choose State</label> */}
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
          {alphaSortedStates.map((trail) => {
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
      {/* <label htmlFor="choose-wilderness">Choose Wilderness</label> */}
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
          {alphaSortedWilderness.map((trail) => {
            return <option key={Math.random()}>{trail}</option>;
          })}
        </optgroup>
      </select>
    </div>
  );

  // RENDERS MONTH OPTIONS FOR filter by season OPTION
  const chooseMonth = (
    <div className="search-container">
      {/* <label htmlFor="choose-month">Choose Month</label> */}
      <select
        id="choose-month"
        name="choose-month"
        value={filterQuery}
        onChange={handleFilterQuerySelect}
      >
        <optgroup label="Month">
          <option value="0">Select Month</option>
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
          <select
            id="filter-trails"
            name="filter-trails"
            value={filterType}
            onChange={handleFilterSelect}
          >
            <optgroup label="Filter By">
              <option value="All">All Trails</option>
              <option value="by-state">Filter By State</option>
              <option value="by-wilderness">Filter By Wilderness Area</option>
              <option value="by-season">Filter By Season</option>
            </optgroup>
          </select>
        </div>
        {filterType === "by-state" && chooseState}
        {filterType === "by-wilderness" && chooseWilderness}
        {filterType === "by-season" && chooseMonth}
      </div>
      <button type="submit">Search Trails</button>
      {isMessage && <ModalMessage onCloseModal={closeModalHandler} message={message} />}
    </form>
  );
};

export default TrailSearchForm;

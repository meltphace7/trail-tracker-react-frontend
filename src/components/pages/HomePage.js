import React, { useState, useEffect } from "react";
import TrailSearchForm from "../TrailSearchForm";
import classes from "./HomePage.module.css";
import HomepageTrailMap from "../HomepageTrailMap";
import LoadingSpinner from "../UI/LoadingSpinner";


const HomePage = (props) => {
  const getFilterSelection = function (filter) {
    props.onFilterSelect(filter);
  };

  const [trailsAreLoaded, setTrailsAreLoaded] = useState(false);

  useEffect(() => {
    if (props.trails.length > 0) {
      setTrailsAreLoaded(true);
}
  }, [props.trails])

  // const getIdHandler = () => {
  //   props.getTrail(props.id);
  // };

  // const getTrailData = function (id) {
  //   props.onTrailSelect(id);
  // };

  // let randomTrails = [];
  // const generateRandomTrails = function () {
  //    while (randomTrails.length < 3) {
  //      let num =
  //        props.trails[Math.round(Math.random() * props.trails.length)];
  //      if (!randomTrails.includes(num)) {
  //         randomTrails.push(num)
  //      }

  //    }
  // }

  // generateRandomTrails();

  //   const randomTrails = [
  //     props.trails[Math.round(Math.random() * props.trails.length)],
  //     props.trails[Math.round(Math.random() * props.trails.length)],
  //     props.trails[Math.round(Math.random() * props.trails.length)],
  //   ];

  // console.log(randomTrails);

  const loadingMessage = (
    <div className={classes["loading-message"]}>
      <div className={classes.spinner}>
      </div>
      <h3>Loading trails...</h3>
    </div>
  );

  return (
    <React.Fragment>
      <div className={classes["home-container"]}>
        <div className={classes["home-search-container"]}>
          <h1>FIND A TRAIL!</h1>
          <TrailSearchForm
            trails={props.trails}
            onFilterSelection={getFilterSelection}
            filter={props.trailFilter}
          />
        </div>
      </div>
      <div className={classes["map-section"]}>
        <div className={classes["map-section-title"]}>
          {trailsAreLoaded ? <h1>Trails</h1> : loadingMessage}
        </div>
        <HomepageTrailMap trails={props.trails} />
      </div>
    </React.Fragment>
  );
};

export default HomePage;

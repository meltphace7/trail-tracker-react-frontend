import React, { useState, useEffect } from "react";
import TrailSearchForm from "../components/trail-search-form/TrailSearchForm";
import classes from "./HomePage.module.css";
import HomepageTrailMap from "../components/home/HomepageTrailMap";
// import LoadingSpinner from "../components/UI/LoadingSpinner";
import FeaturedTrails from '../components/home/FeaturedTrails';


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

  const featuredTrails = [
    props.trails[3],
    props.trails[12],
    props.trails[9],
    props.trails[17],
    props.trails[30],
    props.trails[39],
  ];

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
      <FeaturedTrails featuredTrails={featuredTrails} />
      <div className={classes["map-section"]}>
        <div className={classes["map-section-title"]}>
          {trailsAreLoaded ? <h2>Select From Map</h2> : loadingMessage}
        </div>
        <HomepageTrailMap trails={props.trails} />
      </div>
    </React.Fragment>
  );
};

export default HomePage;

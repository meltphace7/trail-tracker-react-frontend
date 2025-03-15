import React, { useState, useEffect } from "react";
import TrailSearchForm from "../components/trail-search-form/TrailSearchForm";
import classes from "./HomePage.module.css";
import HomepageTrailMap from "../components/home/HomepageTrailMap";
import FeaturedTrails from '../components/home/FeaturedTrails';
import AboutSection from '../components/home/AboutSection'


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
          <h1>FIND YOUR TRAIL</h1>
          <TrailSearchForm
            trails={props.trails}
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
      <AboutSection />
    </React.Fragment>
  );
};

export default HomePage;

import React, { useEffect } from "react";
import TrailSearchForm from "../TrailSearchForm";
import classes from "./HomePage.module.css";
import HomepageTrailMap from '../HomepageTrailMap';
// import TrailMap from '../TrailMap';
// import FeaturedHike from "../FeaturedHike";

const HomePage = (props) => {
  const getFilterSelection = function (filter) {
    props.onFilterSelect(filter);
  };

  const getIdHandler = () => {
    props.getTrail(props.id);
  };

  const getTrailData = function (id) {
    props.onTrailSelect(id);
  };
   
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
        <h1>{`Trails`}</h1>
        <HomepageTrailMap trails={props.trails} />
      </div>
      <div className={classes["featured-hikes-section"]}>
        {/* <TrailMap trails={props.trails}
          coords={coords}
        /> */}
        {/* <h1>Featured Trails</h1> */}
        {/* <div className={classes["featured-hikes-container"]}>
          {props.trails.slice(3, 6).map((trail) => {
            return (
              <FeaturedHike
                getTrailId={getIdHandler}
                key={trail.id}
                trailData={trail}
                getTrail={getTrailData}
              />
            );
          })}
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default HomePage;

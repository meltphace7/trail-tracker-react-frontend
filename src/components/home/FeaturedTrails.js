import React from 'react'
import classes from './FeaturedTrails.module.css'
import {useState, useEffect} from 'react';
import FeaturedTrailItem from './FeaturedTrailItem'

const FeaturedTrails = (props) => {
      const [trailsAreLoaded, setTrailsAreLoaded] = useState(false);
    
      useEffect(() => {
        if (props.featuredTrails[0] !== undefined) {
          setTrailsAreLoaded(true);
    }
      }, [props.featuredTrails])
    
      let difficulty;
      const calcDifficulty = function (diff) {
        if (+diff <= 3) difficulty = "Easy";
        if (+diff > 3 && +diff < 7) difficulty = "Moderate";
        if (+diff >= 7 && +diff <= 8) difficulty = "Hard";
        if (+diff > 8) difficulty = "Very-Hard";
      };

    let renderFeaturedTrails
    if (props.featuredTrails[0] !== undefined) {
        renderFeaturedTrails = props.featuredTrails.map((trail, index) => {
             calcDifficulty(trail.difficulty);
            return (
                <FeaturedTrailItem
                    key={trail._id}
                        id={trail._id}
                    link={`/trail-detail/${trail._id}`}
                    img={trail.images[0]}
                    trailName={trail.trailName}
                    wildernessArea={trail.wildernessArea}
                    state={trail.state}
                    difficulty={difficulty}
                    miles={trail.miles}
                 />
            );
        } )
    }

      const loadingMessage = (
        <div className={classes["loading-message"]}>
          <div className={classes.spinner}></div>
          <h3>Loading trails...</h3>
        </div>
      );

  return (
    <section className={classes["featured-trails-section"]}>
      <h2>Featured Trails</h2>
      {!trailsAreLoaded && loadingMessage}
     
      <ul
        className={`${classes["featured-trails__list"]} ${classes["media-scroller"]} ${classes["snaps-inline"]}`}
      >
        {trailsAreLoaded && renderFeaturedTrails}
      </ul>
    </section>
  );
}

export default FeaturedTrails
import React, {useEffect} from 'react'
import TrailSearchForm from './TrailSearchForm'
import classes from './HomePage.module.css'
import FeaturedHike from './FeaturedHike'

const HomePage = (props) => {

    const getFilterSelection = function (filter) {
      props.onFilterSelect(filter);
    }
  
  const getIdHandler = () => {
    props.getTrail(props.id);
  };

  const getTrailData = function (id) {
    props.onTrailSelect(id)
  }
  
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
            />
          </div>
            </div>
            <div className={classes["featured-hikes-section"]}>
              <h1>Featured Trails</h1>
                <div className={classes['featured-hikes-container']}>
                    {props.trails.slice(28, 31).map(trail => {
                        return (
                          <FeaturedHike
                            getTrailId={getIdHandler}
                            key={trail.id}
                            trailData={trail}
                            getTrail={getTrailData}
                            />
                     )
                 } )}
              </div>
            </div>
      </React.Fragment>
    );
}

export default HomePage

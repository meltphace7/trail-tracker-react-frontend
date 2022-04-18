import React, {useState} from 'react'
import classes from './MainPage.module.css'
import TrailList from './TrailList'
import TrailDetail from "./TrailDetail";

const MainPage = (props) => {
  const [selectedTrail, setSelectedTrail] = useState({})
  
   const getSelectedTrail = (trailID) => {
     const trail = props.trails.find((trail) => trail.id === trailID);
      setSelectedTrail(trail)
   };
  
    return (
      <div className={classes["main-page"]}>
        <TrailList onTrailSelect={getSelectedTrail} trails={props.trails} />
        <TrailDetail trail={selectedTrail} />
      </div>
    );
}

export default MainPage

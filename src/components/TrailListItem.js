import React from 'react'
import classes from './TrailListItem.module.css'

const TrailListItem = (props) => {
  const getIdHandler = () => {
    props.getTrail(props.id);
  }
   
    return (
      <li
        key={props.id}
        onClick={getIdHandler}
        className={classes["trail-item"]}
      >
        <div className={classes["info-container"]}>
          <h2>{props.name}</h2>
          <div className={classes["secondary-info"]}>
            <h3>{`${props.state} - ${props.wildernessArea} `}</h3>
          </div>
        </div>
      </li>
    );
}

export default TrailListItem

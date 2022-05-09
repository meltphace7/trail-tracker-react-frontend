import React from 'react'
import classes from './TrailListItem.module.css'
import { Link } from 'react-router-dom'

const TrailListItem = (props) => {
  const getIdHandler = () => {
    props.getTrail(props.id);
  }
   
  return (
    <Link to={`trail-detail/${props.id}`}>
      <li
        key={props.id}
        onClick={getIdHandler}
        className={classes["trail-item"]}
      >
        <div className={classes["image-container"]}>
          <img src={props.image} />
        </div>
        <div className={classes["info-container"]}>
          <h2>{props.name}</h2>
          <div className={classes["secondary-info"]}>
            <h3>{`${props.state} - ${props.wildernessArea} `}</h3>
            <h3>{`${props.miles} miles roundtrip - Difficulty: ${props.difficulty}/10`}</h3>
          </div>
          <div className={classes["description"]}>
            <p>{props.description}</p>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default TrailListItem

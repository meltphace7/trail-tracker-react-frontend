import React from 'react'
import classes from './TrailListItem.module.css'

const TrailListItem = (props) => {
    return (
      <li className={classes["trail-item"]}>
        <h2>{props.name}</h2>
        <div className={classes['secondary-info']}>
          <h3>{props.state}</h3>
          <h3>{props.wildernessArea}</h3>
        </div>
      </li>
    );
}

export default TrailListItem

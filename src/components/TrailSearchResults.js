import React from 'react'
import classes from './TrailSearchResults.module.css'
import TrailList from './TrailList'


const TrailSearchResults = (props) => {
    return (
        <div className={classes['trail-search-results']}>
            <TrailList onTrailSelect={props.onTrailSelect} trails={props.trails} filter={props.trailFilter}  />
        </div>
    )
}

export default TrailSearchResults

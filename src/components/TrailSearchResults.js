import React from 'react'
import classes from './TrailSearchResults.module.css'
import TrailList from './TrailList'


const TrailSearchResults = (props) => {
    console.log(props.trails);

    return (
        <div className={classes['trail-search-results']}>
            <TrailList trails={props.trails} />
        </div>
    )
}

export default TrailSearchResults

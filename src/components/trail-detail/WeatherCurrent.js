import React from 'react'
import classes from './WeatherCurrent.module.css'

const WeatherCurrent = (props) => {
    return (
      <div className={classes["current-weather-container"]}>
        <h2>Currently...</h2>
        <div className={classes["weather-stats"]}>
          <h3>{props.curWeather}</h3>
          <img
            className={classes["weather-icon"]}
            src={`/imgs/icons/weather-icons/${props.icon}.png`}
            alt={`${props.weatherIcon} Icon`}
          />
          <h3 className={classes.temp}>{`${props.curTemp}° F`}</h3>
        </div>
      </div>
    );
}

export default WeatherCurrent

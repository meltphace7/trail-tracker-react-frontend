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
            src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
          />
          <h3 className={classes.temp}>{`${Math.round(props.curTemp)}° F`}</h3>
        </div>
      </div>
    );
}

export default WeatherCurrent

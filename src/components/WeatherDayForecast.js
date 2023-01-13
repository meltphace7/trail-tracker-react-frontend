import React, { useEffect } from "react";
import classes from "./WeatherDayForecast.module.css";

// const dayArray = [
//   ["0", "Sunday"],
//   ["1", "Monday"],
//   ["2", "Tuesday"],
//   ["3", "Wednesday"],
//   ["4", "Thursday"],
//   ["5", "Friday"],
//   ["6", "Saturday"],
// ];

const WeatherDayForecast = (props) => {
  const [weather] = props.weather;
  const icon = weather.icon;
  const weatherDescription = weather.description;
  const high = Math.round(props.highTemp);
  const low = Math.round(props.lowTemp);
  const dateNumberFormat = props.date;
  const dateString = new Date(dateNumberFormat * 1000).toString();
  const day = dateString.slice(0, 3);

  useEffect(() => {}, []);

  //   const [dayPair] = dayArray.filter((day) => dayNum.toString() === day[0]);
  //   const dayName = dayPair[1];

  // console.log(props.date.getDay());

  return (
    <div className={classes["day-container"]}>
      <h1>{day}</h1>
      <h3>{weatherDescription}</h3>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='weather icon' />
      <p>{`High: ${high}° F`}</p>
      <p>{`Low: ${low}° F`}</p>
    </div>
  );
};

export default WeatherDayForecast;

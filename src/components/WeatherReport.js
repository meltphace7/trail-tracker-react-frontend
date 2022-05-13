import React, { useState, useEffect } from "react";
import classes from "./WeatherReport.module.css";
import WeatherDayForecast from "./WeatherDayForecast";
import WeatherCurrent from './WeatherCurrent';

const WeatherReport = (props) => {
  const [curTemp, setCurTemp] = useState("");
  const [curWeather, setCurWeather] = useState("");
  const [weatherForecast, setWeatherForecast] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getWeather = async function (coordinates) {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${
            coordinates[0]
          }&lon=${
            coordinates[1]
          }&exclude=minutely&units=imperial&appid=${"9418ca858afd140d5a2ec6a614c1d7a9"}`
        );
          const data = await res.json();
        const [currentWeather] = data.current.weather;
        setCurTemp(data.current.temp);
          setCurWeather(currentWeather.description);
        setWeatherForecast(data.daily);
        setWeatherIcon(currentWeather.icon);
      } catch (err) {
        throw err;
      }
    };
    getWeather(props.coords);
    setIsLoading(false);
  }, [props.coords]);

  return (
    <div className={classes["weather-container"]}>
      <h1>Weather</h1>
      {isLoading && <h3>Loading...</h3>}
      {!isLoading && (
        <WeatherCurrent
          curWeather={curWeather}
          curTemp={curTemp}
          icon={weatherIcon}
        />
      )}
      <div className={classes["forecast-container"]}>
        <h1>5 Day Forecast</h1>
        <div className={classes["forecast"]}>
          {weatherForecast &&
            weatherForecast.slice(0, 5).map((day) => {
              return (
                <WeatherDayForecast
                  key={day.dt}
                  date={day.dt}
                  weather={day.weather}
                  highTemp={day.temp.max}
                  lowTemp={day.temp.min}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WeatherReport;
import React, { useState, useEffect, useCallback } from "react";
import classes from "./WeatherReport.module.css";
import WeatherDayForecast from "./WeatherDayForecast";
import WeatherCurrent from "./WeatherCurrent";
import hostURL from "../hosturl";

const WeatherReport = (props) => {
  const [curTemp, setCurTemp] = useState("");
  const [curWeather, setCurWeather] = useState("");
  const [weatherForecast, setWeatherForecast] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getWeather = useCallback(async function () {
    const latitude = props.coords[0];
    const longitude = props.coords[1];
    try {
      const keyResponse = await fetch(`${hostURL}/trails/get-trail-weather`);
      if (!keyResponse.ok) {
        throw new Error("Could not get weather data!");
      }
      const keyData = await keyResponse.json();
      const weatherKey = keyData.openWeatherKey;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=imperial&appid=${weatherKey}`
      );
      if (!response.ok) {
        throw new Error("Could not get weather data!");
      }
      const data = await response.json();
     
      const [currentWeather] = data.current.weather;
      setCurTemp(data.current.temp);
      setCurWeather(currentWeather.description);
      setWeatherForecast(data.daily);
      setWeatherIcon(currentWeather.icon);
    } catch (err) {
      throw err;
    }
    setIsLoading(false);
  }, [props.coords]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  return (
    <div className={classes["weather-container"]}>
      <h1 className={classes["weather-title"]}>Weather</h1>
      {isLoading && <h3>Loading...</h3>}
      {!isLoading && (
        <WeatherCurrent
          curWeather={curWeather}
          curTemp={curTemp}
          icon={weatherIcon}
        />
      )}
      <div className={classes["forecast-container"]}>
        <h2 className={classes["forecast-title"]}>5 Day Forecast</h2>
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

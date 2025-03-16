import React, { useState, useEffect, useCallback, useRef } from "react";
import classes from "./WeatherReport.module.css";
import WeatherDayForecast from "./WeatherDayForecast";
import WeatherCurrent from "./WeatherCurrent";
import hostURL from "../../hosturl";

const WeatherReport = (props) => {
    const didFetchWeatherData = useRef(false);
  // CURRENT WEATHER
  const [curTemp, setCurTemp] = useState("");
  const [curWeather, setCurWeather] = useState("");
  const [curIcon, setCurIcon] = useState("");

  // SEVEN DAY FORECAST
  const [weatherForecast, setWeatherForecast] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);

  function getDayName(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { weekday: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const getWeather = useCallback(
    async function () {
      const latitude = props.coords[0];
      const longitude = props.coords[1];
      try {
        const keyResponse = await fetch(`${hostURL}/trails/get-trail-weather`);
        if (!keyResponse.ok) {
          throw new Error("Could not get weather data!");
        }
        const keyData = await keyResponse.json();
        const weatherKey = keyData.pirateWeatherKey;

        const pirateURL = `https://api.pirateweather.net/forecast/${weatherKey}/${latitude},${longitude}
     
      `;

        const response = await fetch(pirateURL);
        if (!response.ok) {
          throw new Error("Could not get weather data!");
        }
        const data = await response.json();
        console.log(data);
        setCurTemp(Math.round(data.currently.temperature));
        setCurWeather(data.daily.data[0].summary);
        setCurIcon(data.currently.icon)

        const forecast = [];

        for (let i = 0; i < data.daily.data.length; i++) {
          const day = {};
          day.day = getDayName(data.daily.data[i].time);
          day.hi = Math.round(data.daily.data[i].temperatureHigh);
          day.low = Math.round(data.daily.data[i].temperatureLow);
          day.weather = data.daily.data[i].summary;
          day.icon = data.daily.data[i].icon;

          forecast.push(day);
        }
        setWeatherForecast(forecast);

      } catch (err) {
        throw err;
      }
      setIsLoading(false);
    },
    [props.coords]
  );

  useEffect(() => {
      if (!didFetchWeatherData.current) {
      getWeather();
        didFetchWeatherData.current = true;
      }
  }, []);

  return (
    <div className={classes["weather-container"]}>
      <h1 className={classes["weather-title"]}>Weather</h1>
      {isLoading && <h3>Loading...</h3>}
      {!isLoading && (
        <WeatherCurrent
          curWeather={curWeather}
          curTemp={curTemp}
          icon={curIcon}
        />
      )}
      <div className={classes["forecast-container"]}>
        <h2 className={classes["forecast-title"]}>5 Day Forecast</h2>
        <div className={classes["forecast"]}>
          {weatherForecast &&
            weatherForecast.slice(0, 5).map((day, index) => {
              return (
                <WeatherDayForecast
                  key={index}
                  date={day.day}
                  weather={day.weather}
                  highTemp={day.hi}
                  lowTemp={day.low}
                  icon={day.icon}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WeatherReport;

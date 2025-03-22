import classes from "./WeatherDayForecast.module.css";

const WeatherDayForecast = (props) => {
  return (
    <div className={classes["day-container"]}>
      <h3 className={classes["day"]}>{props.date}</h3>
      <div className={classes["weather-stats"]}>
        <p className={classes["weather-description"]}>{props.weather}</p>
        <img
          className={classes["weather-icon"]}
          src={`/imgs/icons/weather-icons/${props.icon}.png`}
          alt="weather icon"
        />
        <p className={classes["weather-temp"]}>
          {`${props.highTemp}°/`}
          <span>{`${props.lowTemp}°`}</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherDayForecast;

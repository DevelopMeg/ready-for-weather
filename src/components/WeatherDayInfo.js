import React, { useContext } from "react";

import DateTimeBox from "components/DateTimeBox";
import WeatherAlertBox from "components/WeatherAlertBox";

import { DataFetchContext } from "context/DataFetchContext";

import { convertSecToTime } from "utils/utils";

const WeatherDayInfo = () => {
  const { geographicData, weatherInfo } = useContext(DataFetchContext);
  const currentWeather = weatherInfo.weather.current;
  const alertsWeather = weatherInfo.weather.alerts;

  const searchCity = geographicData.searchCity;
  const {
    temp,
    feels_like,
    sunrise,
    sunset,
    pressure,
    wind_speed,
    clouds,
    rain,
    snow,
  } = currentWeather;

  const { description } = currentWeather.weather[0];

  const sunriseHour = convertSecToTime(sunrise);
  const sunsetHour = convertSecToTime(sunset);

  return (
    <section>
      <DateTimeBox />

      <h3>{searchCity}</h3>

      <section>
        <h4>{Math.floor(temp)} &#8451;</h4>
        <p>perceptible temp: {Math.floor(feels_like)} &#8451; </p>
        <div>
          <p>sunrise: {sunriseHour}</p>
          <p>sunset: {sunsetHour}</p>
        </div>
      </section>

      <section>
        <h4>{description}</h4>
        <p>pressure: {pressure} hPa</p>
        <p>wind speed: {wind_speed} m/s</p>
        <p>clouds: {clouds} %</p>

        {rain ? <p>rain: {rain["1h"]} mm</p> : <p>rain: 0 mm</p>}
        {snow ? <p>snow: {snow["1h"]} mm</p> : <p>snow: 0 mm</p>}
      </section>

      {alertsWeather ? (
        <WeatherAlertBox alertsWeather={alertsWeather[0]} />
      ) : null}
    </section>
  );
};

export default WeatherDayInfo;

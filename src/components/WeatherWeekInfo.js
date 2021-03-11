import React, { useContext } from "react";

import WeatherDayOfWeekInfo from "components/WeatherDayOfWeekInfo";

import { DataFetchContext } from "context/DataFetchContext";

const WeatherWeekInfo = () => {
  const { weatherInfo } = useContext(DataFetchContext);

  const fiveDaysWeather = weatherInfo.weather.daily.slice(1, 6);

  const weatherWeek = fiveDaysWeather.map((day) => {
    return <WeatherDayOfWeekInfo key={day.dt} dayOfWeek={day} />;
  });

  return <section>{weatherWeek}</section>;
};

export default WeatherWeekInfo;

import React, { useContext } from "react";

import WeatherDayOfWeekInfo from "components/WeatherDayOfWeekInfo";

import { DataFetchContext } from "context/DataFetchContext";

import styled from "styled-components";

const SectionWeatherWeek = styled.section`
  @media (min-width: 1024px) {
    display: flex;
  }
`;

const WeatherWeekInfo = () => {
  const { weatherInfo } = useContext(DataFetchContext);

  const fiveDaysWeather = weatherInfo.weather.daily.slice(1, 6);

  const weatherWeek = fiveDaysWeather.map((day) => {
    return <WeatherDayOfWeekInfo key={day.dt} dayOfWeek={day} />;
  });

  return <SectionWeatherWeek>{weatherWeek}</SectionWeatherWeek>;
};

export default WeatherWeekInfo;

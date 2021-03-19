import React, { useContext } from "react";

import WeatherDayInfo from "components/WeatherDayInfo";
import WeatherWeekInfo from "components/WeatherWeekInfo";

import { DataFetchContext } from "context/DataFetchContext";

import styled from "styled-components";

const WeatherBox = styled.div`
  @media (min-width: 1024px) {
    flex-grow: 1;
  }
`;

const Weather = () => {
  const { geographicData } = useContext(DataFetchContext);
  const errFoundCity = geographicData.errorGeographicData;

  return (
    <>
      {!errFoundCity ? (
        <WeatherBox>
          <WeatherDayInfo />
          <WeatherWeekInfo />
        </WeatherBox>
      ) : null}
    </>
  );
};

export default Weather;

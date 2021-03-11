import React, { useContext } from "react";

import WeatherDayInfo from "components/WeatherDayInfo";
import WeatherWeekInfo from "components/WeatherWeekInfo";

import { DataFetchContext } from "context/DataFetchContext";

const WeatherInfo = () => {
  const { geographicData } = useContext(DataFetchContext);

  const errFoundCity = geographicData.errorGeographicData;

  return (
    <section>
      {!errFoundCity ? (
        <>
          <WeatherDayInfo />
          <WeatherWeekInfo />
        </>
      ) : null}
    </section>
  );
};

export default WeatherInfo;

import React, { useContext, useEffect, useRef } from "react";

import WeatherDayInfo from "components/WeatherDayInfo";
import WeatherWeekInfo from "components/WeatherWeekInfo";

import { DataFetchContext } from "context/DataFetchContext";
import { SavedSearchesContext } from "context/SavedSearchesContext";

const WeatherInfo = () => {
  const { geographicData } = useContext(DataFetchContext);
  const errFoundCity = geographicData.errorGeographicData;

  const { setHeightSavedSearches } = useContext(SavedSearchesContext);

  const weatherBoxRef = useRef();

  useEffect(() => {
    if (!errFoundCity) {
      setHeightSavedSearches(weatherBoxRef.current.offsetHeight);
    }
  }, [errFoundCity]);

  return (
    <>
      {!errFoundCity ? (
        <div ref={weatherBoxRef}>
          <WeatherDayInfo />
          <WeatherWeekInfo />
        </div>
      ) : null}
    </>
  );
};

export default WeatherInfo;

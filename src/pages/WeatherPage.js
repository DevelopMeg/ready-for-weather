import React, { useContext } from "react";

import SearchBar from "components/SearchBar";
import WeatherDayInfo from "components/WeatherDayInfo";
import WeatherWeekInfo from "components/WeatherWeekInfo";
import SavedSearches from "components/SavedSearches";

import { DataFetchContext } from "context/DataFetchContext";

const WeatherPage = () => {
  const { weatherInfo } = useContext(DataFetchContext);

  const loading = weatherInfo.loadingWeather;

  return (
    <>
      <SearchBar />
      {loading ? (
        "Loading..."
      ) : (
        <>
          <WeatherDayInfo />
          <WeatherWeekInfo />
          <SavedSearches />
        </>
      )}
    </>
  );
};

export default WeatherPage;

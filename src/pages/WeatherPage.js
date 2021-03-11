import React, { useContext } from "react";

import SearchBar from "components/SearchBar";
import WeatherInfo from "components/WeatherInfo";
import SavedSearches from "components/SavedSearches";

import { DataFetchContext } from "context/DataFetchContext";

const WeatherPage = () => {
  const { weatherInfo } = useContext(DataFetchContext);

  const { loadingWeather, errorWeather } = weatherInfo;

  return (
    <>
      <SearchBar />
      {loadingWeather ? (
        "Loading..."
      ) : !errorWeather ? (
        <>
          <WeatherInfo />
          <SavedSearches />
        </>
      ) : (
        <p>data download error</p>
      )}
    </>
  );
};

export default WeatherPage;

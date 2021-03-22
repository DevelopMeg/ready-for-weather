import React, { useContext } from "react";

import SearchBar from "components/SearchBar";
import Weather from "components/Weather";
import SavedSearches from "components/SavedSearches";
import LoaderSun from "components/LoaderSun";
import Svg from "components/Svg";

import { DataFetchContext } from "context/DataFetchContext";

import styled from "styled-components";
import { ErrorDownloadData } from "components/GlobalStyles";

const SectionWeatherPage = styled.section`
  padding-bottom: 20px;
  width: 100%;
`;

const WeatherPageBox = styled.div`
  @media (min-width: 1024px) {
    display: flex;
  }

  @media (min-width: 1600px) {
    margin: 0 auto;
    width: 95%;
  }

  @media (min-width: 1900px) {
    width: 85%;
  }
`;

const WeatherPage = () => {
  const { weatherInfo } = useContext(DataFetchContext);

  const { loadingWeather, errorWeather } = weatherInfo;

  return (
    <SectionWeatherPage>
      <SearchBar page="weather-page" />
      {loadingWeather ? (
        <LoaderSun />
      ) : !errorWeather ? (
        <WeatherPageBox>
          <Svg></Svg>
          <Weather />
          <SavedSearches />
        </WeatherPageBox>
      ) : (
        <ErrorDownloadData>data download error</ErrorDownloadData>
      )}
    </SectionWeatherPage>
  );
};

export default WeatherPage;

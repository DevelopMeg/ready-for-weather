import React, { useContext } from "react";

import SearchBar from "components/SearchBar";
import Weather from "components/Weather";
import SavedSearches from "components/SavedSearches";
import LoaderSun from "components/LoaderSun";

import { DataFetchContext } from "context/DataFetchContext";

import styled from "styled-components";
import { ErrorDownloadData } from "components/GlobalStyles";

import imageAside from "assets/image-aside.jpg";

const SectionWeatherPage = styled.section`
  width: 100%;

  @media (min-width: 1024px) {
    padding-bottom: 20px;
  }
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
    width: 80%;
  }
`;

const ImageAside = styled.aside`
  height: 100px;
  background-image: url(${imageAside});
  background-size: cover;
  background-position: 95%;

  @media (min-width: 1024px) {
    height: auto;
    flex-basis: 10%;
  }

  @media (min-width: 1100px) {
    flex-basis: 15%;
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
          <ImageAside />
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

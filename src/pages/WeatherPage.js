import React, { useContext } from "react";

import SearchBar from "components/SearchBar";
import Weather from "components/Weather";
import SavedSearches from "components/SavedSearches";
import LoaderSun from "components/LoaderSun";

import { DataFetchContext } from "context/DataFetchContext";

import styled from "styled-components";
import { ErrorDownloadData } from "components/GlobalStyles";

import minImageAside from "assets/image-aside_min.jpg";
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
  background-image: url(${minImageAside});
  background-size: cover;
  background-position: 95%;

  @media (min-width: 1024px) {
    height: auto;
    flex-basis: 10%;
    background-image: url(${imageAside});
  }

  @media (min-width: 1100px) {
    flex-basis: 15%;
  }
`;

const WeatherPage = () => {
  const { weatherInfo, geographicData } = useContext(DataFetchContext);

  const errFoundCity = geographicData.errorGeographicData;

  const { loadingWeather, errorWeather } = weatherInfo;

  return (
    <SectionWeatherPage>
      <SearchBar page="weather-page" />
      {loadingWeather ? (
        <LoaderSun />
      ) : !errorWeather ? (
        !errFoundCity ? (
          <WeatherPageBox>
            <ImageAside />
            <Weather />
            <SavedSearches />
          </WeatherPageBox>
        ) : null
      ) : (
        <ErrorDownloadData>data download error</ErrorDownloadData>
      )}
    </SectionWeatherPage>
  );
};

export default WeatherPage;

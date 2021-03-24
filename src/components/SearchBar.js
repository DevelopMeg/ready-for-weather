import React, { useContext, useEffect, useState } from "react";

import { DataFetchContext } from "context/DataFetchContext";

import { useHistory } from "react-router-dom";

import styled from "styled-components";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import { faSearch } from "../../node_modules/@fortawesome/free-solid-svg-icons";

const SearchForm = styled.form`
  box-shadow: ${(props) => (props.error ? "0 0 8px 1px #e24444" : null)};
  width: ${(props) => (props.page === "weather-page" ? 90 : 100)}%;
  margin: ${(props) => (props.page === "weather-page" ? "0px auto 40px" : 0)};

  display: flex;
  border-radius: 4px;

  @media (min-width: 1024px) {
    width: ${(props) => (props.page === "weather-page" ? 70 : 100)}%;
    margin: ${(props) =>
      props.page === "weather-page" ? "40px auto 60px" : 0};
  }

  @media (min-width: 1400px) {
    width: ${(props) => (props.page === "weather-page" ? 50 : 100)}%;
  }
`;

const SearchInput = styled.input`
  padding: 16px;
  border: 2px solid #cecece;
  border-right: none;
  flex-basis: 85%;
  border-radius: 4px 0 0 4px;
  color: #656565;

  :required {
    box-shadow: none;
  }

  @media (min-width: 1024px) {
    padding: 20px 28px;
    border-right: 2px solid #cecece;
    flex-basis: 92%;
    font-size: 1.8rem;
  }

  @media (min-width: 1400px) {
    font-size: 2rem;
  }
`;

const SearchBtn = styled.button`
  border: 2px solid #cecece;
  flex-basis: 15%;
  border-radius: 0 4px 4px 0;
  background-color: #fff;
  color: #9e9e9e;

  @media (min-width: 1024px) {
    flex-basis: 8%;
    font-size: 2rem;
  }

  @media (min-width: 1400px) {
    font-size: 2.2rem;
  }
`;

const SearchError = styled.p`
  color: #ff1616;
  text-transform: uppercase;
  font-weight: 600;
  text-shadow: 1px 1px 5px #fff;
`;

const SearchBar = ({ page }) => {
  const history = useHistory();

  const { geographicData, getWeatherData, getGeographicData } = useContext(
    DataFetchContext
  );
  const { latitude, longitude, errorGeographicData } = geographicData;

  const [valueSearchCity, setValueSearchCity] = useState("");
  const [statusSearch, setStatusSearch] = useState(false);

  useEffect(() => {
    if (errorGeographicData) {
      setStatusSearch(false);
    }
  }, [errorGeographicData]);

  useEffect(() => {
    if (statusSearch) {
      const searchCity = valueSearchCity.toLowerCase();

      getGeographicData(searchCity);
    }
  }, [statusSearch]);

  useEffect(() => {
    if (latitude && longitude !== "") {
      getWeatherData();
      setStatusSearch(false);
      setValueSearchCity("");
      history.push("/weather");
    }
  }, [latitude, longitude]);

  const handleSearchWeather = (e) => {
    e.preventDefault();
    setStatusSearch(true);
  };

  return (
    <>
      <SearchForm
        onSubmit={handleSearchWeather}
        error={errorGeographicData}
        page={page}
      >
        <SearchInput
          type="text"
          placeholder="Enter your city"
          value={valueSearchCity}
          onChange={(e) => setValueSearchCity(e.target.value)}
          required
        />

        <SearchBtn type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </SearchBtn>
      </SearchForm>
      {errorGeographicData ? (
        <SearchError>{errorGeographicData}</SearchError>
      ) : null}
    </>
  );
};

export default SearchBar;

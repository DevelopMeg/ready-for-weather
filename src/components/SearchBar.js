import React, { useContext, useEffect, useState } from "react";

import SearchAutosuggestion from "./SearchAutosuggestion";

import { DataFetchContext } from "context/DataFetchContext";

import { useHistory } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import styled, { css, keyframes } from "styled-components";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import {
  faSearch,
  faTimes,
} from "../../node_modules/@fortawesome/free-solid-svg-icons";

const SearchForm = styled.form`
  box-shadow: ${(props) => (props.error ? "0 0 8px 1px #e24444" : null)};
  width: ${(props) => (props.page === "weather-page" ? 90 : 100)}%;
  margin: ${(props) => (props.page === "weather-page" ? "0px auto 40px" : 0)};

  display: flex;
  position: relative;
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

  :disabled {
    background-color: #d7dfe6;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 15%;
  border-radius: 0 4px 4px 0;
  background-color: #fff;

  @media (min-width: 1024px) {
    flex-basis: 8%;
    font-size: 2rem;
  }

  @media (min-width: 1400px) {
    font-size: 2.4rem;
  }
`;

const animateLoupe = keyframes`
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.2);
  }
`;

const IconLoupe = styled(FontAwesomeIcon)`
  color: ${(props) =>
    props.choosesuggestion || props.valuesearchcity ? "#4780cd" : "#9e9e9e"};
  animation: ${(props) =>
    props.choosesuggestion
      ? css`
          ${animateLoupe} 0.7s linear infinite alternate
        `
      : null};
`;

const IconCloseBox = styled.div`
  color: ${(props) =>
    props.statusChooseSuggestion || props.valueSearchCity
      ? "#4780cd"
      : "#9e9e9e"};

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20%;
  font-size: 2rem;

  @media (min-width: 1024px) {
    right: 11%;
    font-size: 2.5rem;
    cursor: pointer;
  }

  @media (min-width: 1100px) {
    font-size: 2.6rem;
  }
`;

const SearchError = styled.p`
  text-align: ${(props) =>
    props.page === "weather-page" ? "center" : "unset"};

  margin: 18px 0 0;
  color: #ff1616;
  text-transform: uppercase;
  font-weight: 600;
  text-shadow: 1px 1px 5px #fff;

  @media (min-width: 1100px) {
    font-size: 1.8rem;
  }

  @media (min-width: 1600px) {
    font-size: 2rem;
  }
`;

const SearchBar = ({ page }) => {
  const history = useHistory();

  const { geographicData, getWeatherData, getGeographicData } = useContext(
    DataFetchContext
  );
  const { latitude, longitude, errorGeographicData } = geographicData;

  const localSearchCity = localStorage.getItem("valueSearchCity");
  const localStatusSuggestion = JSON.parse(
    localStorage.getItem("statusChooseSuggestion")
  );

  const [valueSearchCity, setValueSearchCity] = useState(localSearchCity || "");
  const [statusSearch, setStatusSearch] = useState(false);
  const [statusChooseSuggestion, setStatusChooseSuggestion] = useState(
    localStatusSuggestion || false
  );

  useEffect(() => {
    localStorage.setItem("valueSearchCity", valueSearchCity);
    localStorage.setItem(
      "statusChooseSuggestion",
      JSON.stringify(statusChooseSuggestion)
    );
  }, [valueSearchCity, statusChooseSuggestion]);

  useEffect(() => {
    if (errorGeographicData) {
      setStatusSearch(false);
    }
  }, [statusSearch, errorGeographicData]);

  useEffect(() => {
    if (statusSearch) {
      const searchCity = valueSearchCity.toLowerCase();

      getGeographicData(searchCity);

      if (geographicData.searchCity === valueSearchCity.toLowerCase()) {
        setStatusSearch(false);
        setStatusChooseSuggestion(false);
        setValueSearchCity("");

        confirmAlert({
          title: "You are looking for the same city, try again",
          buttons: [
            {
              label: "ok",
            },
          ],
        });
      }
    }
  }, [statusSearch]);

  useEffect(() => {
    if (latitude && longitude !== "") {
      getWeatherData();
      setStatusSearch(false);
      setValueSearchCity("");
      history.push("/weather");
      setStatusChooseSuggestion(false);
    }
  }, [latitude, longitude]);

  const handleSearchWeather = (e) => {
    e.preventDefault();
    setStatusSearch(true);
  };

  const handleGetSuggestion = (cityName) => {
    setValueSearchCity(cityName);
    setStatusChooseSuggestion(true);
  };

  const handleClearValueSearchCity = () => {
    setValueSearchCity("");
    setStatusChooseSuggestion(false);
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
          disabled={statusChooseSuggestion}
          required
        />
        <SearchBtn type="submit">
          <IconLoupe
            icon={faSearch}
            choosesuggestion={statusChooseSuggestion ? 1 : 0}
            valuesearchcity={valueSearchCity}
          />
        </SearchBtn>

        <IconCloseBox
          onClick={handleClearValueSearchCity}
          statusChooseSuggestion={statusChooseSuggestion}
          valueSearchCity={valueSearchCity}
        >
          <FontAwesomeIcon icon={faTimes} />
        </IconCloseBox>

        <SearchAutosuggestion
          valueSearchCity={valueSearchCity}
          handleGetSuggestion={handleGetSuggestion}
          statusChooseSuggestion={statusChooseSuggestion}
        />
      </SearchForm>
      {errorGeographicData ? (
        <SearchError page={page}>{errorGeographicData}</SearchError>
      ) : null}
    </>
  );
};

export default SearchBar;

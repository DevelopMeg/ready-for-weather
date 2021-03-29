import React, { useState, useEffect } from "react";

import styled from "styled-components";

const SuggestionsList = styled.ul`
  margin: 4px 0 0;
  border: 2px solid #cecece;
  padding: 0;
  position: absolute;
  top: 100%;
  width: 85%;
  background-color: #fff;
  list-style: none;
  border-radius: 4px;

  @media (min-width: 1024px) {
    width: 92%;
  }
`;

const SuggestionItem = styled.li`
  padding: 10px 16px;

  :hover {
    background-color: #f0f3f7;
  }

  :first-child {
    padding-top: 12px;
  }

  :last-child {
    padding-bottom: 12px;
  }

  @media (min-width: 1024px) {
    padding: 12px 28px;
    cursor: pointer;

    :first-child {
      padding-top: 14px;
    }

    :last-child {
      padding-bottom: 14px;
    }
  }

  @media (min-width: 1100px) {
    font-size: 1.8rem;
  }
`;

const SearchAutosuggestion = ({
  valueSearchCity,
  handleGetSuggestion,
  statusChooseSuggestion,
}) => {
  const [citiesData, setCitiesData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getSuggestions = async () => {
      const url =
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";

      try {
        const response = await fetch(url);
        const data = await response.json();

        setCitiesData(data);
      } catch (err) {
        setCitiesData([]);
      }
    };
    getSuggestions();
  }, []);

  useEffect(() => {
    if (valueSearchCity.length >= 3 && !statusChooseSuggestion) {
      const filterCitiesData = citiesData.filter((city) => {
        const cityData = city.name.toLowerCase().split(" ").join("");
        const searchCity = valueSearchCity.toLowerCase().split(" ").join("");

        return cityData.startsWith(searchCity);
      });

      const cutFilterCitiesData =
        filterCitiesData.length > 5
          ? filterCitiesData.slice(0, 5)
          : filterCitiesData;

      setSuggestions(cutFilterCitiesData);
    } else {
      setSuggestions([]);
    }
  }, [valueSearchCity, statusChooseSuggestion]);

  const handleChooseSuggestion = (suggestion) => {
    handleGetSuggestion(suggestion.name);
    setSuggestions([]);
  };

  const suggestionsList = suggestions.map((suggestion) => {
    return (
      <SuggestionItem
        key={suggestion.geonameid}
        onClick={() => handleChooseSuggestion(suggestion)}
      >
        {suggestion.name}, {suggestion.country}
      </SuggestionItem>
    );
  });

  return (
    <>
      {suggestions.length !== 0 ? (
        <SuggestionsList>{suggestionsList}</SuggestionsList>
      ) : null}
    </>
  );
};

export default SearchAutosuggestion;

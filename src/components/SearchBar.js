import React, { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import { faSearch } from "../../node_modules/@fortawesome/free-solid-svg-icons";

import { DataFetchContext } from "context/DataFetchContext";

import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const history = useHistory();

  const { geographicData, getWeatherData, getGeographicData } = useContext(
    DataFetchContext
  );

  const [valueSearchCity, setValueSearchCity] = useState("");
  const [statusSearch, setStatusSearch] = useState(false);

  const { latitude, longitude } = geographicData;

  useEffect(() => {
    if (statusSearch) {
      getGeographicData(valueSearchCity);
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
    <form onSubmit={handleSearchWeather}>
      <div>
        <input
          type="text"
          placeholder="Enter your city"
          value={valueSearchCity}
          onChange={(e) => setValueSearchCity(e.target.value)}
        />

        <button type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

import React, { createContext, useEffect, useReducer } from "react";

import {
  GET_WEATHER_LOADING,
  GET_WEATHER,
  GET_WEATHER_ERROR,
  GET_POLLUTION_LOADING,
  GET_POLLUTION,
  GET_POLLUTION_ERROR,
  GET_GEOGRAPHIC_DATA,
  GET_GEOGRAPHIC_DATA_ERROR,
  SET_GEOGRAPHIC_DATA,
} from "reducers/types";

import { dataFetchReducer } from "reducers/dataFetchReducer";

import { useLocation } from "react-router-dom";

export const DataFetchContext = createContext();

const DataFetchProvider = ({ children }) => {
  const location = useLocation();

  const initialState = {
    weatherInfo: {
      weather: {},
      loadingWeather: false,
      errorWeather: false,
    },
    pollutionInfo: {
      pollution: {},
      loadingPollution: false,
      errorPollution: false,
    },
    geographicData: {
      searchCity: "",
      countryCity: "",
      latitude: "",
      longitude: "",
      errorGeographicData: "",
    },
  };

  let data;

  if (location.pathname !== "/") {
    const localData = JSON.parse(localStorage.getItem("dataFetch"));
    data = localData || initialState;
  } else {
    data = initialState;
  }

  const [state, dispatch] = useReducer(dataFetchReducer, data);

  useEffect(() => {
    localStorage.setItem("dataFetch", JSON.stringify(state));
  }, [state]);

  const { latitude, longitude } = state.geographicData;

  const getGeographicData = async (searchCity) => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_LOCATION_KEY}&format=json&q=${searchCity}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        const idComma = data[0].display_name.lastIndexOf(",");
        const countryCity = data[0].display_name.slice(idComma + 2);

        dispatch({
          type: GET_GEOGRAPHIC_DATA,
          payload: {
            latitude: data[0].lat,
            longitude: data[0].lon,
            searchCity,
            countryCity,
          },
        });
      } else {
        throw response;
      }
    } catch (err) {
      if (err.status === 404) {
        dispatch({
          type: GET_GEOGRAPHIC_DATA_ERROR,
          payload: "not found this city",
        });
      } else if (err.status === 500) {
        dispatch({
          type: GET_GEOGRAPHIC_DATA_ERROR,
          payload: "server error",
        });
      }
    }
  };

  const getWeatherData = async () => {
    const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${process.env.REACT_APP_API_WEATHER_KEY}`;

    dispatch({ type: GET_WEATHER_LOADING });

    try {
      const response = await fetch(url);
      const data = await response.json();

      dispatch({ type: GET_WEATHER, payload: data });
    } catch (err) {
      dispatch({ type: GET_WEATHER_ERROR });
    }
  };

  const getPollutionData = async () => {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_WEATHER_KEY}`;

    dispatch({ type: GET_POLLUTION_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();

      dispatch({ type: GET_POLLUTION, payload: data });
    } catch (err) {
      dispatch({ type: GET_POLLUTION_ERROR });
    }
  };

  const setGeographicData = (search) => {
    const { latitude, longitude, searchCity, countryCity } = search;

    dispatch({
      type: SET_GEOGRAPHIC_DATA,
      payload: {
        latitude,
        longitude,
        searchCity,
        countryCity,
      },
    });
  };

  return (
    <DataFetchContext.Provider
      value={{
        weatherInfo: state.weatherInfo,
        pollutionInfo: state.pollutionInfo,
        geographicData: state.geographicData,
        getWeatherData,
        getPollutionData,
        getGeographicData,
        setGeographicData,
      }}
    >
      {children}
    </DataFetchContext.Provider>
  );
};

export default DataFetchProvider;

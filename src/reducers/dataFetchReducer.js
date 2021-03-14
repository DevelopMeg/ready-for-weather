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

export const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case GET_WEATHER_LOADING:
      return {
        ...state,
        weatherInfo: {
          ...state.weatherInfo,
          loadingWeather: true,
        },
      };
    case GET_WEATHER:
      return {
        ...state,
        weatherInfo: {
          weather: action.payload,
          loadingWeather: false,
          errorWeather: false,
        },
      };

    case GET_WEATHER_ERROR:
      return {
        ...state,
        weatherInfo: {
          weather: {},
          loadingWeather: false,
          errorWeather: true,
        },
      };

    case GET_POLLUTION_LOADING:
      return {
        ...state,
        pollutionInfo: {
          ...state.pollutionInfo,
          loadingPollution: true,
        },
      };
    case GET_POLLUTION:
      return {
        ...state,
        pollutionInfo: {
          pollution: action.payload,
          loadingPollution: false,
          errorPollution: false,
        },
      };

    case GET_POLLUTION_ERROR:
      return {
        ...state,
        pollutionInfo: {
          pollution: {},
          loadingPollution: false,
          errorPollution: true,
        },
      };

    case GET_GEOGRAPHIC_DATA:
    case SET_GEOGRAPHIC_DATA:
      return {
        ...state,
        geographicData: {
          ...state.geographicData,
          searchCity: action.payload.searchCity,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          errorGeographicData: "",
        },
      };

    case GET_GEOGRAPHIC_DATA_ERROR:
      return {
        ...state,
        geographicData: {
          ...state.geographicData,
          errorGeographicData: action.payload,
        },
      };

    default:
      return state;
  }
};

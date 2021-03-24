import React, { useContext } from "react";

import DateTimeBox from "components/DateTimeBox";
import WeatherAlertBox from "components/WeatherAlertBox";

import { DataFetchContext } from "context/DataFetchContext";

import { convertSecToTime } from "utils/utils";

import styled from "styled-components";
import {
  WeatherDescription,
  WeatherInfoText,
  WeatherInfo,
} from "components/GlobalStyles";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faWind,
  faCloud,
  faCloudRain,
  faSnowflake,
  faTachometerAlt,
  faThermometerHalf,
} from "../../node_modules/@fortawesome/free-solid-svg-icons";

const SectionWeatherDay = styled.section`
  padding-bottom: ${(props) => (props.alertsWeather ? 0 : 20)}px;

  background-color: #fbf0d5;

  @media (min-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 1.8rem;
  }

  @media (min-width: 1400px) {
    font-size: 2rem;
  }
`;

const SearchCity = styled.h3`
  margin-top: 36px;
  text-align: center;
  text-transform: uppercase;
  font-size: 2.8rem;

  @media (min-width: 1024px) {
    margin: 30px 0;
    flex-basis: 100%;
  }

  @media (min-width: 1100px) {
    font-size: 3.3rem;
  }
`;

const CountryCity = styled.span`
  margin-top: 4px;
  display: block;
  font-size: 1.5rem;

  @media (min-width: 1100px) {
    font-size: 1.6rem;
  }
`;

const WeatherInfoBox = styled.section`
  text-align: center;

  @media (min-width: 1024px) {
    padding: 10px;
    flex-basis: 50%;
  }
`;

const CurrentTemp = styled.h4`
  margin: 30px 0;
  font-size: 3.6rem;
  text-align: center;

  @media (min-width: 1024px) {
    margin: 0 0 25px;
    font-size: 4rem;
  }

  @media (min-width: 1400px) {
    font-size: 4.2rem;
  }
`;

const SunRiseSetBox = styled.div`
  margin: 20px auto 0;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (min-width: 480px) {
    width: 80%;
  }

  @media (min-width: 1400px) {
    width: 75%;
  }

  @media (min-width: 1900px) {
    width: 65%;
  }
`;

const WeatherDescriptionDay = styled(WeatherDescription)`
  font-size: 1.6rem;

  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }

  @media (min-width: 1400px) {
    font-size: 2rem;
  }
`;

const WeatherDayInfo = () => {
  const { geographicData, weatherInfo } = useContext(DataFetchContext);

  const { searchCity, countryCity } = geographicData;

  const { current, alerts } = weatherInfo.weather;

  const { description } = current.weather[0];
  const {
    temp,
    feels_like,
    sunrise,
    sunset,
    pressure,
    wind_speed,
    clouds,
    rain,
    snow,
  } = current;

  const sunriseHour = convertSecToTime(sunrise);
  const sunsetHour = convertSecToTime(sunset);

  return (
    <SectionWeatherDay alertsWeather={alerts}>
      <DateTimeBox />

      <SearchCity>
        {searchCity} <CountryCity>{countryCity}</CountryCity>
      </SearchCity>

      <WeatherInfoBox>
        <CurrentTemp>{Math.floor(temp)} &#8451;</CurrentTemp>

        <p>
          <FontAwesomeIcon icon={faThermometerHalf} />
          <WeatherInfoText>perceptible temp:</WeatherInfoText>
          {Math.floor(feels_like)} &#8451;
        </p>

        <SunRiseSetBox>
          <WeatherInfo>
            <FontAwesomeIcon icon={faSun} />
            <WeatherInfoText>sunrise:</WeatherInfoText>
            {sunriseHour}
          </WeatherInfo>
          <WeatherInfo>
            <FontAwesomeIcon icon={faMoon} />
            <WeatherInfoText>sunset:</WeatherInfoText>
            {sunsetHour}
          </WeatherInfo>
        </SunRiseSetBox>
      </WeatherInfoBox>

      <WeatherInfoBox>
        <WeatherDescriptionDay>{description}</WeatherDescriptionDay>
        <p>
          <FontAwesomeIcon icon={faTachometerAlt} />
          <WeatherInfoText>pressure:</WeatherInfoText>
          {pressure} hPa
        </p>
        <p>
          <FontAwesomeIcon icon={faWind} />
          <WeatherInfoText>wind speed:</WeatherInfoText>
          {wind_speed} m/s
        </p>
        <p>
          <FontAwesomeIcon icon={faCloud} />
          <WeatherInfoText>clouds:</WeatherInfoText>
          {clouds} %
        </p>

        {rain ? (
          <p>
            <FontAwesomeIcon icon={faCloudRain} />
            <WeatherInfoText>rain:</WeatherInfoText>
            {rain["1h"]} mm
          </p>
        ) : (
          <p>
            <FontAwesomeIcon icon={faCloudRain} />
            <WeatherInfoText>rain:</WeatherInfoText>0 mm
          </p>
        )}
        {snow ? (
          <p>
            <FontAwesomeIcon icon={faSnowflake} />
            <WeatherInfoText>snow:</WeatherInfoText>
            {snow["1h"]} mm
          </p>
        ) : (
          <p>
            <FontAwesomeIcon icon={faSnowflake} />
            <WeatherInfoText>snow:</WeatherInfoText>0 mm
          </p>
        )}
      </WeatherInfoBox>

      {alerts ? <WeatherAlertBox alertsWeather={alerts[0]} /> : null}
    </SectionWeatherDay>
  );
};

export default WeatherDayInfo;

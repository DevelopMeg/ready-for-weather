import React from "react";

import styled from "styled-components";
import {
  WeatherDescription,
  WeatherInfo,
  WeatherInfoText,
} from "components/GlobalStyles";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import {
  faMoon,
  faCloud,
  faCloudRain,
  faSnowflake,
  faTemperatureLow,
  faTemperatureHigh,
} from "../../node_modules/@fortawesome/free-solid-svg-icons";

const SectionWeatherDayOfWeek = styled.section`
  padding: 35px 0 20px;
  border-bottom: 2px dashed #fffcf4;
  text-align: center;
  background-color: #f7e4b6;

  :last-child {
    border-bottom: none;
  }

  @media (min-width: 1024px) {
    border-right: 2px dashed #fffcf4;
    border-bottom: none;
    flex-basis: 25%;

    :last-child {
      border-right: none;
    }
  }

  @media (min-width: 1400px) {
    font-size: 1.8rem;
  }
`;

const NameOfDay = styled.h4`
  margin: 0;
  text-transform: uppercase;
  font-size: 1.8rem;
  font-weight: 600;

  @media (min-width: 1400px) {
    font-size: 2rem;
  }
`;

const WeatherDescriptionWeek = styled(WeatherDescription)`
  margin: 0 auto 40px;
  font-weight: 500;
  font-size: 1.5rem;

  @media (min-width: 1400px) {
    font-size: 1.6rem;
  }
`;

const TempOfDay = styled.p`
  font-size: 2rem;

  @media (min-width: 1400px) {
    font-size: 2.2rem;
  }
`;

const DetailTempInfoBox = styled.div`
  margin: 30px auto 20px;
`;

const WeatherDayOfWeekInfo = ({ dayOfWeek }) => {
  const { clouds, snow, rain } = dayOfWeek;

  const { day, min, max, night } = dayOfWeek.temp;

  const { description, icon } = dayOfWeek.weather[0];

  const nameDayOfWeek = new Date(dayOfWeek.dt * 1000).toLocaleString("en-us", {
    weekday: "long",
  });

  return (
    <SectionWeatherDayOfWeek>
      <NameOfDay>{nameDayOfWeek}</NameOfDay>

      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />

      <WeatherDescriptionWeek>{description}</WeatherDescriptionWeek>

      <TempOfDay>{Math.floor(day)} &#8451;</TempOfDay>

      <DetailTempInfoBox>
        <WeatherInfo>
          <FontAwesomeIcon icon={faTemperatureLow} />
          <WeatherInfoText>min:</WeatherInfoText>
          {Math.floor(min)} &#8451;
        </WeatherInfo>
        <WeatherInfo extraMargin>
          <FontAwesomeIcon icon={faTemperatureHigh} />
          <WeatherInfoText>max:</WeatherInfoText>
          {Math.floor(max)} &#8451;
        </WeatherInfo>
        <WeatherInfo>
          <FontAwesomeIcon icon={faMoon} />
          <WeatherInfoText>night:</WeatherInfoText>
          {Math.floor(night)} &#8451;
        </WeatherInfo>
      </DetailTempInfoBox>

      <p>
        <FontAwesomeIcon icon={faCloud} />
        <WeatherInfoText>clouds:</WeatherInfoText>
        {clouds} %
      </p>

      {rain ? (
        <p>
          <FontAwesomeIcon icon={faCloudRain} />
          <WeatherInfoText>rain:</WeatherInfoText>
          {rain} mm
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
          {snow} mm
        </p>
      ) : (
        <p>
          <FontAwesomeIcon icon={faSnowflake} />
          <WeatherInfoText>snow:</WeatherInfoText>0 mm
        </p>
      )}
    </SectionWeatherDayOfWeek>
  );
};

export default WeatherDayOfWeekInfo;

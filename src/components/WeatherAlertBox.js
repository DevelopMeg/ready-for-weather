import React from "react";

import { convertSecToTime } from "utils/utils";

import styled from "styled-components";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import { faExclamation } from "../../node_modules/@fortawesome/free-solid-svg-icons";

const SectionWeatherAlert = styled.section`
  margin-top: 10px;
  padding: 14px 20px;
  background-color: #fdf7ea;
  text-align: center;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 50% 50%;
    align-items: center;
  }
`;

const TitleWeatherAlert = styled.h4`
  margin: 0;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    grid-column: 1/2;
    grid-row: 1/3;
  }
`;

const ExclamationIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
  color: #ff0a0a;
  font-size: 2.5rem;
`;

const NameWeatherAlert = styled.p`
  margin: 8px 0;
  font-weight: 500;
  color: #ff0a0a;
  font-size: 1.8rem;

  @media (min-width: 1024px) {
    margin: 0 0 2px;
    grid-column: 2/3;
    grid-row: 1/2;
    font-size: 1.6rem;
  }
`;

const AlertInfoBox = styled.div`
  display: flex;
  justify-content: space-around;
  text-transform: uppercase;

  @media (min-width: 1024px) {
    grid-column: 2/3;
    grid-row: 2/3;
  }
`;

const AlertInfo = styled.p`
  margin: 0;
  font-size: 1.8rem;
`;

const WeatherAlertBox = ({ alertsWeather }) => {
  const { event, start, end } = alertsWeather;

  const startAlert = convertSecToTime(start);
  const endAlert = convertSecToTime(end);

  return (
    <SectionWeatherAlert>
      <TitleWeatherAlert>
        <ExclamationIcon icon={faExclamation} /> weather alert
      </TitleWeatherAlert>

      <NameWeatherAlert>{event}</NameWeatherAlert>
      <AlertInfoBox>
        <AlertInfo>start: {startAlert}</AlertInfo>
        <AlertInfo>end: {endAlert}</AlertInfo>
      </AlertInfoBox>
    </SectionWeatherAlert>
  );
};

export default WeatherAlertBox;

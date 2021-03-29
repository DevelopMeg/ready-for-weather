import React, { useContext } from "react";

import { DataFetchContext } from "context/DataFetchContext";

import styled from "styled-components";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import { faSmog } from "../../node_modules/@fortawesome/free-solid-svg-icons";

const TitlePollutionName = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 3rem;

  @media (min-width: 1400px) {
    font-size: 3.5rem;
  }
`;

const TitlePollutionNameText = styled.span`
  margin-left: 20px;
  display: inline-block;
`;

const PollutionName = () => {
  const { pollutionInfo } = useContext(DataFetchContext);

  const aqi = pollutionInfo.pollution.list[0].main.aqi;

  const names = {
    1: "good",
    2: "fair",
    3: "moderate",
    4: "poor",
    5: "very poor",
  };

  const name = names[aqi];

  return (
    <TitlePollutionName>
      <FontAwesomeIcon icon={faSmog} />{" "}
      <TitlePollutionNameText>{name}</TitlePollutionNameText>
    </TitlePollutionName>
  );
};

export default PollutionName;

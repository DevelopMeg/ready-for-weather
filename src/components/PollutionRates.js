import React, { useContext } from "react";

import { DataFetchContext } from "context/DataFetchContext";

import styled from "styled-components";

const PollutionRatesBox = styled.div`
  margin: 50px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 90%;

  @media (min-width: 480px) {
    width: 72%;
  }

  @media (min-width: 1024px) {
    margin-bottom: 0;
    width: 65%;
  }

  @media (min-width: 1400px) {
    margin-top: 70px;
    width: 50%;
  }

  @media (min-width: 1900px) {
    width: 40%;
  }
`;

const PollutionRateBox = styled.div`
  padding: 40px 0;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 130px;
  box-shadow: 0 0 4px 2px #8a7a54;
  background-color: #ffd773;
  border-radius: 50%;

  @media (min-width: 1024px) {
    padding: 42px 0;
    margin-bottom: 0;
    width: 135px;
    font-size: 1.8rem;
  }

  @media (min-width: 1400px) {
    padding: 50px 0;
    width: 160px;
    font-size: 2rem;
  }

  @media (min-width: 1900px) {
    padding: 60px 0;
    width: 185px;
    font-size: 2.2rem;
  }
`;

const NamePollutionRate = styled.p`
  margin: 0 0 6px;
  font-weight: 600;
  text-transform: uppercase;

  @media (min-width: 1024px) {
    margin-bottom: 8px;
  }
`;

const ValuePollutionRate = styled.p`
  margin: 0;
`;

const PollutionRates = () => {
  const { pollutionInfo } = useContext(DataFetchContext);

  const objectRates = pollutionInfo.pollution.list[0].components;

  const selectRates = ["pm10", "pm2_5", "no2", "o3"];

  const arrRates = Object.entries(
    Object.keys(objectRates)
      .filter((key) => selectRates.includes(key))
      .reduce((obj, key) => {
        obj[key] = objectRates[key];
        return obj;
      }, {})
  );

  const rates = arrRates.map((rateInfo) => {
    return (
      <PollutionRateBox key={rateInfo[0]}>
        {rateInfo[0] === "no2" || rateInfo[0] === "o3" ? (
          <NamePollutionRate>
            <span>{rateInfo[0].slice(0, -1)}</span>
            <sub>{rateInfo[0].slice(-1)}</sub>
          </NamePollutionRate>
        ) : null}
        {rateInfo[0] === "pm2_5" ? (
          <NamePollutionRate>
            <span>{rateInfo[0].slice(0, -2)}</span>,
            <span>{rateInfo[0].slice(-1)}</span>
          </NamePollutionRate>
        ) : null}
        {rateInfo[0] === "pm10" ? (
          <NamePollutionRate>{rateInfo[0]}</NamePollutionRate>
        ) : null}
        <ValuePollutionRate>{rateInfo[1]} &#13197;/&#13221;</ValuePollutionRate>
      </PollutionRateBox>
    );
  });

  return <PollutionRatesBox>{rates}</PollutionRatesBox>;
};

export default PollutionRates;

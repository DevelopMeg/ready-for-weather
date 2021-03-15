import React, { useContext } from "react";

import { DataFetchContext } from "context/DataFetchContext";

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

  return <h4>{name}</h4>;
};

export default PollutionName;

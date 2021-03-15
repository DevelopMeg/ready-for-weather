import React, { useContext } from "react";

import { DataFetchContext } from "context/DataFetchContext";

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
      <div key={rateInfo[0]}>
        <p>{rateInfo[0]}</p>
        <p>{rateInfo[1]} &#13197;/&#13221;</p>
      </div>
    );
  });

  return <div>{rates}</div>;
};

export default PollutionRates;

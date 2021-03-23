import React, { useContext } from "react";

import PollutionName from "components/PollutionName";
import PollutionRates from "components/PollutionRates";

import { DataFetchContext } from "context/DataFetchContext";

import { ErrorDownloadData } from "components/GlobalStyles";

const PollutionInfo = () => {
  const { pollutionInfo } = useContext(DataFetchContext);
  const err = pollutionInfo.errorPollution;

  return (
    <>
      {!err ? (
        <>
          <PollutionName />
          <PollutionRates />
        </>
      ) : (
        <ErrorDownloadData>data download error</ErrorDownloadData>
      )}
    </>
  );
};

export default PollutionInfo;

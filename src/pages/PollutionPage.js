import React, { useContext } from "react";

import PollutionInfo from "components/PollutionInfo";

import { DataFetchContext } from "context/DataFetchContext";

const PollutionPage = () => {
  const { geographicData, pollutionInfo } = useContext(DataFetchContext);

  const loading = pollutionInfo.loadingPollution;

  const loadPollutionData = Object.keys(pollutionInfo.pollution).length;

  return (
    <section>
      <h3>current air quality in {geographicData.searchCity}</h3>

      {loading || !loadPollutionData ? "Loading..." : <PollutionInfo />}
    </section>
  );
};

export default PollutionPage;

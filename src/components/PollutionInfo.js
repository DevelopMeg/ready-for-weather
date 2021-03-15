import React, { useContext } from "react";

import PollutionName from "components/PollutionName";
import PollutionRates from "components/PollutionRates";

import { useHistory } from "react-router-dom";

import { DataFetchContext } from "context/DataFetchContext";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "../../node_modules/@fortawesome/free-solid-svg-icons";

const PollutionInfo = () => {
  const history = useHistory();

  const { pollutionInfo } = useContext(DataFetchContext);
  const err = pollutionInfo.errorPollution;

  return (
    <>
      <button onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
      </button>
      {!err ? (
        <>
          <PollutionName />
          <PollutionRates />
        </>
      ) : (
        <p>data download error</p>
      )}
    </>
  );
};

export default PollutionInfo;

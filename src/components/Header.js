import React, { useContext, useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { DataFetchContext } from "context/DataFetchContext";

const Header = () => {
  const history = useHistory();

  const { getPollutionData } = useContext(DataFetchContext);

  const [statusPolution, setStatusPolution] = useState(false);

  useEffect(() => {
    if (statusPolution) {
      getPollutionData();
    }
  }, [statusPolution]);

  const handleGetPollution = () => {
    setStatusPolution(true);
    history.push("/air-pollution");
  };

  return (
    <header>
      <h1>ready for weather</h1>
      <button onClick={handleGetPollution}>air pollution</button>
    </header>
  );
};

export default Header;

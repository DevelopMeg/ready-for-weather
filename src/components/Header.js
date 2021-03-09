import React, { useContext, useState, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";

import { DataFetchContext } from "context/DataFetchContext";

const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const path = location.pathname;

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
      {path === "/weather" ? (
        <button onClick={handleGetPollution}>air pollution</button>
      ) : null}
    </header>
  );
};

export default Header;

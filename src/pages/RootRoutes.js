import React from "react";

import { Route, Switch } from "react-router-dom";

import HomePage from "pages/HomePage";
import WeatherPage from "pages/WeatherPage";
import PollutionPage from "pages/PollutionPage";

import { routes } from "pages/routes";

const RootRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path={routes.home} component={HomePage} />
        <Route path={routes.weather} component={WeatherPage} />
        <Route path={routes.pollution} component={PollutionPage} />
      </Switch>
    </>
  );
};

export default RootRoutes;

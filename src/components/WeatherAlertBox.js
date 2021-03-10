import React from "react";

import { convertSecToTime } from "utils/utils";

const WeatherAlertBox = ({ alertsWeather }) => {
  const { event, start, end } = alertsWeather;

  const startAlert = convertSecToTime(start);
  const endAlert = convertSecToTime(end);

  return (
    <section>
      <h4>weather alert</h4>
      <p>{event}</p>
      <p>start {startAlert}</p>
      <p>end {endAlert}</p>
    </section>
  );
};

export default WeatherAlertBox;

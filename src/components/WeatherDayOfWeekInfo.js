import React from "react";

const WeatherDayOfWeekInfo = ({ dayOfWeek }) => {
  const { clouds, snow, rain } = dayOfWeek;

  const { day, min, max, night } = dayOfWeek.temp;

  const { description } = dayOfWeek.weather[0];

  const nameDayOfWeek = new Date(dayOfWeek.dt * 1000).toLocaleString("en-us", {
    weekday: "long",
  });

  return (
    <div>
      <h4>{nameDayOfWeek}</h4>

      <p>{description}</p>

      <p>{Math.floor(day)} &#8451;</p>

      <div>
        <p>min: {Math.floor(min)} &#8451;</p>
        <p>max: {Math.floor(max)} &#8451;</p>
        <p>night: {Math.floor(night)} &#8451;</p>
      </div>

      <p>clouds: {clouds} %</p>

      {rain ? <p>rain: {rain} mm</p> : <p>rain: 0 mm</p>}
      {snow ? <p>snow: {snow} mm</p> : <p>snow: 0 mm</p>}
    </div>
  );
};

export default WeatherDayOfWeekInfo;

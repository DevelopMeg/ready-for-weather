import React, { useState, useEffect } from "react";

const DateTimeBox = () => {
  const date = new Date();

  const [timeInfo, setTimeInfo] = useState(
    date.toLocaleTimeString().slice(0, -3)
  );
  const [dateInfo, setDateInfo] = useState("");

  useEffect(() => {
    setDateInfo(new Date().toDateString());
  }, []);

  useEffect(() => {
    let timerId;

    const setTimerId = setTimeout(() => {
      const funcSetTime = () => {
        setTimeInfo(new Date().toLocaleTimeString().slice(0, -3));
      };

      timerId = setInterval(funcSetTime, 60000);
      funcSetTime();
    }, (60 - new Date().getSeconds()) * 1000);

    return () => {
      clearTimeout(setTimerId);
      clearInterval(timerId);
    };
  }, []);

  return (
    <div>
      <p>{dateInfo}</p>
      <p>{timeInfo}</p>
    </div>
  );
};

export default DateTimeBox;

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
} from "../../node_modules/@fortawesome/free-solid-svg-icons";

const SectionDateTime = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffe197;

  @media (min-width: 1024px) {
    flex-basis: 60%;
  }
`;

const DateTimeInfo = styled.p`
  font-size: 2rem;
`;

const DateTimeInfoText = styled.span`
  margin-left: 12px;
  display: inline-block;
`;

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
    <SectionDateTime>
      <DateTimeInfo>
        <FontAwesomeIcon icon={faCalendarAlt} />
        <DateTimeInfoText>{dateInfo}</DateTimeInfoText>
      </DateTimeInfo>
      <DateTimeInfo>
        <FontAwesomeIcon icon={faClock} />
        <DateTimeInfoText>{timeInfo}</DateTimeInfoText>
      </DateTimeInfo>
    </SectionDateTime>
  );
};

export default DateTimeBox;

import React from "react";

import styled, { keyframes } from "styled-components";

import { ReactComponent as SunImage } from "assets/loader-sun.svg";

const SectionLoaderSun = styled.section`
  margin-top: 55px;
  text-align: center;

  @media (min-width: 1400px) {
    margin-top: 70px;
  }

  @media (min-width: 1600px) {
    margin-top: 80px;
  }
`;

const animateSun = keyframes`
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(36deg);
  }

  20% {
    transform: rotate(72deg);
  }

  30% {
    transform: rotate(108deg);
  }

  40% {
    transform: rotate(144deg);
  }

  50% {
    transform: rotate(180deg);
  }

  60% {
    transform: rotate(216deg);
  }

  70% {
    transform: rotate(252deg);
  }

  80% {
    transform: rotate(288deg);
  }

  90% {
    transform: rotate(324deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Sun = styled(SunImage)`
  animation: ${animateSun} 7s linear infinite;

  width: 55%;

  @media (min-width: 1024px) {
    width: 20%;
  }

  @media (min-width: 1400px) {
    width: 16%;
  }

  @media (min-width: 1600px) {
    width: 14%;
  }
`;

const LoaderSun = () => {
  return (
    <SectionLoaderSun>
      <Sun />
    </SectionLoaderSun>
  );
};

export default LoaderSun;

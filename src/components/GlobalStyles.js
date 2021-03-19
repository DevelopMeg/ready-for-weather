import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  *, *::before, *::after {
    box-sizing:border-box;
  } 

  html {
    font-size: 0.625rem;
  }

  body {
    font-size: 1.6rem;
    font-family: 'Libre Franklin', sans-serif;
    background-color: #fff;
  }


  h2, h3, h4, h5, p {
    cursor: default;
  }


  button {
    @media(min-width: 1024px) {
      cursor: pointer;
    }
  }

  button, input {
    :focus {
      outline: none;
    }
  }
`;

export const ErrorDownloadData = styled.p`
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
  color: #ff0a0a;

  @media (min-width: 1400px) {
    font-size: 2rem;
  }
`;

export const WeatherDescription = styled.h5`
  margin: 30px auto;
  position: relative;
  text-transform: uppercase;

  ::after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: #dcbe75;
  }

  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;

export const WeatherInfo = styled.p`
  margin: ${(props) => (props.extraMargin ? "5px 0" : 0)};
`;

export const WeatherInfoText = styled.span`
  margin: 0 8px;
  display: inline-block;

  @media (min-width: 1400px) {
    margin: 0 10px;
  }
`;

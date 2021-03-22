import React, { useContext, useState, useEffect } from "react";

import { DataFetchContext } from "context/DataFetchContext";

import { useHistory, useLocation } from "react-router-dom";

import styled from "styled-components";

import logo from "assets/logo.png";
import imageBtnPollution from "assets/image-btn-pollution.jpg";

const HeaderBox = styled.header`
  position: relative;
`;

const MainTitleLogo = styled.h1`
  margin: 0;
`;

const Logo = styled.img`
  margin: 0 auto;
  display: block;
  max-width: 100%;
`;

const OpenPollutionBtn = styled.button`
  margin: 10px auto 25px;
  padding: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${imageBtnPollution});
  background-size: cover;
  background-position: 0 58%;
  border-radius: 10px;

  @media (min-width: 1024px) {
    margin: 0;
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
  }
`;

const OpenPollutionBtnText = styled.span`
  padding: 6px;
  background-color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  font-weight: 500;

  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

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
    <HeaderBox>
      <MainTitleLogo>
        <Logo src={logo} alt="page logo" />
      </MainTitleLogo>
      {path === "/weather" ? (
        <OpenPollutionBtn onClick={handleGetPollution}>
          <OpenPollutionBtnText>air pollution</OpenPollutionBtnText>
        </OpenPollutionBtn>
      ) : null}
    </HeaderBox>
  );
};

export default Header;

import React, { useContext } from "react";

import PollutionInfo from "components/PollutionInfo";
import LoaderSun from "components/LoaderSun";

import { DataFetchContext } from "context/DataFetchContext";

import { useHistory } from "react-router-dom";

import styled from "styled-components";

import imagePollutionPage from "assets/image-pollution-page.jpg";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "../../node_modules/@fortawesome/free-solid-svg-icons";

const SectionPollutionPage = styled.section`
  padding-top: 10px;
  width: 100%;
  background-image: url(${imagePollutionPage});
  background-size: cover;
`;

const ComeBackBtn = styled.button`
  border: none;
  padding: 2px 10px;
  position: relative;
  top: 20px;
  left: 40px;
  background-color: #ffd773;
  font-size: 3rem;
  border-radius: 30%;

  @media (min-width: 1400px) {
    font-size: 3.5rem;
  }
`;

const TitlePollutionPage = styled.h3`
  margin: 50px auto;
  text-transform: uppercase;
  text-align: center;
  font-weight: 500;
  font-size: 2.2rem;
  line-height: 35px;
  letter-spacing: 1px;

  @media (min-width: 1400px) {
    margin: 60px auto;
    font-size: 2.5rem;
  }
`;

const PollutionCity = styled.span`
  padding: 4px;
  background-color: #ffd773;
`;

const PollutionPage = () => {
  const history = useHistory();

  const { geographicData, pollutionInfo } = useContext(DataFetchContext);

  const loading = pollutionInfo.loadingPollution;

  const loadPollutionData = Object.keys(pollutionInfo.pollution).length;

  return (
    <SectionPollutionPage>
      <ComeBackBtn onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
      </ComeBackBtn>

      <TitlePollutionPage>
        current air quality in{" "}
        <PollutionCity>{geographicData.searchCity}</PollutionCity>
      </TitlePollutionPage>

      {loading || !loadPollutionData ? <LoaderSun /> : <PollutionInfo />}
    </SectionPollutionPage>
  );
};

export default PollutionPage;

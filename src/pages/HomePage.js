import React, { useState } from "react";

import SearchBar from "components/SearchBar";
import SavedSearchesList from "components/SavedSearchesList";

import styled from "styled-components";

import mainImage from "assets/main-image-homepage.jpg";
import cloudImage from "assets/cloud.png";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import { faTimes } from "../../node_modules/@fortawesome/free-solid-svg-icons";

const SectionHomePage = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  background-image: url(${mainImage});
  background-size: cover;
`;

const BgBoxSavedSearches = styled.div`
  z-index: ${(props) => (props.openCloudSavedSearches ? 1 : -1)};
  opacity: ${(props) => (props.openCloudSavedSearches ? 1 : 0)};

  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${mainImage});
  background-size: cover;
  transition: opacity 0.4s;
`;

const BoxSavedSearches = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 135px;
  transition: opacity 0.4s;

  @media (min-width: 1100px) {
    top: 135px;
    right: 40px;
    left: unset;
    transform: translate(0);
  }
`;

const BoxSavedSearchesDesktop = styled(BoxSavedSearches)`
  opacity: ${(props) => (props.openCloudSavedSearches ? 1 : 0)};
`;

const CloseSavedSearches = styled.button`
  border: none;
  position: absolute;
  top: 15px;
  left: 20px;
  background-color: transparent;
  font-size: 3.2rem;
  color: #ffd773;
`;

const CloudSavedSearches = styled.div`
  position: absolute;
  top: 20px;
  width: 128px;
  height: 128px;
  background-image: url(${cloudImage});

  @media (min-width: 1100px) {
    top: 10px;
    right: 40px;
  }
`;

const TitleCloudSaveSearches = styled.h3`
  margin: 0;
  padding: 30px 20px 20px;
  position: relative;
  top: 26px;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.5rem;
  color: #fff;
  font-weight: 500;
  text-shadow: 0px 0px 4px #0f2c50, 0px 0px 4px #0f2c50;

  @media (min-width: 1024px) {
    cursor: pointer;
  }
`;

const HomePageBox = styled.div`
  padding: 14px;
  width: 100%;

  @media (min-width: 1024px) {
    padding: 0;
    width: 70%;
  }

  @media (min-width: 1200px) {
    padding: 0;
    width: 55%;
  }

  @media (min-width: 1900px) {
    padding: 0;
    width: 48%;
  }
`;

const TitleHomePage = styled.h2`
  margin: 0 0 30px;
  font-size: 2rem;
  text-align: center;
  color: #fff;
  text-shadow: 1px 3px 3px #585858, 1px 2px 3px #292929;

  @media (min-width: 400px) {
    font-size: 2.4rem;
  }

  @media (min-width: 1024px) {
    text-align: left;
    font-size: 2.8rem;
  }

  @media (min-width: 1400px) {
    font-size: 3.2rem;
  }
`;

const HomePage = () => {
  const [openCloudSavedSearches, setOpenCloudSavedSearches] = useState(false);

  const handleOpenCloudSavedSearches = () => {
    setOpenCloudSavedSearches((prev) => !prev);
  };

  return (
    <SectionHomePage>
      <CloudSavedSearches>
        <TitleCloudSaveSearches onClick={handleOpenCloudSavedSearches}>
          saved searches
        </TitleCloudSaveSearches>
      </CloudSavedSearches>

      {window.innerWidth < 1100 ? (
        <BgBoxSavedSearches openCloudSavedSearches={openCloudSavedSearches}>
          <CloseSavedSearches onClick={handleOpenCloudSavedSearches}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseSavedSearches>

          <BoxSavedSearches>
            <SavedSearchesList page="homePage" />
          </BoxSavedSearches>
        </BgBoxSavedSearches>
      ) : (
        <BoxSavedSearchesDesktop
          openCloudSavedSearches={openCloudSavedSearches}
        >
          <SavedSearchesList page="homePage" />
        </BoxSavedSearchesDesktop>
      )}

      <HomePageBox>
        <TitleHomePage>Check weather for selected city</TitleHomePage>
        <SearchBar page="home-page" />
      </HomePageBox>
    </SectionHomePage>
  );
};

export default HomePage;

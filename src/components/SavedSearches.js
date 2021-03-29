import React from "react";

import SavedSearchesList from "components/SavedSearchesList";

import styled from "styled-components";

import imageAside from "assets/image-aside.jpg";

const SectionSavedSearches = styled.section`
  padding: 30px 0 15px;
  position: relative;
  background-image: url(${imageAside});
  background-position: 35%;
  background-size: cover;
  z-index: 1;

  ::after {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: -1;
  }

  @media (min-width: 1024px) {
    padding: 0;
    flex-basis: 20%;
    overflow: hidden;
  }

  @media (min-width: 1100px) {
    flex-basis: 15%;
  }
`;

const TitleSavedSearches = styled.h3`
  margin: 0 0 20px;
  text-transform: uppercase;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;

  @media (min-width: 1024px) {
    margin: 15px auto;
  }

  @media (min-width: 1100px) {
    width: 70%;
  }
`;

const SavedSearches = () => {
  return (
    <SectionSavedSearches>
      <TitleSavedSearches>saved searches</TitleSavedSearches>
      <SavedSearchesList page="weatherPage" />
    </SectionSavedSearches>
  );
};

export default SavedSearches;

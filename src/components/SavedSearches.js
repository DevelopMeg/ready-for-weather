import React, { useContext, useState, useEffect } from "react";

import SavedSearch from "components/SavedSearch";

import { SavedSearchesContext } from "context/SavedSearchesContext";

import { nanoid } from "nanoid";

import styled from "styled-components";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
} from "../../node_modules/@fortawesome/free-solid-svg-icons";

import imageAside from "assets/image-aside.jpg";

const SectionSavedSearches = styled.section`
  padding: 30px 0 80px;
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

const SavedSearchesBtnBox = styled.div`
  position: ${(props) =>
    props.position === "bottom" ? "absolute" : "relative"};
  bottom: ${(props) => (props.position === "bottom" ? "15px" : "unset")};

  width: 100%;
  text-align: center;

  @media (min-width: 1024px) {
    bottom: ${(props) => (props.position === "bottom" ? 0 : "unset")};
  }

  @media (min-width: 1100px) {
    bottom: ${(props) => (props.position === "bottom" ? "15px" : "unset")};
  }
`;

const SavedSearchesBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 3.5rem;
  color: #ffd671;
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));

  :disabled {
    color: #d0d0d0;
  }

  @media (min-width: 1100px) {
    font-size: 4rem;
  }
`;

const SavedSearchesListBox = styled.div`
  margin-top: 15px;
  height: 755px;
  overflow: hidden;

  @media (min-width: 1024px) {
    margin: 0;
  }

  @media (min-width: 1400px) {
    margin-top: 10px;
  }
`;

const SavedSearchesList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transform: translateY(${(props) => props.positionList}px);
  list-style: none;
  transition: transform 0.6s;
`;

const SavedSearches = () => {
  const {
    savedSearches,
    searchListPosition,
    setListPositionToTop,
    setListPositionToBottom,
  } = useContext(SavedSearchesContext);

  const [statusLastItem, setStatusLastItem] = useState(false);

  useEffect(() => {
    const lengthSavedSearches = savedSearches.length + 1;

    if (lengthSavedSearches > 5) {
      const countSwitchSlider = Math.abs(searchListPosition / 151);
      setStatusLastItem(countSwitchSlider + 5 === lengthSavedSearches);
    }
  }, [savedSearches, searchListPosition]);

  let listSavedSearches = [];

  if (savedSearches.length < 5) {
    if (savedSearches.length !== 0) {
      listSavedSearches = savedSearches.map((search) => {
        return <SavedSearch key={search.id} search={search} />;
      });
    }

    const count = 5 - savedSearches.length;

    for (let i = 1; i <= count; i++) {
      listSavedSearches.push(<SavedSearch key={i} />);
    }
  } else if (savedSearches.length >= 5) {
    listSavedSearches = savedSearches.map((search) => {
      return <SavedSearch key={search.id} search={search} />;
    });
    listSavedSearches.push(<SavedSearch key={nanoid()} />);
  }

  return (
    <SectionSavedSearches>
      <TitleSavedSearches>saved searches</TitleSavedSearches>

      <SavedSearchesBtnBox position="top">
        <SavedSearchesBtn
          onClick={() => setListPositionToTop()}
          disabled={searchListPosition === 0}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </SavedSearchesBtn>
      </SavedSearchesBtnBox>

      <SavedSearchesListBox>
        <SavedSearchesList positionList={searchListPosition}>
          {listSavedSearches}
        </SavedSearchesList>
      </SavedSearchesListBox>

      <SavedSearchesBtnBox position="bottom">
        <SavedSearchesBtn
          onClick={() => setListPositionToBottom()}
          disabled={savedSearches.length < 5 || statusLastItem}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </SavedSearchesBtn>
      </SavedSearchesBtnBox>
    </SectionSavedSearches>
  );
};

export default SavedSearches;

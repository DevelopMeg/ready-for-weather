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

const SavedSearchesBtnBox = styled.div`
  text-align: center;

  @media (min-width: 1440px) {
    :nth-of-type(1) {
      margin-top: ${(props) => (props.page === "homePage" ? 10 : 30)}px;
    }
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

const SavedSearchesItemsBox = styled.div`
  height: ${(props) => (props.page === "homePage" ? "302" : "755")}px;

  overflow: hidden;

  @media (min-width: 1100px) and (min-height: 900px) {
    height: ${(props) => (props.page === "homePage" ? "453" : "755")}px;
  }

  @media (min-width: 1100px) and (min-height: 1000px) {
    height: ${(props) => (props.page === "homePage" ? "604" : "755")}px;
  }
`;

const SavedSearchesItems = styled.ul`
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

const SavedSearchesList = ({ page }) => {
  const {
    savedSearches,
    searchListPosition,
    setListPositionToTop,
    setListPositionToBottom,
  } = useContext(SavedSearchesContext);

  const [statusLastItem, setStatusLastItem] = useState(false);

  const [defaultShowSearches, setDefaultShowSearches] = useState(0);

  useEffect(() => {
    const setScrollSavedSearches = (
      valueShowSearchesOne,
      valueShowSearchesTwo
    ) => {
      const lengthSavedSearches = savedSearches.length + 1;
      const countSwitchSlider = Math.abs(searchListPosition / 151);

      if (lengthSavedSearches > valueShowSearchesOne) {
        setStatusLastItem(
          countSwitchSlider + valueShowSearchesTwo === lengthSavedSearches
        );
      }
      setDefaultShowSearches(valueShowSearchesOne);
    };

    if (page === "homePage") {
      if (
        window.innerWidth < 1100 ||
        (window.innerWidth >= 1100 && window.innerHeight < 900)
      ) {
        setScrollSavedSearches(2, 3);
      }

      if (window.innerWidth >= 1100 && window.innerHeight >= 900) {
        setScrollSavedSearches(3, 4);
      }

      if (window.innerWidth >= 1100 && window.innerHeight >= 1000) {
        setScrollSavedSearches(4, 5);
      }
    } else {
      setScrollSavedSearches(5, 5);
    }
  }, [savedSearches, searchListPosition, page]);

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
    <>
      <SavedSearchesBtnBox page={page}>
        <SavedSearchesBtn
          onClick={() => setListPositionToTop()}
          disabled={searchListPosition === 0}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </SavedSearchesBtn>
      </SavedSearchesBtnBox>

      <SavedSearchesItemsBox page={page}>
        <SavedSearchesItems positionList={searchListPosition}>
          {listSavedSearches}
        </SavedSearchesItems>
      </SavedSearchesItemsBox>

      <SavedSearchesBtnBox>
        <SavedSearchesBtn
          onClick={() => setListPositionToBottom()}
          disabled={
            savedSearches.length < defaultShowSearches || statusLastItem
          }
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </SavedSearchesBtn>
      </SavedSearchesBtnBox>
    </>
  );
};

export default SavedSearchesList;

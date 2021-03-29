import React, { useContext } from "react";

import { DataFetchContext } from "context/DataFetchContext";
import { SavedSearchesContext } from "context/SavedSearchesContext";

import { useLocation } from "react-router-dom";

import { clearSearchDiacriticSpace } from "utils/utils";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import styled from "styled-components";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faCity,
} from "../../node_modules/@fortawesome/free-solid-svg-icons";

const SavedSearchItem = styled.li`
  margin: 18px 0;
  width: 70px;
  height: 115px;
  position: relative;
  display: block;
  border-radius: 30%;
  background: #ffebba;

  ::before,
  ::after {
    content: "";
    position: absolute;
    left: 0;
    width: 70px;
    height: 115px;
    border-radius: 30%;
    background-color: #ffebba;
  }

  ::before {
    transform: rotate(60deg);
  }
  ::after {
    transform: rotate(-60deg);
  }
`;

const DeleteSavedSearch = styled.span`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  z-index: 2;

  @media (min-width: 1024px) {
    cursor: pointer;
  }
`;

const SavedSearchTextBox = styled.div`
  padding: 20px 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 135px;
  text-align: center;
  z-index: 1;

  @media (min-width: 1024px) {
    cursor: pointer;
  }
`;

const SavedSearchText = styled.span`
  word-wrap: break-word;
  text-transform: uppercase;
  font-size: 1.5rem;

  @media (min-width: 1440px) {
    font-size: 1.6rem;
  }
`;

const AddSavedSearch = styled.span`
  font-size: 2rem;

  @media (min-width: 1024px) {
    cursor: pointer;
  }
`;

const SavedSearch = ({ search }) => {
  const path = useLocation().pathname;

  const { geographicData, setGeographicData } = useContext(DataFetchContext);
  const searchCity = geographicData.searchCity;

  const {
    savedSearches,
    searchListPosition,
    saveSearch,
    deleteSearch,
    setListPositionByDeleteItem,
  } = useContext(SavedSearchesContext);

  const openSavedSearch = savedSearches.every((search) => {
    const savedSearchCity = clearSearchDiacriticSpace(search.searchCity);
    const currentSearchCity = clearSearchDiacriticSpace(searchCity);

    return savedSearchCity !== currentSearchCity;
  });

  const handleSaveSearch = () => {
    if (openSavedSearch) {
      saveSearch();
    } else {
      confirmAlert({
        title: `Already saved search - ${searchCity.toUpperCase()}`,
        buttons: [
          {
            label: "ok",
          },
        ],
      });
    }
  };

  const handleOpenSaveSearch = () => {
    setGeographicData(search);
  };

  const handleDeleteSearch = () => {
    deleteSearch(search.id);
    if (savedSearches.length > 4 && searchListPosition !== 0) {
      setListPositionByDeleteItem();
    }
  };

  return (
    <SavedSearchItem>
      {search && path !== "/" ? (
        <DeleteSavedSearch onClick={handleDeleteSearch}>
          <FontAwesomeIcon icon={faTrash} />
        </DeleteSavedSearch>
      ) : null}

      {path !== "/" ? (
        <SavedSearchTextBox
          onClick={search ? handleOpenSaveSearch : handleSaveSearch}
        >
          {search ? (
            <SavedSearchText>{search.searchCity}</SavedSearchText>
          ) : (
            <AddSavedSearch>
              <FontAwesomeIcon icon={faPlus} />
            </AddSavedSearch>
          )}
        </SavedSearchTextBox>
      ) : (
        <SavedSearchTextBox onClick={search ? handleOpenSaveSearch : null}>
          {search ? (
            <SavedSearchText>{search.searchCity}</SavedSearchText>
          ) : (
            <AddSavedSearch>
              <FontAwesomeIcon icon={faCity} />
            </AddSavedSearch>
          )}
        </SavedSearchTextBox>
      )}
    </SavedSearchItem>
  );
};

export default SavedSearch;

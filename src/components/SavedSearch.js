import React, { useContext } from "react";

import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
} from "../../node_modules/@fortawesome/free-solid-svg-icons";

import { DataFetchContext } from "context/DataFetchContext";
import { SavedSearchesContext } from "context/SavedSearchesContext";

import { clearSearchDiacriticSpace } from "utils/utils";

const SavedSearch = ({ search }) => {
  const { geographicData } = useContext(DataFetchContext);
  const { setGeographicData } = useContext(DataFetchContext);

  const searchCity = geographicData.searchCity;

  const { savedSearches, saveSearch, deleteSearch } = useContext(
    SavedSearchesContext
  );

  const openSavedSearch = savedSearches.every((search) => {
    const savedSearchCity = clearSearchDiacriticSpace(search.searchCity);
    const currentSearchCity = clearSearchDiacriticSpace(searchCity);

    return savedSearchCity !== currentSearchCity;
  });

  const handleSaveSearch = () => {
    if (openSavedSearch) {
      saveSearch();
    } else {
      window.alert(`Already save ${searchCity}`);
    }
  };

  const handleOpenSaveSearch = () => {
    setGeographicData(search);
  };

  const handleDeleteSearch = () => {
    deleteSearch(search.id);
  };

  return (
    <>
      <div onClick={search ? handleOpenSaveSearch : handleSaveSearch}>
        {search ? search.searchCity : <FontAwesomeIcon icon={faPlus} />}
      </div>
      {search ? (
        <div onClick={handleDeleteSearch}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      ) : null}
    </>
  );
};

export default SavedSearch;

import React, { createContext, useReducer, useContext, useEffect } from "react";

import { nanoid } from "nanoid";

import { SAVE_SEARCH, DELETE_SEARCH } from "reducers/types";
import { savedSearchesReducer } from "reducers/savedSearchesReducer";

import { DataFetchContext } from "context/DataFetchContext";

export const SavedSearchesContext = createContext();

const SavedSearchesProvider = ({ children }) => {
  const { geographicData } = useContext(DataFetchContext);
  const { latitude, longitude, searchCity } = geographicData;

  const initialState = {
    savedSearches: [],
  };

  const localData = JSON.parse(localStorage.getItem("savedSearches"));

  const [state, dispatch] = useReducer(
    savedSearchesReducer,
    localData || initialState
  );

  useEffect(() => {
    localStorage.setItem("savedSearches", JSON.stringify(state));
  }, [state]);

  const searchInfo = {
    latitude,
    longitude,
    searchCity,
    id: nanoid(),
  };

  const saveSearch = () => {
    dispatch({ type: SAVE_SEARCH, payload: searchInfo });
  };

  const deleteSearch = (idDeleteSearch) => {
    dispatch({ type: DELETE_SEARCH, payload: idDeleteSearch });
  };

  return (
    <SavedSearchesContext.Provider
      value={{
        savedSearches: state.savedSearches,
        saveSearch,
        deleteSearch,
      }}
    >
      {children}
    </SavedSearchesContext.Provider>
  );
};

export default SavedSearchesProvider;

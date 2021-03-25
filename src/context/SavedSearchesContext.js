import React, { createContext, useReducer, useContext, useEffect } from "react";

import { nanoid } from "nanoid";

import {
  SAVE_SEARCH,
  DELETE_SEARCH,
  SET_LIST_POSITION_TO_TOP,
  SET_LIST_POSITION_TO_BOTTOM,
  SET_LIST_POSITION_BY_DELETE_ITEM,
} from "reducers/types";
import { savedSearchesReducer } from "reducers/savedSearchesReducer";

import { DataFetchContext } from "context/DataFetchContext";

export const SavedSearchesContext = createContext();

const SavedSearchesProvider = ({ children }) => {
  const { geographicData } = useContext(DataFetchContext);
  const { latitude, longitude, searchCity, countryCity } = geographicData;

  const initialState = {
    savedSearches: [],
    searchListPosition: 0,
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
    countryCity,
    id: nanoid(),
  };

  const saveSearch = () => {
    dispatch({ type: SAVE_SEARCH, payload: searchInfo });
  };

  const deleteSearch = (idDeleteSearch) => {
    dispatch({ type: DELETE_SEARCH, payload: idDeleteSearch });
  };

  const setListPositionToTop = () => {
    dispatch({ type: SET_LIST_POSITION_TO_TOP });
  };

  const setListPositionToBottom = () => {
    dispatch({ type: SET_LIST_POSITION_TO_BOTTOM });
  };

  const setListPositionByDeleteItem = () => {
    dispatch({ type: SET_LIST_POSITION_BY_DELETE_ITEM });
  };

  return (
    <SavedSearchesContext.Provider
      value={{
        savedSearches: state.savedSearches,
        searchListPosition: state.searchListPosition,
        saveSearch,
        deleteSearch,
        setListPositionToTop,
        setListPositionToBottom,
        setListPositionByDeleteItem,
      }}
    >
      {children}
    </SavedSearchesContext.Provider>
  );
};

export default SavedSearchesProvider;

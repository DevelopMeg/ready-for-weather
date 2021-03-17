import {
  SAVE_SEARCH,
  DELETE_SEARCH,
  SET_HEIGHT_SAVED_SEARCHES,
} from "reducers/types";

export const savedSearchesReducer = (state, action) => {
  switch (action.type) {
    case SAVE_SEARCH:
      return {
        ...state,
        savedSearches: [...state.savedSearches, action.payload],
      };

    case DELETE_SEARCH:
      return {
        ...state,
        savedSearches: state.savedSearches.filter((search) => {
          return search.id !== action.payload;
        }),
      };

    case SET_HEIGHT_SAVED_SEARCHES:
      return {
        ...state,
        heightSavedSearches: action.payload,
      };

    default:
      return state;
  }
};

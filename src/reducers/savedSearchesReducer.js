import {
  SAVE_SEARCH,
  DELETE_SEARCH,
  SET_LIST_POSITION_TO_TOP,
  SET_LIST_POSITION_TO_BOTTOM,
  SET_LIST_POSITION_BY_DELETE_ITEM,
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

    case SET_LIST_POSITION_TO_TOP:
    case SET_LIST_POSITION_BY_DELETE_ITEM:
      return {
        ...state,
        searchListPosition: state.searchListPosition + 151,
      };

    case SET_LIST_POSITION_TO_BOTTOM:
      return {
        ...state,
        searchListPosition: state.searchListPosition - 151,
      };

    default:
      return state;
  }
};

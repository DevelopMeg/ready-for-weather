import React, { useContext } from "react";

import SavedSearch from "components/SavedSearch";

import { SavedSearchesContext } from "context/SavedSearchesContext";

const SavedSearches = () => {
  const { savedSearches } = useContext(SavedSearchesContext);

  let listSavedSearches = [];

  if (savedSearches.length < 4) {
    if (savedSearches.length !== 0) {
      listSavedSearches = savedSearches.map((search) => {
        return <SavedSearch key={search.id} search={search} />;
      });
    }

    const count = 4 - savedSearches.length;

    for (let i = 1; i <= count; i++) {
      listSavedSearches.push(<SavedSearch key={i} />);
    }
  } else if (savedSearches.length >= 4) {
    listSavedSearches = savedSearches.map((search) => {
      return <SavedSearch key={search.id} search={search} />;
    });
    listSavedSearches.push(<SavedSearch />);
  }

  return (
    <section>
      <h3>saved searches</h3>
      {listSavedSearches}
    </section>
  );
};

export default SavedSearches;

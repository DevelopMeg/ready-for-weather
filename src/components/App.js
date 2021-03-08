import React from "react";

import Header from "components/Header";
import RootRoutes from "pages/RootRoutes";
import Footer from "components/Footer";

import { BrowserRouter } from "react-router-dom";

import DataFetchProvider from "context/DataFetchContext";
import SavedSearchesProvider from "context/SavedSearchesContext";

const App = () => {
  return (
    <DataFetchProvider>
      <SavedSearchesProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Header />
          <main>
            <RootRoutes />
          </main>
          <Footer />
        </BrowserRouter>
      </SavedSearchesProvider>
    </DataFetchProvider>
  );
};

export default App;

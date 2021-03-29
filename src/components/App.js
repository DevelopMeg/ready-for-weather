import React from "react";

import Header from "components/Header";
import RootRoutes from "pages/RootRoutes";
import Footer from "components/Footer";

import DataFetchProvider from "context/DataFetchContext";
import SavedSearchesProvider from "context/SavedSearchesContext";

import { BrowserRouter } from "react-router-dom";

import styled from "styled-components";
import { GlobalStyles } from "components/GlobalStyles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
`;

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <DataFetchProvider>
        <SavedSearchesProvider>
          <GlobalStyles />
          <Wrapper>
            <Header />
            <Main>
              <RootRoutes />
            </Main>
            <Footer />
          </Wrapper>
        </SavedSearchesProvider>
      </DataFetchProvider>
    </BrowserRouter>
  );
};

export default App;

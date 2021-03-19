import React from "react";

import SearchBar from "components/SearchBar";

import styled from "styled-components";

import mainImage from "assets/main-image-homepage.jpg";

const SectionHomePage = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: url(${mainImage});
  background-size: cover;
`;

const HomePageBox = styled.div`
  padding: 14px;
  width: 100%;

  @media (min-width: 1024px) {
    padding: 0;
    width: 70%;
  }

  @media (min-width: 1200px) {
    padding: 0;
    width: 55%;
  }

  @media (min-width: 1900px) {
    padding: 0;
    width: 50%;
  }
`;

const TitleHomePage = styled.h2`
  margin: 0 0 30px;
  font-size: 2rem;
  text-align: center;
  color: #fff;
  text-shadow: 1px 3px 3px #585858, 1px 2px 3px #292929;

  @media (min-width: 400px) {
    font-size: 2.4rem;
  }

  @media (min-width: 1024px) {
    text-align: left;
    font-size: 2.8rem;
  }

  @media (min-width: 1400px) {
    font-size: 3.2rem;
  }
`;

const HomePage = () => {
  return (
    <SectionHomePage>
      <HomePageBox>
        <TitleHomePage>Check weather for selected city</TitleHomePage>
        <SearchBar page="home-page" />
      </HomePageBox>
    </SectionHomePage>
  );
};

export default HomePage;

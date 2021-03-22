import React from "react";

import styled from "styled-components";

const FooterBox = styled.footer`
  padding: 20px 0;
  text-align: center;
  color: #292929;
`;

const FooterText = styled.p`
  margin: ${(props) => (props.margin ? "0 0 4px" : 0)};

  font-size: 1.4rem;

  @media (min-width: 1024px) {
    font-size: 1.6rem;
  }
`;

const FooterLink = styled.a`
  color: #292929;
  text-decoration: none;
`;

const Footer = () => {
  return (
    <FooterBox>
      <FooterText margin>DevelopMeg 2021 &copy; All right reserved</FooterText>
      <FooterText>
        photos by <FooterLink href="https://unsplash.com/">Unsplash</FooterLink>{" "}
        &amp; loader icon by{" "}
        <FooterLink href="https://www.freepik.com">Freepik</FooterLink>
      </FooterText>
    </FooterBox>
  );
};

export default Footer;

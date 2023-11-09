import React from 'react';
import styled from 'styled-components';

import { breakPoint } from '../../../../const/styles/breakPoint';

// Import your dummy SVG for the apps icon here
// import AppsIcon from './dummy.svg';

const NavbarContainer = styled.nav`
  display: none;

  @media ${breakPoint.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    padding: 10px 20px;
    top: 0;
    left: 0;
    right: 0;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333; /* Change to your desired color */
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
`;

// const AppsIconImage = styled.img`
//   width: 30px; /* Adjust the size as needed */
//   height: 30px; /* Adjust the size as needed */
//   margin-right: 10px;
// `;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333; /* Change to your desired color */
  margin-right: 20px;
  font-size: 16px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;

const HamburgerIcon = styled.div`
  display: none; /* Change this to "block" or "flex" for mobile menu */
  cursor: pointer;
  /* Add your hamburger icon styling here */
`;

const Navbar = () => (
  <NavbarContainer>
    <Logo href="/">
      {/* <AppsIconImage src={AppsIcon} alt="Apps Icon" /> */}
      Your Logo
    </Logo>
    <NavLinks>
      <NavLink href="/">TimeTrack</NavLink>
      <NavLink href="/analytics">Analytics</NavLink>
    </NavLinks>
    <HamburgerIcon>
      {/* Add your hamburger icon component here */}
    </HamburgerIcon>
  </NavbarContainer>
);

export default Navbar;

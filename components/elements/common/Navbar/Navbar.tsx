import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FiLogOut } from 'react-icons/fi';
import { breakPoint } from '../../../../const/styles/breakPoint';
import Button from '../Button/Button';
import { useUserLogout } from '../../../../features/auth/api/hooks/useUserLogout';
import { getWebRoute } from '../../../../routes/web';
import { showToast } from '../../../../libs/react-toastify/toast';

const NavbarContainer = styled.nav`
  display: none;

  @media ${breakPoint.tablet} {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    padding-inline: 24px;
    top: 0;
    left: 0;
    right: 0;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
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
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
  font-size: 1em;
  padding: 0.3em 0.5em;

  &:hover {
    opacity: 0.7;
  }
`;

const Navbar = () => {
  const router = useRouter();

  const { mutate: logout } = useUserLogout();

  const handleLogout = () => {
    logout();
    showToast('success', 'You have been logged out.');
    toast.onChange((toastItem) => {
      if (toastItem.status === 'removed') {
        router.push(getWebRoute('login'));
      }
    });
  };

  return (
    <NavbarContainer>
      <Logo href="/">
        {/* <AppsIconImage src={AppsIcon} alt="Apps Icon" /> */}
        Your Logo
      </Logo>
      <NavLinks>
        <NavLink href="/">TimeTrack</NavLink>
        <NavLink href="/analytics">Analytics</NavLink>
        {/* This is temporary Need to redesign in phase 2 */}
        <StyledButton onClick={handleLogout}>
          Logout
          <FiLogOut />
        </StyledButton>
      </NavLinks>
      <HamburgerIcon>
        {/* Add your hamburger icon component here */}
      </HamburgerIcon>
    </NavbarContainer>
  );
};

export default Navbar;

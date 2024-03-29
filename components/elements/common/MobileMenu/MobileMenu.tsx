import { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { IoMenu, IoClose } from 'react-icons/io5';

import { useWindowResize } from '../../../../hooks/useWindowResize';

import { white } from '../../../../const/styles/colors';
import { breakPoint } from '../../../../const/styles/breakPoint';

import { useAppSelector } from '../../../../stores/hooks';
import { selectColorTheme } from '../../../../stores/slices/colorThemeSlice';

import { ColorThemeName } from '../../../../types/colorTheme';
import { getWebRoute } from '../../../../routes/web';
import { useUserLogout } from '../../../../features/auth/api/hooks/useUserLogout';

const WrapperDiv = styled.div`
  @media ${breakPoint.tablet} {
    display: none;
  }
`;

const Container = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  z-index: 1000;
  overflow: hidden; /* Disable scrolling in the menu */
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 1.5em);
  background-color: ${(props) => props.theme.colors.componentBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 3em;
`;

const ContentItemDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
`;

const ButtonWrapper = styled.button<{
  colorThemeName: ColorThemeName;
  isOpen: boolean;
}>`
  position: absolute;
  top: 16px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2em;

  // to outstand close icon in dark color overlay
  color: ${({ theme, colorThemeName, isOpen }) =>
    isOpen && colorThemeName === 'light' ? white : theme.colors.text};

  cursor: pointer;
  z-index: 1100;
`;

const MenuItemButton = styled.button`
  appearance: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.componentBackground};
  cursor: pointer;
  font-size: 1em;
  color: ${({ theme }) => theme.colors.text};
`;

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentColorTheme = useAppSelector(selectColorTheme);
  const { mutate: logout } = useUserLogout();
  const router = useRouter();
  const [isBelowBreakPoint] = useWindowResize();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push(getWebRoute('login'));
  };

  // close menu when the screen size goes bigger than the breakpoint
  useEffect(() => {
    if (!isBelowBreakPoint) {
      setIsOpen(false);
    }
  }, [isBelowBreakPoint]);

  useEffect(() => {
    const { body } = document;

    // disable scrolling when the menu is open, re-enable scrolling when the menu is closed
    isOpen ? (body.style.overflow = 'hidden') : (body.style.overflow = 'auto');

    // re-enable scrolling when the component unmounts
    return () => {
      body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const menuItems = {
    Home: getWebRoute('home'),
    Dashboard: getWebRoute('dashboard'),
  };

  return (
    <WrapperDiv>
      <ButtonWrapper
        colorThemeName={currentColorTheme}
        onClick={toggleMenu}
        isOpen={isOpen}
      >
        {isOpen ? <IoClose /> : <IoMenu />}
      </ButtonWrapper>
      <Container isOpen={isOpen} onClick={closeMenu}>
        {/* e.stopPropagation() is necessary
        to avoid close the menu when the menu items are clicked */}
        <ContentsContainer onClick={(e) => e.stopPropagation()}>
          {Object.keys(menuItems).map((label) => (
            <ContentItemDiv key={label}>
              <Link href={menuItems[label]}>{label}</Link>
            </ContentItemDiv>
          ))}
          <ContentItemDiv>
            <MenuItemButton onClick={handleLogout}>Logout</MenuItemButton>
          </ContentItemDiv>
        </ContentsContainer>
      </Container>
    </WrapperDiv>
  );
};

export default memo(MobileMenu);

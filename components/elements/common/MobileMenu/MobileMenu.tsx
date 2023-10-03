import { useState } from 'react';
import styled from 'styled-components';

import { IoMenu, IoClose } from 'react-icons/io5';

const MenuContainer = styled.div<{isOpen: boolean}>`
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
`;

const MenuContent = styled.div`
  height: 40%;
  background-color: #fff; // TODO: change later
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 1.5em; // TODO: adjust later (align with padding-top)
`;

const MenuButton = styled.button`
  position: absolute;
  top: 16px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2em;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  z-index: 1100;
`;

type Props = {
  items: React.ReactNode[];
}

// TODO: fix later

const MobileMenu = ({ items }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MenuButton onClick={toggleMenu}>
        {isOpen ? <IoClose /> : <IoMenu />}
      </MenuButton>
      <MenuContainer isOpen={isOpen} onClick={closeMenu}>
        <MenuContent onClick={(e) => e.stopPropagation()}>
          {items.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </MenuContent>
      </MenuContainer>
    </>
  );
};

export default MobileMenu;

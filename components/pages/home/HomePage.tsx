import { useState } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';
import styled from 'styled-components';
import { GiHamburgerMenu, GiCancel } from 'react-icons/gi';

import OnGoingTimerArea from '../../../features/workSession/components/elements/OnGoingTimerArea/OnGoingTimerArea';
import TabsArea from '../../../features/workSession/components/elements/TabArea/TabsArea';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';

import Navbar from '../../elements/Navbar/Navbar';

import { breakPoint } from '../../../const/styles/breakPoint';

const testTabs = [
  {
    id: 1,
    name: 'Tab 1',
    displayOrder: 1,
    taskLists: [
      {
        id: 1,
        name: 'Task List 1',
        displayOrder: 1,
        tasks: [
          {
            id: 1,
            displayOrder: 1,
            name: 'Task 1',
            description: 'Description for Task 1',
            totalTime: 30,
          },
          {
            id: 2,
            displayOrder: 2,
            name: 'Task 2',
            description: 'Description for Task 2',
            totalTime: 45,
          },
        ],
      },
      {
        id: 2,
        name: 'Task List 2',
        displayOrder: 2,
        tasks: [
          {
            id: 3,
            displayOrder: 1,
            name: 'Task 3',
            description: 'Description for Task 3',
            totalTime: 20,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Tab 2',
    displayOrder: 2,
    taskLists: [
      {
        id: 3,
        name: 'Task List 3',
        displayOrder: 1,
        tasks: [
          {
            id: 4,
            displayOrder: 1,
            name: 'Task 4',
            description: 'Description for Task 4',
            totalTime: 15,
          },
        ],
      },
      // You can add more task lists for Tab 2 if needed
    ],
  },
  {
    id: 3,
    name: 'Tab 3',
    displayOrder: 3,
    taskLists: [
      // Define task lists for Tab 3 here if needed
    ],
  },
  // Add more tabs as needed
];

// TODO: MainAreaContainer -> flex-direction: column;
const MainAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 24px;
  padding-inline: 24px;
  padding-bottom: 24px;

  @media ${breakPoint.tablet} {
    flex-direction: row;
  }
`;



// Styled components for the menu and overlay
const MenuContainer = styled.div<{isOpen: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  /* align-items: center; */
  justify-content: center;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

const MenuContent = styled.div`
  height: 40%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 10px; /* Adjust the top position as needed */
  /* left: 10px; */
`;

const HamburgerButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  z-index: 1100;
`;
interface HamburgerMenuProps {
  items: React.ReactNode[];
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <HamburgerButton onClick={toggleMenu}>
        {isOpen ? <GiCancel /> : <GiHamburgerMenu />}
      </HamburgerButton>
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




// You can now use the 'tabs' variable, which is of type 'Tab[]'.

const HomePage = () => {
  // TODO: Check if this method works or not...
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;

  // TODO: mobile layout
  // TODO: break point: tablet
  // TODO: NavBar -> Hamburger menu
  // TODO: MainAreaContainer -> flex-direction: column;
  // TODO: OnGoingTimerArea -> flex, carousel, display only timer components. each timer components represents: current task, total time, total in selected tab
  // TODO: TabsArea -> scroll-y. List: carousel
  const menuItems = [
    <a href="/">Home</a>,
    <a href="/about">About</a>,
    <a href="/contact">Contact</a>,
  ];

  return (
    <>
      <LoadingOverlay loading={isLoading} />
      <Navbar />
      <HamburgerMenu items={menuItems} />
      <MainAreaContainer>
        <OnGoingTimerArea />
        <TabsArea tabs={testTabs} />
      </MainAreaContainer>
    </>
  );
};

export default HomePage;

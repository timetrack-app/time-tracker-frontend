import React from 'react';
import styled from 'styled-components';

type MenuBarProps = {
  listPosition: DOMRect;
  isOpen: boolean;
  onRename: () => void;
  onDelete: () => void;
};

const ContainerDiv = styled.div<{ listPosition: DOMRect }>`
  position: absolute;
  z-index: 999;
  top: ${({ listPosition }) => listPosition.top + 28}px;
  left: ${({ listPosition }) =>
    // TODO : Find better way to calculate left position
    listPosition.left + 80}px;
`;

// TODO : Make styling better

const MenuBarContainer = styled.div<{}>`
  background: ${({ theme }) => theme.colors.componentBackground};
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MenuButton = styled.button<{}>`
  cursor: pointer;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  margin-right: 1em;
`;

// TODO : The content is actually completely the same with editTabMenuBar,
// so better to consider make it one?
const EditListMenuBar = ({
  listPosition,
  isOpen,
  onRename,
  onDelete,
}: MenuBarProps) => {
  return isOpen ? (
    <ContainerDiv listPosition={listPosition}>
      <MenuBarContainer>
        <MenuButton onClick={onRename}>Rename</MenuButton>
        <MenuButton onClick={onDelete}>Delete</MenuButton>
      </MenuBarContainer>
    </ContainerDiv>
  ) : null;
};

export default EditListMenuBar;

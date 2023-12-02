import React from 'react';
import styled from 'styled-components';

type MenuBarProps = {
  editableTabSelectorPosition: DOMRect;
  isOpen: boolean;
  onRename: () => void;
  onDelete: () => void;
};

const ContainerDiv = styled.div<{ editableTabSelectorPosition: DOMRect }>`
  position: absolute;
  z-index: 999;
  top: ${({ editableTabSelectorPosition }) =>
    editableTabSelectorPosition.top + 28}px;
  left: ${({ editableTabSelectorPosition }) =>
    // TODO : Find better way to calculate left position
    editableTabSelectorPosition.left + 80}px;
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

const EditTabMenuBar = ({
  editableTabSelectorPosition,
  isOpen,
  onRename,
  onDelete,
}: MenuBarProps) => {
  return isOpen ? (
    <ContainerDiv editableTabSelectorPosition={editableTabSelectorPosition}>
      <MenuBarContainer>
        <MenuButton onClick={onRename}>Rename</MenuButton>
        <MenuButton onClick={onDelete}>Delete</MenuButton>
      </MenuBarContainer>
    </ContainerDiv>
  ) : null;
};

export default EditTabMenuBar;

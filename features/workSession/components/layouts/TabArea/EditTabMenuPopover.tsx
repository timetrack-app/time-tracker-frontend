import React from 'react';
import styled from 'styled-components';

import {
  Popover,
  PopoverProps,
} from '../../../../../components/elements/common';

type MenuPopoverProps = {
  onRename: () => void;
  onDelete: () => void;
} & PopoverProps;

// TODO : Make styling better
const MenuPopoverContainer = styled.div<{}>`
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

const EditTabMenuPopover = ({
  position,
  isOpen,
  onClose,
  onRename,
  onDelete,
}: MenuPopoverProps) => {
  return (
    <Popover position={position} isOpen={isOpen} onClose={onClose}>
      <MenuPopoverContainer>
        <MenuButton onClick={onRename}>Rename</MenuButton>
        <MenuButton onClick={onDelete}>Delete</MenuButton>
      </MenuPopoverContainer>
    </Popover>
  );
};

export default EditTabMenuPopover;

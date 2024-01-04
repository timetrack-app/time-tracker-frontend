import React, { MutableRefObject, useRef } from 'react';
import styled from 'styled-components';

import {
  Popover,
  PopoverProps,
} from '../../../../../components/elements/common';
import { FloatingMenuButton } from '../../ui';

type MenuPopoverProps = {
  onRename: () => void;
  onDelete: () => void;
} & PopoverProps;

const MenuPopoverContainer = styled.div<{}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const EditTabMenuPopover = ({
  triggerPosition,
  isOpen,
  onClose,
  onRename,
  onDelete,
}: MenuPopoverProps) => {
  return (
    <Popover
      triggerPosition={triggerPosition}
      left={120}
      isOpen={isOpen}
      onClose={onClose}
    >
      <MenuPopoverContainer>
        <FloatingMenuButton onClick={onRename}>Rename</FloatingMenuButton>
        <FloatingMenuButton onClick={onDelete}>Delete</FloatingMenuButton>
      </MenuPopoverContainer>
    </Popover>
  );
};

export default EditTabMenuPopover;

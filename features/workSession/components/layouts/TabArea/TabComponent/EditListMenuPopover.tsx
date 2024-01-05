import React from 'react';
import styled from 'styled-components';

import {
  Popover,
  PopoverProps,
} from '../../../../../../components/elements/common';
import { FloatingMenuButton } from '../../../ui';

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

const EditListMenuPopover = ({
  triggerPosition,
  isOpen,
  onClose,
  onRename,
  onDelete,
}: MenuPopoverProps) => {
  return (
    <Popover
      triggerPosition={triggerPosition}
      left={216}
      isOpen={isOpen}
      onClose={onClose}
    >
      <MenuPopoverContainer>
        <FloatingMenuButton onClick={onRename}>Rename</FloatingMenuButton>
        <FloatingMenuButton
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Delete
        </FloatingMenuButton>
      </MenuPopoverContainer>
    </Popover>
  );
};

export default EditListMenuPopover;

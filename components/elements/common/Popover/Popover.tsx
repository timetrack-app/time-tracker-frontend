import { on } from 'events';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

/**
 * Custom hook for managing Popover component open/close state and position
 * Use it with Popover component
 *
 * @return {
      isOpen: boolean;
      onOpen: () => void;
      onClose: () => void;
    }
 */
export const usePopover = () => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [position, setPosition] = useState<DOMRect>();

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const togglePopover = useCallback(
    (rect: DOMRect) => {
      if (!isOpen) setPosition(rect);
      setIsOpen((prev) => !prev);
    },
    [isOpen],
  );

  return {
    position,
    isOpen,
    onOpen,
    onClose,
    togglePopover,
  };
};

export const usePopoverPosition = () => {};

const ContainerDiv = styled.div<{ position: DOMRect }>`
  position: absolute;
  z-index: 999;
  top: ${({ position }) => position.top + 28}px;
  left: ${({ position }) =>
    // TODO : Find better way to calculate left position
    position.left + 80}px;
  background: ${({ theme }) => theme.colors.componentBackground};
  border-radius: 16px;
`;

export type PopoverProps = {
  position: DOMRect;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Popover = ({ position, isOpen, onClose, children }: PopoverProps) => {
  // Close modal when the outside of the popover is clicked, or escape key is pressed
  useEffect(() => {
    window.addEventListener('keypress', (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    });
    window.addEventListener('click', (e) => {
      if (e.target === document.querySelector('#root')) {
        onClose();
      }
    });
  }, [onClose]);
  return isOpen ? (
    <ContainerDiv position={position}>{children}</ContainerDiv>
  ) : null;
};

export default Popover;

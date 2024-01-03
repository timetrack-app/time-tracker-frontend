import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

/**
 * Custom hook for managing Popover component open/close state and triggerPosition
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
  const [triggerPosition, setTriggerPosition] = useState<DOMRect>();

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const togglePopover = useCallback(
    (rect: DOMRect) => {
      if (!isOpen) setTriggerPosition(rect);
      setIsOpen((prev) => !prev);
    },
    [isOpen],
  );

  return {
    triggerPosition,
    isOpen,
    onOpen,
    onClose,
    togglePopover,
  };
};

export const usePopoverPosition = () => {};

const PopOverOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1000;
`;

const ContainerDiv = styled.div<{ triggerPosition: DOMRect }>`
  position: absolute;
  z-index: 999;
  top: ${({ triggerPosition }) => triggerPosition.top + 28}px;
  left: ${({ triggerPosition }) =>
    // TODO : Find better way to calculate left triggerPosition
    triggerPosition.left + 80}px;
  background: ${({ theme }) => theme.colors.componentBackground};
  border-radius: 16px;
`;

export type PopoverProps = {
  triggerPosition: DOMRect;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Popover = ({
  triggerPosition,
  isOpen,
  onClose,
  children,
}: PopoverProps) => {
  // Close modal when the outside of the modal is clicked
  // useCallback because this function will be created every time Modal is rendered
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );
  // Close popover when escape key is pressed
  const handleKeydownEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', (e) => {
        handleKeydownEscape(e);
      });
    } else {
      window.removeEventListener('keydown', (e) => {
        handleKeydownEscape(e);
      });
    }
  });

  return isOpen ? (
    <PopOverOverlay onClick={handleOverlayClick}>
      <ContainerDiv triggerPosition={triggerPosition}>{children}</ContainerDiv>
    </PopOverOverlay>
  ) : null;
};

export default Popover;

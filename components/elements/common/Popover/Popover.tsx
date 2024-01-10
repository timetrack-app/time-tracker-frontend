import {
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
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

  const onOpen = (ref: MutableRefObject<HTMLElement>) => {
    if (!ref.current) return;
    const rect: DOMRect = ref.current.getBoundingClientRect();
    setTriggerPosition(rect);
    setIsOpen(true);
  };

  const onClose = () => {
    setTriggerPosition(undefined);
    setIsOpen(false);
  };

  return {
    triggerPosition,
    isOpen,
    onOpen,
    onClose,
  };
};

const PopOverOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.overlay};
  z-index: 1000;
`;

type ContainerDivProps = {
  triggerPosition: DOMRect;
  top?: number;
  left?: number;
};

const ContainerDiv = styled.div<ContainerDivProps>`
  position: absolute;
  z-index: 1001;
  top: ${({ triggerPosition, top }) => triggerPosition.top + top}px;
  left: ${({ triggerPosition, left }) =>
    // TODO : Find better way to calculate left triggerPosition
    triggerPosition.left + left}px;
`;

export type PopoverProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
} & ContainerDivProps;

const Popover = ({
  triggerPosition,
  top = 0,
  left = 0,
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
  // Close popover when scroll, because it will move position of popover unexpected place
  const handleScroll = useCallback(() => {
    onClose();
  }, [onClose]);
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', (e) => {
        handleKeydownEscape(e);
      });
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('keydown', (e) => {
        handleKeydownEscape(e);
      });
      window.removeEventListener('scroll', handleScroll);
    }
  });

  return isOpen ? (
    <PopOverOverlay onClick={handleOverlayClick}>
      <ContainerDiv triggerPosition={triggerPosition} top={top} left={left}>
        {children}
      </ContainerDiv>
    </PopOverOverlay>
  ) : null;
};

export default Popover;

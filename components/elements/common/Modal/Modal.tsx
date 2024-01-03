import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

/**
 * Custom hook for managing Modal component open/close state
 * Use it with Modal component
 *
 * @return {
      isMOpen: boolean;
      onOpen: () => void;
      onClose: () => void;
    }
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>();

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    onOpen,
    onClose,
  };
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.componentBackground};
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1001;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5em 0.8em 0;
  font-size: 1.5em;
`;

const CloseButton = styled(IoClose)`
  cursor: pointer;
`;

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

/**
 * Reusable modal component
 * Use it with useModal custom hook
 *
 * @param {ModalProps} { isOpen, onClose, children }
 * @return {JSX.Element}
 */
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
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
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <HeaderDiv>
          <CloseButton onClick={onClose} />
        </HeaderDiv>
        {children}
      </ModalContainer>
    </ModalOverlay>
  ) : null;
};

export default Modal;

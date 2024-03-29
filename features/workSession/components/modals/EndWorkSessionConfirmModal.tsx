import styled from 'styled-components';

import ButtonPrimary from '../../../../components/elements/common/Button/ButtonPrimary';
import ButtonDanger from '../../../../components/elements/common/Button/ButtonDanger';
import Modal from '../../../../components/elements/common/Modal/Modal';

import { breakPoint } from '../../../../const/styles/breakPoint';

const BodyDiv = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5em;

  @media ${breakPoint.tablet} {
    width: 30em;
  }
`;

const MessageP = styled.p`
  font-size: 1.2em;
`;

const ButtonContainerDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5em;
`;

const ButtonWrapper = styled.div`
  width: 10em;
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleYesButtonOnClick: () => void;
};

/**
 *
 *
 * @param {Props} { isOpen, closeModal }
 * @return {JSX.Element}
 */
const EndWorkSessionConfirmModal = ({
  isOpen,
  onClose,
  handleYesButtonOnClick,
}: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    {/* <HeaderDiv>
      <CloseButton onClick={closeModal} />
    </HeaderDiv> */}
    <BodyDiv>
      <MessageP>Are you sure you want to finish this work session?</MessageP>
      <ButtonContainerDiv>
        <ButtonWrapper>
          <ButtonDanger onClick={onClose}>No</ButtonDanger>
        </ButtonWrapper>
        <ButtonWrapper>
          <ButtonPrimary onClick={handleYesButtonOnClick}>Yes</ButtonPrimary>
        </ButtonWrapper>
      </ButtonContainerDiv>
    </BodyDiv>
  </Modal>
);

export default EndWorkSessionConfirmModal;

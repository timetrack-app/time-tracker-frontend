import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

import ButtonPrimary from '../../../../../../components/elements/common/Button/ButtonPrimary';
import ButtonDanger from '../../../../../../components/elements/common/Button/ButtonDanger';
import Modal from '../../../../../../components/elements/common/Modal/Modal';

import { breakPoint } from '../../../../../../const/styles/breakPoint';

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
`

const BodyDiv = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3em;

  padding: 1em 1em 2em;

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
  isOpen: boolean
  closeModal: () => void
  handleYesButtonOnClick: () => void
};

/**
 *
 *
 * @param {Props} { isOpen, closeModal }
 * @return {JSX.Element}
 */
const EndWorkSessionConfirmModal = ({ isOpen, closeModal, handleYesButtonOnClick }: Props) => (
  <Modal isOpen={isOpen} onClose={closeModal}>
    <HeaderDiv>
      <CloseButton onClick={closeModal} />
    </HeaderDiv>
    <BodyDiv>
      <MessageP>Are you sure you want to finish this work session?</MessageP>
      <ButtonContainerDiv>
        <ButtonWrapper>
          <ButtonDanger onClick={closeModal}>No</ButtonDanger>
        </ButtonWrapper>
        <ButtonWrapper>
          <ButtonPrimary onClick={handleYesButtonOnClick}>Yes</ButtonPrimary>
        </ButtonWrapper>
      </ButtonContainerDiv>
    </BodyDiv>
  </Modal>
);

export default EndWorkSessionConfirmModal;

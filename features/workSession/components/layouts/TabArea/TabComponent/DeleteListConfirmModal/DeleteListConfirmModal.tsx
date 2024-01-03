import styled from 'styled-components';

import {
  ButtonDanger,
  ButtonPrimary,
  Modal,
} from '../../../../../../../components/elements/common';
import { breakPoint } from '../../../../../../../const/styles/breakPoint';

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
  isOpen: boolean;
  onCloseModal: () => void;
  handleYesButtonOnClick: () => void;
};

/**
 *
 *
 * @param {Props} { isOpen, onCloseModal }
 * @return {JSX.Element}
 */
const DeleteListConfirmModal = ({
  isOpen,
  onCloseModal,
  handleYesButtonOnClick,
}: Props) => (
  <Modal isOpen={isOpen} onClose={onCloseModal}>
    <BodyDiv>
      <MessageP>Are you sure you want to delete this list?</MessageP>
      <ButtonContainerDiv>
        <ButtonWrapper>
          <ButtonPrimary onClick={handleYesButtonOnClick}>Yes</ButtonPrimary>
        </ButtonWrapper>
        <ButtonWrapper>
          <ButtonDanger onClick={onCloseModal}>No</ButtonDanger>
        </ButtonWrapper>
      </ButtonContainerDiv>
    </BodyDiv>
  </Modal>
);

export default DeleteListConfirmModal;
